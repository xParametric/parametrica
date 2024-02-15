import * as React from "react";

interface LiquidityProps {
  questionId: number;
}
// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

const MarketQuestionBreadCrumbs = () => {
  return (
    <nav aria-label="breadcrumb" className="flex space-x-2 text-sm">
      <span className="uppercase font-semibold">
        {/* {question.category} */}
      </span>
      <span>/</span>
      <span className="uppercase font-normal">
        {/* {question.subCategory} */}
      </span>
    </nav>
  );
};

export default MarketQuestionBreadCrumbs;
