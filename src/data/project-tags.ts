export type ProjectTags = { inConstruction?: boolean; inProgress?: boolean };

export function getProjectTags(slug: string): ProjectTags {
  void slug;
  return {};
}

export const IN_CONSTRUCTION_TOOLTIP = "Documentation in progress.";
export const IN_PROGRESS_TOOLTIP = "Engineering work in progress.";
