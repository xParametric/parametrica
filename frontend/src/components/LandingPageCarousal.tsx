"use client";
// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { loadQuestions, initialQuestionsState } from "@/redux/questionSlice";

// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Container } from "@mui/material";
// import CarousalCard from "./CarousalCard";

const LandingPageCarousal: React.FC = () => {
  // const dispatch = useDispatch();

  // Fetch questions data from the Redux store when the component mounts
  // useEffect(() => {
  //   // Simulate fetching data from an API or backend
  //   const fetchData = async () => {
  //     try {
  //       // Simulate API call delay
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Dispatch the action to load the questions data into the store
  //       dispatch(loadQuestions(initialQuestionsState.questionsData));
  //     } catch (error) {
  //       // Handle error if necessary
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  // const questionsData = useSelector(
  //   (state: RootState) => state.questions.questionsData
  // );

  // Memoize questionsData to prevent unnecessary recalculations
  // const memoizedQuestionsData = useMemo(() => questionsData, [questionsData]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        rewind={true}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {/* {memoizedQuestionsData.map((questionItem) => (
          <SwiperSlide
            key={questionItem.id}
            style={{ justifyContent: "center", display: "flex" }}
          >
            <CarousalCard questionId={questionItem.id} />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </Container>
  );
};

export default LandingPageCarousal;
