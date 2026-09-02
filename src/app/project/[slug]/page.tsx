import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { featuredProjects } from "@/data/featured-projects";
import { getProjectContent } from "@/components/project-content";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { ProjectStatusTags } from "@/components/project-status-tags";
import {
  getArticleBySlug,
  getArticleCopy,
  getArticles,
} from "@/data/content";
import { CopyProvider } from "@/components/project-content/copy";

const isProduction = process.env.NODE_ENV === "production";

/* Anything omitted here is a real 404. In development the registered drafts
   remain reviewable by URL; a production build contains published rows only. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .filter(
      (article) =>
        projects[article.slug] &&
        (!isProduction || article.status === "published")
    )
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const project = projects[slug];
  const isPublished = article?.status === "published";

  /* Do not echo a draft title or summary into metadata on a public miss. */
  if (!article || !project || (isProduction && !isPublished)) {
    return {
      title: "Page not found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `/project/${article.slug}`;
  const title = article.title;
  const description = article.summary;
  const images = article.thumbnail
    ? [{ url: article.thumbnail, alt: `${article.title} project figure` }]
    : [{ url: "/me/driver-wide.jpg", alt: "Russell Bilinski engineering portfolio" }];

  return {
    title,
    description,
    alternates: { canonical },
    robots: isPublished
      ? { index: true, follow: true }
      : { index: false, follow: false, noarchive: true },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];
  const article = await getArticleBySlug(slug);
  const isDraft = article?.status === "draft";

  if (!project || !article || (isProduction && article.status !== "published")) {
    notFound();
  }

  const featured = featuredProjects.find((f) => f.slug === slug);
  const isMini = featured?.tier === "mini";

  const Content = await getProjectContent(slug);
  const copy = Content ? await getArticleCopy(slug) : null;

  return (
    <>
      <SiteNav />

      {isDraft && (
        <div className="draft-banner">
          <b>Draft.</b> This write-up is not finished — the prose still needs a
          pass. <a href="/drafts">All drafts</a>
        </div>
      )}

      <main className="mx-auto max-w-[720px] px-[24px] pb-[128px]">
        {/* Header */}
        <div className="mt-[48px]">
          <div className="flex flex-wrap items-center gap-[10px] mb-[16px]">
            <span
              className="rounded-full border px-[10px] py-[3px] text-[11px] font-medium uppercase tracking-[0.5px]"
              style={{
                borderColor: "rgba(71, 85, 105, 0.25)",
                color: "#475569",
                background: "rgba(71, 85, 105, 0.06)",
              }}
            >
              {isMini ? "Mini Project" : "Project"}
            </span>
            <ProjectStatusTags slug={slug} size="md" />
          </div>
          <h1 className="text-[40px] leading-[48px]">{project.name}</h1>

          {/* Skill badges */}
          <div className="mt-[20px] flex flex-wrap gap-[8px]">
            {project.skills.map((entry) => (
              <Link
                key={entry.skillId}
                href={`/skill/${entry.skillId}`}
                className="inline-flex min-h-11 items-center"
              >
                <Badge variant="outline" className="text-[12px] font-medium cursor-pointer">
                  {entry.skillName}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Full project content (if available) */}
        {Content && (
          <>
            <hr className="section-rule my-[48px]" />
            {copy ? (
              <CopyProvider slug={slug} blocks={copy}>
                <Content />
              </CopyProvider>
            ) : (
              <Content />
            )}
          </>
        )}
      </main>

      <footer className="py-[64px] text-center text-[13px]" style={{ color: "#687385" }}>
        Russell Bilinski &middot; University of Victoria &middot; 2026
      </footer>
    </>
  );
}
