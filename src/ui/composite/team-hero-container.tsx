"use client";
import Image from "next/image";
import { BrandButtonProgress } from "@/ui/atom/brand-button";
import { motion } from "framer-motion";

export const TeamHeroContainer = () => {
  return (
    <section className="transition-ease relative w-full">
      <div className="relative flex h-[clamp(12rem,28vw,28rem)] w-full flex-col items-center justify-center gap-y-4 overflow-hidden shadow-xl">
        <Image
          src="/banner/hero-wide.png"
          alt="hero"
          className="-z-3 object-cover brightness-50 filter backdrop-blur-3xl"
          fill
        />
        <h1 className="font-sans font-bold text-white">킴스폼</h1>
      </div>
    </section>
  );
};
