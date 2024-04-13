"use client";
import Link from "next/link";
import React from "react";
import Web3 from "web3";
import { MarketProps } from "../types/index";

import BigNumber from "bignumber.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useData } from "../context/DataContext";

export const MarketCard: React.FC<MarketProps> = ({
  id,
  title,
  totalAmount,
  totalYes,
  totalNo,
  imageHash,
}) => {
  const { calculatePercentage } = useData();
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";
  const formattedImageHash = imageHash?.replace("ipfs://", "");
  const imageUrl = imageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  const formatAmount = (amount?: BigNumber | string) => {
    if (amount === undefined) {
      return "0";
    }

    let num = BigNumber.isBigNumber(amount) ? amount : new BigNumber(amount);

    return num.isZero()
      ? "0"
      : `$${num.dividedBy(new BigNumber(10).pow(18)).toFixed(2)}`;
  };

  const percentageYes = calculatePercentage(totalAmount, totalYes);
  const percentageNo = calculatePercentage(totalAmount, totalNo);

  return (
    <Link href={`market/${id}`} className="cursor-pointer">
      <Card className="mb-8 w-full border border-gray-600 bg-white bg-opacity-5 border-opacity-50 rounded-md transition-shadow duration-300 ease-in-out hover:shadow-[0px_4px_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0px_4px_20px_rgba(255,255,255,0.2)] hover:border-primary-500">
        <CardHeader>
          <Image
            className="w-full h-36 object-cover rounded-t-md"
            src={imageUrl}
            height={0}
            width={0}
            sizes="100%"
            alt="Market Banner"
          />
        </CardHeader>
        <CardTitle className="font-bold pb-2 capitalize p-4 h-20 ">
          {title}
        </CardTitle>
        <CardContent className=" pt-2 px-4 border dark:bg-black bg-gray-50 rounded-none dark:bg-opacity-25 overflow-hidden">
          <div className="flex justify-between items-center ">
            <div className="flex items-center space-x-2">
              <span className="font-medium me-1">Total Volume: </span>
              {formatAmount(totalAmount)}
            </div>
            <div className="flex space-x-8 ">
              <div className="flex flex-col items-center  space-y-2">
                <span className="text-xs text-gray-500">Yes</span>
                <span className="text-sm text-primary-500">
                  {/* {formatAmount(totalYes)} */}
                  {percentageYes}
                </span>
              </div>
              <div className="flex flex-col items-center  space-y-2">
                <span className="text-xs text-gray-500">No</span>
                <span className="text-sm text-primary-500">
                  {/* {formatAmount(totalNo)} */}
                  {percentageNo}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
