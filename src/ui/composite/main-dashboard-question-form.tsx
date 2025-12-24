"use client";
import { QuoteType } from "@/lib/definition";
import React, { useState } from "react";
import { ModalBox } from "@/ui/atom/modal-box";
import { MainDashboardSolution } from "@/ui/composite/main-dashboard-solution";
import { MainDashboardBuilding } from "@/ui/composite/main-dashboard-building";
import { MainDashboardPhone } from "@/ui/composite/main-dashboard-phone";

export const MainDashboardQuestionForm = ({ isOpen, setIsOpen, refQuote }) => {
  const [quote, setQuote] = useState<QuoteType>(refQuote);

  // const { data: session } = useSession();

  // const phoneNumber = "010-4685-9699";
  //
  // useEffect(() => {
  //   if (session?.user) {
  //     setQuote((prev) => ({
  //       ...prev,
  //       email: session.user.email ?? "",
  //       name: session.user.name ?? "",
  //     }));
  //   }
  // }, [session]);

  return (
    <ModalBox onClose={() => setIsOpen(false)}>
      <form className="gray-500/50 flex w-full flex-col rounded-sm border-dotted sm:border-1 sm:shadow-xl">
        <div className="padding-outer flex flex-col gap-y-8 sm:gap-y-16">
          <MainDashboardSolution quote={quote} setQuote={setQuote} />
          <MainDashboardBuilding quote={quote} setQuote={setQuote} />
          <MainDashboardPhone quote={quote} setQuote={setQuote} />
        </div>
      </form>
    </ModalBox>
  );
};
