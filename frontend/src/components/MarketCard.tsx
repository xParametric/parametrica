import Link from "next/link";
import React from "react";
import Web3 from "web3";

import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { MarketProps } from "@/types";

export const MarketCard: React.FC<MarketProps> = ({
  id,
  title,
  totalAmount,
  totalYes,
  totalNo,
  imageHash,
}) => {
  return (
    <Box sx={{ marginBottom: 2, width: "100%" }}>
      <Link href={`/market/${id}`} passHref>
        <Card
          sx={{
            cursor: "pointer",
            "&:hover": { borderColor: "blue.700" },
            borderWidth: 1,
            borderColor: "grey.300",
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                paddingBottom: 3,
              }}
            >
              <Avatar
                src={`https://ipfs.infura.io/ipfs/${imageHash}`}
                sx={{ width: 48, height: 48 }}
                alt="Image Hash"
              />
              <Typography variant="subtitle2">{title}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Volume
                </Typography>
                <Typography variant="body2">
                  {totalAmount &&
                    parseFloat(
                      Web3.utils.fromWei(totalAmount, "ether")
                    ).toFixed(2)}{" "}
                  POLY
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Yes
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "grey.200",
                    textAlign: "center",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" color="primary.main">
                    {totalYes &&
                      parseFloat(Web3.utils.fromWei(totalYes, "ether")).toFixed(
                        2
                      )}{" "}
                    POLY
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  No
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "grey.200",
                    textAlign: "center",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" color="primary.main">
                    {totalNo &&
                      parseFloat(Web3.utils.fromWei(totalNo, "ether")).toFixed(
                        2
                      )}{" "}
                    POLY
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
