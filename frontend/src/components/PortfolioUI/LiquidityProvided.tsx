"use client";
import React from "react";

const LiquidityProvided: React.FC = () => {
  return (
    <div className="flex flex-col dark:bg-transparent bg-white border dark:border light:border-gray-300 rounded-lg my-1 w-72 px-3 py-2">
      <div className="flex justify-center items-center w-10 h-10 bg-[#ECF6F0] rounded-full p-1 mr-10">
        {/* Insert AutoGraphIcon equivalent SVG here */}
      </div>
      <span className="text-gray-500 mt-1 text-xs">Liquidity Provided</span>
      <span className="text-blue-500 text-xl">$ 65140</span>
    </div>
  );
};

export default LiquidityProvided;
