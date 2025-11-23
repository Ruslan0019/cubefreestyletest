"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import EventModal from "../EventModal/EventModal";

export default function EventsGrid({ events = [], locale = "uk" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = useCallback((ev) => {
    setSelected(ev);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
    setSelected(null);
  }, []);

  return (
    <>
      <div className="flex z-50 flex-wrap justify-center gap-y-4 lg:gap-x-4 lg:gap-y-12 xl:gap-x-8 xl:gap-y-14 max-w-[343px] lg:max-w-[992px] xl:max-w-[1120px] ">
        {events.map((event, idx) => (
          <article
            key={idx}
            onClick={() => openModal(event)}
            className="hover:scale-105 transition-transform duration-300 flex flex-col cursor-pointer shadow-xl rounded-sm w-full max-w-[343px] lg:max-w-[320px] xl:max-w-[352px]"
          >
            <Image
              width={343}
              height={349}
              priority={idx < 6}
              src={event.cover}
              alt={event.title}
              className="w-full h-[349px] lg:h-[325px] xl:h-[358px] object-cover rounded-t-sm "
              sizes="(min-width:1280px) 352px, (min-width:1024px) 320px, 343px"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
                {event.description}
              </p>
              <time className="text-xs text-gray-500 mt-2 block">
                {event.date
                  ? new Date(event.date).toLocaleDateString(locale)
                  : ""}
              </time>
            </div>
          </article>
        ))}
      </div>

      <EventModal isOpen={open} onClose={closeModal} event={selected} />
    </>
  );
}
