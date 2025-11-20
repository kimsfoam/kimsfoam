import { FlexCenter } from "@/ui/atom/flex-box";
import { ContactQuestionForm } from "@/ui/composite/contact-question-form";

export const ContactQuestionContainer = () => {
  return (
    <FlexCenter className="relative w-full max-w-7xl">
      <div className="padding-outer flex w-full flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">
          킴스폼이 궁금한 점
        </h2>
        <p className="text-description text-text-gray">
          전화 연결 전 미리 준비해두시면 더 원활하게 상담을 진행하실 수
          있습니다.
        </p>
      </div>
      <div className="w-full max-xl:px-[clamp(1rem,2vw,4rem)]">
        <ContactQuestionForm />
      </div>
    </FlexCenter>
  );
};
