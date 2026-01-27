import React from "react";
import { cn } from "../lib";

export function MainWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-16 mb-8 scroll-mt-16 md:mt-24 md:scroll-mt-24 lg:mt-32 lg:mb-16 lg:scroll-mt-32",
        className,
      )}
    >
      {children}
    </div>
  );
}
