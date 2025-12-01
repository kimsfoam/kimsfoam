"use client";
import React, { useState } from "react";
import { ProjectAdminForm } from "@/ui/composite/project-admin-form";

export const ProjectAdminAdd = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="button-brand-text transition-ease text-brand-dark cursor-pointer rounded-full px-4 py-2 font-bold"
        onClick={() => setIsOpen(true)}
      >
        ⚙️ 추가하기
      </button>
      {isOpen && (
        <ProjectAdminForm
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          refProject={undefined}
        />
      )}
    </div>
  );
};
