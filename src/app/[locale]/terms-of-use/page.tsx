import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getPage } from "../../../../lib/md";
import type { Metadata } from "next";

export const revalidate = false;
export const dynamic = "force-static";

// ---- TYPES ----
type Locale = "uk" | "ru";

type Params = {
  locale: Locale;
};

type TermsSeo = {
  title_seo: string;
  description_seo: string;
};

// ---- STATIC PARAMS ----
export function generateStaticParams(): Params[] {
  return [{ locale: "uk" }, { locale: "ru" }];
}

// ---- METADATA ----
export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { locale } = (await params) as Params;
  const page = (await getPage("terms_of_use", locale)) as TermsSeo;

  const baseUrl = "https://cubefreestyle.com.ua";
  const ogLocale = locale === "ru" ? "ru_RU" : "uk_UA";

  return {
    alternates: {
      canonical: `${baseUrl}/${locale === "ru" ? "ru/" : ""}terms-of-use`,
      languages: {
        uk: `${baseUrl}/terms-of-use`,
        ru: `${baseUrl}/ru/terms-of-use`,
        "x-default": `${baseUrl}/terms-of-use`,
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
      url: `${baseUrl}/${locale === "ru" ? "ru/" : ""}terms-of-use`,
    },
  };
}

// ---- PAGE ----
export default async function TermsOfUsePage({ params }: { params: any }) {
  const { locale } = (await params) as Params;
  const t = await getTranslations({ locale, namespace: "Terms_of_use_page" });

  return (
    <section className="text-dark w-full max-w-[375px] lg:max-w-[1024px] xl:max-w-[1440px] px-4 lg:px-10 xl:px-[160px] mx-auto">
      <h1 className="text-[36px] lg:text-[48px] xl:text-[62px] leading-[40px] lg:leading-[56px] xl:leading-[72px] font-bold text-center mt-[62px]">
        {t("title")}
      </h1>

      <div className="mb-14 lg:mb-24 xl:mb-32">
        <p className="mb-4 font-normal text-lg leading-6 mt-[58px]">
          {t("updated")}
        </p>

        <div className="mt-4">
          <h3>{t("sections.general.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>
              {t("sections.general.items.1")}{" "}
              <Link className="text-primary" href="/">
                https://cubefreestyle.com.ua
              </Link>
            </li>
            <li>{t("sections.general.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.ip.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.ip.items.1")}</li>
            <li>{t("sections.ip.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.permitted_use.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.permitted_use.items.1")}</li>
            <li>{t("sections.permitted_use.items.2")}</li>
            <li>{t("sections.permitted_use.items.3")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.prohibited_use.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.prohibited_use.items.1")}</li>
            <li>{t("sections.prohibited_use.items.2")}</li>
            <li>{t("sections.prohibited_use.items.3")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.user_content.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.user_content.items.1")}</li>
            <li>{t("sections.user_content.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.disclaimer.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.disclaimer.items.1")}</li>
            <li>{t("sections.disclaimer.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.external_links.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.external_links.items.1")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.quoting_rules.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.quoting_rules.items.1")}</li>
            <li>{t("sections.quoting_rules.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.disputes.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.disputes.items.1")}</li>
            <li>{t("sections.disputes.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.changes.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.changes.items.1")}</li>
            <li>{t("sections.changes.items.2")}</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>{t("sections.contacts.title")}</h3>
          <ul className="ml-8 list-disc">
            <li>{t("sections.contacts.text")}</li>
          </ul>
        </div>
      </div>

      <div className="my-4 lg:my-6">
        <Breadcrumbs />
      </div>
    </section>
  );
}
