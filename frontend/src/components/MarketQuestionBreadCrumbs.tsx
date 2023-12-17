import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

interface LiquidityProps {
  questionId: number;
}
// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const MarketQuestionBreadCrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography variant="subtitle2" textTransform={"uppercase"}>
        {/* {question.category} */}
      </Typography>
      <Typography variant="subtitle1" textTransform={"uppercase"}>
        {/* {question.subCategory} */}
      </Typography>
    </Breadcrumbs>
  );
};

export default MarketQuestionBreadCrumbs;
