import type { ComponentType } from "react";

const registry: Record<string, () => Promise<{ default: ComponentType }>> = {
  "battery-cooling-testing": () =>
    import("./battery-cooling").then((m) => ({ default: m.BatteryCoolingContent })),
  "fsae-battery-pack-mounts-jig": () =>
    import("./fsae-battery-pack-mounts-jig").then((m) => ({ default: m.FsaeBatteryPackMountsJigContent })),
  "motor-control-characterization": () =>
    import("./motor-control-characterization").then((m) => ({ default: m.MotorControlCharacterizationContent })),
  "fsae-gear-ratio-selection": () =>
    import("./fsae-gear-ratio-selection").then((m) => ({ default: m.FsaeGearRatioSelectionContent })),
  "busbar-calculator": () =>
    import("./busbar-calculator").then((m) => ({ default: m.BusbarCalculatorContent })),
  "fsae-segment-structural-handcalcs": () =>
    import("./fsae-segment-structural-handcalcs").then((m) => ({ default: m.FsaeSegmentStructuralHandcalcsContent })),
  "nusselt-correlation-derivation": () =>
    import("./nusselt-correlation-derivation").then((m) => ({ default: m.NusseltCorrelationDerivationContent })),
  "hv-junction-box": () =>
    import("./hv-junction-box").then((m) => ({ default: m.HvJunctionBoxContent })),
  "fsae-vehicle-dynamics-lead": () =>
    import("./fsae-vehicle-dynamics-lead").then((m) => ({ default: m.FsaeVehicleDynamicsLeadContent })),
  "fsae-laptime-simulations": () =>
    import("./fsae-laptime-simulations").then((m) => ({ default: m.FsaeLaptimeSimulationsContent })),
  "off-grid-e-bike-charging-station": () =>
    import("./off-grid-e-bike-charging-station").then((m) => ({ default: m.OffGridEBikeChargingStationContent })),
  "competitive-high-school-robotics": () =>
    import("./competitive-high-school-robotics").then((m) => ({ default: m.CompetitiveHighSchoolRoboticsContent })),
};

export function hasProjectContent(slug: string): boolean {
  return slug in registry;
}

export async function getProjectContent(slug: string): Promise<ComponentType | null> {
  const loader = registry[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
