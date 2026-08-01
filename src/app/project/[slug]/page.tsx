import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { featuredProjects } from "@/data/featured-projects";
import { getProjectContent } from "@/components/project-content";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ProjectStatusTags } from "@/components/project-status-tags";

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  const featured = featuredProjects.find((f) => f.slug === slug);
  const isMini = featured?.tier === "mini";

  const Content = await getProjectContent(slug);

  return (
    <>
      <SiteNav />

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
              <Link key={entry.skillId} href={`/skill/${entry.skillId}`}>
                <Badge variant="outline" className="text-[12px] font-medium cursor-pointer">
                  {entry.skillName}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Skill-specific descriptions */}
        <div className="mt-[48px] flex flex-col gap-[20px]">
          {/* BORDERLINE: section heading "How this project demonstrates each skill" — mild "What I Bring" energy. See BORDERLINE.md */}
          <h3 className="text-[13px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
            How this project demonstrates each skill
          </h3>

          {project.skills.map((entry) => (
            <Link key={entry.skillId} href={`/skill/${entry.skillId}`} className="group block">
              <Card className="glass-card border-none ring-0 transition-all group-hover:-translate-y-[2px]">
                <CardHeader>
                  <div className="flex items-start justify-between gap-[12px]">
                    <CardTitle className="text-[18px] group-hover:underline underline-offset-[3px]">
                      <span>{entry.skillName}</span>
                    </CardTitle>
                    <span
                      className="shrink-0 rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px]"
                      style={{
                        borderColor: "rgba(79, 70, 229, 0.25)",
                        color: "#4338ca",
                        background: "rgba(79, 70, 229, 0.06)",
                      }}
                    >
                      Skill
                    </span>
                  </div>
                  {/* Metric pill rendering intentionally hidden for v1 launch. Source preserved in skill markdown as internal callouts. See tracking issue. */}
                </CardHeader>
                <CardContent>
                  <p className="text-[14px] leading-[22px]" style={{ color: "#687385" }}>
                    {entry.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Full project content (if available) */}
        {Content && (
          <>
            <hr className="section-rule my-[48px]" />
            <Content />
          </>
        )}
      </main>

      <footer className="py-[64px] text-center text-[13px]" style={{ color: "#687385" }}>
        Russell Bilinski &middot; University of Victoria &middot; 2026
      </footer>
    </>
  );
}
