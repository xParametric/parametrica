import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

import dynamic from "next/dynamic";

const PercentIcon = dynamic(() => import("@mui/icons-material/Percent"));

const MarketTradingFee = () => {
  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Trading Fee" aria-label="Trading Fee">
        <Box display="flex" alignItems="center">
          <PercentIcon
            fontSize="small"
            //  htmlColor={textColor}
          />
        </Box>
      </Tooltip>
      <Typography
        variant="subtitle2"
        fontWeight={500}
        // style={{ color: textColor }}
      >
        {/* {question.tradingFee} */}
      </Typography>
    </Box>
  );
};

export default MarketTradingFee;
