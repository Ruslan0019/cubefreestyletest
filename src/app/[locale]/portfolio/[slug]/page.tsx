import { notFound, redirect } from "next/navigation";
import { getPaginatedEvents } from "lib/getPaginatedEvents";
import HeroArc from "@/components/HeroArc/HeroArc";
import Pagination from "@/components/Pagination/Pagination";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import ContactForm from "@/components/ContactForm/ContactForm";
import { getCollection } from "@/../../lib/content";
import { getPage } from "../../../../../lib/md";
import EventsGrid from "@/components/EventsGrid/EventsGrid";
import type { Metadata } from "next";

export const revalidate = 3600;
export const dynamic = "force-static";

// ---- TYPES ----
type Locale = "uk" | "ru";

type Params = {
  locale: Locale;
  slug: string;
};

// ---- METADATA ----
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { locale, slug } = (await params) as Params;
  const portfolio = await getPage("portfolio_page", locale);
  const baseUrl = "https://cubefreestyle.com.ua";
  const ogLocale = locale === "ru" ? "ru_RU" : "uk_UA";

  const m = /^page-(\d+)$/.exec(slug);
  const pageNum = m ? Number(m[1]) : 1;

  const basePath = `/${locale === "ru" ? "ru/" : ""}portfolio`;
  const path = pageNum > 1 ? `${baseUrl}${basePath}/page-${pageNum}` : basePath;

  const isRu = locale === "ru";

  let title: string;
  let description: string;

  if (pageNum > 1) {
    if (isRu) {
      title = `Страница ${pageNum}. Портфолио Команды по Футбольному Фристайлу CUBE`;
      description = `Страница ${pageNum}. Ознакомьтесь с фото и видео с показательных выступлений и мастер-классов от команды профессиональных футбольных фристайлеров из команды “КУБ”`;
    } else {
      title = `Сторінка ${pageNum}. Портфоліо Команди з Футбольного Фрістайлу CUBE`;
      description = `Сторінка ${pageNum}. Ознайомтеся з фото та відео з показових виступів та майстер-класів від команди професійних футбольних фрістайлерів із команди “КУБ”`;
    }
  } else {
    // На всякий случай fallback для 1-й страницы (хотя она у тебя отдельной страницей)
    title = portfolio.title_seo ?? portfolio.title;
    description = portfolio.description_seo ?? "";
  }

  return {
    // 3️⃣ Ставим уже вычисленные title/description
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        uk: pageNum > 1 ? `${baseUrl}/portfolio/page-${pageNum}` : `/portfolio`,
        ru:
          pageNum > 1
            ? `${baseUrl}/ru/portfolio/page-${pageNum}`
            : `/ru/portfolio`,
        "x-default": `${baseUrl}/portfolio`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Cube Freestyle",
      type: "website",
      images: [
        {
          url: `${baseUrl}/uploads/preview.jpg`,
          width: 1200,
          height: 630,
          alt: "Cube Freestyle Show",
        },
      ],
      locale: ogLocale,
    },
  };
}

// ---- STATIC PARAMS ----
export async function generateStaticParams() {
  const locales: Locale[] = ["uk", "ru"];
  const allParams: Params[] = [];

  for (const locale of locales) {
    const { totalPages } = await getPaginatedEvents(locale, 1);
    for (let i = 2; i <= totalPages; i++) {
      allParams.push({ locale, slug: `page-${i}` });
    }
  }

  return allParams;
}

// ---- PAGE ----
export default async function PortfolioSlugPage({ params }: { params: any }) {
  const { locale, slug } = (await params) as Params;

  const match = slug.match(/^page-(\d+)$/);
  const page = match ? Number(match[1]) : null;

  if (!page) notFound();
  if (page === 1) redirect("/portfolio");

  // ⚡ параллельно тянем события, отзывы и страницу
  const [paginated, reviews, portfolio] = await Promise.all([
    getPaginatedEvents(locale, page),
    getCollection("reviews", locale),
    getPage("portfolio_page", locale),
  ]);

  const { items: events, totalPages } = paginated;

  if (page < 1 || page > totalPages) notFound();

  return (
    <section className="flex flex-col items-center w-full bg-white text-dark">
      <HeroArc />
      <h1 className="mt-12 lg:mt-14 text-[36px] leading-[40px] lg:text-[48px] lg:leading-[56px] xl:text-[62px] xl:leading-[72px] font-bold text-white text-center max-w-[343px] lg:max-w-[983px] z-1">
        {portfolio.title}
      </h1>

      <div className="w-full px-4 xl:px-40 mt-14 xl:mt-24 flex justify-center z-[2]">
        <EventsGrid events={events as any} locale={locale} />
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/portfolio"
      />

      <section className="pt-24 pb-12 xl:py-32">
        <ReviewsList
          reviews={reviews as any}
          titleColor="#02142e"
          arrowColor="#838E9E"
        />
      </section>

      <ContactForm />
    </section>
  );
}
