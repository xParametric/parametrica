"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

import AutoGraphIcon from "@mui/icons-material/AutoGraph";

const LiquidityProvided: React.FC = () => {
  return (
    <Box
      borderRadius={2}
      my={1}
      // boxShadow={1}
      width={300}
      px={3}
      py={2}
      border={1}
      borderColor={"gray"}
      sx={{
        backgroundColor: "#ffffff",
        backgroundBlendMode: "difference",
      }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        sx={{
          borderRadius: "100%",
          backgroundColor: "#ECF6F0",
          p: 1,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          mr: 10,
        }}
      >
        <AutoGraphIcon fontSize={"medium"} sx={{ color: "black" }} />
      </Box>
      <Typography variant="caption" color={"grey"} mt={1}>
        Liquidity Provided
      </Typography>
      <Typography variant="h6" color={"primary.main"}>
        $ 65140{" "}
      </Typography>
    </Box>
  );
};

export default LiquidityProvided;
