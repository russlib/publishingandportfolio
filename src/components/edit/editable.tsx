import type { ElementType } from "react";

type Props = { path: string; value: string; as?: ElementType; className?: string };

export function Editable({ value, as, className }: Props) {
  const Tag = as ?? "span";
  if (!as && !className) return <>{value}</>;
  return <Tag className={className}>{value}</Tag>;
}
