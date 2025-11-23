"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "use-intl";

type BreadcrumbsProps = {
  serviceData?: {
    title?: string;
  } | null;
};

export default function Breadcrumbs({ serviceData }: BreadcrumbsProps) {
  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations("Breadcrumbs");

  const segments = pathname
    .split("/")
    .filter((seg) => seg && seg !== "uk" && seg !== "ru");

  if (segments.length === 0) return null;

  const mainSection = segments[0];

  // Страница услуги: /[slug] и есть serviceData.title
  const isServicePage = segments.length === 1 && !!serviceData?.title;

  const label = isServicePage
    ? serviceData!.title!
    : t(mainSection) || mainSection;

  const baseUrl = "https://cubefreestyle.com.ua/";
  const localePrefix = locale === "ru" ? "ru/" : "";
  const currentUrl = `${baseUrl}${localePrefix}${segments.join("/")}`;

  const itemListElement: any[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: t("home"),
      item: `${baseUrl}${localePrefix}`,
    },
  ];

  if (isServicePage) {
    // Главная / {service.title}
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: serviceData!.title!,
      item: currentUrl,
    });
  } else {
    // Все остальные страницы — как было
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: t(mainSection) || mainSection,
    });
  }

  return (
    <nav className="text-sm text-[#838E9E] flex gap-2 flex-wrap w-full max-w-[343px] lg:max-w-[944px] xl:max-w-[1120px] lg:m-auto">
      <Link href="/" className="hover:text-[#0B63E5] transition">
        {t("home")}
      </Link>

      <span className="flex items-center gap-2">
        <span>/</span>
        <span className="text-[#02142E] font-semibold">{label}</span>
      </span>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement,
          }),
        }}
      />
    </nav>
  );
}
