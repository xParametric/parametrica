"use client";

import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Box, Button, Grid, Typography } from "@mui/material";
import { AdminMarketCard } from "../../../components/AdminMarketCard";
import { useData } from "@/context/DataContext";
import { MarketProps } from "@/types";

const Markets: React.FC = () => {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const getMarkets = useCallback(async () => {
    const totalQuestions = await polymarket.methods
      .totalQuestions()
      .call({ from: account });
    const dataArray: MarketProps[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const data = await polymarket.methods
        .questions(i)
        .call({ from: account });
      dataArray.push({
        id: data.id,
        title: data.question,
        imageHash: data.creatorImageHash,
        totalAmount: data.totalAmount,
        totalYes: data.totalYesAmount,
        totalNo: data.totalNoAmount,
      });
    }
    setMarkets(dataArray);

    console.log(dataArray, "dataArray");
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarkets();
    });
  }, [loading]);

  return (
    <>
      <Head>
        <title>Polymarket - Markets</title>
        <meta name="description" content="Browse and manage your markets." />
      </Head>
      <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ mb: 4, textAlign: "left" }}>
          <Link href="/create" passHref>
            <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
              ← Back to Creation
            </Button>
          </Link>
        </Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: "black" }}>
          Resolve Markets
        </Typography>
        <Grid container spacing={3}>
          {markets ? (
            markets.map((market) => (
              <Grid item xs={12} sm={6} md={4} key={market.id}>
                <AdminMarketCard
                  id={market.id}
                  imageHash={market?.imageHash}
                  title={market?.title}
                  totalAmount={market?.totalAmount?.toString()}
                  onYes={async () => {
                    await polymarket.methods
                      .distributeWinningAmount(market.id, true)
                      .send({ from: account });
                  }}
                  onNo={async () => {
                    await polymarket.methods
                      .distributeWinningAmount(market.id, false)
                      .send({ from: account });
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" gutterBottom>
              No markets available
            </Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Markets;
