import { getCollection } from "./content";

export type Locale = "uk" | "ru";

export interface PortfolioEvent {
  // подставь реальные поля, если знаешь
  slug: string;
  title: string;
  image?: string;
  date?: string;
  [key: string]: unknown;
}

export interface PaginatedEventsResult {
  items: PortfolioEvent[];
  total: number;
  totalPages: number;
}

export async function getPaginatedEvents(
  locale: Locale,
  page = 1,
  perPage = 9
): Promise<PaginatedEventsResult> {
  const events = (await getCollection("portfolio", locale)) as PortfolioEvent[];

  const total = events.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const items = events.slice(start, end);

  return {
    items,
    total,
    totalPages: Math.ceil(total / perPage),
  };
}
