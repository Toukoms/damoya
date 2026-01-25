import React from "react";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-24 scroll-mt-24 lg:mt-32 lg:scroll-mt-32">
      {children}
    </div>
  );
}
