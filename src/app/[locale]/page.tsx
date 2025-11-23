import { getTranslations } from "next-intl/server";
import { getPage } from "../../../lib/md";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import ServicesList from "@/components/ServicesList/ServicesList";
import { getClients, getCollection } from "../../../lib/content";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import ClientsSlider from "@/components/ClientsSlider/ClientsSlider";
import TeamList from "@/components/TeamList/TeamList";
import ContactForm from "@/components/ContactForm/ContactForm";
import HydratedVideo from "@/components/HydratedVideo/HydratedVideo";
import HeroRequestButton from "@/components/HeroRequestButton/HeroRequestButton";
import type { Metadata } from "next";

export const revalidate = 3600;
export const dynamic = "force-static";

type Locale = "uk" | "ru";
type Params = { locale: Locale };

type HomeSeo = {
  title_seo: string;
  description_seo: string;
};

export function generateStaticParams(): Params[] {
  return [{ locale: "uk" }, { locale: "ru" }];
}

// ✅ Исправлено: аргументы типизированы как any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { locale } = (await params) as Params;
  const page = (await getPage("home", locale)) as HomeSeo;

  const baseUrl = "https://cubefreestyle.com.ua";
  const ogLocale = locale === "ru" ? "ru_RU" : "uk_UA";

  return {
    alternates: {
      canonical: `${baseUrl}/${locale === "ru" ? "ru/" : ""}`,
      languages: {
        uk: `${baseUrl}/`,
        ru: `${baseUrl}/ru/`,
        "x-default": baseUrl,
      },
    },
    title: page.title_seo,
    description: page.description_seo,
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: "Cube Freestyle",
      title: page.title_seo,
      description: page.description_seo,
      images: [
        {
          url: `${baseUrl}/uploads/preview.jpg`,
          width: 1200,
          height: 630,
          alt: "Cube Freestyle Show",
        },
      ],
      url: `${baseUrl}/${locale === "ru" ? "ru/" : ""}`,
    },
  };
}

export default async function HomePage({ params }: any) {
  const { locale } = (await params) as Params;

  const [t, page, services, reviews, clients, team] = await Promise.all([
    getTranslations({ locale, namespace: "Home_page" }),
    getPage("home", locale),
    getCollection("services", locale),
    getCollection("reviews", locale),
    getClients(),
    getCollection("team", locale),
  ]);

  const servicesData = services.map((service: any) => ({
    value: service.title,
    label: service.title,
  }));

  return (
    <div className="flex flex-col items-center justify-center">
      {/* HERO */}
      <section className="relative w-full h-[700px] lg:h-[680px] xl:h-[780px] flex items-center justify-center lg:justify-start">
        <Image
          src={
            typeof window !== "undefined" && window.innerWidth < 1024
              ? page.hero_poster_mobile
              : page.hero_poster_desktop
          }
          alt="Hero poster"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
        />

        <HydratedVideo
          desktopVideo={page.hero_video_desktop}
          mobileVideo={page.hero_video_mobile}
          desktopPoster={page.hero_poster_desktop}
          mobilePoster={page.hero_poster_mobile}
        />

        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        <div className="relative z-20 w-full max-w-[375px] lg:max-w-[1024px] xl:max-w-[1440px] px-6 lg:px-10 xl:px-[160px] mx-auto">
          <div className="text-center lg:text-left text-white w-full max-w-[327px] lg:max-w-[566px]">
            <h1 className="text-4xl lg:text-5xl font-bold mb-10">
              {page.hero_title}
            </h1>
            <HeroRequestButton
              label={page.hero_button}
              servicesData={servicesData}
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="w-full max-w-[375px] lg:max-w-[1024px] xl:max-w-[1440px] pt-16 lg:pt-24 xl:pt-32 px-6 lg:px-10 xl:px-[160px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-[120px] items-center text-black">
        <div className="w-full max-w-[343px] lg:max-w-[944px] xl:max-w-[1136px] mx-auto">
          <h2 className="text-3xl font-bold mb-6">{page.about_title}</h2>
          <div className="prose prose-lg max-w-none flex flex-col gap-2">
            <ReactMarkdown>{page.about_description}</ReactMarkdown>
          </div>
        </div>
        <div className="relative w-full max-w-[343px] lg:max-w-[422px] xl:max-w-[496px] aspect-[496/486]">
          <Image
            src={page.about_image}
            alt="Футбольний м’яч"
            fill
            className="rounded-lg object-cover"
            sizes="(min-width:1441px) 496px, (min-width:1025px) 422px, 343px"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-50 py-20 px-6 w-full">
        <div className="max-w-[982px] xl:max-w-[1158px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center lg:justify-start">
            <Image
              src={page.whyUs_image}
              alt="Футболіст"
              width={400}
              height={500}
              className="max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>

          <div className="w-full max-w-[327px] lg:max-w-[510px] xl:max-w-[569px] m-auto">
            <h2 className="text-3xl text-dark font-bold mb-8">
              {page.whyUs_title}
            </h2>
            <div className="flex flex-col gap-6">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="flex items-start gap-4 bg-white p-6 pl-0 rounded-lg shadow hover:shadow-lg transition"
                >
                  <svg width="48" height="74">
                    <use href="/sprite.svg#CUBELOGO2" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-lg text-dark">
                      {page[`whyUs_card${num}_title`]}
                    </h3>
                    <p className="text-dark">
                      {page[`whyUs_card${num}_description`]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <h2 className="text-3xl lg:text-[36px] xl:text-[48px] font-bold mb-8 text-center text-dark">
        {t("service_title")}
      </h2>
      <ServicesList services={services} />

      {/* REVIEWS */}
      <section className="flex justify-center items-end w-full bg-[#0B63E5] -mt-[110px] lg:-mt-[144px] xl:-mt-[208px] h-[582px] lg:h-[672px] xl:h-[768px] overflow-x-clip">
        <div className="mb-12">
          <ReviewsList reviews={reviews} />
        </div>
      </section>

      {/* CLIENTS */}
      <section className="mt-12 xl:mt-32">
        <ClientsSlider clients={clients} />
      </section>

      {/* TEAM */}
      <section className="mt-24 xl:mt-32">
        <TeamList team={team} locale={locale} />
      </section>

      {/* MAP */}
      <h2 className="w-full max-w-[340px] lg:max-w-full text-4xl lg:text-5xl font-bold text-center text-[#001F54] mt-12 xl:mt-32">
        {t("map_title")}
      </h2>
      <section className="mx-auto w-full max-w-[376px] lg:max-w-[800px] h-[662px] lg:h-[644px] px-6 lg:px-10 xl:px-[160px] aspect-[376/500] lg:aspect-[800/450] relative">
        <Image
          src={page.map_image_mobile}
          alt="Карта"
          fill
          loading="lazy"
          className="lg:hidden object-contain"
          sizes="(min-width:1024px) 0px, 376px"
        />
        <Image
          src={page.map_image_desktop}
          alt="Карта"
          fill
          loading="lazy"
          className="hidden lg:block object-contain"
          sizes="(min-width:1024px) 800px, 0px"
        />
      </section>

      {/* CONTACT FORM */}
      <section className="w-full mt-12 xl:mt-32">
        <ContactForm />
      </section>
    </div>
  );
}
