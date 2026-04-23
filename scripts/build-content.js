/**
 * Reads markdown content from the Obsidian vault and generates TypeScript data files.
 *
 * Usage: node scripts/build-content.js
 *
 * Sources:
 *   content/posting.md        → src/data/posting.ts   (job posting structure + skill links)
 *   content/skills/*.md       → src/data/portfolio.ts  (skill definitions + evidence)
 *
 * Content root: MegaVault/Projects/Mini/tesla-portfolio-site/content/
 */

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.resolve(
  __dirname,
  "../../MegaVault/Projects/Mini/tesla-portfolio-site/content"
);
const SKILLS_DIR = path.join(CONTENT_DIR, "skills");
const POSTING_FILE = path.join(CONTENT_DIR, "posting.md");
const OUT_PORTFOLIO = path.resolve(__dirname, "../src/data/portfolio.ts");
const OUT_POSTING = path.resolve(__dirname, "../src/data/posting.ts");

// ── Shared helpers ──

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("No frontmatter found");

  const frontmatter = {};
  for (const line of match[1].split("\n")) {
    const colIdx = line.indexOf(":");
    if (colIdx === -1) continue;
    const key = line.slice(0, colIdx).trim();
    let val = line.slice(colIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val === "null") val = null;
    frontmatter[key] = val;
  }

  return { frontmatter, body: match[2].trim() };
}

// ── Skills ──

function parseEvidence(body) {
  const evidence = [];
  // Drop anything before the first `## ` heading. This lets skill files include
  // internal Obsidian callouts (e.g. `> [!internal] ...`) at the top of the body
  // for Russell's eyes only, without leaking into the rendered site.
  const parts = body.split(/^## /m);
  const sections = parts.slice(1);

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const project = lines[0].trim();
    let description = "";
    let metric = null;
    let nda = false;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Skip Obsidian callout lines (blockquote syntax). Any `> ...` block inside
      // a skill section is treated as internal notes and never rendered.
      if (line.trimStart().startsWith(">")) continue;
      // Detect NDA marker: a line that is exactly `**NDA**` flags the whole
      // evidence entry as covered under NDA. Rendered with Professional + NDA
      // badges and a disclaimer on the skill page.
      if (line.trim() === "**NDA**") {
        nda = true;
        continue;
      }
      if (line.startsWith("**Metric:**")) {
        metric = line.replace("**Metric:**", "").trim();
      } else if (line.trim()) {
        if (description) description += " ";
        description += line.trim();
      }
    }

    evidence.push({
      project,
      description,
      ...(metric ? { metric } : {}),
      ...(nda ? { nda: true } : {}),
    });
  }

  return evidence;
}

function buildSkills() {
  const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith(".md"));
  const skills = {};

  for (const file of files) {
    const raw = fs.readFileSync(path.join(SKILLS_DIR, file), "utf-8");
    const { frontmatter, body } = parseFrontmatter(raw);
    const evidence = parseEvidence(body);

    skills[frontmatter.id] = {
      id: frontmatter.id,
      name: frontmatter.name,
      status: frontmatter.status,
      ...(frontmatter.preview ? { preview: frontmatter.preview } : {}),
      evidence,
      ...(frontmatter.gap_note ? { gap_note: frontmatter.gap_note } : {}),
    };
  }

  const ts = `// AUTO-GENERATED — do not edit directly.
// Source: MegaVault/Projects/Mini/tesla-portfolio-site/content/skills/*.md
// Rebuild: node scripts/build-content.js

export type Evidence = {
  project: string;
  description: string;
  metric?: string;
  nda?: boolean;
};

export type Skill = {
  id: string;
  name: string;
  status: "strong" | "demonstrated" | "in-progress" | "gap";
  preview?: string;
  evidence: Evidence[];
  gap_note?: string;
};

export const skills: Record<string, Skill> = ${JSON.stringify(skills, null, 2)};
`;

  fs.writeFileSync(OUT_PORTFOLIO, ts);
  console.log(`  portfolio.ts  — ${Object.keys(skills).length} skills, ${Object.values(skills).reduce((n, s) => n + s.evidence.length, 0)} evidence items`);
}

// ── Posting ──

/**
 * Parses a markdown bullet line into segments.
 * Segments are either plain text or skill links: [text](skill:id){hint?}
 *
 * Returns: { segments: Array<{text, skillId?, hint?}> }
 */
function parseBulletSegments(line) {
  // Strip leading "- "
  const content = line.replace(/^-\s*/, "");
  const segments = [];
  let remaining = content;

  // Match [text](skills/id.md){hint} patterns
  const linkRe = /\[([^\]]+)\]\(skills\/([^)]+)\.md\)(\{hint\})?/g;
  let match;
  let lastIndex = 0;

  // Reset regex
  linkRe.lastIndex = 0;

  while ((match = linkRe.exec(content)) !== null) {
    // Text before this link
    if (match.index > lastIndex) {
      const before = content.slice(lastIndex, match.index);
      if (before) segments.push({ text: before });
    }
    segments.push({
      text: match[1],
      skillId: match[2],
      ...(match[3] ? { hint: true } : {}),
    });
    lastIndex = match.index + match[0].length;
  }

  // Trailing text
  if (lastIndex < content.length) {
    segments.push({ text: content.slice(lastIndex) });
  }

  return segments;
}

function buildPosting() {
  const raw = fs.readFileSync(POSTING_FILE, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);

  const lines = body.split("\n");
  let currentSection = null;
  const intro = [];
  const sections = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      currentSection = { heading: trimmed.replace("## ", ""), bullets: [] };
      sections.push(currentSection);
    } else if (trimmed.startsWith("- ") && currentSection) {
      currentSection.bullets.push(parseBulletSegments(trimmed));
    } else if (trimmed && !currentSection) {
      intro.push(trimmed);
    }
  }

  const posting = {
    meta: frontmatter,
    intro: intro.join(" "),
    sections,
  };

  const ts = `// AUTO-GENERATED — do not edit directly.
// Source: MegaVault/Projects/Mini/tesla-portfolio-site/content/posting.md
// Rebuild: node scripts/build-content.js

export type Segment = {
  text: string;
  skillId?: string;
  hint?: boolean;
};

export type PostingSection = {
  heading: string;
  bullets: Segment[][];
};

export type PostingMeta = {
  company: string;
  team: string;
  location: string;
  term: string;
  title: string;
  applicant: string;
  school: string;
  year: string;
};

export type Posting = {
  meta: PostingMeta;
  intro: string;
  sections: PostingSection[];
};

export const posting: Posting = ${JSON.stringify(posting, null, 2)};
`;

  fs.writeFileSync(OUT_POSTING, ts);
  const bulletCount = sections.reduce((n, s) => n + s.bullets.length, 0);
  console.log(`  posting.ts    — ${sections.length} sections, ${bulletCount} bullets`);
}

// ── Run ──

console.log("Building content...");
buildSkills();
buildPosting();
console.log("Done.");
