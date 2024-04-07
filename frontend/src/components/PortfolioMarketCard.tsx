"use client";
import { currentDateTime } from "../lib/DateTimeFormatter";
import { MarketProps } from "../types/index";

import moment from "moment";
import Image from "next/image";
import React from "react";
import Web3 from "web3";

export const PortfolioMarketCard: React.FC<MarketProps> = ({
  title,
  userYes,
  userNo,
  imageHash,
  timestamp,
  endTimestamp,
  // hasResolved,
}) => {
  var endingOn = endTimestamp && moment(parseInt(endTimestamp));
  var now = currentDateTime;
  console.log("endingOn", now);

  // console.log(hasResolved, "hasResolved");
  // console.log(title, "title");
  // console.log(userYes, "userYes");
  // console.log(userNo, "userNo");
  // console.log(imageHash, "imageHash");
  // console.log(timestamp, "timestamp");
  // console.log(endTimestamp, "endTimestamp");

  var daysLeft =
    endingOn && moment.duration(endingOn.diff(now)).asDays().toFixed(0);
  return (
    <div className="w-full overflow-hidden my-2">
      <div className="flex flex-col border border-gray-300 rounded-lg p-5 hover:border-blue-700 cursor-pointer">
        <div className="flex flex-row space-x-5 pb-4">
          <div className="h-w-15">
            <Image
              // src={`https://ipfs.infura.io/ipfs/${market?.imageHash}`}
              src={"/"}
              className="rounded-full"
              width={55}
              height={55}
              alt="Image Hash"
            />
          </div>
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <div className="flex flex-row flex-nowrap justify-between items-center">
          <div className="flex flex-col space-y-1">
            <span className="text-sm text-gray-500 font-light">Outcome</span>
            <span className="text-base">{userYes ? "YES" : "NO"}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">
              Amount Added
            </span>
            <span className="text-base">
              {userYes && Web3.utils.fromWei(userYes ?? userNo, "ether")} PARA
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">Added On</span>
            <span className="text-base">
              {timestamp
                ? moment(parseInt(timestamp) * 1000).format(
                    "MMMM D, YYYY HH:mm a"
                  )
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500 font-light">Ending In</span>
            <span className="text-base">
              {daysLeft && parseInt(daysLeft) > 0
                ? `${daysLeft} days`
                : "Ended"}
            </span>
          </div>
          <div className="flex flex-col space-y-1 items-end">
            <div className="py-2 px-8 rounded-lg bg-[#5155a6] ">Trade</div>
          </div>
        </div>
      </div>
    </div>
  );
};
