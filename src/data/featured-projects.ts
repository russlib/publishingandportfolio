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
    "slug": "battery-cooling-testing",
    "name": "Battery Cooling Testing",
    "thumbnail": "/projects/battery-cooling/correlation-graph.png",
    "hook": "Chose experiment over CFD because the geometry was too irregular to trust a sim. Derived an h-correlation from raw thermocouple and power data."
  }
];
