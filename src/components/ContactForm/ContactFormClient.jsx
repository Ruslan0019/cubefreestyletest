"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactFormClient({ services = [] }) {
  const t = useTranslations("ContactForm");

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("CONTACT_FORM_CLIENT_ERROR", err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center 
          py-12 lg:py-16 px-4 lg:px-[131px] xl:px-[339px] w-full 
          bg-[url('/BackgroundForm.svg')] bg-cover bg-center bg-no-repeat"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-[343px] lg:max-w-[762px]"
        >
          <h2 className="m-auto text-4xl text-center font-bold leading-10 text-white">
            {t("title")}
          </h2>

          <div className="gap-6 flex flex-col lg:flex-row">
            <label className="flex flex-col text-left flex-1">
              <span className="block text-white/90 mb-1">
                {t("name_label")}
              </span>
              <input
                id="name"
                name="name"
                required
                minLength={2}
                placeholder={t("name_placeholder")}
                className="w-full outline-none  rounded-md bg-white/10 text-white px-4 py-3 ring-1 ring-white/20 focus:ring-2"
              />
            </label>

            <label className="flex flex-col text-left flex-1">
              <span className="block text-white/90 mb-1">
                {t("phone_label")}
              </span>
              <input
                name="phone"
                required
                inputMode="tel"
                placeholder={t("phone_placeholder")}
                className="w-full rounded-md outline-none bg-white/10 text-white px-4 py-3 ring-1 ring-white/20 focus:ring-2"
              />
            </label>
          </div>

          <label className="flex flex-col text-left">
            <span className="block text-white/90 mb-1">
              {t("service_label")}
            </span>
            <select
              name="service"
              required
              className="w-full rounded-md bg-white/10 text-white px-4 py-3 ring-1 ring-white/20 focus:ring-2"
            >
              <option value="">{t("service_placeholder")}</option>
              {services.map((s) => (
                <option key={s.value} value={s.value} className="text-black">
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-left">
            <span className="block text-white/90 mb-1">
              {t("massage_label")}
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder={t("massage_placeholder")}
              className="w-full outline-none rounded-md bg-white/10 text-white px-4 py-3 ring-1 ring-white/20 focus:ring-2 resize-none"
            />
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSending}
              className="rounded-md bg-white text-blue-700 font-medium px-5 py-2 shadow hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? "Відправляємо..." : t("batton")}
            </button>
          </div>
        </form>
      </section>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-sm w-11/12 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-6">
              Ми отримали вашу заявку і скоро з вами звʼяжемось
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="inline-flex items-center justify-center rounded-md bg-[#0B63E5] text-white px-6 py-2 font-medium shadow hover:shadow-md transition"
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </>
  );
}
