import React from "react";
// import dynamic from "next/dynamic";

// interface MarketQuestionDateProps {
//   questionId: number;
// }

// const CalendarMonthIcon = dynamic(
//   () => import("@mui/icons-material/CalendarMonth")
// );

const MarketQuestionDate = () => {
  return (
    <div className="flex items-center">
      {/* Uncomment and adjust the tooltip content as needed
    <div className="tooltip" data-tip={isExpired ? "This question has expired." : isExpiringToday ? "Expires today!" : formattedExpiryDate}>
      <div className="flex items-center pr-4">
        <CalendarMonthIcon className="h-5 w-5" />
      </div>
    </div>
    */}
      <span className="text-sm font-medium"></span>
    </div>
  );
};

export default MarketQuestionDate;
