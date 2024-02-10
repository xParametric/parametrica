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

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  cursor: "pointer",
  textAlign: "center",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
}));

const DescriptionBox = styled(Box)(({ theme }) => ({
  width: "66%", // equivalent to w-2/3 in Tailwind
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%", // full width on small devices
  },
}));

const ResolutionSourceTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[100], // equivalent to bg-gray-100 in Tailwind
  borderRadius: theme.shape.borderRadius * 2,
  paddingLeft: theme.spacing(1.5),
}));

const Details = () => {
  const { id } = useParams();
  const tokenAddress = "0x71728cD356A0C7a52eF4b0Fc1bcDC540546D84CD";
  const { data: ParaToken, isLoading, error } = useTokenBalance(tokenAddress);

  // console.log("balance", balance);

  // // if (isLoading) {
  // //   return <div>Loading...</div>;
  // // }

  // if (error) {
  //   console.log("error", error);

  //   return <>{`Error: ${error}`}</>;
  // }

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
    var bal = await polyToken.methods.balanceOf(account).call();
    setButton("Please wait");

    if (input && selected === "YES") {
      if (parseInt(input) < parseInt(Web3.utils.fromWei(bal, "ether"))) {
        await polyToken.methods
          .approve(polymarket._address, Web3.utils.toWei(input, "ether"))
          .send({ from: account });
        await polymarket.methods
          .addYesBet(id, Web3.utils.toWei(input, "ether"))
          .send({ from: account });
      }
    } else if (input && selected === "NO") {
      if (parseInt(input) < parseInt(Web3.utils.fromWei(bal, "ether"))) {
        await polyToken.methods
          .approve(polymarket._address, Web3.utils.toWei(input, "ether"))
          .send({ from: account });
        await polymarket.methods
          .addNoBet(id, Web3.utils.toWei(input, "ether"))
          .send({ from: account });
      }
    }
    await getMarketData();
    setButton("Trade");
  };
  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarketData();
    });
  }, [loading]);
  console.log(polyToken, "polyToken");

  const SetMaxValue = () => {
    if (ParaToken && ParaToken.displayValue) {
      // Assuming the displayValue is the total balance
      const totalBalance = Number(ParaToken.displayValue);
      // Define a small buffer for transaction fees - this value might need to be adjusted
      const bufferForFees = 0.0001;

      // Calculate the max usable amount by subtracting the buffer
      const maxUsableAmount = totalBalance - bufferForFees;
      setInput(maxUsableAmount.toFixed(4)); // Set the input to the max usable amount
    }
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
                alignItems: "flex-start",
                border: 1,
                borderColor: "grey.300",
              }}
            >
              <Box style={{ display: "flex", flexDirection: "row" }}>
                <Avatar
                  // src={`https://ipfs.infura.io/ipfs/${market?.imageHash}`}
                  src={"/"}
                  style={{ width: "55px", height: "55px", marginRight: "16px" }}
                  alt="Market"
                />
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    flex: "1 1 50%",
                  }}
                >
                  <Typography variant="caption" style={{ color: "gray" }}>
                    {"Type"}
                  </Typography>
                  <Typography variant="h6">{market?.title}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  ml: 1.5,
                }}
              >
                <Paper
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    padding: "12px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography variant="caption" style={{ color: "gray" }}>
                    Market End on
                  </Typography>
                  <Typography variant="body1">
                    {market?.endTimestamp
                      ? convertToLocalTime(market.endTimestamp)
                      : "N/A"}
                  </Typography>
                </Paper>
                <Paper
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    padding: "12px",
                    backgroundColor: "#f5f5f5",
                    marginLeft: "16px",
                  }}
                >
                  <Typography variant="caption" style={{ color: "gray" }}>
                    Total Volume
                  </Typography>
                  <Typography variant="body1">
                    {market?.totalAmount
                      ? market.totalAmount
                          .dividedBy(new BigNumber(10).pow(18)) // Assuming the totalAmount is in Wei
                          .toFixed() + " POLY"
                      : "0 POLY"}
                  </Typography>
                </Paper>
              </Box>
            </Paper>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <StyledPaper sx={{ width: "100%", height: "100%" }}>
                    <Box sx={{ width: "100%", height: "100%" }}>
                      <ChartContainer questionId={market?.id ?? "0"} />
                    </Box>
                  </StyledPaper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ maxWidth: 345, mx: "auto" }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        Buy
                      </Typography>
                      <hr style={{ width: "100%", margin: "16px 0" }} />
                      <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "center" }}
                      >
                        Pick Outcome
                      </Typography>

                      {/* YES Option */}
                      <Box
                        sx={{
                          backgroundColor:
                            selected === "YES" ? "#4caf50" : "#f5f5f5",
                          color: selected === "YES" ? "#fff" : "inherit",
                          textAlign: "center",
                          py: 1,
                          my: 1,
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => setSelected("YES")}
                      >
                        <Typography variant="subtitle2">
                          YES
                          {market?.totalAmount && market?.totalYes
                            ? market.totalYes
                                .times(100)
                                .dividedBy(market.totalAmount)
                                .toFixed(2)
                            : "0"}
                          %
                        </Typography>
                      </Box>

                      {/* NO Option */}
                      <Box
                        sx={{
                          backgroundColor:
                            selected === "NO" ? "#4caf50" : "#f5f5f5",
                          color: selected === "NO" ? "#fff" : "inherit",
                          textAlign: "center",
                          py: 1,
                          my: 1,
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                        onClick={() => setSelected("NO")}
                      >
                        <Typography variant="subtitle2">
                          NO
                          {market?.totalAmount && market?.totalNo
                            ? market.totalNo
                                .times(100)
                                .dividedBy(market.totalAmount)
                                .toFixed(2)
                            : "0"}
                          %
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{ mt: 2, textAlign: "center" }}
                      >
                        How much?
                      </Typography>

                      {/* Input Field */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #e0e0e0",
                          p: 1,
                          borderRadius: 1,
                          my: 2,
                        }}
                      >
                        <TextField
                          fullWidth
                          type="search"
                          name="q"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="0"
                          autoComplete="off"
                        />
                        <Box sx={{ mx: 2 }}>
                          <Typography variant="body2">
                            <>{ParaToken && ParaToken.symbol}</>
                            <Box sx={{ mx: 1 }}>
                              {" "}
                              {ParaToken && ParaToken.displayValue}
                            </Box>
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{ padding: 0 }}
                            onClick={SetMaxValue}
                            component="button"
                          >
                            Max
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleTrade}
                        disabled={button !== "Trade"}
                      >
                        {button}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>

              <Box
                sx={{
                  py: 3,
                  px: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                  color={"primary"}
                >
                  Description
                </Typography>
                <Typography sx={{ mb: 2 }} color={"primary"}>
                  {market?.description}
                </Typography>

                <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 1, mt: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold" }}
                    color={"primary"}
                  >
                    Resolution Source:
                  </Typography>
                  <Link
                    href={market?.resolverUrl}
                    underline="hover"
                    sx={{ color: "brown" }}
                  >
                    {market?.resolverUrl}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Details;
