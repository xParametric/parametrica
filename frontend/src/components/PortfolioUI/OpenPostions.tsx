"use client";
import React from "react";

const OpenPositions: React.FC = () => {
  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-lg my-1 w-72 px-3 py-2">
      <div className="flex justify-center items-center w-10 h-10 bg-[#EBF2FD] rounded-full p-1 mr-10">
        {/* Insert ShowChartIcon equivalent SVG here */}
      </div>
      <span className="text-gray-500 mt-1 text-xs">Open Positions</span>
      <span className="text-blue-500 text-xl">14</span>
    </div>
  );
};

export default OpenPositions;
