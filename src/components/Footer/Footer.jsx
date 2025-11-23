"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

function Footer({ pageData }) {
  const date = new Date().getFullYear();
  const t = useTranslations();

  return (
    <footer className="bg-dark w-full">
      <div
        className="
          px-4 lg:px-10 xl:px-40 mx-auto
          w-full max-w-[1440px]
          mt-12 flex flex-col lg:justify-between items-center lg:flex-row lg:gap-16
        "
      >
        <Link
          className=" hover:scale-110 active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
          href="/"
          aria-label={t("Navigations.home_link")}
          title={t("Navigations.home_link")}
        >
          <svg width="48" height="74">
            <use href="/sprite.svg#CubeFooter" />
          </svg>
        </Link>

        <nav
          className="grid grid-rows-6 gap-y-3 mt-6 text-2xl text-center lg:text-start mb-6 
                     lg:grid-flow-col lg:grid-rows-3 lg:gap-x-32"
        >
          <Link
            className=" hover:scale-105 text-white text-lg font-normal leading-6 active:scale-95  transition-all duration-200 ease-in-out"
            href="/about-cube"
          >
            {t("Navigations.about")}
          </Link>
          <Link
            className=" hover:scale-105 text-white text-lg font-normal leading-6 active:scale-95  transition-all duration-200 ease-in-out"
            href="/portfolio"
          >
            {t("Navigations.portfolio")}
          </Link>
          <Link
            className=" hover:scale-105 text-white text-lg font-normal leading-6 active:scale-95  transition-all duration-200 ease-in-out"
            href="/clients"
          >
            {t("Navigations.clients")}
          </Link>
          <Link
            className=" hover:scale-105 text-white text-lg font-normal leading-6 active:scale-95  transition-all duration-200 ease-in-out"
            href="/contacts"
          >
            {t("Navigations.contacts")}
          </Link>
          <Link
            className=" hover:scale-105 text-white text-lg font-normal leading-6 active:scale-95  transition-all duration-200 ease-in-out"
            href="/privacy-policy"
          >
            {t("Navigations.privacy-policy")}
          </Link>
          <Link
            className=" hover:scale-105 text-white text-lg font-normal leading-6 active:scale-95  transition-all duration-200 ease-in-out"
            href="/terms-of-use"
          >
            {t("Navigations.terms-of-use")}
          </Link>
        </nav>

        <address className="mb-8">
          <div className="mb-4">
            <a
              href={`tel:${pageData.telephone}`}
              aria-label={t("Navigations.call_us")}
              title={t("Navigations.call_us")}
              className="text-white text-lg font-normal leading-6"
            >
              {pageData.telephone}
            </a>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <a
              className="transition-transform hover:scale-115"
              target="_blank"
              aria-label={t("Navigations.open_instagram")}
              title={t("Navigations.open_instagram")}
              href={pageData.instagram}
            >
              <svg width="44" height="44">
                <use href="/sprite.svg#instagramIcon" />
              </svg>
            </a>
            <a
              className="transition-transform hover:scale-115"
              target="_blank"
              aria-label={t("Navigations.open_youtube")}
              title={t("Navigations.open_youtube")}
              href={pageData.youtube}
            >
              <svg width="44" height="44">
                <use href="/sprite.svg#youtubeIcon" />
              </svg>
            </a>
          </div>
        </address>
      </div>

      <p className="py-4 border-t border-[#F4F7FA33] w-full text-center text-white/60 text-sm px-4">
        <span className="mr-2">{date}</span>
        {t("Footer.copyright")}
      </p>
    </footer>
  );
}

export default Footer;
