/**
 * Project-level status tags. Applied per project slug.
 *
 * `inConstruction` — website documentation is being tuned; the page is in a drafted
 *   state. Default-on for v1 since every project page is still being polished.
 *
 * `inProgress` — the underlying engineering work is not fully wrapped; there are open
 *   action items on the project itself (not just the writeup).
 *
 * A project can have both tags.
 */

export type ProjectTags = {
  inConstruction?: boolean;
  inProgress?: boolean;
};

const tags: Record<string, ProjectTags> = {
  "battery-cooling-testing": { inConstruction: true },
  "busbar-calculator": { inConstruction: true },
  "cad-automation-suite": { inConstruction: true },
  "daq-telemetry-processor": { inConstruction: true },
  "fsae-battery-pack-mounts-jig": { inConstruction: true },
  "fsae-gear-ratio-selection": { inConstruction: true },
  "fsae-laptime-simulations": { inConstruction: true },
  "fsae-segment-structural-handcalcs": { inConstruction: true },
  "fsae-vehicle-dynamics-lead": { inConstruction: true, inProgress: true },
  "competitive-high-school-robotics": { inConstruction: true },
  "hv-junction-box": { inConstruction: true },
  "motor-control-characterization": { inConstruction: true, inProgress: true },
  "nusselt-correlation-derivation": { inConstruction: true },
  "off-grid-e-bike-charging-station": { inConstruction: true },
  "pygeartrain-gear-profile-generation": { inConstruction: true },
  "qdd-actuator": { inConstruction: true },
  "robotics-judging-volunteering": { inConstruction: true },
};

export function getProjectTags(slug: string): ProjectTags {
  return tags[slug] ?? {};
}

export const IN_CONSTRUCTION_TOOLTIP =
  "I'm currently tuning the documentation for this project. It's in a drafted state because I wanted something out as a starting point. My standards for these projects are high and the content here will change over time.";

export const IN_PROGRESS_TOOLTIP =
  "The underlying engineering work on this project isn't fully wrapped up. There are open action items I'm still working through.";
