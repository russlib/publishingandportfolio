import Link from "next/link";
import { notFound } from "next/navigation";
import { skills } from "@/data/portfolio";
import { getProjectSlug } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SiteNav } from "@/components/site-nav";

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
  return Object.keys(skills).map((id) => ({ id }));
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = skills[id];
  if (!skill) notFound();

  const cfg = statusConfig[skill.status];

  return (
    <>
      <SiteNav />

      <main className="mx-auto max-w-[720px] px-[24px] pb-[128px]">
        {/* Header */}
        <div className="mt-[48px]">
          <div className="flex items-center gap-[10px] mb-[16px]">
            <span className={`size-[9px] rounded-full ${cfg.dot}`} />
            <Badge variant="outline" className={`${cfg.badge} text-[12px] font-medium`}>
              {cfg.label}
            </Badge>
          </div>
          <h1 className="text-[40px] leading-[48px]">{skill.name}</h1>
          <p className="mt-[16px] text-[16px] leading-[26px]" style={{ color: "#687385" }}>
            {skill.preview}
          </p>
        </div>

        {/* Evidence cards */}
        <div className="mt-[48px] flex flex-col gap-[20px]">
          <h3 className="text-[13px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
            Evidence &middot; {skill.evidence.length} project{skill.evidence.length !== 1 ? "s" : ""}
          </h3>

          {skill.evidence.map((ev) => (
            <Card key={ev.project} className="glass-card border-none ring-0">
              <CardHeader>
                <CardTitle className="text-[18px]">
                  <Link href={`/project/${getProjectSlug(ev.project)}`} className="hover:underline underline-offset-[3px]">
                    {ev.project}
                  </Link>
                </CardTitle>
                {ev.metric && (
                  <CardDescription>
                    <div className="flex flex-wrap gap-[6px] mt-[4px]">
                      {ev.metric.split(" · ").map((m) => (
                        <Badge key={m} variant="outline" className="font-mono text-[11px] font-normal">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-[14px] leading-[22px]" style={{ color: "#687385" }}>
                  {ev.description}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Gap note */}
          {skill.gap_note && (
            <Card className="glass-card border-none ring-0 border-l-[3px] border-l-amber-300">
              <CardHeader>
                <CardTitle className="text-[13px] font-medium tracking-[0.5px] uppercase" style={{ color: "#9a7b31" }}>
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[14px] leading-[22px]" style={{ color: "#687385" }}>
                  {skill.gap_note}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="py-[64px] text-center text-[13px]" style={{ color: "#687385" }}>
        Russell Bilinski &middot; University of Victoria &middot; 2026
      </footer>
    </>
  );
}
