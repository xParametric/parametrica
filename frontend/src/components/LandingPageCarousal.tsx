"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MarketProps } from "../../../types/index";

import CarousalCard from "./CarousalCard";

const LandingPageCarousal: React.FC<{ markets: MarketProps[] }> = ({
  markets,
}) => {
  return (
    <div>
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
        {markets &&
          markets.length > 0 &&
          markets.map((market: MarketProps, id: number) => (
            <SwiperSlide
              key={id}
              style={{ justifyContent: "center", display: "flex" }}
            >
              <CarousalCard
                id={market?.id}
                title={market?.title}
                userYes={market?.userYes}
                userNo={market?.userNo}
                imageHash={market?.imageHash}
                totalYes={market?.totalYes}
                totalNo={market?.totalNo}
                totalAmount={market?.totalAmount}
                hasResolved={market?.hasResolved}
                timestamp={market?.timestamp}
                endTimestamp={market?.endTimestamp}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default LandingPageCarousal;
