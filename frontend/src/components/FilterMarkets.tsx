"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterMarkets = () => {
  return (
    <Box m={2}>
      <Button
        variant="outlined"
        sx={{ height: "100%", px: 2 }}
        startIcon={<FilterListIcon />}
      >
        filter
      </Button>
    </Box>
  );
};

export default FilterMarkets;
