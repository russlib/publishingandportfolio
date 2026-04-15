"use client";

import Link from "next/link";
import { skills } from "@/data/portfolio";
import { posting } from "@/data/posting";
import { getProjectSlug } from "@/data/projects";
import { featuredProjects } from "@/data/featured-projects";
import type { Skill } from "@/data/portfolio";
import type { Segment } from "@/data/posting";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project-card";

const statusConfig = {
  strong: {
    label: "Strong",
    dot: "bg-emerald-500",
    underline: "decoration-emerald-400/70",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  demonstrated: {
    label: "Demonstrated",
    dot: "bg-blue-500",
    underline: "decoration-blue-400/70",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-amber-500",
    underline: "decoration-amber-400/70",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  gap: {
    label: "Gap",
    dot: "bg-red-500",
    underline: "decoration-red-400/70",
    badge: "bg-red-50 text-red-700 border-red-200",
  },
};

/* ── Annotated link with hover preview ── */

function A({
  skillId,
  children,
  hint,
}: {
  skillId: string;
  children: React.ReactNode;
  hint?: boolean;
}) {
  const skill = skills[skillId];
  if (!skill) return <>{children}</>;
  const cfg = statusConfig[skill.status];

  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Link
            href={`/skill/${skillId}`}
            className={`underline decoration-[1.5px] underline-offset-[3px] ${cfg.underline} transition-all hover:underline-offset-[5px] cursor-pointer ${hint ? "hint-pulse" : ""}`}
          />
        }
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        className="w-[380px] rounded-2xl border-none bg-white/97 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08),0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <span className={`size-[7px] rounded-full ${cfg.dot}`} />
          <span className="text-[11px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
            {cfg.label}
          </span>
        </div>
        <p className="mt-3 text-[14px] leading-[22px]" style={{ color: "#181818" }}>
          {skill.preview}
        </p>
        <div className="mt-4 flex flex-wrap gap-[6px]">
          {skill.evidence.map((ev) => (
            <Link key={ev.project} href={`/project/${getProjectSlug(ev.project)}`}>
              <Badge variant="outline" className="font-mono text-[11px] font-normal cursor-pointer hover:bg-black/5">
                {ev.project}
              </Badge>
            </Link>
          ))}
        </div>
        {skill.gap_note && (
          <p className="mt-3 border-t border-black/5 pt-3 text-[12px] leading-[18px]" style={{ color: "#9a7b31" }}>
            {skill.gap_note}
          </p>
        )}
        <p className="mt-3 text-[11px]" style={{ color: "#687385", opacity: 0.6 }}>
          Click for full evidence &rarr;
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

/* ── Render a segment array (one bullet) ── */

function Bullet({ segments }: { segments: Segment[] }) {
  return (
    <li className="flex gap-[10px]">
      <span className="mt-[10px] size-[5px] shrink-0 rounded-full" style={{ background: "#181818", opacity: 0.25 }} />
      <span>
        {segments.map((seg, i) =>
          seg.skillId ? (
            <A key={i} skillId={seg.skillId} hint={seg.hint}>{seg.text}</A>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </span>
    </li>
  );
}

/* ── Status legend ── */

function Legend() {
  const counts = { strong: 0, demonstrated: 0, "in-progress": 0, gap: 0 };
  for (const s of Object.values(skills)) counts[s.status]++;

  return (
    <div className="flex flex-wrap gap-[16px]">
      {(Object.entries(counts) as [Skill["status"], number][]).map(
        ([status, count]) =>
          count > 0 ? (
            <span key={status} className="flex items-center gap-[6px] text-[13px]" style={{ color: "#687385" }}>
              <span className={`size-[7px] rounded-full ${statusConfig[status].dot}`} />
              {count} {statusConfig[status].label}
            </span>
          ) : null
      )}
    </div>
  );
}

/* ── Page ── */

const { meta } = posting;

export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav className="sticky top-[16px] z-50 mx-auto max-w-[1400px] px-[24px]">
        <div className="glass-card flex items-center justify-between rounded-[16px] px-[20px] py-[12px]">
          <span className="text-[16px] font-medium" style={{ letterSpacing: "-0.3px" }}>
            {meta.applicant}
          </span>
          <span className="text-[13px]" style={{ color: "#687385" }}>
            Optimus Actuator Design &middot; Portfolio
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-[1400px] px-[24px] pb-[128px]">
        <div className="mt-[80px] grid grid-cols-1 gap-[48px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-[56px]">
          {/* ── The Job Posting ── */}
          <article className="hero-card rounded-[32px] px-[48px] py-[56px] sm:px-[64px] sm:py-[72px]">
            {/* Header */}
            <p className="text-[11px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
              {meta.company} &middot; {meta.team} &middot; {meta.location} &middot; {meta.term}
            </p>
            <h1 className="mt-[16px]">
              {meta.title}
            </h1>

            {/* Intro */}
            <p className="mt-[32px] text-[16px] leading-[26px]" style={{ color: "#687385" }}>
              {posting.intro}
            </p>

            {/* Sections */}
            {posting.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mt-[48px]" style={{ fontSize: 24, lineHeight: "32px" }}>
                  {section.heading}
                </h2>
                <ul className="mt-[16px] flex flex-col gap-[10px] text-[16px] leading-[26px]" style={{ color: "#687385" }}>
                  {section.bullets.map((segments, i) => (
                    <Bullet key={i} segments={segments} />
                  ))}
                </ul>
              </div>
            ))}

            {/* Bottom hint */}
            <div className="mt-[48px] border-t pt-[24px]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <p className="text-[11px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385", opacity: 0.6 }}>
                Hover any underlined text for a preview &middot; Click for full evidence
              </p>
            </div>
          </article>

          {/* ── Featured Projects rail ── */}
          <aside className="flex flex-col gap-[20px]">
            <div>
              <p className="text-[11px] font-medium tracking-[0.5px] uppercase" style={{ color: "#687385" }}>
                Featured work
              </p>
              <p className="mt-[4px] text-[13px] leading-[20px]" style={{ color: "#687385" }}>
                A few of the projects behind the skill links on the left.
              </p>
            </div>
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </aside>
        </div>
      </main>

      <footer className="mx-auto max-w-[1400px] px-[24px] py-[64px]">
        <div className="flex flex-col items-center gap-[16px]">
          <Legend />
          <p className="text-[13px]" style={{ color: "#687385" }}>
            {meta.applicant} &middot; {meta.school} &middot; {meta.year}
          </p>
        </div>
      </footer>
    </>
  );
}
