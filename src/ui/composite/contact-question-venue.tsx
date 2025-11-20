import React from "react";

export const ContactQuestionVenue = () => {
  return (
    <section className="flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:justify-between">
      <div className="flex w-full flex-col items-start justify-start gap-y-4 pb-4">
        <h3 className="text-text-black text-h2.5 font-serif font-semibold">
          시공 지역과 일자
        </h3>
      </div>
      <div className="flex w-full flex-col items-start justify-start p-4">
        <h3 className="text-text-black font-bold">
          수도권은 물론 전국 어디든 거리 제약 없는 신속한 시공 서비스
        </h3>
        <p className="text-text-gray text-break-format text-description">
          *도서산간지역 별도 문의
        </p>
      </div>
    </section>
  );
};
