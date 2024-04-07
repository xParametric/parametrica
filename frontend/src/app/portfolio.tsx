"use client";
import { BigNumber } from "bignumber.js";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { PortfolioMarketCard } from "../components/PortfolioMarketCard";
import { useData } from "../context/DataContext";
import { MarketProps, QuestionsProps } from "../types/index";

const Portfolio = () => {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [allQuestions, setAllQuestions] = useState<QuestionsProps[]>([]);
  const [openPositions, setOpenPositions] = useState<number>(0);
  function toDecimalString(num: any) {
    const numStr = String(num);
    if (numStr.indexOf("e") === -1) return numStr;

    let [base, exponent] = numStr.split("e").map((item) => parseInt(item, 10));
    let result =
      Math.abs(exponent) > 20 ? num.toFixed(20) : base * Math.pow(10, exponent);
    return result.toString();
  }

  const safePortfolioValue = toDecimalString(portfolioValue);
  const getMarkets = useCallback(async () => {
    var totalQuestions = await polymarket.methods
      .totalQuestions()
      .call({ from: account });
    for (var i = 0; i < totalQuestions; i++) {
      var questions = await polymarket.methods
        .questions(i)
        .call({ from: account });
      allQuestions.push({
        id: questions.id,
        title: questions.question,
        imageHash: questions.creatorImageHash,
        totalAmount: questions.totalAmount,
        totalYes: questions.totalYesAmount,
        totalNo: questions.totalNoAmount,
        hasResolved: questions.eventCompleted,
        endTimestamp: questions.endTimestamp,
      });
    }

    var dataArray: MarketProps[] = [];
    var totalPortValue = 0;
    for (var i = 0; i < totalQuestions; i++) {
      var data = await polymarket.methods
        .getGraphData(i)
        .call({ from: account });
      data["0"].forEach((item: any) => {
        if (item[0] == account) {
          dataArray.push({
            id: i.toString(),
            userYes: item[1].toString(),
            timestamp: item[2].toString(),
          });
          totalPortValue += parseInt(item[1]);
        }
      });
      data["1"].forEach((item: any) => {
        if (item[0] == account) {
          dataArray.push({
            id: i.toString(),
            userNo: item[1].toString(),
            timestamp: item[2].toString(),
          });
          totalPortValue += parseInt(item[1]);
        }
      });
    }
    setPortfolioValue(totalPortValue);
    for (var i = 0; i < dataArray.length; i++) {
      var question = allQuestions.find((item) => item.id == dataArray[i].id);
      dataArray[i].title = question!.title;
      dataArray[i].imageHash = question!.imageHash;

      for (var i = 0; i < dataArray.length; i++) {
        var question = allQuestions.find((item) => item.id == dataArray[i].id);
        dataArray[i].title = question!.title;
        dataArray[i].imageHash = question!.imageHash;
        dataArray[i].hasResolved = question!.hasResolved;
        dataArray[i].endTimestamp = question!.endTimestamp;
        if (question) {
          dataArray[i].totalAmount = new BigNumber(question.totalAmount);
          dataArray[i].totalYes = new BigNumber(question.totalYes);
          dataArray[i].totalNo = new BigNumber(question.totalNo);
        }
      }
      dataArray[i].hasResolved = question!.hasResolved;
      dataArray[i].endTimestamp = question!.endTimestamp;
    }
    setMarkets(dataArray);
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) {
        getMarkets();
      }
    });
  }, [loading]);

  return (
    <div>
      <main>
        <div className="grid">
          <div className="pt-1 flex flex-col">
            <div className="p-4 bg-blue-700 rounded-lg flex justify-evenly">
              <div className="text-center">
                <div className=" opacity-50">Portfolio Value</div>
                <div className="text-3xl  font-bold">{safePortfolioValue} </div>
              </div>
            </div>
            <div className="text-xl my-3 font-bold">Your Market Positions</div>
            {markets.map((market) => (
              <PortfolioMarketCard
                id={market.id}
                title={market.title!}
                imageHash={market.imageHash!}
                totalAmount={market.totalAmount!}
                totalYes={market.totalYes!}
                totalNo={market.totalNo!}
                userYes={market.userYes!}
                userNo={market.userNo!}
                key={market.id!}
                hasResolved={market.hasResolved!}
                timestamp={market.timestamp!}
                endTimestamp={market.endTimestamp!}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
