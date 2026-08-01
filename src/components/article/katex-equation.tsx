"use client";

import { useEffect, useRef } from "react";
import katex from "katex";

export function BlockEquation({ tex }: { tex: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, { displayMode: true, throwOnError: false });
    }
  }, [tex]);
  return <div ref={ref} className="my-[24px] overflow-x-auto overflow-y-hidden text-center" />;
}

export function InlineEquation({ tex }: { tex: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(tex, ref.current, { displayMode: false, throwOnError: false });
    }
  }, [tex]);
  return <span ref={ref} />;
}
