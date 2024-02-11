"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
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
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          "&:hover": { boxShadow: 3 },
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Market"
          sx={{ height: 140, objectFit: "cover" }} // Adjust height as needed
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            {title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Total Liquidity:{" "}
              {totalAmount
                ? `${parseFloat(
                    Web3.utils.fromWei(totalAmount, "ether")
                  ).toFixed(2)} PARA`
                : "0 PARA"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ending In: 12 Days
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onYes} sx={{ marginRight: 1 }}>
            Resolve YES
          </Button>
          <Button variant="outlined" color="secondary" onClick={onNo}>
            Resolve NO
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
