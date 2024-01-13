"use client";
import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MarketCard } from "../components/MarketCard";

import { useData } from "../context/DataContext";

import { MarketProps } from "@/types";
import { Filter } from "./Filter";
import { useRouter } from "next/navigation";

import Link from "next/link";

function Markets() {
  // const router = useRouter();
  // const path = router.prefetch("markets");
  // console.log(path);

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
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          {/* <SearchIcon /> */}
          <TextField
            type="search"
            name="q"
            placeholder="Search markets..."
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
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
        </Box>

        {/* <Typography variant="h6" gutterBottom>
        Markets
      </Typography> */}

        <Grid container spacing={2}>
          {markets.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            markets.map((market) => (
              <Grid item xs={12} sm={6} md={6} key={market.id}>
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
              </Grid>
            ))
          )}
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Link href="/markets">
              <Button sx={{}} type="button" variant="contained">
                View All
              </Button>
            </Link>
          </Box>
        </Grid>
      </Box>
    </Container>
  );
}

export default Markets;
