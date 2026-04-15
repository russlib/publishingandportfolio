import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getProjectContent } from "@/components/project-content";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const statusConfig = {
  strong: {
    label: "Strong",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  demonstrated: {
    label: "Demonstrated",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  gap: {
    label: "Gap",
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
};

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

  const Content = await getProjectContent(slug);

  return (
    <>
      <SiteNav />

      <main className="mx-auto max-w-[720px] px-[24px] pb-[128px]">
        {/* Header */}
        <div className="mt-[48px]">
          <p className="text-[11px] font-medium tracking-[0.5px] uppercase mb-[16px]" style={{ color: "#687385" }}>
            Project
          </p>
          <h1 className="text-[40px] leading-[48px]">{project.name}</h1>

          {/* Skill badges */}
          <div className="mt-[20px] flex flex-wrap gap-[8px]">
            {project.skills.map((entry) => {
              const cfg = statusConfig[entry.skillStatus];
              return (
                <Link key={entry.skillId} href={`/skill/${entry.skillId}`}>
                  <Badge variant="outline" className={`${cfg.badge} text-[12px] font-medium cursor-pointer`}>
                    <span className={`size-[6px] rounded-full ${cfg.dot} mr-[6px]`} />
                    {entry.skillName}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Skill-specific descriptions */}
        <div className="mt-[48px] flex flex-col gap-[20px]">
          <h3 className="text-[13px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
            How this project demonstrates each skill
          </h3>

          {project.skills.map((entry) => {
            const cfg = statusConfig[entry.skillStatus];
            return (
              <Card key={entry.skillId} className="glass-card border-none ring-0">
                <CardHeader>
                  <CardTitle className="text-[18px]">
                    <Link href={`/skill/${entry.skillId}`} className="hover:underline underline-offset-[3px]">
                      <span className="flex items-center gap-[8px]">
                        <span className={`size-[7px] rounded-full ${cfg.dot}`} />
                        {entry.skillName}
                      </span>
                    </Link>
                  </CardTitle>
                  {entry.metric && (
                    <div className="flex flex-wrap gap-[6px] mt-[4px]">
                      {entry.metric.split(" · ").map((m) => (
                        <Badge key={m} variant="outline" className="font-mono text-[11px] font-normal">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-[14px] leading-[22px]" style={{ color: "#687385" }}>
                    {entry.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
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
