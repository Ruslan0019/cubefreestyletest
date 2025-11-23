"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function RequestShowModal({
  isOpen,
  onClose,
  servicesData = [],
}) {
  const t = useTranslations("ContactForm");

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      setIsSending(false);
      setShowSuccess(false);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

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

      if (!res.ok) throw new Error("Request failed");

      form.reset();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose?.();
      }, 3000);
    } catch (err) {
      console.error("REQUEST_SHOW_MODAL_CONTACT_ERROR", err);
    } finally {
      setIsSending(false);
    }
  };

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4 isolate"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-[4px] shadow-[0_4px_24px_rgba(20,25,26,0.12)]
                     w-full max-w-[343px] lg:max-w-[926px]
                     h-auto lg:h-[646px]
                     flex flex-col items-center
                     gap-4 lg:gap-12
                     py-4 px-4 lg:py-16 lg:px-12"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 w-6 h-6 flex items-center justify-center"
            aria-label="Close"
          >
            <span className="block w-5 h-5 relative">
              <span className="absolute inset-0 bg-[#02142E] rotate-45 origin-center h-[2px] top-1/2" />
              <span className="absolute inset-0 bg-[#02142E] -rotate-45 origin-center h-[2px] top-1/2" />
            </span>
          </button>

          <h3
            className="text-center text-[#02142E] font-bold
                       max-w-[295px] lg:max-w-[762px]
                       text-[22px] leading-8 lg:text-[36px] lg:leading-10"
          >
            {t("title")}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-8 lg:gap-12
                       max-w-[295px] lg:max-w-[762px]"
          >
            <div className="w-full flex flex-col gap-6">
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="flex flex-col gap-[6px] w-full lg:w-1/2">
                  <label
                    htmlFor="name"
                    className="text-[14px] leading-[18px] text-[#02142E]"
                  >
                    {t("name_label")}
                  </label>
                  <div className="border border-[#EDEDED] rounded-[5px] h-[48px] flex items-center">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      className="w-full h-full px-4 bg-transparent outline-none text-[18px] leading-6 text-[#02142E]
                                 placeholder:text-[#838E9E]"
                      placeholder={t("name_placeholder")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-[6px] w-full lg:w-1/2">
                  <label
                    htmlFor="phone"
                    className="text-[14px] leading-[18px] text-[#02142E]"
                  >
                    {t("phone_label")}
                  </label>
                  <div className="border border-[#EDEDED] rounded-[5px] h-[48px] flex items-center">
                    <input
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      required
                      className="w-full h-full px-4 bg-transparent outline-none text-[18px] leading-6 text-[#02142E]
                                 placeholder:text-[#838E9E]"
                      placeholder={t("phone_placeholder")}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[6px] w-full">
                <label
                  htmlFor="service"
                  className="text-[14px] leading-[18px] text-[#02142E]"
                >
                  {t("service_label")}
                </label>
                <div className="relative border border-[#EDEDED] rounded-[5px] h-[48px] flex items-center">
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full h-full bg-transparent outline-none appearance-none pl-4 pr-10 text-[18px] leading-6 text-[#02142E]"
                    defaultValue=""
                  >
                    <option value="">{t("service_placeholder")}</option>
                    {servicesData.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#838E9E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-[6px]">
              <label
                htmlFor="message"
                className="text-[14px] leading-[18px] text-[#02142E]"
              >
                {t("massage_label")}
              </label>
              <div className="border border-[#EDEDED] rounded-[5px] h-[108px] flex">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full h-full resize-none bg-transparent outline-none px-4 py-3 text-[18px] leading-6 text-[#02142E]
                             placeholder:text-[#838E9E]"
                  placeholder={t("massage_placeholder")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="flex justify-center items-center px-8 h-14 bg-[#0B63E5] text-white rounded-[4px] font-semibold
                         text-[18px] leading-6 shadow-[0_4px_24px_rgba(10,63,143,0.3)] disabled:opacity-60"
            >
              {isSending ? "Відправляємо..." : t("batton")}
            </button>
          </form>
        </div>
      </div>

      {showSuccess &&
        createPortal(
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4">
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
          </div>,
          document.body
        )}
    </>
  );

  return createPortal(modalContent, document.body);
}
