// AUTO-GENERATED — do not edit directly.
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

export const skills: Record<string, Skill> = {
  "first-principles": {
    "id": "first-principles",
    "name": "First-Principles Problem Solving",
    "status": "strong",
    "evidence": [
      {
        "project": "Tesla — Battery Pack Architecture",
        "description": "Investigated cost and performance improvements on battery pack internals by sourcing, testing, and iterating on alternate materials, geometries, and architectures.",
        "nda": true
      },
      {
        "project": "Battery Cooling Testing",
        "description": "Discharged cells, built a test rig, collected thermocouple data, and derived an h-correlation from it."
      }
    ],
    "gap_note": "Want to include more equations with graphs on the portfolio, showing relationships between variables, not just listing formulas. Gear trade-offs and shaker rig torque budget are analysis-complete but not deeply explored yet."
  },
  "hands-on": {
    "id": "hands-on",
    "name": "Hands-On & Shop Experience",
    "status": "demonstrated",
    "evidence": [
      {
        "project": "Tesla — Prototyping",
        "description": "Created film, foam, plastic, composite, and metal prototypes with in-house and external prototype-shop tooling. Point of contact on $10k+ orders for prototype-vehicle parts whose delivery gated program tests.",
        "nda": true
      },
      {
        "project": "Battery Cooling Testing",
        "description": "Built the physical airflow test rig. Has a detailed writeup already (link to project page)."
      }
    ]
  },
  "testing": {
    "id": "testing",
    "name": "Physical Testing & Instrumentation",
    "status": "strong",
    "evidence": [
      {
        "project": "Tesla — Battery Runaway Test",
        "description": "Owned a coupon-level battery runaway test from concept through 20 runs, covering build maps, test plans, fixtures, sourcing, and documentation. Created a ticket-based handoff that let other teams pick up the test during and after my internship.",
        "nda": true
      },
      {
        "project": "Tesla — Fastener Characterization",
        "description": "Characterized a self-threading fastener through hundreds of torque-to-failure and aging studies. Coordinated de-risking, sourcing, and cost-down planning with the fastener engineering team.",
        "nda": true
      },
      {
        "project": "Battery Cooling Testing",
        "description": "Chose experiment over CFD because the geometry was too irregular to trust a sim. Derived h-coefficient from raw thermocouple and power data. De-risked accumulator overheating during endurance."
      }
    ]
  }
};
