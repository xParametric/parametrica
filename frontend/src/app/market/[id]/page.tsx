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
          <div className="w-full pt-1">
            <div className="p-3 flex flex-col sm:flex-row items-center border border-gray-300 gap-2">
              <img
                className="w-14 h-14 rounded-full"
                src={imageUrl}
                alt="Market"
              />
              <div className="flex-1">
                <div className="text-xs text-gray-600 mt-2 sm:mt-0">Type</div>
                <div className="text-lg my-1">{market?.title}</div>
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
                          .toFixed()} POLY`
                      : "0 POLY"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="md:col-span-2">
                  <div className="p-2 flex items-center justify-center h-full">
                    <ChartContainer questionId={market?.id ?? "0"} />
                    <Separator orientation="vertical" className="mx-2" />
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="max-w-sm mx-auto shadow-lg border bg-white bg-opacity-5 rounded-md">
                    <div className="text-center p-4">Buy</div>
                    <div className="flex justify-around px-10">
                      {" "}
                      {["YES", "NO"].map((option) => (
                        <div
                          key={option}
                          className={`text-center px-4 p-2 m-1 rounded cursor-pointer ${
                            selected === option
                              ? "bg-[#5155a6] text-gray-700"
                              : "bg-white text-gray-800"
                          } hover:bg-opacity-70 transition duration-300`}
                          onClick={() => setSelected(option)}
                        >
                          {option} {calculatePercentage(option as "YES" | "NO")}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-center">How much?</div>
                    <div className="flex items-center  border divide-x divide-gray-300 mx-4  my-2">
                      <Input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="0"
                        className="flex-grow border-none p-1"
                      />
                      <Button
                        // className="px-4 py-1  bg-[#5155a6] hover:bg-[#5155a6]"
                        onClick={SetMaxValue}
                      >
                        Max
                      </Button>
                    </div>
                    <div className="m-4 p-2">
                      <Button
                        className="w-full "
                        onClick={handleTrade}
                        disabled={!input}
                      >
                        {selected === "YES" ? "Buy YES" : "Buy NO"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-4 border rounded-lg bg-white bg-opacity-5  ">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
