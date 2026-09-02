import type { MetadataRoute } from "next";

const SITE_URL = "https://www.russlib.ca";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/drafts",
        "/keystatic",
        "/api/",
        "/tools/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
