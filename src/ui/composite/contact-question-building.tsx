import { buildingEnum, QuoteType } from "@/lib/definition";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const ContactQuestionBuilding = ({
  quote,
  setQuote,
}: {
  quote: QuoteType;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType>>;
}) => {
  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    setQuote({ ...quote, area: value });
  };

  const thicknessLabel = {
    50: "경량 및 보조 단열. 틈새 충진용",
    100: "일반 주거용. 외벽·천장 단열에 적합",
    150: "일반 주거용 및 사무실 단열. 중간 수준의 단열 성능",
    200: "고단열 요구 건축. 냉동·냉장 시설에 적합",
    250: "산업용 건물. 외부 온도 차가 큰 환경에 적합",
    300: "최고 수준의 단열 성능. 에너지 효율 극대화 및 장기 비용 절감",
  };

  type Thickness = keyof typeof thicknessLabel;

  return (
    <section className="flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:justify-between">
      <div className="flex w-full flex-col items-start justify-start gap-y-4 pb-4">
        <h3 className="text-text-black text-h2.5 font-serif font-semibold">
          시공 건물, 면적과 두께
        </h3>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-y-4">
        <label className="relative flex flex-row items-center justify-start gap-x-4 p-4">
          <h3 className="text-text-black font-bold">시공 건물 유형</h3>
          <select
            value={quote.buildingType}
            onChange={(e) =>
              setQuote({ ...quote, buildingType: Number(e.target.value) })
            }
            className="outline-background-black text-text-gray transition-ease text-description cursor-pointer appearance-none rounded-sm px-4 py-2 pr-16 font-semibold outline-3"
          >
            {buildingEnum.map((building, index) => (
              <option key={index} value={index}>
                {building}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="text-text-white absolute top-1/2 right-7 size-6 -translate-y-1/2 stroke-2" />
        </label>
        <label className="relative flex flex-row items-center justify-start gap-x-4 p-4">
          <h3 className="text-text-black flex-shrink-0 font-bold">
            예상 시공 면적
          </h3>
          <input
            type="text"
            value={quote.area}
            onChange={handleAreaChange}
            className="outline-background-black text-text-gray transition-ease text-description w-30 appearance-none rounded-sm px-4 py-2 font-semibold outline-3"
          />
          <p className="text-description font-bold">m²</p>
        </label>
        <label className="relative flex w-full flex-col items-start justify-start gap-y-4 p-4">
          <h3 className="text-text-black flex-shrink-0 font-bold">
            시공 두께(50T~300T)
          </h3>
          <input
            type="range"
            name="thickness"
            min={50}
            max={300}
            step={50}
            value={quote.thickness}
            onChange={(e) =>
              setQuote({ ...quote, thickness: Number(e.target.value) })
            }
            className="w-full cursor-pointer"
          />
          <p className="text-text-gray text-lg">
            <span className="font-semibold">{quote.thickness}T </span>
            {thicknessLabel[quote.thickness as Thickness]}
          </p>
        </label>
      </div>
    </section>
  );
};
