"use client";

import { useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function PortfolioGalleryModal({ images, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!images?.length) return null;

  const items = images.map((img) => ({
    original: img.file,
    thumbnail: img.file,
    description: img.alt,
  }));

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-md shadow-xl max-w-[1120px] w-full p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded p-1"
        >
          ✕
        </button>

        <ImageGallery
          items={items}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={true}
          slideInterval={4000}
        />
      </div>
    </div>
  );
}
