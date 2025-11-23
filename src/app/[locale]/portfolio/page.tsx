import HeroArc from "@/components/HeroArc/HeroArc";
import { getPaginatedEvents } from "lib/getPaginatedEvents";
import { getCollection } from "@/../../lib/content";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import ContactForm from "@/components/ContactForm/ContactForm";
import Pagination from "@/components/Pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { getPage } from "../../../../lib/md";
import EventsGrid from "@/components/EventsGrid/EventsGrid";
import type { Metadata } from "next";

export const revalidate = 3600;
export const dynamic = "force-static";

// ---- TYPES ----
type Locale = "uk" | "ru";

type Params = {
  locale: Locale;
};

type SearchParams = {
  page?: string;
};

// generateStaticParams
export function generateStaticParams(): Params[] {
  return [{ locale: "uk" }, { locale: "ru" }];
}

// ---- METADATA ----
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;

  const pageParam = page ?? "1";

  const portfolio = await getPage("portfolio_page", locale);

  const basePath = `https://cubefreestyle.com.ua/${
    locale === "ru" ? "ru/" : ""
  }portfolio`;
  const url =
    pageParam && pageParam !== "1" ? `${basePath}?page=${pageParam}` : basePath;

  return {
    title: portfolio.title_seo ?? portfolio.title,
    description: portfolio.description_seo ?? "",
    alternates: {
      canonical: url,
      languages: {
        uk: "https://cubefreestyle.com.ua/portfolio",
        ru: "https://cubefreestyle.com.ua/ru/portfolio",
        "x-default": "https://cubefreestyle.com.ua/portfolio",
      },
    },
    openGraph: {
      title: portfolio.title_seo ?? portfolio.title,
      description: portfolio.description_seo ?? "",
      url,
      siteName: "Cube Freestyle",
      type: "website",
      images: [
        {
          url: "https://cubefreestyle.com.ua/uploads/preview.jpg",
          width: 1200,
          height: 630,
          alt: "Cube Freestyle Show",
        },
      ],
      locale,
    },
  };
}

// ---- PAGE ----
export default async function PortfolioPage({ params }: { params: any }) {
  const locale = (await params).locale as Locale;

  // ⚡ Делаем запросы параллельно
  const [reviews, portfolio, paginated] = await Promise.all([
    getCollection("reviews", locale),
    getPage("portfolio_page", locale),
    getPaginatedEvents(locale, 1),
  ]);

  const { items: events, totalPages } = paginated;

  return (
    <>
      <section className="flex flex-col items-center w-full bg-white text-dark">
        <div className="relative flex flex-col items-center justify-start w-full bg-white">
          <HeroArc />
          <h1 className="mt-12 lg:mt-14 text-[36px] leading-[40px] lg:text-[48px] lg:leading-[56px] xl:text-[62px] xl:leading-[72px] font-bold text-white text-center max-w-[343px] lg:max-w-[983px] z-1">
            {portfolio.title}
          </h1>

          <div className="w-full px-4 xl:px-40 mt-14 xl:mt-24 flex justify-center z-[2]">
            <EventsGrid events={events as any} locale={locale} />
          </div>

          <Pagination
            currentPage={1}
            totalPages={totalPages}
            basePath="/portfolio"
          />
        </div>

        <section className="pt-24 pb-12 xl:py-32 flex justify-center items-end w-full overflow-x-clip">
          <ReviewsList
            reviews={reviews as any}
            titleColor="#02142e"
            arrowColor="#838E9E"
          />
        </section>

        <ContactForm />
      </section>

      <div className="px-4 lg:px-10 xl:px-40 my-4 lg:my-6">
        <Breadcrumbs />
      </div>
    </>
  );
}
