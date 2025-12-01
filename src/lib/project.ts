"use server";

import { ProjectType } from "@/lib/definition";
import { prisma } from "@/lib/prisma";
import { del, put } from "@vercel/blob";

export async function updateProject(project: ProjectType, thumbnail: File) {
  const isCreate = project.id == null;

  // validate
  if (
    !project.title ||
    !project.url ||
    project.buildingType < 0 ||
    !project.date ||
    (isCreate && !thumbnail)
  )
    throw new Error("Invalid project");

  // thumbnail -> BLOB
  if (thumbnail) {
    if (!isCreate) {
      const blobPath = project.thumbnail
        .split("/")
        .slice(-2)
        .join("/")
        .split("?")[0];
      await del(blobPath, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    const blobURL = `projects/${crypto.randomUUID()}`;
    const { url: thumbnailURL } = await put(blobURL, thumbnail, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    project.thumbnail = thumbnailURL;
  }

  // project -> DB
  if (isCreate) {
    await prisma.project.create({
      data: {
        ...project,
      },
    });
  } else {
    await prisma.project.update({
      where: { id: project.id },
      data: {
        ...project,
      },
    });
  }
}

export async function deleteProject(id: number) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return;

  const blobUrl = project.thumbnail;
  const blobPath = blobUrl.split("/").slice(-2).join("/").split("?")[0];
  await del(blobPath, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  await prisma.project.delete({ where: { id } });
}
