import React from "react";

const CardHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="uppercase font-semibold text-[var(--gray-900-060)]">
      {children}
    </h1>
  );
};

export default CardHeading;
