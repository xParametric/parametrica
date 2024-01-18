import React from "react";
import { Container, Grid } from "@mui/material";
import TotalEarnings from "./TotalEarnings";
import OpenPositions from "./OpenPostions";
import LiquidityEarnings from "./LiquidityEarnings";
import LiquidityProvided from "./LiquidityProvided";
import PorfolioTotalBalance from "./PorfolioTotalBalance";

const PortfolioContainer = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent={"space-around"}>
        <Grid item>
          <TotalEarnings />
        </Grid>
        <Grid item>
          <OpenPositions />
        </Grid>
        <Grid item>
          <LiquidityProvided />
        </Grid>
        <Grid item>
          <LiquidityEarnings />
        </Grid>
      </Grid>
      <Grid container px={1}>
        <PorfolioTotalBalance />
      </Grid>
    </Container>
  );
};

export default PortfolioContainer;
