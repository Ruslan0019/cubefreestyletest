"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ContactFormInner({ contactsPage, services }) {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null); // ✅ ref для формы

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Request failed");

      // ✅ безопасный reset
      if (formRef.current) {
        formRef.current.reset();
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("CONTACT_FORM_ERROR", err);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <form
        ref={formRef} // ✅ подключаем ref
        onSubmit={handleSubmit}
        className="flex flex-col gap-[24px] w-full max-w-full sm:max-w-[512px]"
      >
        {/* все поля формы без изменений */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="name"
            className="text-[16px] font-medium text-[#02142E] mb-[6px]"
          >
            {contactsPage.form.name_label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={contactsPage.form.name_placeholder}
            className="h-[48px] outline-none text-[#02142E] border border-[#EDEDED] rounded-[5px] px-[16px] text-[18px] placeholder:text-[#838E9E] w-full"
            required
          />
        </div>

        <div className="flex flex-col flex-1">
          <label
            htmlFor="phone"
            className="text-[16px] font-medium text-[#02142E] mb-[6px]"
          >
            {contactsPage.form.phone_label}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={contactsPage.form.phone_placeholder}
            className="h-[48px] outline-none text-[#02142E] border border-[#EDEDED] rounded-[5px] px-[16px] text-[18px] placeholder:text-[#838E9E] w-full"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="service"
            className="text-[16px] font-medium text-[#02142E] mb-[6px]"
          >
            {contactsPage.form.service_label}
          </label>
          <select
            id="service"
            name="service"
            className="h-[48px] border border-[#EDEDED] rounded-[5px] px-[16px] text-[18px] text-[#02142E] placeholder:text-[#838E9E] w-full"
          >
            <option value="">{contactsPage.form.service_placeholder}</option>
            {services.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="message"
            className="text-[16px] font-medium text-[#02142E] mb-[6px]"
          >
            {contactsPage.form.message_label}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={contactsPage.form.message_placeholder}
            className=" text-[#02142E] outline-none border border-[#EDEDED] rounded-[5px] px-[16px] py-[12px] text-[18px] placeholder:text-[#838E9E] resize-none w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="w-full sm:w-[218px] h-[56px] bg-[#0B63E5] text-white text-[18px] font-semibold rounded-[4px]
                     shadow-[0px_4px_24px_rgba(10,63,143,0.3)] mx-auto cursor-pointer disabled:opacity-60"
        >
          {isSending ? "Відправляємо..." : contactsPage.form.button_text}
        </button>
      </form>

      {showSuccess &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-sm w-11/12 text-center animate-fadeIn">
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
}
