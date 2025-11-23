import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { NextIntlClientProvider } from "next-intl";
import { getCollection } from "../../../lib/content";
import { getPage } from "lib/md";

type Locale = "uk" | "ru";

interface Service {
  title: string;
  slug: string;
  image?: string;
  [key: string]: any;
}

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = (await params) as { locale: Locale };
  const pageData = await getPage("social_links");

  const [messagesModule, servicesData] = await Promise.all([
    import(`../../../messages/${locale}.json`),
    getCollection("services", locale),
  ]);

  const services = servicesData as Service[];

  const messages = messagesModule.default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header
        pageData={pageData as any}
        services={services as any}
        locale={locale}
      />
      <main className="pt-[80px] xl:pt-[0]">{children}</main>
      <Footer pageData={pageData as any} />
    </NextIntlClientProvider>
  );
}
