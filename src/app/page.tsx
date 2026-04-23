"use client";

import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { skills } from "@/data/portfolio";
import { featuredProjects } from "@/data/featured-projects";
import { resumeUrl } from "@/data/resume";
import type { Skill } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

function SkillCard({ skill }: { skill: Skill }) {
  const evidenceCount = skill.evidence.length;
  return (
    <Link
      href={`/skill/${skill.id}`}
      className="group block rounded-[20px] p-[24px] transition-all hover:-translate-y-[2px]"
      style={{
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.03)",
      }}
    >
      <div className="flex items-center gap-[10px]">
        <span
          className="rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px]"
          style={{
            borderColor: "rgba(79, 70, 229, 0.25)",
            color: "#4338ca",
            background: "rgba(79, 70, 229, 0.06)",
          }}
        >
          Skill
        </span>
        <span
          className="text-[11px] font-medium tracking-[0.5px] uppercase ml-auto"
          style={{ color: "#687385" }}
        >
          {evidenceCount} {evidenceCount === 1 ? "project" : "projects"}
        </span>
      </div>
      <h3 className="mt-[14px] text-[20px] font-medium leading-[26px]" style={{ color: "#181818" }}>
        {skill.name}
      </h3>
      {skill.preview && (
        <p className="mt-[10px] text-[13px] leading-[20px]" style={{ color: "#687385" }}>
          {skill.preview}
        </p>
      )}
    </Link>
  );
}

export default function Home() {
  const skillList = Object.values(skills);
  return (
    <>
      <nav className="sticky top-[16px] z-50 mx-auto max-w-[1400px] px-[24px]">
        <div className="glass-card flex items-center justify-between rounded-[16px] px-[20px] py-[12px]">
          <span
            className="hidden whitespace-nowrap text-[16px] font-medium sm:inline"
            style={{ letterSpacing: "-0.3px" }}
          >
            Russell Bilinski
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
        {/* Hero */}
        <section className="mt-[80px]">
          <h1 className="text-[48px] leading-[56px] sm:text-[56px] sm:leading-[64px]">
            Russell Bilinski
          </h1>
          <p className="mt-[20px] max-w-[640px] text-[18px] leading-[28px]" style={{ color: "#687385" }}>
            Second semester, fourth year mechanical engineering at the University of Victoria. FSAE Vehicle Dynamics Lead on UVic&apos;s first EV build. Prior Tesla Battery Pack Mechanical Engineering internship. Work spans mechanical design, CAD automation, controls, first-principles analysis, and physical testing.
          </p>
          {/* BORDERLINE: homepage bio closer — "Work spans X, Y, Z" resume-summary cadence. See BORDERLINE.md */}
        </section>

        {/* Skills grid */}
        <section className="mt-[80px]">
          <h2 className="text-[24px] leading-[32px]">Skills</h2>
          <div className="mt-[24px] grid grid-cols-1 gap-[20px] sm:grid-cols-2">
            {skillList.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>

        {/* Featured projects grid */}
        <section className="mt-[80px]">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[24px] leading-[32px]">Featured projects</h2>
            <p className="text-[13px]" style={{ color: "#687385" }}>
              {featuredProjects.length} shown
            </p>
          </div>
          <div className="mt-[24px] grid grid-cols-1 gap-[20px] sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1400px] px-[24px] py-[64px]">
        <div className="flex flex-col items-center gap-[12px] text-center">
          <p className="text-[13px]" style={{ color: "#687385" }}>
            Russell Bilinski &middot; University of Victoria &middot; 2026
          </p>
        </div>
      </footer>
    </>
  );
}
