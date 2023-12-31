"use client";

import MarketCardList from "@/components/MarketCardList";
import { Box, Card, TextField, Typography } from "@mui/material";
// import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Filter } from "../components/Filter";
import { MarketCard } from "../components/MarketCard";
// import Navbar from "../components/Navbar";
import { useData } from "../context/DataContext";
// import styles from "../styles/Home.module.css";
import { MarketProps } from "@/types";
import LandingPageCarousal from "@/components/LandingPageCarousal";

const Home = () => {
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
    <main className="background">
      <Typography
        variant="h3"
        sx={{ textAlign: "center", my: 2, color: "primary.main" }}
        component={"h1"}
      >
        Featured Markets
      </Typography>
      {/* {markets.map((market) => ( */}
      <LandingPageCarousal markets={markets} />
      {/* ))} */}

      <MarketCardList />
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
          {/* <div>
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
          </div> */}
          <Typography variant="h6">Market</Typography>
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
        </Box>
      </div>
    </main>
  );
};

export default Home;
