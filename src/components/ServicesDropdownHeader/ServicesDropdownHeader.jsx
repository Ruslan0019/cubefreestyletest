"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/i18n/routing";

export default function ServicesDropdown({ services = [], locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const label = locale === "ru" ? "Услуги" : "Послуги";

  if (!services.length) return null;

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-baseline gap-2 text-gray-700 hover:text-primary active:scale-90 active:text-primary/80 transition-all duration-200 ease-in-out"
      >
        <span>{label}</span>
        <span
          className={`text-xs transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          className="
      absolute 
      mt-2 
      w-[320px]
      lg:w-[420px] 
      rounded-xl bg-white shadow-xl ring-1 ring-black/5 z-51 overflow-hidden
      left-1/2 -translate-x-1/2 
      lg:left-0 lg:translate-x-0
    "
        >
          <div className="grid grid-cols-2 gap-1 p-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className="block px-1 py-1 text-sm text-gray-800 hover:bg-gray-100 active:scale-95 active:text-primary/80 transition-all duration-200 ease-in-out rounded-md"
                onClick={() => setOpen(false)}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
