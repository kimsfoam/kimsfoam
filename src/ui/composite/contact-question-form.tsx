"use client";
import { Solution } from "@/ui/composite/contact-question-solution";
import { QuoteType } from "@/lib/definition";
import React, { useEffect, useState } from "react";
import { ContactQuestionBuilding } from "@/ui/composite/contact-question-building";
import { ContactQuestionVenue } from "@/ui/composite/contact-question-venue";
import { useSession } from "next-auth/react";
import { ContactQuestionPhone } from "@/ui/composite/contact-question-phone";
import { submitQuote } from "@/lib/quote";

export const ContactQuestionForm = () => {
  const { data: session } = useSession();

  const phoneNumber = "010-4685-9699";

  const [quote, setQuote] = useState<QuoteType>({
    email: session?.user.email ?? "",
    name: session?.user.name ?? "",
    phone: "",
    status: 0,
    createdAt: null,
    workAt: null,
    price: 0,
    thickness: 100,
    solutionType: 0,
    buildingType: 0,
    area: 100,
  });

  useEffect(() => {
    if (session?.user) {
      setQuote((prev) => ({
        ...prev,
        email: session.user.email ?? "",
        name: session.user.name ?? "",
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        email: quote.email,
        name: quote.name,
        phone: quote.phone || null,
        status: quote.status,
        createdAt: quote.createdAt || new Date(),
        workAt: quote.workAt || null,
        price: quote.price,
        thickness: quote.thickness,
        solutionType: quote.solutionType,
        buildingType: quote.buildingType,
        area: quote.area,
      };

      const result = await submitQuote(payload);
      console.log("Quote submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
  };

  return (
    <form
      className="gray-500/50 flex w-full flex-col rounded-sm border-dotted sm:border-1 sm:shadow-xl"
      onSubmit={handleSubmit}
    >
      <div className="padding-outer flex flex-col gap-y-8 sm:gap-y-16">
        <Solution quote={quote} setQuote={setQuote} />
        <ContactQuestionBuilding quote={quote} setQuote={setQuote} />
        <ContactQuestionVenue />
        <ContactQuestionPhone quote={quote} setQuote={setQuote} />
      </div>
      <div className="padding-outer sm:bg-background-gray/70 relative flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
        {session ? (
          <button
            onClick={handleSubmit}
            className="button-brand transition-ease relative flex h-30 w-full cursor-pointer flex-col items-center justify-center rounded-full p-4"
          >
            <h3 className="text-text-black font-serif font-bold">
              견적 전송하기
            </h3>
            <p className="text-description text-text-black/80">
              킴스폼이 확인 후 곧 답변드립니다
            </p>
          </button>
        ) : (
          <button
            disabled
            className="button-brand transition-ease relative flex h-30 w-full cursor-not-allowed flex-col items-center justify-center rounded-full p-4"
          >
            <h3 className="text-text-black font-serif font-bold">
              견적 전송하기
            </h3>
            <p className="text-description text-brand-red/80 font-semibold">
              <span className="font-bold">로그인</span>해야 합니다
            </p>
          </button>
        )}

        <a
          href={`tel:${phoneNumber}`}
          className="button-gray transition-ease outline-background-black flex h-30 w-full cursor-pointer flex-col items-center justify-center rounded-full p-4 text-white outline-3 sm:flex-col"
        >
          <h3 className="text-text-black font-serif font-bold">
            전화 연결하기
          </h3>
          <p className="text-description text-text-black/80">010-4685-9699</p>
        </a>
      </div>
    </form>
  );
};
