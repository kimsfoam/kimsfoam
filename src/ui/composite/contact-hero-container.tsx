"use client";

import { PhoneIcon } from "@heroicons/react/24/solid";
import { FlexCenter } from "@/ui/atom/flex-box";
import { useCallback, useState } from "react";

export const ContactHeroContainer = () => {
  const phoneNumber = "010-4685-9699";
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry|Mobile/i.test(
        navigator.userAgent,
      );

    if (isMobile) return; // 모바일: 전화 연결 유지

    // PC: 전화 연결 막고 복사
    e.preventDefault();
    navigator.clipboard.writeText(phoneNumber);

    // UI 표시
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative w-full py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">
          지금 바로 전화로 상담하세요
        </h2>

        <a
          href={`tel:${phoneNumber}`}
          onClick={handleClick}
          className="bg-background-gray hover:bg-background-black transition-ease my-4 flex w-full cursor-pointer flex-row justify-center gap-x-4 rounded-full p-4"
        >
          <FlexCenter className="text-text-black/80 flex flex-row items-center justify-center gap-x-2">
            <PhoneIcon className="size-6 sm:size-10" />
            <h2 className="font-bold">{phoneNumber}</h2>
          </FlexCenter>
        </a>

        <p className="text-description text-text-gray">
          매일 8시부터 22시까지 상담받으실 수 있어요.
        </p>
      </div>

      {/* 📌 복사 성공 UI */}
      {copied && (
        <div className="bg-brand-base animate-fade pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md">
          번호가 복사되었습니다
        </div>
      )}
    </section>
  );
};
