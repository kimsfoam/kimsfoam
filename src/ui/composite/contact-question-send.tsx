"use client";
import React from "react";
import { ModalBox } from "@/ui/atom/modal-box";
import Link from "next/link";

export const ContactQuestionSend = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ModalBox
      onClose={() => setIsOpen(false)}
      className="overflow-hidden rounded-xl"
    >
      <div className="bg-background-gray flex flex-col items-center justify-center gap-y-4 rounded-xl p-8">
        <h3 className="text-text-black font-bold">견적을 받았습니다.</h3>
        <p className="text-small text-text-gray">
          킴스폼이 확인 후 최대한 빠르게 연락드리겠습니다.
        </p>
        <Link href={"/home"} className="text-text-gray text-small underline">
          신청한 견적 확인하러 가기 →
        </Link>
      </div>
    </ModalBox>
  );
};
