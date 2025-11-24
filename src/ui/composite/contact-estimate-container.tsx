import { TicketIcon } from "@heroicons/react/24/solid";
import { SolutionDatas } from "@/lib/data";
import { SolutionType } from "@/lib/definition";
import clsx from "clsx";

export const ContactEstimateContainer = () => {
  return (
    <section className="w-full py-16">
      <div className="padding-outer item-start flex flex-col justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">
          예상 단가 확인하기
        </h2>
        <EstimateList />
        <p className="text-small text-text-gray">
          시공 환경 및 여건에 따라 최종 견적은 조정될 수 있습니다.
        </p>
      </div>
    </section>
  );
};

const EstimateList = () => {
  const solutions = SolutionDatas;

  return (
    <div className="flex w-full flex-col flex-wrap items-start justify-center gap-4 p-4 lg:flex-row">
      <EstimateCard {...solutions[0]} />
      <EstimateCard {...solutions[1]} />
      <EstimateCard {...solutions[2]} />
      <EstimateCard {...solutions[3]} />
    </div>
  );
};

const EstimateCard = ({
  title,
  description,
  isMost,
  discount_percent,
  price,
}: SolutionType) => {
  return (
    <div
      className={`card-gray transition-ease flex w-full flex-1 flex-col items-start justify-start rounded-2xl p-6 lg:max-w-80`}
    >
      <div className="flex flex-row items-center justify-start gap-x-1">
        <h3 className="mb-1 text-2xl font-bold">{title}</h3>
        {isMost && (
          <div className="relative -top-0.5 flex flex-row items-center justify-center gap-1 rounded-full bg-green-300/50 p-1.5 py-0.5 pr-2 text-gray-600">
            <span className="text-sm">인기</span>
          </div>
        )}
      </div>

      <p className="text-text-gray text-break min-h-12 text-base">
        {description}
      </p>

      <div className="mt-6 flex flex-row items-center justify-start gap-x-1 px-1 py-0.5 text-sm text-red-600">
        <TicketIcon className="size-5" />
        <p className="text-base">{`약 ${discount_percent}% 할인`}</p>
      </div>
      <p className="text-text-black items-baseline font-bold">
        <span className="text-4xl">
          ~
          <span className="text-text-white/80 text-4xl line-through decoration-red-500 decoration-3">
            {price}
          </span>
          {`${price - 20}`}
        </span>
        <span className="text-text-black/90 relative -top-0.25 pl-0.5 text-2xl">
          원
        </span>
        <span className="text-text-white relative -top-0.25 text-base">
          {" "}
          / m²
        </span>
      </p>
    </div>
  );
};
