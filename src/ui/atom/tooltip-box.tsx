import React from "react";

export const TooltipBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`bg-brand-base-dark pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${className}`}
    >
      {children}
    </span>
  );
};
