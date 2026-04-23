import {
  getProjectTags,
  IN_CONSTRUCTION_TOOLTIP,
  IN_PROGRESS_TOOLTIP,
} from "@/data/project-tags";

const baseClass =
  "shrink-0 rounded-full border px-[8px] py-[2px] text-[10px] font-medium uppercase tracking-[0.5px] cursor-help";

export function ProjectStatusTags({
  slug,
  size = "sm",
}: {
  slug: string;
  size?: "sm" | "md";
}) {
  const tags = getProjectTags(slug);
  if (!tags.inConstruction && !tags.inProgress) return null;

  const padding = size === "md" ? "px-[10px] py-[3px] text-[11px]" : "";

  return (
    <div className="flex flex-wrap gap-[6px]">
      {tags.inConstruction && (
        <span
          className={`${baseClass} ${padding}`}
          style={{
            borderColor: "rgba(180, 130, 40, 0.25)",
            color: "#9a7b31",
            background: "rgba(180, 130, 40, 0.06)",
          }}
          title={IN_CONSTRUCTION_TOOLTIP}
        >
          In Construction
        </span>
      )}
      {tags.inProgress && (
        <span
          className={`${baseClass} ${padding}`}
          style={{
            borderColor: "rgba(14, 138, 22, 0.25)",
            color: "#2f7a35",
            background: "rgba(14, 138, 22, 0.06)",
          }}
          title={IN_PROGRESS_TOOLTIP}
        >
          In Progress
        </span>
      )}
    </div>
  );
}
