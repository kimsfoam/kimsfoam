"use client";

import { useState } from "react";
import { faqDatas } from "@/lib/data";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleQuestionClick = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }
    setOpenIndex(index);
  };

  return (
    <section className="w-full py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-extrabold">자주 묻는 질문</h2>
        <p className="text-small text-text-gray">FAQ</p>
        <FAQList />
      </div>
    </section>
  );
}

const FAQList = () => {
  const faqs = faqDatas;
  return (
    <div className="flex w-full max-w-6xl flex-col items-start justify-start">
      {faqs.map((faq) => (
        <FAQCard {...faq} />
      ))}
    </div>
  );
};

const FAQCard = ({ title, description }) => {
  return (
    <label className="group flex w-full flex-col items-start justify-start gap-y-2 border-b-1 border-gray-200 p-6">
      <input type="radio" name="question" className="peer sr-only hidden" />

      <h3 className="group-hover:text-gray-muted mr-8 flex w-full cursor-pointer flex-row justify-between text-left text-xl font-bold text-wrap break-keep whitespace-normal transition-all duration-250 ease-out select-none">
        {title}
      </h3>
      {/*<MinusIcon className="text-gray-light hidden h-6 w-6 flex-shrink-0 peer-checked:block" />*/}
      {/*<PlusIcon className="text-gray-light block h-6 w-6 flex-shrink-0 peer-checked:hidden" />*/}

      <p className="text-gray-dark/80 hidden pt-1 text-lg leading-6 text-wrap break-keep whitespace-pre-line transition-all duration-250 ease-out peer-checked:block">
        {description}
      </p>
    </label>
  );
};
