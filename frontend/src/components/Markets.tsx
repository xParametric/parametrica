"use client";
import React from "react";

import { useCallback, useEffect, useState } from "react";
import { MarketCard } from "../components/MarketCard";

import { useData } from "../context/DataContext";

import { MarketProps } from "../types/index";

import { Filter } from "./Filter";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function Markets() {
  // const router = useRouter();
  // const path = router.prefetch("markets");
  // console.log(path);

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
    console.log(dataArray, "dataArray");
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarkets();
    });
  }, [loading]);

  const router = useRouter();
  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="mb-8 flex items-center gap-8">
        {/* <SearchIcon className="text-gray-400" /> */}
        <input
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-[#bdff00] focus:outline-none transition duration-300 ease-in-out"
          type="search"
          name="q"
          placeholder="Search markets..."
        />
      </div>

      <div className="flex justify-between mb-12">
        {/* Replace <Filter /> with your component or implementation */}
        <Filter
          list={["All", "Crypto", "Football", "Covid 19", "Politics"]}
          activeItem="All"
          category="Category"
          onChange={() => {}}
        />
        <Filter
          list={["Volume", "Newest", "Expiring"]}
          activeItem="Volume"
          category="Sort By"
          onChange={() => {}}
        />
      </div>

      {/* Uncomment for heading
    <h2 className="mb-4 text-2xl font-semibold">
      Markets
    </h2>
    */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
        {markets.length === 0 ? (
          <div className="flex justify-center items-center w-full h-[50vh]">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
              viewBox="0 0 24 24"
            >
              {/* Spinner Icon */}
            </svg>
          </div>
        ) : (
          markets.map((market) => (
            <div key={market.id} className="col-span-1">
              {/* Replace <MarketCard /> with your component */}
              <MarketCard
                id={market.id}
                key={market.id}
                title={market?.title}
                totalAmount={market?.totalAmount}
                totalYes={market?.totalYes}
                totalNo={market?.totalNo}
                imageHash={market?.imageHash}
                userNo="0"
                userYes="0"
                timestamp="0"
                endTimestamp="0"
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center w-full">
        <Button onClick={() => router.push("/markets")}>View All</Button>
      </div>
    </div>
  );
}

export default Markets;
