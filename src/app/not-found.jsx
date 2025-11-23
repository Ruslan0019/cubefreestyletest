import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export const revalidate = false;
export const dynamic = "force-static";

export default async function NotFound() {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col items-center min-h-[90vh] px-4 justify-center">
        <div className="relative w-[290px] h-[153px] lg:w-[520px] lg:h-[275px] mb-[21px]">
          <Image
            src="/assets/images/404.webp"
            alt="404"
            fill
            className="object-contain"
          />
        </div>

        <h2 className="text-black text-[22px] lg:text-4xl leading-[32px] lg:leading-10 text-center mb-6 font-bold">
          {t("NotFound.title")}
        </h2>

        <Link
          href="/"
          className="bg-primary text-[18px] leading-[22px] lg:leading-6 hover:bg-primary-hover
                     px-[17px] py-3 rounded-sm text-lg font-semibold"
        >
          {t("NotFound.button")}
        </Link>
      </div>
    </NextIntlClientProvider>
  );
}
