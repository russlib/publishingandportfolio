import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

export type HomeContent = {
  heroAlt: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  clubEyebrow: string;
  workEyebrow: string;
  workExperience: Array<{ org: string; role: string }>;
  projectsHeading: string;
  projectsIntro: string;
  onePagersHeading: string;
  onePagersEmpty: string;
  onePagers: Array<{
    name: string;
    hook: string;
    thumbnail: string;
    href: string;
  }>;
  contactHeading: string;
  footerLine: string;
};

export type OrganisationContent = {
  org: string;
  kind: "club" | "work";
  current: boolean;
  heroRole: string;
  intro: string;
  rolesHeading: string;
  rolesIntro: string;
  articlesHeading: string;
  articlesIntro: string;
  onePagersHeading: string;
  onePagersIntro: string;
  onePagersEmpty: string;
  roles: Array<{
    title: string;
    short: string;
    tag?: string | null;
    detail: string;
  }>;
  articles: Array<{
    slug: string;
    name: string;
    role: string;
    hook: string;
    thumbnail: string;
  }>;
};

export type ArticleStatus = "published" | "draft";

export type Article = {
  slug: string;
  title: string;
  kind: string;
  status: ArticleStatus;
  thumbnail: string;
  summary: string;
};

async function readYaml<T>(relativePath: string): Promise<T> {
  const file = path.join(process.cwd(), "content", relativePath);
  const raw = await fs.readFile(file, "utf-8");
  const parsed = parse(raw);

  if (!parsed || typeof parsed !== "object") {
    throw new Error(`content/${relativePath} is missing or unreadable`);
  }

  return parsed as T;
}

export async function getHome() {
  return readYaml<HomeContent>("home.yaml");
}

export async function getOrganisation(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Invalid organisation slug: ${slug}`);
  }

  return readYaml<OrganisationContent>(`experience/${slug}.yaml`);
}

export async function getArticles() {
  const doc = await readYaml<{ articles: Article[] }>("articles.yaml");
  if (!Array.isArray(doc.articles)) {
    throw new Error("content/articles.yaml is missing or unreadable");
  }
  return doc.articles;
}

/**
 * Published articles carry the landing page; drafts are reachable at /drafts.
 *
 * Each row keeps `index`, its position in the YAML array. Filtering renumbers
 * the list, and an Editable path built from the filtered position would write
 * into a different article than the one on screen.
 */
export async function getArticlesByStatus(status: "published" | "draft") {
  const articles = await getArticles();
  return articles
    .map((article, index) => ({ ...article, index }))
    .filter((a) => a.status === status);
}

/**
 * Resolve a registered article without falling back to the project catalogue.
 *
 * `content/articles.yaml` is the publication authority. A project appearing in
 * the skills data does not make its article public; it must have an explicit
 * registry row and that row must say `published`.
 */
export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();
  const index = articles.findIndex((article) => article.slug === slug);

  if (index === -1) return null;
  return { ...articles[index], index };
}

export async function getPublishedArticleSlugs() {
  const articles = await getArticlesByStatus("published");
  return new Set(articles.map((article) => article.slug));
}

export async function getArticleStatus(slug: string) {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug)?.status ?? null;
}

/**
 * Article prose, keyed by block id.
 *
 * Read straight off disk rather than through the Keystatic reader: the block
 * ids differ per article, and a Keystatic collection schema is static — it
 * would need a new field declared for every id in every article. This copy is
 * edited inline on the page (?edit=1), which needs no schema at all.
 */
export async function getArticleCopy(
  slug: string
): Promise<Record<string, string> | null> {
  /* Slug comes from the route, so keep it to the shape a slug can have. */
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const file = path.join(process.cwd(), "content", "article-copy", `${slug}.yaml`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    const parsed = parse(raw) as { blocks?: Record<string, string> };
    return parsed?.blocks ?? null;
  } catch {
    /* No copy file yet just means that article has not been migrated. */
    return null;
  }
}
