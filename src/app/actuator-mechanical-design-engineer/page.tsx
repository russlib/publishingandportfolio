"use client";

import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { skills } from "@/data/portfolio";
import { posting } from "@/data/posting";
import { featuredProjects } from "@/data/featured-projects";
import { resumeUrl } from "@/data/resume";
import type { Segment } from "@/data/posting";
import { ProjectCard } from "@/components/project-card";

/* ── Annotated link (hover preview hidden for v1; clicking still navigates to the skill page) ── */

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

  return (
    <Link
      href={`/skill/${skillId}`}
      className={`underline decoration-[2px] underline-offset-[3px] decoration-blue-500/80 text-blue-700 transition-all hover:underline-offset-[5px] hover:decoration-blue-600 cursor-pointer ${hint ? "hint-pulse" : ""}`}
    >
      {children}
    </Link>
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

/* ── Page ── */

const { meta } = posting;

export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav className="sticky top-[16px] z-50 mx-auto max-w-[1400px] px-[24px]">
        <div className="glass-card flex items-center justify-between rounded-[16px] px-[20px] py-[12px]">
          <span
            className="hidden whitespace-nowrap text-[16px] font-medium sm:inline"
            style={{ letterSpacing: "-0.3px" }}
          >
            {meta.applicant}
          </span>
          <div className="flex items-center gap-[4px]">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] rounded-[10px] px-[10px] py-[6px] text-[13px] font-medium transition-colors hover:bg-black/[0.04]"
              style={{ color: "#687385" }}
            >
              <FileText className="size-[14px]" />
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/russell-bilinski/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[6px] rounded-[10px] px-[10px] py-[6px] text-[13px] font-medium transition-colors hover:bg-black/[0.04]"
              style={{ color: "#687385" }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:ruzzcraze@gmail.com"
              className="flex items-center gap-[6px] rounded-[10px] px-[10px] py-[6px] text-[13px] font-medium transition-colors hover:bg-black/[0.04]"
              style={{ color: "#687385" }}
            >
              <Mail className="size-[14px]" />
              Email
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1400px] px-[24px] pb-[128px]">
        <div className="mt-[48px] grid grid-cols-1 gap-[48px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-[56px]">
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
            {/* BORDERLINE: click prompt "Click any underlined text for the full evidence behind it" — UI helper copy. See BORDERLINE.md */}
            <div className="mt-[48px] border-t pt-[24px]" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <p className="text-[12px] font-medium tracking-[0.3px]" style={{ color: "#1d4ed8" }}>
                Click any underlined text for the full evidence behind it &rarr;
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
          <p className="text-[13px]" style={{ color: "#687385" }}>
            {meta.applicant} &middot; {meta.school} &middot; {meta.year}
          </p>
        </div>
      </footer>
    </>
  );
}
