import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const ModalBox = ({
  children,
  onClose,
  className = "",
}: {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-xs ${className}`}
    >
      <div
        className="overflow-hidden bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="bg-background-gray outline-background-black hover:bg-background-black transition-ease mb-4 flex cursor-pointer items-center justify-start gap-x-1 rounded-full px-4 py-2 outline-1"
          onClick={onClose}
        >
          <XMarkIcon className="text-text-gray size-6 stroke-2" />
          <p className="text-small text-text-gray font-bold">나가기</p>
        </button>
        {children}
      </div>
    </div>
  );
};
