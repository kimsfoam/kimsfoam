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

  return (
    <div className="flex w-full flex-col items-start justify-start gap-y-2 sm:items-center">
      <ProjectOption
        buildingIndex={buildingIndex}
        setBuildingIndex={setBuildingIndex}
        projects={projects}
      />
      <ProjectList buildingIndex={buildingIndex} projects={projects} />
    </div>
  );
};

const ProjectList = ({
  buildingIndex,
  projects,
}: {
  buildingIndex: number;
  projects: ProjectType[];
}) => {
  const filteredProjects =
    buildingIndex === -1
      ? projects
      : projects.filter((project) => project.buildingType === buildingIndex);

  return (
    <div className="mt-4 grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {filteredProjects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
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
