"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

import EqualizerIcon from "@mui/icons-material/Equalizer";
const TotalEarning: React.FC = () => {
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
          backgroundColor: "#F5EEFC",
          p: 1,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          mr: 10,
        }}
      >
        <EqualizerIcon fontSize={"medium"} sx={{ color: "black" }} />
      </Box>
      <Typography variant="caption" color={"grey"} mt={1}>
        Volume Traded
      </Typography>
      <Typography variant="h6" color={"primary.main"}>
        $ 251724710{" "}
      </Typography>
    </Box>
  );
};

export default TotalEarning;
