import React from "react";

export const FlexCenter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export const FlexRight = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex w-full flex-row items-center justify-end ${className}`}
    >
      {children}
    </div>
  );
};
