"use client";

import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { AdminMarketCard } from "../../../components/AdminMarketCard";
import { useData } from "../../../context/DataContext";
import { MarketProps } from "../../../types/index";

const Markets: React.FC = () => {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const getMarkets = useCallback(async () => {
    const totalQuestions = await polymarket.methods
      .totalQuestions()
      .call({ from: account });
    const dataArray: MarketProps[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const data = await polymarket.methods
        .questions(i)
        .call({ from: account });
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

  return (
    <>
      <Head>
        <title>Polymarket - Markets</title>
        <meta name="description" content="Browse and manage your markets." />
      </Head>
      <div className="max-w-5xl mx-auto p-4">
        <div className="mb-4 text-left">
          <Link href="/create" passHref>
            <button className="mb-2 inline-block bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded px-4 py-2 transition-colors duration-150 ease-in-out">
              ← Back to Creation
            </button>
          </Link>
        </div>
        <h4 className="mb-3 text-2xl font-semibold text-black">
          Resolve Markets
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {markets ? (
            markets.map((market) => (
              <div className="col-span-1" key={market.id}>
                <AdminMarketCard
                  id={market.id}
                  imageHash={market?.imageHash}
                  title={market?.title}
                  totalAmount={market?.totalAmount?.toString()}
                  onYes={async () => {
                    await polymarket.methods
                      .distributeWinningAmount(market.id, true)
                      .send({ from: account });
                  }}
                  onNo={async () => {
                    await polymarket.methods
                      .distributeWinningAmount(market.id, false)
                      .send({ from: account });
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-xl mb-3">No markets available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Markets;
