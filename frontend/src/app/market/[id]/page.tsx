"use client";

import BigNumber from "bignumber.js";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import ChartContainer from "../../../components/Chart/ChartContainer";

import { useData } from "../../../context/DataContext";

import { MarketProps } from "../../../types/index";
import { convertToLocalTime } from "../../../lib/DateTimeFormatter";
import { useTokenBalance } from "../../hooks/getBalance";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Details = () => {
  const { id } = useParams();
  const tokenAddress = "0x71728cD356A0C7a52eF4b0Fc1bcDC540546D84CD";
  const { data: ParaToken, isLoading, error } = useTokenBalance(tokenAddress);

  console.log("ParaTokenObject", ParaToken);

  const { polymarket, account, loadWeb3, loading, polyToken } = useData();
  const [market, setMarket] = useState<MarketProps>();
  const [selected, setSelected] = useState<string>("YES");
  const [dataLoading, setDataLoading] = useState(true);
  const [button, setButton] = useState<string>("Trade");

  const [input, setInput] = useState("");

  const getMarketData = useCallback(async () => {
    try {
      const data = await polymarket.methods
        .questions(id)
        .call({ from: account });

      const marketData = {
        id: data.id,
        title: data.question,
        imageHash: data.creatorImageHash,
        totalAmount: new BigNumber(data?.totalAmount || 0),
        totalYes: new BigNumber(data?.totalYesAmount || 0),
        totalNo: new BigNumber(data?.totalNoAmount || 0),
        description: data?.description || "",
        endTimestamp: data?.endTimestamp ? data.endTimestamp.toString() : "0",

        resolverUrl: data?.resolverUrl || "",
      };
      console.log("marketData", marketData);
      setMarket(marketData);
      setDataLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setDataLoading(false);
    }
  }, [account, id, polymarket]);
  const handleTrade = async () => {
    try {
      var bal = await polyToken.methods.balanceOf(account).call();
      setButton("Please wait");
      toast.loading("Processing trade...");

      if (input && selected === "YES") {
        if (parseInt(input) < parseInt(Web3.utils.fromWei(bal, "ether"))) {
          await polyToken.methods
            .approve(polymarket._address, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          await polymarket.methods
            .addYesBet(id, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          toast.success("Trade successful!");
        } else {
          toast.error("Insufficient balance for this trade.");
        }
      } else if (input && selected === "NO") {
        if (parseInt(input) < parseInt(Web3.utils.fromWei(bal, "ether"))) {
          await polyToken.methods
            .approve(polymarket._address, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          await polymarket.methods
            .addNoBet(id, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          toast.success("Trade successful!");
        } else {
          toast.error("Insufficient balance for this trade.");
        }
      } else {
        toast.error("Please enter a valid amount and select an option.");
      }
    } catch (error) {
      console.error("Trade error:", error);
      toast.error("Trade failed. Please try again.");
    } finally {
      await getMarketData();
      setButton("Trade");
      toast.dismiss();
    }
  };
  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarketData();
    });
  }, [loading]);
  console.log(polyToken, "polyToken");

  const imageHash = market?.imageHash;
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";

  const formattedImageHash = imageHash ? imageHash.replace("ipfs://", "") : "";

  const imageUrl = formattedImageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  const SetMaxValue = () => {
    if (ParaToken && ParaToken.displayValue) {
      const totalBalance = Number(ParaToken.displayValue);
      const bufferForFees = 0.0001;

      const maxUsableAmount = totalBalance - bufferForFees;
      setInput(maxUsableAmount.toFixed(4));
    }
  };

  const calculatePercentage = (option: "YES" | "NO") => {
    if (!market) return "0%";

    const totalAmount = new BigNumber(market.totalAmount || 0);
    const optionAmount = new BigNumber(
      option === "YES" ? market.totalYes || 0 : market.totalNo || 0
    );

    return totalAmount.isZero()
      ? "0%"
      : `${optionAmount.dividedBy(totalAmount).times(100).toFixed(2)}%`;
  };

  return (
    <div>
      <Head>
        <title>xParametric</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-4 max-w-screen-xl">
        {dataLoading ? (
          <div className="flex flex-col justify-center items-center h-full w-full pt-10">
            <div className="text-center">
              <div className="text-2xl font-bold">Loading...</div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="p-3 flex flex-col sm:flex-row items-center border my-5 rounded bg-white bg-opacity-5 gap-2">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full"
                src={imageUrl}
                alt="Market"
              />
              <div className="flex flex-col">
                {" "}
                <div className="flex flex-col  text-center sm:text-left">
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-0">
                    Question
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl my-1">
                    {market?.title}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  <div className="p-2">
                    <div className="text-xs text-gray-600">Market End on</div>
                    <div>
                      {market?.endTimestamp
                        ? convertToLocalTime(market.endTimestamp)
                        : "N/A"}
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-gray-600">Total Volume</div>
                    <div>
                      {market?.totalAmount
                        ? `${new BigNumber(market.totalAmount)
                            .dividedBy(new BigNumber(10).pow(18))
                            .toFixed()} PARA`
                        : "0 PARA"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex space-x-4">
              <ChartContainer questionId={market?.id ?? "0"} />
              <div className="w-full max-w-md mx-auto px-4 py-6 border bg-white bg-opacity-5 rounded space-y-4">
                <div className="text-center text-xl font-medium border-b-[#5155a6] border-b ">
                  Buy
                </div>
                <div className="flex justify-between">
                  {["YES", "NO"].map((option) => (
                    <div
                      key={option}
                      className={`text-center px-14 py-3 border  m-1 rounded cursor-pointer ${
                        selected === option
                          ? "bg-[#5155a6] text-gray-200"
                          : "bg-white text-gray-800"
                      } hover:bg-opacity-70 transition duration-300`}
                      onClick={() => setSelected(option)}
                    >
                      {option} {calculatePercentage(option as "YES" | "NO")}
                    </div>
                  ))}
                </div>
                <div className="text-center font-medium">How much?</div>
                <div className="flex justify-end">
                  <button
                    className="px-2 py-1 text-xs text-gray-50 uppercase rounded bg-[#5155a6] dark:hover:text-[#e6e0e0] transition duration-300"
                    onClick={SetMaxValue}
                  >
                    max
                  </button>
                </div>{" "}
                <div className="space-x-4 flex items-center p-2 rounded border  ">
                  <Button
                    className="px-4 py-2 hover:bg-opacity-90 hover:bg-transparent text-[#5155a6] bg-transparent border  dark:hover:text-[#393b70] transition duration-300"
                    onClick={() =>
                      setInput((prev) =>
                        Math.max(0, Number(prev) - 10).toString()
                      )
                    }
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="0"
                    className="flex-grow rounded border-none  text-center"
                  />
                  <Button
                    className="px-4  py-2 hover:bg-opacity-90 hover:bg-transparent text-[#5155a6] bg-transparent border  dark:hover:text-[#393b70] transition duration-300"
                    onClick={() =>
                      setInput((prev) => (Number(prev) + 10).toString())
                    }
                  >
                    +
                  </Button>
                </div>
                <div>
                  <Button
                    className={`w-full py-2 rounded ${
                      !input
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#5155a6] text-white hover:bg-[#393b70] transition duration-300"
                    }`}
                    onClick={handleTrade}
                    disabled={!input}
                  >
                    {selected === "YES" ? "Buy YES" : "Buy NO"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="my-5 p-4 border rounded bg-white bg-opacity-5">
              <div className="font-bold my-1">Description</div>
              <div className="mb-2 capitalize">{market?.description}</div>
              <div className="font-bold my-1">Resolution Source:</div>
              <a
                href={market?.resolverUrl}
                className="underline hover:text-[#5155a6] transition duration-300"
              >
                {market?.resolverUrl}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
