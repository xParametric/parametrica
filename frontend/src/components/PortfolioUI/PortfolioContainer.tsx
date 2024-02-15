import React from "react";
import TotalEarnings from "./TotalEarnings";
import OpenPositions from "./OpenPostions";
import LiquidityEarnings from "./LiquidityEarnings";
import LiquidityProvided from "./LiquidityProvided";
import PorfolioTotalBalance from "./PorfolioTotalBalance";

const PortfolioContainer = () => {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="flex justify-around">
        <div>
          <TotalEarnings />
        </div>
        <div>
          <OpenPositions />
        </div>
        <div>
          <LiquidityProvided />
        </div>
        <div>
          <LiquidityEarnings />
        </div>
      </div>
      <div className="flex px-1">
        <PorfolioTotalBalance />
      </div>
    </div>
  );
};

export default PortfolioContainer;
