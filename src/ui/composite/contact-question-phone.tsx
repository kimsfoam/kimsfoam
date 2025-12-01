import { QuoteType } from "@/lib/definition";
import React from "react";

export const ContactQuestionPhone = ({
  quote,
  setQuote,
}: {
  quote: QuoteType;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType>>;
}) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuote({ ...quote, email: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
    setQuote({ ...quote, phone: value });
  };

  return (
    <section className="flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:justify-between">
      <div className="flex w-full flex-col items-start justify-start gap-y-4 pb-4">
        <h3 className="text-text-black text-h2.5 font-serif font-semibold">
          <span className="text-text-white">(전송 시)</span> 답변 방법
        </h3>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-y-4">
        <label className="relative flex flex-row items-center justify-start gap-x-4 p-4">
          <h3 className="text-text-black flex-shrink-0 font-bold">이메일</h3>
          <input
            type="text"
            value={quote.email}
            onChange={handleEmailChange}
            placeholder="로그인해야 합니다"
            readOnly
            className="bg-background-gray text-text-gray transition-ease text-description w-full cursor-not-allowed appearance-none rounded-sm px-4 py-2 font-semibold shadow-sm outline-none"
          />
        </label>
        <label className="relative flex flex-row items-center justify-start gap-x-4 p-4">
          <h3 className="text-text-black flex-shrink-0 font-bold">휴대폰</h3>
          <input
            type="text"
            value={quote.phone}
            maxLength={13}
            onChange={handlePhoneChange}
            inputMode="tel"
            className="outline-background-black text-text-gray transition-ease text-description w-full appearance-none rounded-sm px-4 py-2 font-semibold outline-3"
          />
          <p className="text-description text-text-white font-bold">(선택)</p>
        </label>
      </div>
    </section>
  );
};
