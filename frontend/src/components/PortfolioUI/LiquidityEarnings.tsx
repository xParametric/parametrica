"use client";
import React from "react";

const LiquidityEarnings: React.FC = () => {
  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-lg my-1 w-72 px-3 py-2">
      <div className="flex justify-center items-center w-10 h-10 bg-[#FEF5ED] rounded-full p-1 mr-10">
        {/* Replace this <svg> with your chosen StackedLineChartIcon equivalent */}
        <svg
          className="w-6 h-6 text-black"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG content goes here */}
        </svg>
      </div>
      <span className="text-gray-500 mt-1 text-xs">Liquidity Earnings</span>
      <span className="text-blue-500 text-xl">$ 1650</span>
    </div>
  );
};

export default LiquidityEarnings;
