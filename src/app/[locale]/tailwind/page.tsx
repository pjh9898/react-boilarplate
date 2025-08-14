import React from "react";
import { CoinTable } from "@/tailwind/coinTable/components/CoinTable";

const TailwindCSS = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market</h1>
      <CoinTable />
    </div>
  );
};

export default TailwindCSS;
