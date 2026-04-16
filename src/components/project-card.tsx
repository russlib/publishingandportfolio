import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { InlineEquation } from "@/components/article";
import type { FeaturedProject } from "@/data/featured-projects";

const statusDot = {
  strong: "bg-emerald-500",
  demonstrated: "bg-blue-500",
  "in-progress": "bg-amber-500",
  gap: "bg-red-500",
};

export function ProjectCard({ project }: { project: FeaturedProject }) {
  const meta = projects[project.slug];
  const skillEntries = meta?.skills ?? [];
  const isMini = project.tier === "mini";

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group block overflow-hidden rounded-[20px] transition-all hover:-translate-y-[2px]"
      style={{
        background: "rgba(255,255,255,0.85)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.03)",
      }}
    >
      {!isMini && (
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{
            background: project.thumbnail
              ? "#f5f7fa"
              : "linear-gradient(135deg, #e8edf5 0%, #d8e0ee 100%)",
          }}
        >
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              sizes="(max-width: 1280px) 100vw, 520px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          ) : project.fallbackTex ? (
            <div className="absolute inset-0 flex items-center justify-center px-[24px] text-center">
              <div className="text-[14px]" style={{ color: "#3c4257" }}>
                <InlineEquation tex={project.fallbackTex} />
              </div>
            </div>
          ) : null}
        </div>
      )}
      <div className="px-[20px] py-[18px]">
        <div className="flex items-start justify-between gap-[12px]">
          <h3 className="text-[17px] font-medium leading-[24px]" style={{ color: "#181818" }}>
            {project.name}
          </h3>
          {isMini && (
            <span
              className="mt-[2px] shrink-0 rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px]"
              style={{
                borderColor: "rgba(0,0,0,0.1)",
                color: "#687385",
                background: "rgba(0,0,0,0.02)",
              }}
            >
              Mini
            </span>
          )}
        </div>
        <p className="mt-[8px] text-[13px] leading-[20px]" style={{ color: "#687385" }}>
          {project.hook}
        </p>
        {skillEntries.length > 0 && (
          <div className="mt-[14px] flex flex-wrap gap-[6px]">
            {skillEntries.map((entry) => (
              <span
                key={entry.skillId}
                className="inline-flex items-center gap-[5px] rounded-full border px-[8px] py-[2px] text-[11px]"
                style={{
                  borderColor: "rgba(0,0,0,0.08)",
                  color: "#687385",
                }}
              >
                <span className={`size-[5px] rounded-full ${statusDot[entry.skillStatus]}`} />
                {entry.skillName}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
