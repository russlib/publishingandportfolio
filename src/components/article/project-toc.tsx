import { List } from "lucide-react";

export type TocEntry = { id: string; title: string };

/**
 * Table of contents for a project detail page. Renders a compact list of
 * anchor links to the major H2 sections. Each target H2 must have a matching
 * `id` attribute so the anchor scrolls to it.
 */
export function ProjectToc({ entries }: { entries: TocEntry[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="my-[24px] rounded-[12px] border-2 border-slate-300/80 bg-slate-50/60 px-[18px] py-[14px]"
    >
      <div className="mb-[8px] flex items-center gap-[8px] text-[12px] font-medium uppercase tracking-[0.5px] text-slate-500">
        <List className="size-[14px]" />
        Contents
      </div>
      <ol className="ml-[2px] list-decimal space-y-[4px] pl-[18px] text-[14px]">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className="text-slate-700 hover:text-blue-700 hover:underline underline-offset-[3px]"
            >
              {e.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
