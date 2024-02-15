"use client";
import Link from "next/link";
import React from "react";
import Web3 from "web3";
import { MarketProps } from "../types/index";

import BigNumber from "bignumber.js";

export const MarketCard: React.FC<MarketProps> = ({
  id,
  title,
  totalAmount,
  totalYes,
  totalNo,
  imageHash,
}) => {
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";
  const formattedImageHash = imageHash?.replace("ipfs://", "");
  const imageUrl = imageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  const formatAmount = (amount?: BigNumber | string) => {
    if (amount === undefined) {
      return "0 PARA";
    }

    let num = BigNumber.isBigNumber(amount) ? amount : new BigNumber(amount);

    return num.isZero()
      ? "0 PARA"
      : `${num.dividedBy(new BigNumber(10).pow(18)).toFixed(2)} PARA`;
  };
  return (
    <div className="mb-8 w-full">
      <Link href={`/market/${id}`} passHref>
        <div className="cursor-pointer border border-gray-300 rounded-md transition-shadow duration-300 ease-in-out hover:shadow-[0px_4px_20px_rgba(0,0,0,0.2)] hover:border-primary-500">
          <img
            className="w-full h-36 object-cover rounded-t-md"
            src={imageUrl}
            alt="Market Banner"
          />
          <div className="p-4">
            <h3 className="font-bold pb-2">{title}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Volume:</span>
                {formatAmount(totalAmount)}
              </div>
              <div className="flex space-x-8">
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-xs text-gray-500">Yes</span>
                  <span className="text-sm text-primary-500">
                    {formatAmount(totalYes)}
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-xs text-gray-500">No</span>
                  <span className="text-sm text-primary-500">
                    {formatAmount(totalNo)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
