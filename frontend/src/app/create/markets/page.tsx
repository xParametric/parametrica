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
            <button className="mb-2 inline-block bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-500 hover: focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded px-4 py-2 transition-colors duration-150 ease-in-out">
              ← Back to Creation
            </button>
          </Link>
        </div>
        <div className="  border-b-[#5155a6] border-b-4 inline-block text-3xl font-semibold  my-12 ">
          Resolve Markets
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {!loading && markets && markets.length !== 0 ? (
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
          ) : markets.length === 0 ? (
            <div className="flex justify-center items-center  col-span-3 w-full h-[50vh]">
              <svg
                aria-hidden="true"
                className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-[#5155a6]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-3">No markets available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Markets;
