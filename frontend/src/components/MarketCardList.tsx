"use client";
// import { useEffect } from "react";
// // import { loadQuestions, initialQuestionsState } from "@/redux/questionSlice"; // Import the initialQuestionsState

import { Container } from "@mui/material";
// import MarketCard from "./MarketCard";

const MarketCardList = () => {
  // const dispatch = useDispatch();

  // Load questions data from the Redux store
  // useEffect(() => {
  //   // Simulate fetching data from an API or backend
  //   const fetchData = async () => {
  //     // Simulate API call delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // Dispatch the action to load the questions data into the store
  //     dispatch(loadQuestions(initialQuestionsState.questionsData));
  //   };

  //   fetchData();
  // }, [dispatch]);

  // const questionsData = useSelector(
  //   (state: RootState) => state.questions.questionsData
  // );

  return (
    <Container maxWidth="xl">
      {/* {questionsData.map((questionItem) => ( */}
      {/* <div key={questionItem.id}>
          <MarketCard
            questionId={questionItem.id} // Pass questionId instead of individual props
          />
        </div> */}
      {/* ))} */}
    </Container>
  );
};

export default MarketCardList;
