import { DashboardLogout } from "@/ui/composite/main-dashboard-logout";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { statusEnum } from "@/lib/definition";
import { authOptions } from "@/lib/authOptions";

export const MainDashboardContainer = () => {
  return (
    <section className="w-full pb-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-extrabold">
          · 신청한 단열 견적 확인하기 ·
        </h2>
        {/*<p className="text-small text-text-gray">*/}
        {/*  견적부터 시공까지 모든 진행 과정을 킴스폼과 함께하세요.*/}
        {/*</p>*/}
        <Dashboard />
      </div>
    </section>
  );
};

const Dashboard = () => {
  return (
    <div className="bg-background-gray/50 outline-background-black mt-[clamp(0.5rem,0.5rem+2vw,2rem)] h-100 w-7xl rounded-2xl outline-1">
      <DashboardInner />
    </div>
  );
};

export const DashboardInner = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return <DashboardLogout />;

  const isAdmin = session.user.role === "admin";
  const baseQuery = {
    orderBy: { createdAt: "desc" },
    take: 10,
  } as const;
  const quotes = await prisma.quote.findMany(
    isAdmin
      ? baseQuery
      : {
          ...baseQuery,
          where: { email: session.user.email },
        },
  );

  return (
    <table className="w-full border-collapse">
      <thead className="bg-background-black/50">
        <tr className="text-text-black/80 border-background-black text-small border-b-1 font-semibold">
          <th className="px-2 py-3">신청일</th>
          <th className="px-2 py-3">신청인</th>
          <th className="px-2 py-3">연락처</th>
          <th className="px-2 py-3">진행 상태</th>
          <th className="px-2 py-3">시공일</th>
          <th className="px-2 py-3">결제하기</th>
        </tr>
      </thead>
      <tbody className="text-text-black text-small font-medium">
        {quotes.map((quote) => (
          <tr
            key={quote.id}
            className="border-background-black border-b-1 text-center"
          >
            <td className="px-2 py-3">
              {quote.createdAt.toISOString().slice(0, 10)}
            </td>
            <td className="px-2 py-3">{quote.name}</td>
            <td className="px-2 py-3">{quote.phone}</td>
            <td className="px-2 py-3">{statusEnum[quote.status]}</td>
            <td className="px-2 py-3">
              {quote.workAt ? quote.workAt.toISOString().slice(0, 10) : "-"}
            </td>
            <td className="px-2 py-3 text-center">
              <button className="bg-brand-base hover:bg-brand-base-dark rounded-full px-3 py-1 text-sm text-white transition">
                결제
              </button>
            </td>
          </tr>
        ))}
        {quotes.length === 0 && (
          <tr>
            <td colSpan={6} className="text-text-gray py-4 text-center">
              아직 신청하신 견적이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
