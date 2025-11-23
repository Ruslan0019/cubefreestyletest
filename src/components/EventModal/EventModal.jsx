"use client";

import { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = dynamic(() => import("react-image-gallery"), {
  ssr: false,
});

export default function EventModal({ isOpen, onClose, event }) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const items = useMemo(() => {
    const media = Array.isArray(event?.media) ? event.media : [];
    return media.map((m) => {
      const base = {
        original: m.file,
        thumbnail: m.file,
        originalAlt: m.alt || event?.title || "media",
        description: m.alt || "",
        isVideo: m.kind === "video",
        videoSrc: m.kind === "video" ? m.file : null,
      };

      if (m.kind === "video") {
        base.renderItem = () => (
          <div className="flex h-[260px] lg:h-[560px] xl:h-[660px] w-full items-center justify-center bg-black">
            <video
              src={m.file}
              controls
              playsInline
              preload="metadata"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        );
        return base;
      }

      base.renderItem = () => (
        <div className="relative w-full h-[260px] lg:h-[560px] xl:h-[660px] ">
          <img
            src={m.file}
            alt={m.alt || event?.title || "image"}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      );

      return base;
    });
  }, [event]);

  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={stop}
        className="modal-box w-full max-w-[343px] lg:max-w-[944px] xl:max-w-[1120px] relative overflow-hidden rounded-[4px] bg-white shadow-[0_4px_24px_rgba(20,25,26,0.12)]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[calc(50%-12px-151.5px)] top-2 z-20 flex h-6 w-6 items-center justify-center rounded-[4px] bg-white/50 text-[#02142E] hover:bg-white/70 lg:right-12 lg:top-6 xl:right-12 xl:top-6"
        >
          ✕
        </button>

        <ImageGallery
          items={items}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav
          showThumbnails
          lazyLoad
          additionalClass="gallery-fixed"
          renderThumbInner={(item) =>
            item.isVideo ? (
              <div className="relative h-full w-full overflow-hidden rounded-[4px]">
                <video
                  src={item.videoSrc}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover "
                />

                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="relative h-[30px] w-[30px] rounded-full bg-white/50">
                    <svg
                      viewBox="0 0 14 12"
                      className="absolute left-1/2 top-1/2 h-[11.5px] w-[14px] -translate-x-1/2 -translate-y-1/2 rotate-90 fill-white"
                    >
                      <path d="M0 0 L14 6 L0 12 Z" />
                    </svg>
                  </span>
                </span>
              </div>
            ) : (
              <img
                src={item.thumbnail}
                alt={item.originalAlt || "thumb"}
                className="rounded-[4px] object-cover
             w-[150px] h-[80px]
             lg:w-[202px] lg:h-[108px]"
                loading="lazy"
              />
            )
          }
        />
      </div>
    </div>
  );
}
