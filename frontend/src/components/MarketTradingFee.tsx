import React from "react";

const MarketTradingFee = () => {
  return (
    <div className="flex items-center">
      <div className="tooltip" data-tip="Trading Fee">
        <div className="flex items-center">
          {/* <PercentIcon className="h-5 w-5" /> */}
        </div>
      </div>
      <span className="text-sm font-medium">{/* {question.tradingFee} */}</span>
    </div>
  );
};

export default MarketTradingFee;
