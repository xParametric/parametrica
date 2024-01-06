"use client";
import React from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MarketCard } from "../components/MarketCard";

import { useData } from "../context/DataContext";

import { MarketProps } from "@/types";
import { Filter } from "./Filter";

function Markets() {
  const { polymarket, account, loadWeb3, loading } = useData();
  const [markets, setMarkets] = useState<MarketProps[]>([]);

  const getMarkets = useCallback(async () => {
    var totalQuestions = await polymarket.methods
      .totalQuestions()
      .call({ from: account });
    var dataArray: MarketProps[] = [];
    for (var i = 0; i < totalQuestions; i++) {
      var data = await polymarket.methods.questions(i).call({ from: account });
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
  }, [account, polymarket]);

  useEffect(() => {
    loadWeb3().then(() => {
      if (!loading) getMarkets();
    });
  }, [loading]);
  return (
    <Container maxWidth="xl">
      <div>
        <Box sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <SearchIcon /> */}
            <TextField
              type="search"
              name="q"
              placeholder="Search markets..."
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box sx={{ marginY: 2 }}></Box>
          <div>
            <Filter
              list={["All", "Crypto", "Football", "Covid 19", "Politics"]}
              activeItem="All"
              category="Category"
              onChange={() => {}}
            />
            <Filter
              list={["Volume", "Newest", "Expiring"]}
              activeItem="Volume"
              category="Sort By"
              onChange={() => {}}
            />
          </div>
        </Box>
      </div>
      {/* <Typography variant="h6">Markets</Typography> */}
      <Box>
        {markets.map((market) => (
          <MarketCard
            id={market.id}
            key={market.id}
            title={market?.title}
            totalAmount={market?.totalAmount}
            totalYes={market?.totalYes}
            totalNo={market?.totalNo}
            imageHash={market?.imageHash}
            userNo="0"
            userYes="0"
            timestamp="0"
            endTimestamp="0"
          />
        ))}
      </Box>
    </Container>
  );
}

export default Markets;
