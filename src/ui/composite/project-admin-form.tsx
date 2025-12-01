import { ModalBox } from "@/ui/atom/modal-box";
import { FlexCenter } from "@/ui/atom/flex-box";
import React, { useState } from "react";
import { buildingEnum, ProjectType } from "@/lib/definition";
import { deleteProject, updateProject } from "@/lib/project";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const ProjectAdminForm = ({ isOpen, setIsOpen, refProject }) => {
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
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const MAX_SIZE = 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      alert("이미지 용량은 1MB 이하여야 합니다");
      e.target.value = "";
      return;
    }

    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
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

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (project.id != null) {
      await deleteProject(project.id);
    }
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await updateProject(project, thumbnail);
      console.log("Project submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting project:", error);
    }
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
            accept="image/*"
            required
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
            className="input-text text-description text-text-black bg-background-gray rounded-sm px-4 py-2 outline-none"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">시공 건물 유형</h3>
          <label className="relative w-full">
            <select
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
            className="text-description text-text-black bg-background-gray rounded-sm px-4 py-2 outline-none"
            value={toInputDateValue(project.date)}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-text-gray font-bold">블로그 글 URL</h3>
          <input
            type="text"
            required
            className="input-text text-description text-text-black bg-background-gray rounded-sm px-4 py-2 outline-none"
            value={project.url}
            onChange={(e) => setProject({ ...project, url: e.target.value })}
            placeholder="https://blog.naver.com/kimsfoam/"
          />
        </div>
        <div className="flex w-full flex-row gap-2">
          {project.id && (
            <button
              className="button-red transition-ease flex-1 cursor-pointer rounded-sm py-2"
              onClick={handleDelete}
            >
              <h3 className="font-bold text-white">삭제하기</h3>
            </button>
          )}
          <button
            className="button-brand transition-ease flex-1 cursor-pointer rounded-sm py-2"
            onClick={handleSubmit}
          >
            <h3 className="text-text-dark font-bold">저장하기</h3>
          </button>
        </div>
      </form>
    </ModalBox>
  );
};
