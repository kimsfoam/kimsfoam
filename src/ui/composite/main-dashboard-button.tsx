"use client";

import { useState } from "react";
import { MainDashboardQuestionForm } from "@/ui/composite/main-dashboard-question-form";

export const MainDashboardButton = ({ refQuote }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-brand-base hover:bg-brand-base-dark rounded-full px-3 py-1 text-sm text-white transition"
        onClick={() => setIsOpen(true)}
      >
        상세보기
      </button>
      {isOpen && (
        <MainDashboardQuestionForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refQuote={refQuote}
        />
      )}
    </div>
  );
};
