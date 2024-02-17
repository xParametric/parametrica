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

  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/market/${id}`)}
      className="cursor-pointer"
    >
      <CardHeader>
        <img
          className="object-cover w-[450px] h-[200px]"
          src={imageUrl}
          alt={title}
        />
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-xl">{title}</p>
        <div className="flex justify-end px-0">
          <Button className="text-base w-32 border border-[#0ECB81] rounded px-2 py-1 mr-2">
            {"Yes " + BigNumber(totalYes ?? 0)?.dividedBy(10 ** 18)}
          </Button>
          <Button className="text-base w-32 border border-[#DC4155] rounded px-2 py-1">
            {"No " + BigNumber(totalNo ?? 0)?.dividedBy(10 ** 18)}
          </Button>
        </div>
      </CardContent>
      {/* CardFooter can be used for additional information or actions related to the card */}
      <CardFooter>
        {/* Placeholder for footer content, or you can remove this if not needed */}
      </CardFooter>
    </Card>
  );
};

export default CarousalCard;
