import React from "react";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 mb-8 scroll-mt-16 md:mt-24 md:scroll-mt-24 lg:mt-32 lg:mb-16 lg:scroll-mt-32">
      {children}
    </div>
  );
}
