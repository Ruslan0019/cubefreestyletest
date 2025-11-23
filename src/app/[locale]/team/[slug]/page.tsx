import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection } from "../../../../../lib/content";
import GallerySection from "@/components/GallerySection/GallerySection";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import type { Metadata } from "next";

export const revalidate = 3600;
export const dynamic = "force-static";

// ---- TYPES ----
type Locale = "uk" | "ru";

type Params = {
  locale: Locale;
  slug: string;
};

type TeamAchievement = {
  text: string;
  [key: string]: unknown;
};

type TeamGalleryImage = {
  image: string;
  [key: string]: unknown;
};

type TeamMember = {
  slug: string;
  name: string;
  description_seo: string;
  title_seo: string;
  photo: string;
  bio: string;
  section_title: string;
  achievements?: TeamAchievement[];
  gallery?: TeamGalleryImage[];
};

// ---- STATIC PARAMS ----
export async function generateStaticParams(): Promise<Params[]> {
  const locales: Locale[] = ["uk", "ru"];
  const allParams: Params[] = [];

  for (const locale of locales) {
    const team = (await getCollection("team", locale)) as TeamMember[];
    for (const m of team) {
      allParams.push({ slug: m.slug, locale });
    }
  }

  return allParams;
}

// ---- METADATA ----
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { slug, locale } = (await params) as Params;

  const team = (await getCollection("team", locale)) as TeamMember[];
  const member = team.find((m) => m.slug === slug);
  const baseUrl = "https://cubefreestyle.com.ua";
  const ogLocale = locale === "ru" ? "ru_RU" : "uk_UA";

  if (!member) {
    return {
      title: "Cube Freestyle",
      description: "Team member not found",
    };
  }

  return {
    alternates: {
      canonical: `${baseUrl}/${locale === "ru" ? "ru/" : ""}team/${member.slug}`,
      languages: {
        uk: `${baseUrl}/team/${member.slug}`,
        ru: `${baseUrl}/ru/team/${member.slug}`,
        "x-default": `${baseUrl}/team/${member.slug}`,
      },
    },
    title: member.title_seo,
    description: member.description_seo,
    openGraph: {
      title: member.title_seo,
      description: member.description_seo,
      type: "profile",
      url: `${baseUrl}/${locale === "ru" ? "ru/" : ""}team/${member.slug}`,
      siteName: "Cube Freestyle",
      locale: ogLocale,
      images: [
        {
          url: `${baseUrl}/uploads/preview.jpg`,
          width: 1200,
          height: 630,
          alt: "Cube Freestyle Show",
        },
      ],
    },
  };
}

// ---- PAGE ----
export default async function TeamMemberPage({ params }: { params: any }) {
  const { slug, locale } = (await params) as Params;

  const team = (await getCollection("team", locale)) as TeamMember[];
  const member = team.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  const achievements = member.achievements ?? [];
  const galleryImages = member.gallery?.map((img) => img.image) ?? [];

  return (
    <section className="w-full mt-8 px-4 lg:px-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center lg:items-start mb-20 lg:mb-24 max-w-[1024px] mx-auto">
        <div className="w-full max-w-[298px] lg:max-w-[398px]">
          <Image
            src={member.photo}
            alt={member.name}
            width={600}
            height={800}
            priority
            className="rounded-full w-full object-cover"
            sizes="(max-width: 1024px) 298px, 398px"
          />
        </div>

        <div className="flex flex-col w-full max-w-[343px] lg:max-w-[498px] text-center lg:text-start">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-primary">
            {member.name}
          </h1>

          {achievements.length > 0 && (
            <ul className="text-dark flex flex-col gap-3 text-[18px] leading-[1.5]">
              {achievements.map((a, i) => (
                <li key={i}>{a.text}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[343px] lg:max-w-[944px] mx-auto text-dark">
        <h2 className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-14 text-center">
          {member.section_title}
        </h2>

        <p className="mb-6 lg:mb-8 leading-relaxed">{member.bio}</p>

        {achievements.length > 0 && (
          <ul className="text-dark flex flex-col gap-3">
            {achievements.map((a, i) => (
              <li key={i}>{a.text}</li>
            ))}
          </ul>
        )}
      </div>

      {galleryImages.length > 0 && (
        <section className="my-16 lg:my-24">
          <GallerySection images={galleryImages as any} />
        </section>
      )}

      <div className="my-4 lg:my-6">
        <Breadcrumbs />
      </div>
    </section>
  );
}
