export type FeaturedProject = {
  slug: string;
  name: string;
  thumbnail?: string;
  fallbackTex?: string;
  hook: string;
  tier?: "mini";
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
    hook: "Built a BLDC characterization bench across ODrive and VESC to separate motor behavior from controller artifacts. Extracted Kt, Kv, friction, and inertia from real test data.",
  },
  {
    slug: "fsae-gear-ratio-selection",
    name: "FSAE Gear Ratio Selection",
    thumbnail: "/projects/fsae-gear-ratio-selection/sensitivity_gear_ratio.png",
    hook: "Turned a design-review argument into a vehicle-level decision problem. ~50 points at stake.",
  },
  {
    slug: "busbar-calculator",
    name: "Busbar Calculator",
    thumbnail: "/projects/busbar-calculator/busbar-analysis-plot.png",
    hook: "Transient I²R + convection ODE for FSAE busbars. Analytical steady state, numerical transient, temperature-dependent resistivity.",
  },
  {
    slug: "fsae-segment-structural-handcalcs",
    name: "FSAE Segment Structural HandCalcs",
    thumbnail: "/projects/fsae-segment-structural-handcalcs/segment-casing.png",
    hook: "Lid bending, fastener tension / shear, Euler-Johnson buckling, and bond strength under SES 20g / 40g crash loads. All safety factors above 1.",
  },
  {
    slug: "competitive-high-school-robotics",
    name: "Competitive High School Robotics",
    thumbnail: "/projects/competitive-high-school-robotics/robot-awards.jpg",
    hook: "Four years of VEX competition. 2x Worlds qualifier, Vancouver Island Regional Championship, lead programmer responsible for ~80-90% of programming run points.",
  },
  {
    slug: "pygeartrain-gear-profile-generation",
    name: "pygeartrain — Gear Profile Generation",
    hook: "Forked open-source gear library; added CAD export so helical and herringbone planetary profiles drop directly into SolidWorks. Used on the QDD actuator with Aaron.",
    tier: "mini",
  },
  {
    slug: "nusselt-correlation-derivation",
    name: "Nusselt Correlation Derivation",
    hook: "Derivation showing h scaling with velocity. With m ≈ 0.7 and fan affinity laws, doubling cooling takes ~16× fan power.",
    tier: "mini",
  },
  {
    slug: "fsae-battery-pack-mounts-jig",
    name: "FSAE Battery Pack Mounts Jig",
    hook: "Welding jig with swappable inserts so placement tables survive repeated TIG passes without a full rebuild.",
    tier: "mini",
  },
];
