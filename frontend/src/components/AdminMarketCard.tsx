"use client";
import React from "react";

import Web3 from "web3";

interface Props {
  id: string | undefined;
  title: string | undefined;
  imageHash: string | undefined;
  totalAmount: string | undefined;
  onYes: () => void;
  onNo: () => void;
}

export const AdminMarketCard: React.FC<Props> = ({
  title,
  imageHash,
  totalAmount,
  onYes,
  onNo,
}) => {
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";

  const formattedImageHash = imageHash ? imageHash.replace("ipfs://", "") : "";

  const imageUrl = formattedImageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  return (
    <div className="w-full mb-2">
      <div className="flex bg-white bg-opacity-5  h-80 flex-col cursor-pointer hover:shadow-md rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="Market"
          className="h-36 object-cover w-full" // Adjust height as needed
        />
        <div className="p-4">
          <div className="text-xl font-bold mb-2">{title}</div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              Total Liquidity:{" "}
              {totalAmount
                ? `${parseFloat(
                    Web3.utils.fromWei(totalAmount, "ether")
                  ).toFixed(2)} PARA`
                : "0 PARA"}
            </span>
            <span className="text-sm text-gray-500">Ending In: 12 Days</span>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <button
            className="border border-[#5155a6] rounded px-4 py-2 hover:bg-[#5155a6] hover:bg-opacity-30 mr-2"
            onClick={onYes}
          >
            Resolve YES
          </button>
          <button
            className="border border-red-500 text-red-500 rounded px-4 py-2 hover:bg-red-100"
            onClick={onNo}
          >
            Resolve NO
          </button>
        </div>
      </div>
    </div>
  );
};
