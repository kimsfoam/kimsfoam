"use client";

import React from "react";
import { buildingEnum, ProjectType } from "@/lib/definition";
import {
  BarsArrowDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { ProjectAdminAdd } from "@/ui/composite/project-admin-add";
import { useSession } from "next-auth/react";

export const ProjectOption = ({
  buildingIndex,
  setBuildingIndex,
  projects,
}: {
  buildingIndex: number;
  setBuildingIndex: React.Dispatch<React.SetStateAction<number>>;
  projects: ProjectType[];
}) => {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  const projectsByBuilding = projects.reduce(
    (acc, p) => {
      acc[p.buildingType] = (acc[p.buildingType] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>,
  );
  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBuildingIndex(Number(e.target.value));
  };

  return (
    <div className="mt-[clamp(0.5rem,0.5rem+2vw,2rem)] flex w-full max-w-7xl flex-row justify-between">
      <div className="relative flex flex-row items-center justify-start gap-x-4">
        <label className="relative flex flex-row items-center justify-start gap-x-4">
          <select
            value={buildingIndex}
            onChange={handleBuildingChange}
            className="bg-brand-blue/10 outline-brand-blue/25 text-text-gray text-description cursor-pointer appearance-none rounded-full px-4 py-2 pr-20 font-semibold outline-2"
          >
            <option value={-1}>전체</option>
            {buildingEnum
              .map((building, index) => ({
                building,
                index,
                count: projectsByBuilding[index] || 0,
              }))
              .filter((item) => item.count > 0)
              .map(({ building, index }) => (
                <option key={index} value={index}>
                  {building}
                </option>
              ))}
          </select>
          <ChevronDownIcon className="text-text-gray absolute top-1/2 right-3 size-6 -translate-y-1/2 stroke-2" />
        </label>
        {isAdmin && <ProjectAdminAdd />}
      </div>
      <div className="relative flex flex-row items-end justify-start gap-x-1 select-none">
        <span className="text-text-gray text-small translate-y-0.5">
          최신순
        </span>
        <BarsArrowDownIcon className="text-text-gray stroke-1.5 size-5" />
      </div>
    </div>
  );
};
