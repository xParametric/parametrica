"use client";
import Link from "next/link";
import React from "react";
import Web3 from "web3";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { MarketProps } from "@/types";
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
    <Box sx={{ marginBottom: 2, width: "100%" }}>
      <Link href={`/market/${id}`} passHref style={{ textDecoration: "none" }}>
        <Card
          sx={{
            cursor: "pointer",
            "&:hover": {
              boxShadow: `0px 4px 20px rgba(0, 0, 0, 0.2)`,
              borderColor: "primary.main",
            },
            borderWidth: 1,
            borderColor: "grey.300",
            borderRadius: 2,
            transition: "box-shadow 0.3s ease-in-out",
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt="Market Banner"
            sx={{
              width: "100%",
              height: 140,
              objectFit: "cover",
              borderTopLeftRadius: "inherit",
              borderTopRightRadius: "inherit",
            }}
          />
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", paddingBottom: 2 }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <Box sx={{ fontWeight: "medium" }}>Volume:</Box>
                {formatAmount(totalAmount)}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Yes
                  </Typography>
                  <Typography variant="body2" color="primary.main">
                    {formatAmount(totalYes)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    No
                  </Typography>
                  <Typography variant="body2" color="primary.main">
                    {formatAmount(totalNo)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};
