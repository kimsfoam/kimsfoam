import { FlexCenter } from "@/ui/atom/flex-box";
import { ContactQuestionForm } from "@/ui/composite/contact-question-form";

export const ContactQuestionContainer = () => {
  return (
    <FlexCenter className="relative w-full max-w-7xl gap-y-8">
      <div className="padding-outer flex w-full flex-col items-start justify-start gap-y-2 sm:items-center sm:text-center">
        <h2 className="text-text-black font-serif font-bold">
          1분 무료 견적 문의
        </h2>
        <p className="text-description text-text-gray">
          아는 내용만 간단히 선택해 주세요. 확인 후 담당자가 직접 연락드립니다.
        </p>
      </div>
      <div className="w-full px-[clamp(1rem,2vw,4rem)]">
        <ContactQuestionForm />
      </div>
    </FlexCenter>
  );
};
