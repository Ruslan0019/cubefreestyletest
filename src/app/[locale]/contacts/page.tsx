import HeroArc from "@/components/HeroArc/HeroArc";
import { getPage } from "../../../../lib/md";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCollection } from "lib/content";
import ContactFormInner from "@/components/ContactForm/ContactFormInner";

type Locale = "uk" | "ru";

interface Params {
  locale: Locale;
}

interface ContactPageData {
  title: string;
  subtitle: string;
  title_seo: string;
  description_seo: string;
  contact_info: {
    location_title: string;
    location_value: string;
    area_title: string;
    area_value: string;
    phone_title: string;
    phone_number: string;
    email_title: string;
    email: string;
  };
  form: {
    form_title: string;
    name_label: string;
    name_placeholder: string;
    phone_label: string;
    phone_placeholder: string;
    service_label: string;
    service_placeholder: string;
    message_label: string;
    message_placeholder: string;
    button_text: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPage("contacts", locale);
  const baseUrl = "https://cubefreestyle.com.ua";
  const ogLocale = locale === "ru" ? "ru_RU" : "uk_UA";

  return {
    title: page.title_seo,
    description: page.description_seo,
    alternates: {
      canonical: `${baseUrl}/${locale === "ru" ? "ru/" : ""}contacts`,
      languages: {
        uk: "/contacts",
        ru: "/ru/contacts",
        "x-default": `${baseUrl}/contacts`,
      },
    },

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
      url: `${baseUrl}/${locale === "ru" ? "ru/" : ""}contacts`,
    },
  };
}

export function generateStaticParams(): Params[] {
  return [{ locale: "uk" }, { locale: "ru" }];
}

export const revalidate = 3600;
export const dynamic = "force-static";

export default async function ContactsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const servicesData = await getCollection("services", locale);
  const linkSocial = await getPage("social_links");

  const services = servicesData.map((service: any) => ({
    value: service.title,
    label: service.title,
  }));

  const contactsPage: ContactPageData = await getPage("contacts", locale);

  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full flex flex-col items-center justify-start bg-white">
        <HeroArc />
        <h1 className="mt-12 z-1 lg:mt-14 xl:mt-[80px] text-[36px] leading-[40px] lg:text-[48px] lg:leading-[56px] xl:text-[62px] xl:leading-[72px] font-bold text-white text-center max-w-[343px] lg:max-w-[983px]">
          {contactsPage.title}
        </h1>
        <p className="mt-4 lg:mt-6 max-w-[343px] lg:max-w-[804px] text-[16px] lg:text-[18px] font-semibold text-white text-center">
          {contactsPage.subtitle}
        </p>
      </div>

      <section className="relative z-10 flex justify-center m-auto lg:mt-14 xl:mt-[80px] mb-24 xl:mb-[128px] ">
        <div
          className="
            flex flex-col lg:flex-row shadow-[0px_4px_24px_rgba(20,25,26,0.12)]
             w-full max-w-[343px] lg:max-w-[944px] xl:max-w-[1120px]
            rounded-[4px] overflow-hidden
          "
        >
          <aside
            className="
              flex flex-col justify-center px-6 lg:px-10 gap-[24px] bg-[#F4F7FA]
              w-full lg:w-[336px] xl:w-[400px] py-10
            "
          >
            <div className="flex gap-6 items-center">
              <svg width="32" height="32">
                <use href="/sprite.svg#contactLocation" />
              </svg>
              <div>
                <p className="text-[18px] text-[#02142E]">
                  {contactsPage.contact_info.location_title}
                </p>
                <p className="font-semibold text-[18px] text-[#02142E]">
                  {contactsPage.contact_info.location_value}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <svg width="32" height="32">
                <use href="/sprite.svg#contactLocation" />
              </svg>
              <div>
                <p className="text-[18px] text-[#02142E]">
                  {contactsPage.contact_info.area_title}
                </p>
                <p className="font-semibold text-[18px] text-[#02142E]">
                  {contactsPage.contact_info.area_value}
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <svg width="32" height="32">
                <use href="/sprite.svg#contactPhone" />
              </svg>
              <div>
                <p className="text-[18px] text-[#02142E]">
                  {contactsPage.contact_info.phone_title}
                </p>
                <a
                  href={`tel:${contactsPage.contact_info.phone_number}`}
                  className="font-semibold text-[18px] text-[#0B63E5]"
                >
                  {contactsPage.contact_info.phone_number}
                </a>
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <svg width="32" height="32" overflow="visible">
                <use href="/sprite.svg#contactEmail" />
              </svg>
              <div>
                <p className="text-[18px] text-[#02142E]">
                  {contactsPage.contact_info.email_title}
                </p>
                <a
                  href={`mailto:${contactsPage.contact_info.email}`}
                  className="font-semibold text-[18px] text-[#0B63E5]"
                >
                  {contactsPage.contact_info.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-[12px] m-auto ">
              <a
                className="transition-transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
                href={linkSocial.instagram}
              >
                <svg width="48" height="48" overflow="visible">
                  <use href="/sprite.svg#contactInstagram" />
                </svg>
              </a>
              <a
                href={linkSocial.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105"
              >
                <svg width="48" height="48" overflow="visible">
                  <use href="/sprite.svg#contactTelegram" />
                </svg>
              </a>
              <a
                href={linkSocial.viber}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-105"
              >
                <svg width="48" height="48" overflow="visible">
                  <use href="/sprite.svg#contactViber" />
                </svg>
              </a>
            </div>
          </aside>

          <div
            className="
              flex flex-col items-center justify-center px-6 lg:px-[56px] bg-white
              w-full lg:w-[608px] xl:w-[720px] py-10
            "
          >
            <h2
              className="
                text-[22px] leading-[32px] font-bold text-[#02142E] text-center mb-[32px]
                lg:text-[36px] lg:leading-[40px] lg:mb-[48px]
              "
            >
              {contactsPage.form.form_title}
            </h2>

            <ContactFormInner contactsPage={contactsPage} services={services} />
          </div>
        </div>
      </section>

      <div className="px-4 lg:px-10 xl:px-40 my-4 lg:my-6">
        <Breadcrumbs />
      </div>
    </section>
  );
}
