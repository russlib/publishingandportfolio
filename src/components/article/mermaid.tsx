"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  securityLevel: "strict",
});

export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    mermaid
      .render(`mermaid-${id}`, chart)
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      })
      .catch(() => {
        if (!cancelled) setSvg(null);
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <figure className="my-[24px]">
      {svg ? (
        <div
          ref={ref}
          className="overflow-x-auto rounded-[8px] p-[16px]"
          style={{ background: "#f5f7fa" }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div
          className="overflow-x-auto rounded-[8px] p-[16px]"
          style={{ background: "#f5f7fa" }}
        >
          <pre className="text-[12px] leading-[18px]" style={{ color: "#687385" }}>
            {chart}
          </pre>
        </div>
      )}
      {caption && (
        <figcaption className="mt-[8px] text-[13px] italic" style={{ color: "#687385" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
