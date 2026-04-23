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
    <div
      className={`my-[20px] overflow-hidden rounded-[12px] border-2 transition-colors ${
        open
          ? "border-slate-300/80 bg-white/50"
          : "border-slate-300/80 bg-slate-50/60"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-[10px] px-[16px] py-[14px] text-left text-[14px] font-medium hover:bg-slate-100/60"
      >
        <ChevronRight
          className={`size-[18px] shrink-0 text-slate-600 transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
        <span className="flex-1">{title}</span>
        <span className="shrink-0 text-[12px] font-normal text-slate-500">
          {open ? "Hide" : "Click to expand"}
        </span>
      </button>
      {open && <div className="px-[16px] pb-[16px] pt-[4px]">{children}</div>}
    </div>
  );
}
