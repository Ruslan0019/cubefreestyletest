"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import { useTranslations } from "next-intl";
import ServicesDropdown from "../ServicesDropdownHeader/ServicesDropdownHeader";

export default function Header({ services = [], pageData, locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navigations");
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  return (
    <header className="w-full border-b bg-white shadow-sm fixed top-0 z-[30] xl:relative h-[80px]">
      <div className="mx-auto w-full max-w-[375px] lg:max-w-[1024px] xl:max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-[160px] py-3 lg:py-4">
        {/* ====== DESKTOP ====== */}
        <div className="hidden lg:flex items-center justify-between">
          {/* === Логотип === */}
          <Link
            href="/"
            aria-label={t("home_link")}
            title={t("home_link")}
            className="flex items-center space-x-2 hover:scale-110 active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
          >
            <svg width="80" height="48" aria-hidden="true">
              <use href="/sprite.svg#CubeLogo" />
            </svg>
          </Link>

          {/* === Навигация === */}
          <nav className="flex-1 items-center justify-center space-x-6 flex">
            <Link
              href="/about-cube"
              className="text-gray-700 hover:text-primary hover:scale-105 active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
            >
              {t("about")}
            </Link>

            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-primary hover:scale-105 active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
            >
              {t("portfolio")}
            </Link>

            <ServicesDropdown services={services} locale={locale} />

            <Link
              href="/clients"
              className="text-gray-700 hover:text-primary hover:scale-105 active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
            >
              {t("clients")}
            </Link>

            <Link
              href="/contacts"
              className="text-gray-700 hover:text-primary hover:scale-105 active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
            >
              {t("contacts")}
            </Link>
          </nav>

          {/* === Контакты и язык === */}
          <div className="items-center space-x-4 flex">
            <a
              href={`tel:${pageData.telephone}`}
              aria-label={t("call_us")}
              title={t("call_us")}
              className="text-gray-700 text-sm"
            >
              {pageData.telephone}
            </a>

            <a
              href={pageData.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("open_telegram")}
              title={t("open_telegram")}
              className="transition-transform duration-200 hover:scale-115"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/sprite.svg#telegram" />
              </svg>
            </a>

            <a
              href={pageData.viber}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("open_viber")}
              title={t("open_viber")}
              className="transition-transform duration-200 hover:scale-115"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/sprite.svg#viber" />
              </svg>
            </a>

            <LangSwitcher />
          </div>
        </div>

        {/* ====== MOBILE ====== */}
        <div className="grid grid-cols-3 items-center lg:hidden">
          {/* === Бургер === */}
          <div className="flex justify-start">
            <button
              aria-label={isOpen ? t("close_menu") : t("open_menu")}
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#02142E"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#02142E"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* === Логотип === */}
          <div className="flex justify-center">
            <Link
              href="/"
              aria-label={t("home_link")}
              title={t("home_link")}
              className="flex items-center active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
            >
              <svg
                className="w-20 h-12"
                viewBox="0 0 80 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill="#0B63E5"
                  d="M.002 43.729h79.996V48H.002v-4.271ZM.002 0h79.996v4.271H.002V0Z"
                />
                <path
                  fill="#02142E"
                  d="M58.486 7.174c1.489.203 2.146 1.375 2.235 2.773.22 3.467-.164 7.18-.013 10.672-.116.97-.772 1.303-1.569 1.655l-2.632.959c.985.343 2.102.634 3.053 1.046.682.295 1.175.666 1.245 1.471.354 4.072-.264 8.68-.014 12.807.027 1.013-1.277 2.274-2.221 2.274H44.802V7.174h13.684Zm-1.39 2.648h-8.673v12.13h5.179c.17 0 2.561-1.501 2.933-1.722.17-.102.365-.207.561-.242V9.822Zm.085 28.361v-11.66l-3.58-2.008h-5.178v13.668h8.758ZM25.603 7.174v31.009h9.347V7.174h3.536V38.91c0 .774-1.467 1.926-2.24 1.913-3.804-.232-8.028.34-11.783.012-1.259-.11-2.481-1.066-2.481-2.438V7.174h3.62Zm-9.6 10.166h-3.62V9.822H3.624v28.36h8.757v-8.2h3.621v8.67c0 1.033-1.354 2.1-2.325 2.17-3.613-.22-7.625.324-11.193.012-1.474-.129-2.488-1.17-2.485-2.69V9.776c.115-1.548.91-2.348 2.405-2.601 3.585.263 7.67-.355 11.197 0 1.006.101 2.401 1.065 2.401 2.177v7.988ZM79.832 7.174v2.648h-9.347V22.38h8.505v2.648h-8.505v13.155H80v2.648H66.864V7.174h12.968Z"
                />
              </svg>
            </Link>
          </div>

          {/* === Телефон / язык === */}
          <div className="flex justify-end">
            {isOpen ? (
              <LangSwitcher />
            ) : (
              <a
                href="tel:+380505926134"
                aria-label={t("call_us")}
                title={t("call_us")}
              >
                <svg width="40" height="40" aria-hidden="true">
                  <use href="/sprite.svg#phone" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* === MOBILE DROPDOWN === */}
      {isOpen && (
        <div className="flex flex-col justify-center items-center lg:hidden border-t bg-white px-4 py-2 space-y-2">
          <Link
            href="/about-cube"
            className="block text-gray-700 hover:text-primary active:scale-90 transition-all duration-200 ease-in-out"
          >
            {t("about")}
          </Link>

          <Link
            href="/portfolio"
            className="block text-gray-700 hover:text-primary active:scale-90 transition-all duration-200 ease-in-out"
          >
            {t("portfolio")}
          </Link>

          <Link
            href="/clients"
            className="block text-gray-700 hover:text-primary active:scale-90 transition-all duration-200 ease-in-out"
          >
            {t("clients")}
          </Link>

          <ServicesDropdown services={services} locale={locale} />

          <Link
            href="/contacts"
            className="block text-gray-700 hover:text-primary active:scale-90 transition-all duration-200 ease-in-out"
          >
            {t("contacts")}
          </Link>
        </div>
      )}
    </header>
  );
}
