"use client";

import { useState } from "react";
import { QuoteType } from "@/lib/definition";

export const MainDashboardView = ({ isOpen, setIsOpen, refQuote }) => {
  const [quote, setQuote] = useState<QuoteType>(refQuote);

  return <div>Main Dashboard</div>;
};
