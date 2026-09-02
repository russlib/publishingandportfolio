"use client";

import { createContext, useContext } from "react";
import { Editable } from "@/components/edit/editable";

type CopyBlocks = Record<string, string | null>;

const CopyContext = createContext<{ slug: string; blocks: CopyBlocks } | null>(null);

export function CopyProvider({
  slug,
  blocks,
  children,
}: {
  slug: string;
  blocks: CopyBlocks;
  children: React.ReactNode;
}) {
  return <CopyContext value={{ slug, blocks }}>{children}</CopyContext>;
}

export function Copy({
  id,
  as,
  className,
}: {
  id: string;
  as?: React.ElementType;
  className?: string;
}) {
  const copy = useContext(CopyContext);
  if (!copy) throw new Error("Copy must be rendered inside CopyProvider");

  const value = copy.blocks[id];
  if (typeof value !== "string") {
    throw new Error(`Missing article copy block: ${copy.slug}:${id}`);
  }

  return (
    <Editable
      as={as}
      className={className}
      path={`article-copy/${copy.slug}:blocks.${id}`}
      value={value}
    />
  );
}
