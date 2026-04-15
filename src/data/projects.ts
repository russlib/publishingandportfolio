import { skills } from "./portfolio";
import type { Skill } from "./portfolio";

export type ProjectSkillEntry = {
  skillId: string;
  skillName: string;
  skillStatus: Skill["status"];
  description: string;
  metric?: string;
};

export type Project = {
  slug: string;
  name: string;
  skills: ProjectSkillEntry[];
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[—–]/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Derive unique projects from skills data, grouped by which skills reference them. */
function buildProjects(): Record<string, Project> {
  const map: Record<string, Project> = {};

  for (const skill of Object.values(skills)) {
    for (const ev of skill.evidence) {
      const slug = slugify(ev.project);
      if (!map[slug]) {
        map[slug] = { slug, name: ev.project, skills: [] };
      }
      map[slug].skills.push({
        skillId: skill.id,
        skillName: skill.name,
        skillStatus: skill.status,
        description: ev.description,
        ...(ev.metric ? { metric: ev.metric } : {}),
      });
    }
  }

  return map;
}

export const projects = buildProjects();

export function getProjectSlug(projectName: string): string {
  return slugify(projectName);
}
