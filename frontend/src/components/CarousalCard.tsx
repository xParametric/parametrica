import React from "react";
import { MarketProps } from "../types/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BigNumber from "bignumber.js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CarousalCard: React.FC<MarketProps> = ({
  id,
  title,
  imageHash,
  totalYes,
  totalNo,
  // hasResolved,
}) => {
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";
  const formattedImageHash = imageHash.replace("ipfs://", "");
  const imageUrl = imageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  // const formatValue = (value: any) =>
  //   BigNumber(value ?? 0)
  //     .dividedBy(10 ** 18)
  //     .toString();

  // console.log(hasResolved, "hasResolved");

  const router = useRouter();

  return (
    <div className="my-4 flex flex-wrap justify-center">
      <Card
        onClick={() => router.push(`/market/${id}`)}
        className="w-96 cursor-pointer hover:scale-105 bg-white bg-opacity-5 border-opacity-50 rounded-md transition-shadow duration-300 ease-in-out hover:shadow-[2px_2px_5px_#5155a6] m-4"
      >
        <CardHeader className=" mb-2 w-full h-[100px]">
          <div className="flex justify-between items-center">
            <div>
              <img
                className="w-14 h-14 rounded-xl"
                src={imageUrl}
                alt={title}
              />
            </div>
            <div className="flex-1 min-w-0 w-full ml-4">
              <p className=" text-xl capitalize ">{title}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-center">
            <Button className="text-base w-32 border  bg-white dark:bg-opacity-100    dark:hover:bg-[#5155a5]  dark:hover:bg-opacity-25 bg-opacity-50 border-[#5155a6] hover:bg-[#5155a5] hover:bg-opacity-15 text-[#5155a6] rounded px-2 py-1 mr-2">
              {/* {"Yes " + BigNumber(totalYes ?? 0)?.dividedBy(10 ** 18)} */}
              Bet Yes
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-chevron-double-up mx-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                />
              </svg>
            </Button>
            <Button className="text-base w-32 border bg-white dark:bg-opacity-100 dark:hover:bg-[#DC4155] bg-opacity-50 text-[#DC4155] dark:hover:bg-opacity-25  hover:bg-[#DC4155] hover:bg-opacity-15 rounded px-2 py-1 mb-2">
              {/* {"No " + BigNumber(totalNo ?? 0)?.dividedBy(10 ** 18)} */}
              Bet No
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-chevron-double-down mx-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
                <path
                  fillRule="evenodd"
                  d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-500">
            {"$" +
              (parseFloat(
                String(BigNumber(totalYes ?? 0)?.dividedBy(10 ** 18))
              ) +
                parseFloat(
                  String(BigNumber(totalNo ?? 0)?.dividedBy(10 ** 18))
                )) +
              " Bet"}
          </div>

          {/* Placeholder for footer content, or you can remove this if not needed */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CarousalCard;
