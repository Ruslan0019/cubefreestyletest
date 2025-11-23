"use client";

export default function VideoPlayer({ src }) {
  return (
    <video
      src={src}
      suppressHydrationWarning
      controls
      className="w-full h-full object-cover "
    />
  );
}
