import type { MetadataRoute } from "next";
import { getArticlesByStatus } from "@/data/content";
import { skills } from "@/data/portfolio";
import { getProjectSlug } from "@/data/projects";

const SITE_URL = "https://www.russlib.ca";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticlesByStatus("published");
  const publishedSlugs = new Set(articles.map((article) => article.slug));
  const publicSkills = Object.values(skills).filter((skill) =>
    skill.evidence.some(
      (evidence) =>
        evidence.nda || publishedSlugs.has(getProjectSlug(evidence.project))
    )
  );

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/experience/uvic-formula-student`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/project/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...publicSkills.map((skill) => ({
      url: `${SITE_URL}/skill/${skill.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
