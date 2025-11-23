"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";

export default function ClientsSlider({ clients = [] }) {
  const t = useTranslations();
  return (
    <div>
      <h2 className="text-4xl lg:text-5xl font-bold text-center text-[#001F54] mb-8 lg:mb-14">
        {t("ClientsSlider.title")}
      </h2>

      <Swiper
        className="w-[min(375px,calc(100vw-32px))] lg:w-[1024px] xl:w-[1440px] mx-auto"
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        loop
        slidesPerView="auto"
        spaceBetween={30}
      >
        {clients.map((client, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <div className="relative w-[64px] h-[64px] lg:w-[84px] lg:h-[84px] flex items-center justify-center">
              <Image
                src={client.image}
                alt={client.alt || "Client logo"}
                fill
                loading="lazy"
                decoding="async"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
