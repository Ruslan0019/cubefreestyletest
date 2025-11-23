// src/app/[locale]/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceClient from "@/components/ServiceClient/ServiceClient";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { getCollection } from "@/../../lib/content";
import FaqSection from "@/components/Faq/FaqSection";

export const revalidate = 3600;
export const dynamic = "force-static";
export const dynamicParams = false;

type Locale = "uk" | "ru";

interface Service {
  slug: string;
  title: string;
  title_seo: string;
  description_seo: string;
  [key: string]: unknown;
}

interface ServicePageParams {
  locale: Locale;
  slug: string;
}

interface ServicePageProps {
  params: Promise<ServicePageParams>;
}

async function getService(
  locale: Locale,
  slug: string
): Promise<Service | undefined> {
  const services = (await getCollection("services", locale)) as Service[];
  return services.find((service) => service.slug === slug);
}

export async function generateStaticParams(): Promise<ServicePageParams[]> {
  const locales: Locale[] = ["uk", "ru"];

  const paramsByLocale = await Promise.all(
    locales.map(async (locale) => {
      const services = (await getCollection("services", locale)) as Service[];

      return services.map((service) => ({
        slug: service.slug,
        locale,
      }));
    })
  );

  return paramsByLocale.flat();
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const serviceData = await getService(locale, slug);
  const baseUrl = "https://cubefreestyle.com.ua";
  const ogLocale = locale === "ru" ? "ru_RU" : "uk_UA";
  if (!serviceData) {
    notFound();
  }
  return {
    title: serviceData.title_seo,
    description: serviceData.description_seo,
    alternates: {
      canonical: `${baseUrl}/${locale === "ru" ? "ru/" : ""}${slug}`,
      languages: {
        uk: `${baseUrl}/${slug}`,
        ru: `${baseUrl}/ru/${slug}`,
        "x-default": `${baseUrl}/${slug}`,
      },
    },
    openGraph: {
      title: serviceData.title_seo,
      description: serviceData.description_seo,
      url: `${baseUrl}/${locale === "ru" ? "ru/" : ""}${slug}`,
      siteName: "Cube Freestyle",
      images: [
        {
          url: `${baseUrl}/uploads/preview.jpg`,
          width: 1200,
          height: 630,
          alt: "Cube Freestyle Show",
        },
      ],
      type: "website",
      locale: ogLocale,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, locale } = await params;
  const serviceData = await getService(locale, slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <>
      <ServiceClient serviceData={serviceData} locale={locale} />
      <div className="px-4 lg:px-10 xl:px-40 my-10">
        <FaqSection
          faq={(serviceData as any).faq || []}
          title={(serviceData as any).faq_title || ""}
        />
      </div>
      <div className="px-4 lg:px-10 xl:px-40 my-4 lg:my-6">
        <Breadcrumbs serviceData={serviceData} />
      </div>
    </>
  );
}
