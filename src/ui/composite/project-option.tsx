"use client";

import React, { useState } from "react";
import { buildingEnum } from "@/lib/definition";

export const ProjectOption = () => {
  const [buildingIndex, setBuildingIndex] = useState<number>(1);

  const handleBuildingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingIndex(Number(e.target.value));
  };

  return (
    <div className="mt-[clamp(0.5rem,0.5rem+2vw,2rem)] grid w-full max-w-7xl grid-cols-4 gap-4">
      <label className="relative flex flex-row items-center justify-start gap-x-4">
        <select
          value={buildingIndex}
          onChange={handleBuildingChange}
          className="bg-brand-blue/10 outline-brand-blue/25 text-text-gray text-description cursor-pointer appearance-none rounded-full px-4 py-2 pr-20 font-semibold outline-2"
        >
          {buildingEnum.map((building, index) => (
            <option key={index} value={index}>
              {building}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
