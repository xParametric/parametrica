import React from "react";
// import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";

// interface MarketQuestionDateProps {
//   questionId: number;
// }

// const CalendarMonthIcon = dynamic(
//   () => import("@mui/icons-material/CalendarMonth")
// );

const MarketQuestionDate = () => {
  return (
    <Box display="flex" alignItems="center">
      {/* <Tooltip
        title={
          isExpired
            ? "This question has expired."
            : isExpiringToday
            ? "Expires today!"
            : formattedExpiryDate
        }
        arrow
      >
        <Box display="flex" alignItems="center" pr={1}>
          <CalendarMonthIcon fontSize="small" />
        </Box>
      </Tooltip> */}
      <Typography variant="subtitle2" fontWeight={500}></Typography>
    </Box>
  );
};

export default MarketQuestionDate;
