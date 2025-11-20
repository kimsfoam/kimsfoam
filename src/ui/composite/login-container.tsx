"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { TooltipBox } from "@/ui/atom/tooltip-box";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";

export const LoginContainer = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="group bg-background-gray transition-ease ring-brand-base-dark relative cursor-pointer rounded-full p-4 px-5 py-2 ring-2 ring-inset"
      >
        <div className="flex flex-row items-center justify-center gap-x-2">
          <UserCircleIcon className="text-brand-dark size-6 stroke-2" />
          <p className="text-brand-dark font-serif text-lg font-bold">로그인</p>
        </div>
        <TooltipBox>로그인하기</TooltipBox>
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="group bg-background-gray transition-ease ring-brand-base-dark relative cursor-pointer rounded-full p-4 px-5 py-2 ring-2 ring-inset"
    >
      <div className="flex flex-row items-center justify-center gap-x-2">
        <UserCircleIcon className="text-brand-dark size-6 stroke-2" />
        <p className="text-brand-dark font-serif text-lg font-bold">
          {session.user?.name}님
        </p>
        <ArrowRightStartOnRectangleIcon className="text-brand-dark transition-ease-slow size-0 origin-left -translate-x-1 stroke-2 group-hover:size-6 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>

      {/* hover tooltip */}
      <TooltipBox>로그아웃하기</TooltipBox>
    </button>
  );
};
