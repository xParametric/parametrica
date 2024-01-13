import { Filter } from "@/components/Filter";
import FilterMarkets from "@/components/FilterMarkets";
import MarketSearch from "@/components/MarketSearch";
import { Container, Box } from "@mui/material";
import React from "react";

const markets = () => {
  return (
    <Container maxWidth="xl">
      {/* markets */}
      <Box display={"flex"}>
        {" "}
        <FilterMarkets />
        {/* <Filter /> */}
        <MarketSearch />
      </Box>{" "}
      {/* <MarketCardList /> */}
    </Container>
  );
};

export default markets;
