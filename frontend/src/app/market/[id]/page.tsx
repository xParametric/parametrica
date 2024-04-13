"use client";
import BigNumber from "bignumber.js";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import ChartContainer from "../../../components/Chart/ChartContainer";
import { useData } from "../../../context/DataContext";
import { convertToLocalTime } from "../../../lib/DateTimeFormatter";
import { useTokenBalance } from "../../hooks/getBalance";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Details = () => {
  const { id } = useParams();
  const tokenAddress = "0xb2200E06c83F3872e89AaA98A7d5cd439c7ebd94"; // ParaToken Address
  const { data: ParaToken, isLoading, error } = useTokenBalance(tokenAddress);
  const {
    polymarket,
    account,
    loadWeb3,
    loading,
    polyToken,
    calculatePercentage,
    market,
    setMarket,
  } = useData();
  // const [market, setMarket] = useState<MarketProps>();
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
    let loadingToastId;

    try {
      const balInWei = await polyToken.methods.balanceOf(account).call();
      const inputInWei = Web3.utils.toWei(input, "ether");

      setButton("Please wait");

      loadingToastId = toast.loading("Processing trade...");

      if (input && selected === "YES") {
        if (BigInt(inputInWei) <= BigInt(balInWei)) {
          await polyToken.methods
            .approve(polymarket._address, inputInWei)
            .send({ from: account });

          await polymarket.methods
            .addYesBet(id, inputInWei)
            .send({ from: account });

          toast.dismiss(loadingToastId);
          toast.success("Trade successful!", { duration: 5000 });
        } else {
          toast.dismiss(loadingToastId);
          toast.error("Insufficient balance for this trade.", {
            duration: 5000,
          });
        }
      } else if (input && selected === "NO") {
        if (BigInt(inputInWei) <= BigInt(balInWei)) {
          await polyToken.methods
            .approve(polymarket._address, inputInWei)
            .send({ from: account });

          await polymarket.methods
            .addNoBet(id, inputInWei)
            .send({ from: account });

          toast.dismiss(loadingToastId);
          toast.success("Trade successful!", { duration: 5000 });
        } else {
          toast.dismiss(loadingToastId);
          toast.error("Insufficient balance for this trade.", {
            duration: 5000,
          });
        }
      } else {
        toast.dismiss(loadingToastId);
        toast.error("Please enter a valid amount and select an option.", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Trade error:", error);
      toast.dismiss(loadingToastId);
      toast.error("Trade failed. Please try again.", { duration: 5000 });
    } finally {
      await getMarketData();
      setButton("Trade");
    }
  };

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarketData();
    });
  }, [loading]);
  console.log(polyToken, "polyToken");

  // const calculatePercentage = (option: "YES" | "NO") => {
  //   if (!market) return "0%";

  //   const totalAmount = new BigNumber(market.totalAmount || 0);
  //   const optionAmount = new BigNumber(
  //     option === "YES" ? market.totalYes || 0 : market.totalNo || 0
  //   );

  //   return totalAmount.isZero()
  //     ? "0%"
  //     : `${optionAmount.dividedBy(totalAmount).times(100).toFixed(2)}%`;
  // };

  const imageHash = market?.imageHash;
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";

  const formattedImageHash = imageHash ? imageHash.replace("ipfs://", "") : "";

  const imageUrl = formattedImageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  const SetMaxValue = () => {
    if (ParaToken && ParaToken.displayValue) {
      const totalBalance = Number(ParaToken.displayValue);

      const maxUsableAmount = totalBalance;
      setInput(maxUsableAmount.toFixed(4));
    }
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
                className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-24 xl:h-24 rounded-full"
                src={imageUrl}
                alt="Market"
              />
              <div className="flex flex-col">
                <div className="flex px-2 flex-col text-center sm:text-left">
                  <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 sm:mt-0 ">
                    Question
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl  my-1 capitalize">
                    {market?.title}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  <div className="p-2">
                    <div className="text-xs text-gray-600">Market Ends on</div>
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
                        ? `$${new BigNumber(market.totalAmount)
                            .dividedBy(new BigNumber(10).pow(18))
                            .toFixed()} `
                        : "$0"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex space-x-4">
              <ChartContainer questionId={market?.id ?? "0"} />
              <div className="w-full max-w-md mx-auto px-4 py-6 border bg-white bg-opacity-5 rounded space-y-4">
                <div className="text-center text-xl font-medium ">
                  Select Outcome
                </div>
                <Separator orientation="horizontal" />
                <div className="flex justify-between">
                  {["YES", "NO"].map((option) => (
                    <div
                      key={option}
                      className={`text-center px-14 py-3 border m-1 rounded cursor-pointer ${
                        selected === option
                          ? "bg-[#5155a6] text-gray-200"
                          : "bg-white text-gray-800"
                      } hover:bg-opacity-70 transition duration-300`}
                      onClick={() => setSelected(option)}
                    >
                      {option}{" "}
                      {market &&
                        calculatePercentage(
                          market.totalAmount,
                          option === "YES" ? market.totalYes : market.totalNo
                        )}
                    </div>
                  ))}
                </div>

                <div className="text-center font-medium">Amount</div>

                <div className="space-x-4 flex items-center  p-3 rounded border   ">
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
                  <div className=" rounded p-1 flex w-full dark:bg-[#09090B] gap-1">
                    <Input
                      type="number"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="0"
                      className="flex-grow rounded border-none  text-center"
                    />
                    <div className="flex justify-end">
                      <button
                        className="px-2 py-1 text-xs text-gray-50 uppercase rounded bg-[#5155a6] dark:hover:text-[#e6e0e0] transition duration-300"
                        onClick={SetMaxValue}
                      >
                        max
                      </button>
                    </div>
                  </div>
                  <Button
                    className="px-4  py-2 hover:bg-opacity-90 hover:bg-transparent text-[#5155a6] bg-transparent border  dark:hover:text-[#393b70] transition duration-300"
                    onClick={() =>
                      setInput((prev) => (Number(prev) + 10).toString())
                    }
                  >
                    +
                  </Button>
                </div>
                <div className="">
                  <Button
                    className={`w-full py-2 rounded p-6 ${
                      !input
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#5155a6] text-white hover:bg-[#393b70] transition duration-300"
                    }`}
                    onClick={handleTrade}
                    disabled={!input || input <= "0"}
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
