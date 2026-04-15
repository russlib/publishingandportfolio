export type FeaturedProject = {
  slug: string;
  name: string;
  thumbnail: string;
  hook: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "battery-cooling-testing",
    name: "Battery Cooling Testing",
    thumbnail: "/projects/battery-cooling/correlation-graph.png",
    hook: "Chose experiment over CFD because the geometry was too irregular to trust a sim. Derived an h-correlation from raw thermocouple and power data.",
  },
  {
    slug: "motor-control-characterization",
    name: "Motor Testing & Characterization",
    thumbnail: "/projects/motor-control-characterization/h2-all-runs-overview.png",
    hook: "D6374 BLDC characterized across two controllers (ODrive + VESC) for cross-validation. Fried an ODrive along the way.",
  },
  {
    slug: "fsae-gear-ratio-selection",
    name: "FSAE Gear Ratio Selection",
    thumbnail: "/projects/fsae-gear-ratio-selection/sensitivity_gear_ratio.png",
    hook: "Turned a design-review argument into a vehicle-level decision problem. ~50 points at stake.",
  },
  {
    slug: "fsae-battery-pack-mounts-jig",
    name: "FSAE Battery Pack Mounts Jig",
    thumbnail: "/projects/fsae-battery-pack-mounts-jig/finished-assembly.png",
    hook: "Dual-purpose welding jig with a single base plate and swappable inserts for aluminum TIG and steel weld configs.",
  },
];
