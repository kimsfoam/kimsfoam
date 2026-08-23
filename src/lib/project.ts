"use server";

import { ADMIN_EMAILS, authOptions } from "@/lib/authOptions";
import { buildingEnum, ProjectType } from "@/lib/definition";
import { prisma } from "@/lib/prisma";
import { getProjectCityPoint, isProjectRegion } from "@/lib/project-regions";
import { del, put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const MAX_IMAGE_SIZE = 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export type ProjectActionResult =
  | { success: true }
  | { success: false; error: string };

class ProjectActionError extends Error {}

type ValidProjectInput = {
  title: string;
  url: string;
  buildingType: number;
  date: Date;
  region: string;
  city: string;
};

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email || !ADMIN_EMAILS.includes(email)) {
    throw new ProjectActionError("관리자만 시공후기를 변경할 수 있습니다.");
  }
}

function validateProject(project: ProjectType): ValidProjectInput {
  const title = project.title.trim();
  if (!title || title.length > 100) {
    throw new ProjectActionError("제목은 1자 이상 100자 이하로 입력해주세요.");
  }

  const urlValue = project.url.trim();
  let url: URL;
  try {
    url = new URL(urlValue);
  } catch {
    throw new ProjectActionError("올바른 블로그 URL을 입력해주세요.");
  }
  if (!["http:", "https:"].includes(url.protocol) || urlValue.length > 2048) {
    throw new ProjectActionError(
      "HTTP 또는 HTTPS 블로그 URL만 사용할 수 있습니다.",
    );
  }

  if (
    !Number.isInteger(project.buildingType) ||
    project.buildingType < 0 ||
    project.buildingType >= buildingEnum.length
  ) {
    throw new ProjectActionError("올바른 건물 유형을 선택해주세요.");
  }

  const date = new Date(project.date);
  if (Number.isNaN(date.getTime())) {
    throw new ProjectActionError("올바른 시공일자를 입력해주세요.");
  }

  const region = project.region?.trim() ?? "";
  if (!isProjectRegion(region)) {
    throw new ProjectActionError("시공 지역을 선택해주세요.");
  }

  const city = project.city?.trim() ?? "";
  if (!getProjectCityPoint(region, city)) {
    throw new ProjectActionError("시공 시·군을 선택해주세요.");
  }

  return {
    title,
    url: url.toString(),
    buildingType: project.buildingType,
    date,
    region,
    city,
  };
}

function validateThumbnail(thumbnail: File | null, required: boolean) {
  if (!thumbnail || thumbnail.size === 0) {
    if (required) {
      throw new ProjectActionError("썸네일 이미지를 선택해주세요.");
    }
    return null;
  }

  if (thumbnail.size > MAX_IMAGE_SIZE) {
    throw new ProjectActionError("썸네일 이미지는 1MB 이하여야 합니다.");
  }
  if (!ALLOWED_IMAGE_TYPES.has(thumbnail.type)) {
    throw new ProjectActionError(
      "JPG, PNG, WebP, GIF 또는 AVIF 이미지만 업로드할 수 있습니다.",
    );
  }

  return thumbnail;
}

function getBlobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new ProjectActionError("Blob 저장소 설정을 확인해주세요.");
  }
  return token;
}

function isManagedProjectBlob(urlValue: string) {
  try {
    const url = new URL(urlValue);
    return (
      url.protocol === "https:" &&
      url.hostname.endsWith(".public.blob.vercel-storage.com") &&
      url.pathname.startsWith("/projects/")
    );
  } catch {
    return false;
  }
}

async function deleteManagedBlob(url: string, token: string) {
  if (!isManagedProjectBlob(url)) return;
  await del(url, { token });
}

function actionFailure(error: unknown, fallback: string): ProjectActionResult {
  if (error instanceof ProjectActionError) {
    return { success: false, error: error.message };
  }

  console.error(fallback, error);
  return { success: false, error: fallback };
}

export async function updateProject(
  project: ProjectType,
  thumbnail: File | null,
): Promise<ProjectActionResult> {
  let uploadedThumbnail = "";
  let blobToken = "";

  try {
    await requireAdmin();

    const projectId = project.id;
    const isCreate = projectId == null;
    const input = validateProject(project);

    if (!isCreate && (!Number.isInteger(projectId) || projectId <= 0)) {
      throw new ProjectActionError("올바르지 않은 시공후기입니다.");
    }

    const currentProject =
      projectId == null
        ? null
        : await prisma.project.findUnique({ where: { id: projectId } });

    if (!isCreate && !currentProject) {
      throw new ProjectActionError("수정할 시공후기를 찾을 수 없습니다.");
    }

    const image = validateThumbnail(
      thumbnail,
      isCreate || !currentProject?.thumbnail,
    );

    if (image) {
      blobToken = getBlobToken();
      const pathname = `projects/${crypto.randomUUID()}`;
      const blob = await put(pathname, image, {
        access: "public",
        addRandomSuffix: false,
        contentType: image.type,
        token: blobToken,
      });
      uploadedThumbnail = blob.url;
    }

    if (projectId == null) {
      await prisma.project.create({
        data: { ...input, thumbnail: uploadedThumbnail },
      });
    } else {
      await prisma.project.update({
        where: { id: projectId },
        data: {
          ...input,
          ...(uploadedThumbnail ? { thumbnail: uploadedThumbnail } : {}),
        },
      });
    }

    if (
      uploadedThumbnail &&
      currentProject?.thumbnail &&
      currentProject.thumbnail !== uploadedThumbnail
    ) {
      try {
        await deleteManagedBlob(currentProject.thumbnail, blobToken);
      } catch (error) {
        console.error("기존 시공후기 Blob 정리에 실패했습니다.", error);
      }
    }

    revalidatePath("/project");
    revalidatePath("/home");
    return { success: true };
  } catch (error) {
    if (uploadedThumbnail && blobToken) {
      try {
        await deleteManagedBlob(uploadedThumbnail, blobToken);
      } catch (cleanupError) {
        console.error(
          "실패한 업로드의 Blob 정리에 실패했습니다.",
          cleanupError,
        );
      }
    }
    return actionFailure(error, "시공후기를 저장하지 못했습니다.");
  }
}

export async function deleteProject(id: number): Promise<ProjectActionResult> {
  try {
    await requireAdmin();

    if (!Number.isInteger(id) || id <= 0) {
      throw new ProjectActionError("올바르지 않은 시공후기입니다.");
    }

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new ProjectActionError("삭제할 시공후기를 찾을 수 없습니다.");
    }

    const token = isManagedProjectBlob(project.thumbnail) ? getBlobToken() : "";
    await prisma.project.delete({ where: { id } });

    if (token) {
      try {
        await deleteManagedBlob(project.thumbnail, token);
      } catch (error) {
        console.error("삭제된 시공후기의 Blob 정리에 실패했습니다.", error);
      }
    }

    revalidatePath("/project");
    revalidatePath("/home");
    return { success: true };
  } catch (error) {
    return actionFailure(error, "시공후기를 삭제하지 못했습니다.");
  }
}
