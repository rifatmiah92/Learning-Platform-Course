import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // ✅ Pagination + Autoplay support

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const HeroSlider = () => {
  return (
    <div className="hero-slider w-full max-w-6xl mx-auto mt-6">
      <Swiper
        modules={[Pagination, Autoplay]} // ✅ এখানে Pagination ও Autoplay
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // ✅ Auto slide every 3s
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        className="rounded-2xl shadow-lg"
      >
        <SwiperSlide>
          <img
            src="https://i.pinimg.com/1200x/c6/b0/ba/c6b0ba7fb9ed102e6536bc8824173a1e.jpg"
            alt="Slide 1"
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://i.pinimg.com/1200x/3e/1d/1b/3e1d1b5687fb0da402ba03dca0e062dd.jpg"
            alt="Slide 2"
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://i.pinimg.com/736x/56/dd/bf/56ddbf1e51132db1ba0182866140677a.jpg"
            alt="Slide 3"
            className="w-full h-[400px] object-cover rounded-2xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
