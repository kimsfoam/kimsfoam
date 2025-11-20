import Image from "next/image";
import { BrandButtonProgress } from "@/ui/atom/brand-button";

export const Hero = () => {
  const link = {
    href: "/contact",
    title: "단열 견적 문의하기 →",
  };

  return (
    <section className="padding-outer relative w-full">
      <div className="relative flex h-[clamp(12rem,28vw,24rem)] w-full flex-col items-start justify-center gap-y-4 overflow-hidden rounded-2xl px-[clamp(2rem,4vw,16rem)] py-[clamp(1rem,2vw,16rem)] shadow-xl">
        <Image
          src="/banner/hero-wide.png"
          alt="hero"
          className="-z-3 object-cover brightness-80 filter backdrop-blur-3xl"
          fill
        />
        <h1 className="font-serif leading-none font-bold text-white">
          여름엔 시원하게, <br /> 겨울은 따뜻하게
        </h1>
        <p className="text-description text-white/80">
          우레탄폼 단열시공 전문업체입니다.
        </p>
        <BrandButtonProgress href={link.href} title={link.title} />
      </div>
    </section>
  );
};
