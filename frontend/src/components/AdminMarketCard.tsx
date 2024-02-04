import {
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Image from "next/image";
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
  totalAmount,
  onYes,
  onNo,
  imageHash,
}) => {
  return (
    <Box sx={{ width: "100%", marginBottom: 2 }}>
      <Card
        sx={{ cursor: "pointer", "&:hover": { boxShadow: 3 }, borderRadius: 2 }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              paddingBottom: 2,
            }}
          >
            <Avatar
              // src={`https://ipfs.infura.io/ipfs/${market?.imageHash}`}
              src={"/"}
              sx={{ width: 55, height: 55 }}
              alt="Image Hash"
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Total Liquidity
              </Typography>
              <Typography variant="body1">
                {totalAmount &&
                  parseFloat(Web3.utils.fromWei(totalAmount, "ether")).toFixed(
                    2
                  )}{" "}
                PARA
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Ending In
              </Typography>
              <Typography variant="body1">12 Days</Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onYes}
            sx={{ textTransform: "none" }}
          >
            Resolve YES
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onNo}
            sx={{ textTransform: "none" }}
          >
            Resolve NO
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
