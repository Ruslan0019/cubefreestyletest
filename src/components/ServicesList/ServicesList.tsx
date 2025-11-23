"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

type ServiceItem = {
  slug: string;
  image: string;
  title: string;
  short_description: string;
};

type ServicesListProps = {
  services?: ServiceItem[];
  arrowColor?: string;
};

export default function ServicesList({
  services = [],
  arrowColor = "#0B63E5", // цвет стрелок по умолчанию
}: ServicesListProps) {
  return (
    <section className="w-full flex flex-col justify-center px-6 lg:px-4 xl:px-3.5 mx-auto">
      {/* mobile swiper */}
      <div className="block lg:hidden w-full">
        <div className="relative w-full max-w-[360px] mx-auto">
          <Swiper
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".services-prev",
              nextEl: ".services-next",
            }}
            spaceBetween={16}
            slidesPerView={2}
            className="w-full"
          >
            {services.map((service) => (
              <SwiperSlide
                key={service.slug}
                className="w-full aspect-square max-!w-[160px] !h-[160px] relative rounded-sm overflow-hidden"
              >
                <Link href={`/${service.slug}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 160px, 220px"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[138px] bg-gradient-to-b from-transparent to-black/90" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-semibold text-[18px] leading-[24px] mb-1">
                      {service.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* стрелки под слайдером */}
          <div className="mt-4 flex justify-center gap-12">
            <button
              aria-label="Попередня послуга"
              type="button"
              className="services-prev text-white"
            >
              <svg width="24" height="24" className="fill-current">
                <use href="/sprite.svg#ArrowLeftGray" />
              </svg>
            </button>

            <button
              aria-label="Наступна послуга"
              type="button"
              className="services-next text-white"
            >
              <svg width="24" height="24" className="fill-current">
                <use href="/sprite.svg#ArrowRightGray" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* desktop grid */}
      <div className="hidden lg:flex flex-wrap justify-center gap-4 w-full mx-auto max-w-[992px] xl:max-w-[1394px]">
        {services.map((service) => (
          <Link
            href={`/${service.slug}`}
            key={service.slug}
            className="relative min-w-[220px] min-h-[220px] lg:min-w-[320px] lg:min-h-[320px] xl:min-w-[454px] xl:min-h-[454px] rounded-sm overflow-hidden group"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 1024px) 220px, 320px"
              loading="lazy"
              draggable={false}
            />
            <div className="absolute bottom-0 left-0 w-full h-[160px] xl:h-[226px] bg-gradient-to-b from-transparent to-black/90" />
            <div className="absolute bottom-6 xl:bottom-[32px] left-6 xl:left-[32px] right-6 xl:right-[32px] text-white">
              <h3 className="font-bold text-[22px] leading-[32px] mb-2">
                {service.title}
              </h3>
              <p className="text-[18px] leading-[24px] opacity-80">
                {service.short_description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
