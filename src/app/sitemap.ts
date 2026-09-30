import type { MetadataRoute } from "next";
import { getArticlesByStatus } from "@/data/content";

const SITE_URL = "https://www.russlib.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticlesByStatus("published");
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...articles.map((article) => ({
      url: `${SITE_URL}/project/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
