import React from "react";

export const FloatingBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`fixed z-9 ${className}`}>{children}</div>;
};
