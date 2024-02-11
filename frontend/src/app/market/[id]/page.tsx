"use client";

import BigNumber from "bignumber.js";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import ChartContainer from "../../../components/Chart/ChartContainer";

import { useData } from "@/context/DataContext";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Link,
  CardMedia,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MarketProps } from "@/types";
import { convertToLocalTime } from "@/lib/DateTimeFormatter";
import { useTokenBalance } from "../../hooks/getBalance";
import toast from "react-hot-toast";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
}));

const Details = () => {
  const { id } = useParams();
  const tokenAddress = "0x71728cD356A0C7a52eF4b0Fc1bcDC540546D84CD";
  const { data: ParaToken, isLoading, error } = useTokenBalance(tokenAddress);

  console.log("ParaTokenObject", ParaToken);

  const { polymarket, account, loadWeb3, loading, polyToken } = useData();
  const [market, setMarket] = useState<MarketProps>();
  const [selected, setSelected] = useState<string>("YES");
  const [dataLoading, setDataLoading] = useState(true);
  const [button, setButton] = useState<string>("Trade");

  const [input, setInput] = useState("");

  const getMarketData = useCallback(async () => {
    try {
      const data = await polymarket.methods
        .questions(id)
        .call({ from: account });

      const marketData = {
        id: data.id,
        title: data.question,
        imageHash: data.creatorImageHash,
        totalAmount: new BigNumber(data?.totalAmount || 0),
        totalYes: new BigNumber(data?.totalYesAmount || 0),
        totalNo: new BigNumber(data?.totalNoAmount || 0),
        description: data?.description || "",
        endTimestamp: data?.endTimestamp ? data.endTimestamp.toString() : "0",

        resolverUrl: data?.resolverUrl || "",
      };
      console.log("marketData", marketData);
      setMarket(marketData);
      setDataLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setDataLoading(false);
    }
  }, [account, id, polymarket]);
  const handleTrade = async () => {
    try {
      var bal = await polyToken.methods.balanceOf(account).call();
      setButton("Please wait");
      toast.loading("Processing trade...");

      if (input && selected === "YES") {
        if (parseInt(input) < parseInt(Web3.utils.fromWei(bal, "ether"))) {
          await polyToken.methods
            .approve(polymarket._address, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          await polymarket.methods
            .addYesBet(id, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          toast.success("Trade successful!");
        } else {
          toast.error("Insufficient balance for this trade.");
        }
      } else if (input && selected === "NO") {
        if (parseInt(input) < parseInt(Web3.utils.fromWei(bal, "ether"))) {
          await polyToken.methods
            .approve(polymarket._address, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          await polymarket.methods
            .addNoBet(id, Web3.utils.toWei(input, "ether"))
            .send({ from: account });
          toast.success("Trade successful!");
        } else {
          toast.error("Insufficient balance for this trade.");
        }
      } else {
        toast.error("Please enter a valid amount and select an option.");
      }
    } catch (error) {
      console.error("Trade error:", error);
      toast.error("Trade failed. Please try again.");
    } finally {
      await getMarketData();
      setButton("Trade");
      toast.dismiss();
    }
  };
  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarketData();
    });
  }, [loading]);
  console.log(polyToken, "polyToken");

  const imageHash = market?.imageHash;
  const ipfsBaseUrl = "https://ipfs.io/ipfs/";

  const formattedImageHash = imageHash ? imageHash.replace("ipfs://", "") : "";

  const imageUrl = formattedImageHash
    ? `${ipfsBaseUrl}${formattedImageHash}`
    : "https://source.unsplash.com/random";

  const SetMaxValue = () => {
    if (ParaToken && ParaToken.displayValue) {
      const totalBalance = Number(ParaToken.displayValue);
      const bufferForFees = 0.0001;

      const maxUsableAmount = totalBalance - bufferForFees;
      setInput(maxUsableAmount.toFixed(4));
    }
  };
  const InfoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
  }));
  const calculatePercentage = (option: "YES" | "NO") => {
    if (!market) return "0%";

    const totalAmount = new BigNumber(market.totalAmount || 0);
    const optionAmount = new BigNumber(
      option === "YES" ? market.totalYes || 0 : market.totalNo || 0
    );

    return totalAmount.isZero()
      ? "0%"
      : `${optionAmount.dividedBy(totalAmount).times(100).toFixed(2)}%`;
  };

  return (
    <div>
      <Head>
        <title>xParametric</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth={"xl"}>
        {dataLoading ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
            pt={10}
          >
            <Box textAlign="center">
              <Typography variant="h4" component="div" fontWeight="bold">
                Loading...
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: "100%", pt: 1 }}>
            <Paper
              sx={{
                p: 3,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                border: 1,
                borderColor: "grey.300",
                gap: 2, // Adds space between the elements
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                }}
                image={imageUrl}
                alt="Market"
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: { xs: 2, sm: 0 } }}
                >
                  Type
                </Typography>
                <Typography variant="h6" sx={{ my: 1 }}>
                  {market?.title}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Market End on
                    </Typography>
                    <Typography variant="body1">
                      {market?.endTimestamp
                        ? convertToLocalTime(market.endTimestamp)
                        : "N/A"}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={0} sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Total Volume
                    </Typography>
                    <Typography variant="body1">
                      {market?.totalAmount
                        ? `${new BigNumber(market.totalAmount)
                            .dividedBy(new BigNumber(10).pow(18))
                            .toFixed()} POLY`
                        : "0 POLY"}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <ChartContainer questionId={market?.id ?? "0"} />
                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card
                    variant="outlined"
                    sx={{ maxWidth: 345, m: "auto", boxShadow: 3 }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ textAlign: "center", mb: 2 }}
                      >
                        Buy
                      </Typography>

                      {["YES", "NO"].map((option) => (
                        <Box
                          key={option}
                          sx={{
                            backgroundColor:
                              selected === option
                                ? "primary.main"
                                : "background.paper",
                            color:
                              selected === option
                                ? "common.white"
                                : "text.primary",
                            textAlign: "center",
                            py: 1,
                            my: 1,
                            borderRadius: 1,
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor:
                                selected === option
                                  ? "primary.dark"
                                  : "grey.300",
                            },
                            transition: "all 0.3s ease-in-out",
                          }}
                          onClick={() => setSelected(option)}
                        >
                          <Typography variant="subtitle2">
                            {option}{" "}
                            {calculatePercentage(option as "YES" | "NO")}
                          </Typography>
                        </Box>
                      ))}

                      <Typography
                        variant="body2"
                        sx={{ mt: 2, textAlign: "center" }}
                      >
                        How much?
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid",
                          borderColor: "divider",
                          p: 1,
                          borderRadius: 1,
                          my: 2,
                        }}
                      >
                        <TextField
                          fullWidth
                          type="number"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="0"
                        />
                        <Button
                          variant="contained"
                          sx={{ ml: 2 }}
                          onClick={SetMaxValue}
                        >
                          Max
                        </Button>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleTrade}
                        disabled={!input}
                      >
                        {selected === "YES" ? "Buy YES" : "Buy NO"}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Description
                </Typography>
                <Typography sx={{ mb: 2 }}>{market?.description}</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Resolution Source:
                </Typography>
                <Link href={market?.resolverUrl} underline="hover">
                  {market?.resolverUrl}
                </Link>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Details;
