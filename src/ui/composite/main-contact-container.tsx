import AnimatedCounter from "@/ui/atom/animated-counter";
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
          킴스폼의 첫{" "}
          <AnimatedCounter start={0} target={100} minStep={10} maxStep={30} />
          명의 고객이 되세요
        </h1>
        <p className="text-small text-text-gray mb-8">
          오픈 기념 최대 10% 특별할인
        </p>
        <BrandButtonBigProgress href={link.href} title={link.title} />
      </div>
    </section>
  );
};
