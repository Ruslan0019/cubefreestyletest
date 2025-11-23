import "./globals.css";

export const viewport = {
  themeColor: "#0a0a0a",
};

export const metadata = {
  charset: "UTF-8",
  title: "Cube Freestyle",
  description:
    "Шоу футбольного фристайлу в Україні — команда CUBE. Замовте виступ просто зараз!",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "cubefreestyle",
    "mask-icon": "/icon0.svg",
    "msapplication-TileColor": "#0a0a0a",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <link
          rel="preconnect"
          href="https://static.cloudflareinsights.com"
          crossOrigin=""
        />

        <link
          rel="preconnect"
          href="https://cubefreestyle.com.ua"
          crossOrigin=""
        />
      </head>
      <body className="flex flex-col min-h-screen">{children}</body>
    </html>
  );
}
