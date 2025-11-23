"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";

export default function GallerySection({ images = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full px-4 lg:px-10 xl:px-40">
      <div
        className="
          mx-auto flex flex-col items-center
          gap-4 lg:gap-6 xl:gap-6
          w-full max-w-[343px] lg:max-w-[944px] xl:max-w-[1120px]
        "
      >
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="
            relative overflow-hidden rounded-[4px]
            w-full 
            h-[184px] lg:h-[506px] xl:h-[600px]
          "
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          slidesPerView={2}
          spaceBetween={8}
          breakpoints={{
            1024: { slidesPerView: 4, spaceBetween: 16 },
            1280: { slidesPerView: 6, spaceBetween: 16 },
          }}
          className="w-full h-[80px] lg:h-[108px] xl:h-[108px]"
        >
          {images.map((img, idx) => (
            <SwiperSlide
              key={idx}
              className={`
                relative overflow-hidden rounded-[4px]
                !h-full
                !w-[45%] lg:!w-[202px] xl:!w-[202px]
                ${idx === activeIndex ? "ring-2 ring-[#0B63E5]" : ""}
              `}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex flex-row gap-2 h-[8px] mt-2">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`
                w-2 h-2 rounded-full
                ${
                  idx === activeIndex
                    ? "bg-[#0B63E5] shadow-[0px_4px_24px_rgba(20,25,26,0.12)]"
                    : "bg-[#EDEDED]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
