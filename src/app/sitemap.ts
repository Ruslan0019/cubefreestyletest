import { getCollection } from "lib/content";
import type { MetadataRoute } from "next";

const BASE_URL = "https://cubefreestyle.com.ua";

const LOCALES = ["uk", "ru"] as const;
type Locale = (typeof LOCALES)[number];

// Собираем полный URL с учётом языка
function getUrl(path: string, locale: Locale) {
  const prefix = locale === "ru" ? "/ru" : "";
  return `${BASE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Загружаем данные коллекций
  const services = await getCollection("services", "uk");
  const teams = await getCollection("team", "uk");

  const entries: MetadataRoute.Sitemap = [];

  // --- 1️⃣ Статические страницы ---
  const STATIC_PATHS = [
    "",
    "/portfolio",
    "/about-cube",
    "/clients",
    "/contacts",
    "/privacy-policy",
    "/terms-of-use",
  ];

  for (const path of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: getUrl(path, locale),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
  }

  // --- 2️⃣ Динамические страницы: /[slug] (услуги) ---
  for (const item of services) {
    for (const locale of LOCALES) {
      const path = `/${item.slug}`;
      entries.push({
        url: getUrl(path, locale),
        lastModified: new Date(item.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  // --- 3️⃣ Динамические страницы: /team/[slug] (фристайлеры) ---
  for (const member of teams) {
    for (const locale of LOCALES) {
      const path = `/team/${member.slug}`;
      entries.push({
        url: getUrl(path, locale),
        lastModified: new Date(member.updatedAt || Date.now()),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
