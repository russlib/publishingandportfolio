"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Editable } from "@/components/edit/editable";

type RoleDisclosureProps = {
  detail: string;
  index: number;
  short: string;
  tag?: string | null;
  title: string;
  file: string;
};

/** A role summary that works with a pointer, keyboard, and touch. */
export function RoleDisclosure({
  detail,
  index,
  short,
  tag,
  title,
  file,
}: RoleDisclosureProps) {
  const [latchedOpen, setLatchedOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const expanded = latchedOpen || hovered;
  const detailId = `role-detail-${index}`;
  const isCurrent = tag?.toLowerCase() === "current";

  return (
    <article
      className={`xp-role${expanded ? " is-expanded" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="xp-role-heading">
        <button
          type="button"
          className="xp-role-toggle"
          aria-expanded={expanded}
          aria-controls={detailId}
          onClick={() => setLatchedOpen((open) => !open)}
        >
          <Editable
            as="span"
            className="xp-role-title"
            path={`${file}:roles.${index}.title`}
            value={title}
          />
          {tag && (
            <Editable
              as="span"
              className={`xp-tag${isCurrent ? " is-current" : ""}`}
              path={`${file}:roles.${index}.tag`}
              value={tag}
            />
          )}
          <ChevronDown className="xp-chev size-4" aria-hidden="true" />
        </button>
      </h3>

      <Editable
        as="p"
        className="xp-role-lede"
        path={`${file}:roles.${index}.short`}
        value={short}
      />

      <div
        id={detailId}
        className="xp-role-more"
        aria-hidden={!expanded}
      >
        <div>
          <Editable
            as="p"
            path={`${file}:roles.${index}.detail`}
            value={detail}
          />
        </div>
      </div>
    </article>
  );
}
