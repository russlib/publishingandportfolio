import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { skills } from "@/data/portfolio";
import { getProjectSlug } from "@/data/projects";
import { featuredProjects } from "@/data/featured-projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";
import { ProjectStatusTags } from "@/components/project-status-tags";
import { getPublishedArticleSlugs } from "@/data/content";

export const dynamicParams = false;

function publicEvidence(
  skill: (typeof skills)[string],
  publishedSlugs: Set<string>
) {
  return skill.evidence.filter(
    (evidence) =>
      evidence.nda || publishedSlugs.has(getProjectSlug(evidence.project))
  );
}

export async function generateStaticParams() {
  const publishedSlugs = await getPublishedArticleSlugs();
  return Object.values(skills)
    .filter((skill) => publicEvidence(skill, publishedSlugs).length > 0)
    .map((skill) => ({ id: skill.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const skill = skills[id];

  if (!skill) {
    return {
      title: "Page not found",
      robots: { index: false, follow: false },
    };
  }

  const publishedSlugs = await getPublishedArticleSlugs();
  const evidence = publicEvidence(skill, publishedSlugs);

  if (evidence.length === 0) {
    return {
      title: "Page not found",
      robots: { index: false, follow: false },
    };
  }

  const description =
    skill.preview ||
    `Public project evidence for ${skill.name} in Russell Bilinski's engineering portfolio.`;
  const canonical = `/skill/${skill.id}`;

  return {
    title: skill.name,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${skill.name} | Russell Bilinski`,
      description,
      images: [
        {
          url: "/me/driver-wide.jpg",
          alt: "Russell Bilinski engineering portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${skill.name} | Russell Bilinski`,
      description,
      images: ["/me/driver-wide.jpg"],
    },
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = skills[id];
  if (!skill) notFound();
  const publishedSlugs = await getPublishedArticleSlugs();
  const evidence = publicEvidence(skill, publishedSlugs);
  if (evidence.length === 0) notFound();

  return (
    <>
      <SiteNav />

      <main className="mx-auto max-w-[720px] px-[24px] pb-[128px]">
        {/* Header */}
        <div className="mt-[48px]">
          <div className="flex items-center gap-[10px] mb-[16px]">
            <span
              className="rounded-full border px-[10px] py-[3px] text-[11px] font-medium uppercase tracking-[0.5px]"
              style={{
                borderColor: "rgba(79, 70, 229, 0.25)",
                color: "#4338ca",
                background: "rgba(79, 70, 229, 0.06)",
              }}
            >
              Skill
            </span>
          </div>
          <h1 className="text-[40px] leading-[48px]">{skill.name}</h1>
          {skill.preview && (
            <p className="mt-[16px] text-[16px] leading-[26px]" style={{ color: "#687385" }}>
              {skill.preview}
            </p>
          )}
        </div>

        {/* Evidence cards */}
        <div className="mt-[48px] flex flex-col gap-[20px]">
          <h3 className="text-[13px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
            Evidence &middot; {evidence.length} project{evidence.length !== 1 ? "s" : ""}
          </h3>

          {evidence.map((ev) => {
            const slug = getProjectSlug(ev.project);
            const featured = featuredProjects.find((f) => f.slug === slug);
            const isMini = featured?.tier === "mini";
            const cardInner = (
            <Card className="glass-card border-none ring-0 transition-all group-hover:-translate-y-[2px]">
              <CardHeader>
                <div className="flex items-start justify-between gap-[12px]">
                  <CardTitle className="text-[18px] group-hover:underline underline-offset-[3px]">
                    <span>{ev.project}</span>
                  </CardTitle>
                  {ev.nda ? (
                    <div className="flex flex-wrap items-center justify-end gap-[6px]">
                      <span
                        className="rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px]"
                        style={{
                          borderColor: "rgba(0,0,0,0.1)",
                          color: "#3c4257",
                          background: "rgba(0,0,0,0.03)",
                        }}
                      >
                        Professional
                      </span>
                      <span
                        className="inline-flex items-center gap-[4px] rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px]"
                        style={{
                          borderColor: "rgba(180,130,40,0.25)",
                          color: "#9a7b31",
                          background: "rgba(180,130,40,0.06)",
                        }}
                      >
                        <Lock className="size-[10px]" />
                        NDA
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-end gap-[6px]">
                      <span
                        className="rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px]"
                        style={{
                          borderColor: "rgba(71, 85, 105, 0.25)",
                          color: "#475569",
                          background: "rgba(71, 85, 105, 0.06)",
                        }}
                      >
                        {isMini ? "Mini Project" : "Project"}
                      </span>
                      <ProjectStatusTags slug={slug} />
                    </div>
                  )}
                </div>
                {/* Metric pill rendering intentionally hidden for v1 launch. Source preserved in skill markdown as internal callouts. See tracking issue. */}
              </CardHeader>
              <CardContent>
                <p className="text-[14px] leading-[22px]" style={{ color: "#687385" }}>
                  {ev.description}
                </p>
                {ev.nda && (
                  <p className="mt-[12px] text-[12px] leading-[18px] italic" style={{ color: "#9a7b31" }}>
                    {/* BORDERLINE: NDA disclaimer wording — slightly formal/lawyer-ish. See BORDERLINE.md */}
                    Covered under NDA. Scope and skills listed reflect what I&apos;ve been cleared to share.
                  </p>
                )}
              </CardContent>
            </Card>
            );
            return ev.nda ? (
              <div key={ev.project} className="group">{cardInner}</div>
            ) : (
              <Link key={ev.project} href={`/project/${slug}`} className="group block">
                {cardInner}
              </Link>
            );
          })}

          {/* Next Steps / gap_note card intentionally hidden for v1 launch. Source preserved in skill markdown frontmatter. See tracking issue for re-enable criteria. */}
        </div>
      </main>

      <footer className="py-[64px] text-center text-[13px]" style={{ color: "#687385" }}>
        Russell Bilinski &middot; University of Victoria &middot; 2026
      </footer>
    </>
  );
}
