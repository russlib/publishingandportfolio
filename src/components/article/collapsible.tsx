"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-[16px] rounded-[12px] border border-border/60 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-[8px] px-[16px] py-[12px] text-left text-[14px] font-medium hover:bg-muted/40 transition-colors"
      >
        <ChevronRight
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {title}
      </button>
      {open && (
        <div className="px-[16px] pb-[16px] pt-[4px]">{children}</div>
      )}
    </div>
  );
}
