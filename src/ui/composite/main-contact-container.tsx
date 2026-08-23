import { BrandButtonBigProgress } from "@/ui/atom/brand-button";

export const MainContactContainer = () => {
  const link = {
    href: "/contact",
    title: "무료 견적 신청하기 →",
  };

  return (
    <section className="py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h1 className="text-text-black font-serif font-bold">
          단열이 필요한 공간이 있으신가요?
        </h1>
        <p className="text-small text-text-gray mb-8">
          오픈 기념 최대 10% 특별할인
        </p>
        <BrandButtonBigProgress href={link.href} title={link.title} />
      </div>
    </section>
  );
};
