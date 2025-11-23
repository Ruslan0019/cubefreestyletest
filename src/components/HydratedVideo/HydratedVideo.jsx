"use client";

import { useEffect, useRef, useState } from "react";

export default function HydratedVideo({
  desktopVideo,
  mobileVideo,
  desktopPoster,
  mobilePoster,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const posterSrc = isMobile ? mobilePoster : desktopPoster;
  const videoSrc = isMobile ? mobileVideo : desktopVideo;

  return (
    <div ref={ref} className="absolute inset-0 z-0">
      <img
        src={posterSrc}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        decoding="async"
      />

      {isVisible && (
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={posterSrc}
          onCanPlay={() => setLoaded(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
