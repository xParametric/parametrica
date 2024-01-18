import { Box, Typography, Tooltip } from "@mui/material";
import React from "react";

import dynamic from "next/dynamic";
const LeaderboardIcon = dynamic(
  () => import("@mui/icons-material/Leaderboard")
);
const MarketValue = () => {
  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Market Value" aria-label="Market Value">
        <Box display={"flex"} alignItems={"center"}>
          <LeaderboardIcon fontSize="small" />
        </Box>
      </Tooltip>
      <Typography variant="subtitle2" fontWeight={500}>
        {/* {formattedMarketValue} */}K
      </Typography>
    </Box>
  );
};

export default MarketValue;
