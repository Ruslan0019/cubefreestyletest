import { getCollection } from "@/../../lib/content";
import React from "react";
import ReactMarkdown from "react-markdown";
import GallerySection from "../GallerySection/GallerySection";
import ReviewsList from "../ReviewsList/ReviewsList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ContactForm from "../ContactForm/ContactForm";
import HeroArc from "../HeroArc/HeroArc";
import { getTranslations } from "next-intl/server";
import HeroRequestButton from "../HeroRequestButton/HeroRequestButton";

export default async function ServiceClient({ locale, serviceData }) {
  const gallery = await getCollection("gallery");
  const images = gallery[0]?.images || [];
  const reviews = await getCollection("reviews", locale);
  const t = await getTranslations({ locale });
  const servicesData = await getCollection("services", locale);

  const servicesOptions = servicesData.map((service) => ({
    value: service.title,
    label: service.title,
  }));

  return (
    <section className="flex flex-col items-center w-full bg-white text-dark">
      <div className="relative w-full flex flex-col items-center justify-start bg-white">
        <HeroArc />
        <h1 className=" mt-12 lg:mt-14 text-[36px] z-2 leading-[40px] lg:text-[48px] lg:leading-[56px] xl:text-[62px] xl:leading-[72px] font-bold text-white text-center max-w-[343px] lg:max-w-[983px]">
          {serviceData.title}
        </h1>

        {serviceData.video && (
          <div className="relative w-full flex justify-center mt-[40px] xl:mt-[100px] z-10 px-4 lg:px-10 xl:px-40">
            <div className="w-[343px] h-[184px] lg:w-[944px] lg:h-[506px] xl:w-[1120px] xl:h-[600px] rounded-md overflow-hidden shadow-md">
              <VideoPlayer src={serviceData.video} />
            </div>
          </div>
        )}
        <div className="mt-6 xl:mt-10 flex justify-center w-full max-w-[343px]  px-4 text-white">
          <HeroRequestButton
            className={` w-[343px] lg:w-[400px]`}
            label={t("Home_page.button")}
            servicesData={servicesOptions}
          />
        </div>
      </div>

      <section className="w-full px-4 lg:px-10 xl:px-40 py-10 lg:py-16">
        <div className="mx-auto max-w-[343px] lg:max-w-[944px] xl:max-w-[1120px]">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="w-full text-[16px] leading-[22px] lg:text-lg lg:leading-relaxed flex flex-col gap-4">
              <ReactMarkdown>{serviceData.body}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>

      <GallerySection images={images} />
      <section className="pt-24 pb-12 xl:py-32 flex justify-center items-end w-full overflow-x-clip">
        <ReviewsList
          reviews={reviews}
          titleColor={"#02142e"}
          arrowColor="#838E9E"
        />
      </section>
      <ContactForm />
    </section>
  );
}
