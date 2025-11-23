"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";

export default function ReviewsList({
  reviews = [],
  titleColor = "",
  arrowColor = "",
  className = "",
}) {
  const t = useTranslations();

  return (
    <div
      className={`max-w-[375px] lg:max-w-[800px]  xl:max-w-[1104px] mx-auto flex flex-col items-center gap-8 lg:gap-14 ${className}`}
    >
      <h2
        className={`font-bold text-[36px] leading-[40px] text-center lg:text-[48px] lg:leading-[56px] ${titleColor}`}
      >
        {t("Reviews.title")}
      </h2>

      <div className="max-w-full relative">
        <div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              prevEl: ".reviews-prev",
              nextEl: ".reviews-next",
            }}
            breakpoints={{
              1024: { slidesPerView: 2, spaceBetween: 24 },
              1440: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!px-[var(--shadow-pad)] !py-[var(--shadow-pad)] !overflow-hidden "
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={i} className="!flex !justify-center ">
                <div
                  className="w-[min(343px,calc(100vw-32px))] lg:w-[352px] h-[216px] 
               bg-white rounded-[4px] shadow-[0_4px_24px_rgba(20,25,26,0.12)] 
               p-6 lg:p-8 flex flex-col justify-center gap-4"
                >
                  <div className="flex items-center justify-between max-w-full">
                    <div className="flex items-center gap-4">
                      <Image
                        src={r.photo}
                        alt={r.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p className="text-[#02142E] font-semibold text-[18px] leading-[24px]">
                        {r.name}
                      </p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <svg
                          key={idx}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={idx < (r.rating ?? 5) ? "#0B63E5" : "#E5E7EB"}
                        >
                          <path d="M12 2l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.77 6.2 19.86l1.1-6.46-4.7-4.58 6.49-.94L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[18px] leading-[24px] text-[#02142E] opacity-80">
                    {r.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-4 lg:mt-8 max-w-full flex justify-center gap-12">
          <button
            aria-label="Попередній відгук"
            type="button"
            className="reviews-prev"
          >
            <svg width="24" height="24" style={{ color: arrowColor }}>
              <use href="/sprite.svg#ArrowLeftGray" />
            </svg>
          </button>
          <button
            aria-label="Наступний відгук"
            type="button"
            className="reviews-next"
          >
            <svg width="24" height="24" style={{ color: arrowColor }}>
              <use href="/sprite.svg#ArrowRightGray" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
