"use client";

import { FlexCenter } from "@/ui/atom/flex-box";
import { signIn, useSession } from "next-auth/react";

export const DashboardLogout = () => {
  const { data: session, status } = useSession();

  if (!session)
    return (
      <FlexCenter className="h-full flex-row gap-x-2">
        {/*<LoginContainer />*/}
        <p className="text-text-gray text-lg font-semibold">
          <button onClick={() => signIn("google")} className="cursor-pointer">
            <span className="underline underline-offset-4">로그인</span>
          </button>
          하고 신청한 프로젝트의 진행 상황을 확인하세요
        </p>
      </FlexCenter>
    );
};
