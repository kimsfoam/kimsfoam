import { prisma } from "@/lib/prisma";
import React from "react";
import { ProjectClient } from "@/ui/composite/project-client";

export const ProjectContainer = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <section className="relative w-full py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-extrabold">킴스폼의 시공사례</h2>
        <ProjectClient projects={projects} />
      </div>
    </section>
  );
};
