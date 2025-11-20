import { SolutionDatas } from "@/lib/data";
import { QuoteType } from "@/lib/definition";
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const Solution = ({
  quote,
  setQuote,
}: {
  quote: QuoteType;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType>>;
}) => {
  return (
    <section className="flex w-full max-w-7xl flex-col lg:flex-row lg:items-start lg:justify-between">
      <div className="flex w-full flex-col items-start justify-start gap-y-4 pb-4">
        <h3 className="text-text-black text-h2.5 font-serif font-semibold">
          용도에 적합한 최적의 단열재
        </h3>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-y-4">
        <SolutionCard quote={quote} setQuote={setQuote} id={0} />
        <SolutionCard quote={quote} setQuote={setQuote} id={1} />
        <SolutionCard quote={quote} setQuote={setQuote} id={2} />
        <SolutionCard quote={quote} setQuote={setQuote} id={3} />
      </div>
    </section>
  );
};

const SolutionCard = ({
  quote,
  setQuote,
  id,
}: {
  quote: QuoteType;
  setQuote: React.Dispatch<React.SetStateAction<QuoteType>>;
  id: number;
}) => {
  const solution = SolutionDatas[id];

  return (
    <label className="group has-checked:bg-brand-blue/8 transition-ease relative flex w-full cursor-pointer flex-col gap-y-0.5 rounded-2xl p-4">
      <h3 className="text-text-black font-bold">{solution.title}</h3>
      <p className="text-text-gray text-break-format text-description">
        {solution.description}
      </p>
      <div className="flex flex-row gap-x-1">
        {solution.place.map((item, index) => (
          <p
            className="text-text-white bg-background-black text-light rounded-sm px-2 text-left text-lg"
            key={index}
          >{`#${item}`}</p>
        ))}
      </div>
      <input
        type="radio"
        name="solutionType"
        className="peer sr-only hidden"
        checked={id === quote.solutionType}
        onChange={() => setQuote({ ...quote, solutionType: id })}
      />
      <CheckCircleIcon className="text-text-gray/30 peer-checked:text-brand-blue absolute top-1/2 right-4 size-6 -translate-y-1/2" />
    </label>
  );
};
