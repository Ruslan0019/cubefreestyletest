import type { MetadataRoute } from "next";

const BASE_URL = "https://cubefreestyle.com.ua";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // allow: "/",
      disallow: ["/"],
      // disallow: ["/admin"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
