"use client";
import { buildingEnum, ProjectType } from "@/lib/definition";
import { ProjectOption } from "@/ui/composite/project-option";
import React, { useState } from "react";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ProjectAdminForm } from "@/ui/composite/project-admin-form";
import { useSession } from "next-auth/react";

export const ProjectClient = ({ projects }: { projects: ProjectType[] }) => {
  const [buildingIndex, setBuildingIndex] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const handleBuildingIndexChange: React.Dispatch<
    React.SetStateAction<number>
  > = (value) => {
    setBuildingIndex(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex w-full flex-col items-start justify-start gap-y-2 sm:items-center">
      <ProjectOption
        buildingIndex={buildingIndex}
        setBuildingIndex={handleBuildingIndexChange}
        projects={projects}
      />
      <ProjectList
        buildingIndex={buildingIndex}
        projects={projects}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

const ProjectList = ({
  buildingIndex,
  projects,
  currentPage,
  setCurrentPage,
}: {
  buildingIndex: number;
  projects: ProjectType[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const filteredProjects =
    buildingIndex === -1
      ? projects
      : projects.filter((project) => project.buildingType === buildingIndex);
  const projectsPerPage = 8;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const visibleProjects = filteredProjects.slice(
    (safePage - 1) * projectsPerPage,
    safePage * projectsPerPage,
  );

  return (
    <div className="flex w-full max-w-7xl flex-col items-center">
      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-2"
          aria-label="시공사례 페이지 이동"
        >
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            className="text-text-gray hover:text-text-black disabled:text-text-gray/30 cursor-pointer rounded-full px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                aria-current={page === safePage ? "page" : undefined}
                onClick={() => setCurrentPage(page)}
                className={`size-10 cursor-pointer rounded-full text-sm font-bold transition-colors ${
                  page === safePage
                    ? "bg-text-black text-white"
                    : "bg-background-gray text-text-gray hover:text-text-black"
                }`}
              >
                {page}
              </button>
            ),
          )}
          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            className="text-text-gray hover:text-text-black disabled:text-text-gray/30 cursor-pointer rounded-full px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed"
          >
            다음
          </button>
        </nav>
      )}
    </div>
  );
};

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  const { thumbnail, title, buildingType, date, url } = project;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group card-gray transition-ease flex w-full cursor-pointer flex-col items-center justify-start overflow-hidden rounded-lg"
      >
        <div className="relative flex h-60 w-full flex-col items-center justify-center overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={`${title} 시공 현장`}
              fill
              className="transition-ease object-cover group-hover:scale-110"
            />
          ) : (
            <span className="text-text-gray text-small">이미지 준비 중</span>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col items-start gap-y-1 p-4">
          <h3 className="text-text-black text-description line-clamp-1 font-semibold">
            {title}
          </h3>
          <p className="text-text-white bg-background-black text-light text-small rounded-sm px-2 text-left">
            {`#${buildingEnum[buildingType]}`}
          </p>
          <p className="text-text-white text-small pt-4">
            {date.toLocaleDateString()}
          </p>
        </div>
      </a>
      {isAdmin && (
        <button
          className="group bg-background-gray outline-brand-base-dark button-brand-text absolute right-2 bottom-2 z-3 cursor-pointer rounded-full p-2 outline-1"
          onClick={() => setIsOpen(true)}
        >
          <PencilSquareIcon className="transition-ease size-6" />
        </button>
      )}
      {isOpen && (
        <ProjectAdminForm
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          refProject={project}
        />
      )}
    </div>
  );
};
