import { buildingEnum, ProjectType } from "@/lib/definition";
import { prisma } from "@/lib/prisma";
import { sampleProjects } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { ProjectOption } from "@/ui/composite/project-option";

export const ProjectContainer = () => {
  return (
    <section className="relative w-full py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">
          킴스폼의 생생한 시공 현장
        </h2>
        <ProjectOption />
        <ProjectList />
      </div>
    </section>
  );
};

const ProjectList = async () => {
  // const projects = await prisma.project.findMany({
  //   orderBy: { date: "desc" },
  //   take: 100,
  // });
  const projects = sampleProjects;

  return (
    <div className="mt-4 grid w-full max-w-7xl grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard {...project} key={project.url} />
      ))}
    </div>
  );
};

const ProjectCard = ({
  title,
  url,
  thumbnail,
  buildingType,
  date,
}: ProjectType) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-gray transition-ease flex w-full cursor-pointer flex-col items-center justify-start overflow-hidden rounded-lg"
    >
      <div className="relative flex h-60 w-full flex-col items-center justify-center overflow-hidden">
        <Image
          src={thumbnail}
          alt="project image"
          fill
          className="transition-ease object-cover group-hover:scale-110"
        />
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
  );
};
