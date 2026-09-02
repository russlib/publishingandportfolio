import type { ComponentType } from "react";

const registry: Record<string, () => Promise<{ default: ComponentType }>> = {
  "battery-cooling-testing": () =>
    import("./battery-cooling").then((module) => ({ default: module.BatteryCoolingContent })),
};

export function hasProjectContent(slug: string): boolean {
  return slug in registry;
}

export async function getProjectContent(slug: string): Promise<ComponentType | null> {
  const loader = registry[slug];
  if (!loader) return null;
  return (await loader()).default;
}
