"use client";

import { useCallback, useEffect, useState } from "react";
import { useData } from "../context/DataContext";

import { MarketProps } from "../types/index";

import LandingPageCarousal from "../components/LandingPageCarousal";
import Markets from "../components/Markets";

const Home = () => {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const getMarkets = useCallback(async () => {
    var totalQuestions = await polymarket.methods
      .totalQuestions()
      .call({ from: account });
    var dataArray: MarketProps[] = [];
    for (var i = 0; i < totalQuestions; i++) {
      var data = await polymarket.methods.questions(i).call({ from: account });
      dataArray.push({
        id: data.id,
        title: data.question,
        imageHash: data.creatorImageHash,
        totalAmount: data.totalAmount,
        totalYes: data.totalYesAmount,
        totalNo: data.totalNoAmount,
      });
    }
    setMarkets(dataArray);
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarkets();
    });
  }, [loading]);

  return (
    <main className="background">
      <div>Featured Markets</div>
      {/* {markets.map((market) => ( */}
      <LandingPageCarousal markets={markets} />
      {/* ))} */}

      <Markets />
    </main>
  );
};

export default Home;
