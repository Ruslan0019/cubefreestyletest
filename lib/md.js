"use server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const root = process.cwd();
const DEFAULT_LOCALE = "uk";

export async function getPage(slug, locale = DEFAULT_LOCALE) {
  const file = path.join(root, "content/pages", `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  // берем объект нужной локали из фронтматтера (uk/ru)
  const dict = data?.[locale] ?? data?.[DEFAULT_LOCALE] ?? {};

  // body можно хранить как обычный markdown под чертой --- (общий для всех языков)
  // либо сделать data.body.{uk|ru}. Ниже сначала ищем локализованный body, затем общий.
  const bodyRaw =
    (data?.body && (data.body[locale] ?? data.body[DEFAULT_LOCALE])) ||
    content ||
    "";

  const body = String(await remark().use(html).process(bodyRaw));

  // возвращаем плоский объект: title, hero_heading и т.п., + body (HTML)
  return { ...dict, body };
}
