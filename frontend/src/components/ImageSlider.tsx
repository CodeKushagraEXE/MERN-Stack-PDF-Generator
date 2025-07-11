import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

const images = [
  // Billboard/tech/urban themed images
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // urban
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // workspace
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80", // tech
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" // team
];

interface ImageSliderProps {
  rounded?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ rounded = "rounded-2xl" }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      className={`w-[320px] h-[420px] ${rounded}`}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`slide-${idx}`}
            className={`object-cover w-[320px] h-[420px] ${rounded} shadow-2xl shadow-[#A3E635]/30`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider; 