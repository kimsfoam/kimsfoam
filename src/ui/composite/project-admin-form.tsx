import { ModalBox } from "@/ui/atom/modal-box";
import { FlexCenter } from "@/ui/atom/flex-box";
import React, { useEffect, useState } from "react";
import { buildingEnum, ProjectType } from "@/lib/definition";
import { deleteProject, updateProject } from "@/lib/project";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ProjectAdminForm = ({
  setIsOpen,
  refProject,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refProject?: ProjectType;
}) => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectType>(
    refProject ?? {
      title: "",
      date: new Date(),
      buildingType: 0,
      url: "",
      thumbnail: "",
    },
  );

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    const MAX_SIZE = 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      alert("이미지 용량은 1MB 이하여야 합니다");
      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "image/avif",
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("JPG, PNG, WebP, GIF 또는 AVIF 이미지를 선택해주세요.");
      e.target.value = "";
      return;
    }

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
    setErrorMessage("");
  };

  function toInputDateValue(date?: Date | string | null): string {
    if (!date) return "";

    const d = date instanceof Date ? date : new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  function parseDateStringToLocal(value: string): Date {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d); // local midnight
  }
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({
      ...project,
      date: parseDateStringToLocal(e.target.value),
    });
  };

  const handleDelete = async () => {
    if (
      project.id == null ||
      isSubmitting ||
      !window.confirm("이 시공후기를 삭제하시겠습니까?")
    ) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    const result = await deleteProject(project.id);

    if (!result.success) {
      setErrorMessage(result.error);
      setIsSubmitting(false);
      return;
    }

    router.refresh();
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    const result = await updateProject(project, thumbnail);

    if (!result.success) {
      setErrorMessage(result.error);
      setIsSubmitting(false);
      return;
    }

    router.refresh();
    setIsOpen(false);
  };

  return (
    <ModalBox onClose={() => setIsOpen(false)}>
      <form className="flex w-100 flex-col gap-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">
            썸네일<span className="text-small">(&lt;1MB)</span>
          </h3>
          <input
            type="file"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            required={!project.thumbnail}
            disabled={isSubmitting}
            className="input-text text-description text-text-black bg-background-gray cursor-pointer rounded-sm px-4 py-2 outline-none"
            onChange={handleThumbnailChange}
          />
          <FlexCenter className="bg-background-gray relative aspect-video w-full overflow-hidden rounded-sm">
            {preview || project.thumbnail ? (
              <Image
                src={preview || project.thumbnail}
                alt="thumbnail"
                fill
                className="object-contain"
              />
            ) : (
              <span className="text-text-white">미리보기</span>
            )}
          </FlexCenter>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">제목</h3>
          <input
            type="text"
            required
            maxLength={100}
            disabled={isSubmitting}
            className="input-text text-description text-text-black bg-background-gray rounded-sm px-4 py-2 outline-none"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">시공 건물 유형</h3>
          <label className="relative w-full">
            <select
              disabled={isSubmitting}
              className="text-description text-text-black bg-background-gray w-full appearance-none rounded-sm px-4 py-2 outline-none"
              value={project.buildingType}
              onChange={(e) =>
                setProject({
                  ...project,
                  buildingType: Number(e.target.value),
                })
              }
            >
              {buildingEnum.map((building, index) => (
                <option key={index} value={index}>
                  {building}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="text-text-white absolute top-1/2 right-3 size-6 -translate-y-1/2 stroke-2" />
          </label>
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">시공일자</h3>
          <input
            type="date"
            required
            disabled={isSubmitting}
            className="text-description text-text-black bg-background-gray rounded-sm px-4 py-2 outline-none"
            value={toInputDateValue(project.date)}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">블로그 글 URL</h3>
          <input
            type="url"
            required
            maxLength={2048}
            disabled={isSubmitting}
            className="input-text text-description text-text-black bg-background-gray rounded-sm px-4 py-2 outline-none"
            value={project.url}
            onChange={(e) => setProject({ ...project, url: e.target.value })}
            placeholder="https://blog.naver.com/kimsfoam/"
          />
        </div>
        {errorMessage && (
          <p className="text-small rounded-sm bg-red-50 px-3 py-2 text-red-700">
            {errorMessage}
          </p>
        )}
        <div className="flex w-full flex-row gap-2">
          {project.id && (
            <button
              type="button"
              disabled={isSubmitting}
              className="button-red transition-ease flex-1 cursor-pointer rounded-sm py-2"
              onClick={handleDelete}
            >
              <h3 className="font-bold text-white">삭제하기</h3>
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="button-brand transition-ease flex-1 cursor-pointer rounded-sm py-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <h3 className="text-text-dark font-bold">
              {isSubmitting ? "처리 중..." : "저장하기"}
            </h3>
          </button>
        </div>
      </form>
    </ModalBox>
  );
};
