import { DashboardLogout } from "@/ui/composite/main-dashboard-logout";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
import { buildingEnum, solutionEnum } from "@/lib/definition";

export const MainDashboardContainer = () => {
  return (
    <section className="w-full pb-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 xl:items-center">
        <h2 className="text-text-black font-extrabold">
          신청한 단열 견적 확인하기
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
    <div className="bg-background-gray/50 outline-background-black mt-[clamp(0.5rem,0.5rem+2vw,2rem)] h-100 w-7xl max-w-full overflow-x-auto rounded-2xl outline-1">
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
    take: 20,
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
    <table className="relative w-full border-collapse">
      <thead className="bg-background-gray sticky top-0 overflow-hidden">
        <tr className="text-text-black/80 border-background-black text-small border-b-1 font-semibold">
          <th className="px-2 py-3">신청일</th>
          <th className="px-2 py-3">신청인</th>
          <th className="px-2 py-3">이메일</th>
          <th className="px-2 py-3">연락처</th>
          <th className="px-2 py-2">단열재</th>
          <th className="px-2 py-2">건물 유형</th>
          <th className="px-2 py-2">시공 면적</th>
          <th className="px-2 py-2">시공 두께</th>
        </tr>
      </thead>
      <tbody className="text-text-black text-small font-medium">
        {quotes.map((quote) => (
          <tr
            key={quote.id}
            className="border-background-black border-b-1 text-center"
          >
            <td className="px-2 py-3 whitespace-nowrap">
              {quote.createdAt.toISOString().slice(0, 10)}
            </td>
            <td className="px-2 py-3 whitespace-nowrap">{quote.name}</td>
            <td className="px-2 py-3 whitespace-nowrap">{quote.email}</td>
            <td className="px-2 py-3 whitespace-nowrap">{quote.phone}</td>
            <td className="px-2 py-3 whitespace-nowrap">
              {solutionEnum[quote.solutionType]}
            </td>
            <td className="px-2 py-3 whitespace-nowrap">
              {buildingEnum[quote.buildingType]}
            </td>
            <td className="px-2 py-3 whitespace-nowrap">{`${quote.area}m²`}</td>
            <td className="px-2 py-3 whitespace-nowrap">{`${quote.thickness}T`}</td>
            {/*<td className="px-2 py-3">{statusEnum[quote.status]}</td>*/}
            {/*<td className="px-2 py-3">*/}
            {/*  {quote.workAt ? quote.workAt.toISOString().slice(0, 10) : "-"}*/}
            {/*</td>*/}
            {/*<td className="px-2 py-3 text-center">*/}
            {/*  <MainDashboardButton refQuote={quote} />*/}
            {/*</td>*/}
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
