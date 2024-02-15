import React from "react";
import TotalBalanceChart from "./TotalBalanceChart";

const PorfolioTotalBalance: React.FC = () => {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="border border-gray-300 shadow rounded-lg p-4 my-2 bg-[#F4F4F4]">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-2">
          <div className="text-blue-500">
            <span className="text-xs font-semibold">Portfolio Value</span>
            <div className="text-2xl font-semibold my-1">$4498650</div>
          </div>
          <div>
            <div className="bg-blue-500 inline-block rounded-md p-1">
              <div className="flex items-center">
                {/* Insert ArrowDropUpIcon equivalent SVG here */}
                <span className="text-white">+10200%</span>
              </div>
            </div>
          </div>
        </div>
        <TotalBalanceChart />
      </div>
    </div>
  );
};

export default PorfolioTotalBalance;
