import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const MeetFaces = () => {
  return (
    <Swiper
      loop={true}
      speed={3000}
      freeMode={true}
      modules={[FreeMode, Navigation]}
      navigation
      scrollbar={{ draggable: true }}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      }}
    >
      {[
        {
          title:
            "Meet The faces behind YES SUMMIT Episode 1 – Mr. Hamid BEN ELAFDIL, President of Jadara Foundation",
          id: "TCJfusUgk4I",
        },
      ].map((video, index) => (
        <SwiperSlide className="flex items-center justify-center" key={index}>
          <iframe
            width="1080"
            height="500"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MeetFaces;
