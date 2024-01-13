import { Box, Typography, Tooltip } from "@mui/material";
import React from "react";

import dynamic from "next/dynamic";
const WaterDropIcon = dynamic(() => import("@mui/icons-material/WaterDrop"));
const Liquidity = () => {
  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Liquidity" aria-label="Liquidity">
        <Box display={"flex"} alignItems={"center"}>
          <WaterDropIcon fontSize="small" />
        </Box>
      </Tooltip>
      <Typography variant="subtitle2" fontWeight={500}></Typography>
    </Box>
  );
};

export default Liquidity;
