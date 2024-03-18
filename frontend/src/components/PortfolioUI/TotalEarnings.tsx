"use client";
import React from "react";

const TotalEarning: React.FC = () => {
  return (
    <div className="flex flex-col dark:bg-transparent bg-white border dark:border light:border-gray-300 rounded-lg my-1 w-72 px-3 py-2">
      <div className="flex justify-center items-center w-10 h-10 bg-[#F5EEFC] rounded-full p-1 mr-10">
        {/* Insert EqualizerIcon equivalent SVG here */}
      </div>
      <span className="text-gray-500 mt-1 text-xs">Volume Traded</span>
      <span className="text-blue-500 text-xl">$ 251724710</span>
    </div>
  );
};

export default TotalEarning;
