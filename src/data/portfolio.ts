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
  "cad": {
    "id": "cad",
    "name": "CAD & SolidWorks",
    "status": "strong",
    "evidence": [
      {
        "project": "Tesla Internship — CATIA",
        "description": "CATIA V5 from Tesla. Test jigs, battery assemblies, and prototype fixturing for validation tests.",
        "nda": true
      },
      {
        "project": "pygeartrain — Gear Profile Generation",
        "description": "Fork of an open-source gear library with a CAD-export pipeline added so helical and herringbone planetary profiles drop directly into SolidWorks. My half of the QDD actuator gear train; Aaron owned the CATIA assembly."
      },
      {
        "project": "HV Junction Box",
        "description": "Full SolidWorks part and assembly modeling for the FSAE HV junction box. Engineering drawings for every manufactured part."
      },
      {
        "project": "FSAE Battery Pack Mounts Jig",
        "description": "Dual-purpose welding jig with a single base plate and interchangeable inserts for aluminum TIG and steel weld configs. Had to interface with a large assembly and think through positional tolerances across multiple parts."
      }
    ]
  },
  "communicative": {
    "id": "communicative",
    "name": "Communication & Leadership",
    "status": "strong",
    "evidence": [
      {
        "project": "FSAE Vehicle Dynamics Lead",
        "description": "First dedicated VD lead on the team in two years. Restarted weekly meetings and built the tuning pipeline from first principles. Set up the infrastructure for the team to extract real information from the car and turn it into tangible improvements: a 159-parameter spec-sheet ownership tracker (difficulty, location, measurement method, owner), a Top-10 VD Parameters self-study document for new-member onboarding, and a structured test day framework."
      },
      {
        "project": "FSAE Laptime Simulations",
        "description": ""
      },
      {
        "project": "Off-Grid E-Bike Charging Station",
        "description": "3-minute pitch to a 4-judge panel (energy researchers and industry). Looked up each judge's background beforehand and adjusted emphasis. Won, and the top 3 teams were invited to build the prototype."
      }
    ]
  },
  "controls": {
    "id": "controls",
    "name": "Controls & Motor Control",
    "status": "demonstrated",
    "evidence": [
      {
        "project": "Motor Control & Characterization",
        "description": "D6374 BLDC on ODrive and VESC. Set up bare motor, 5:1 gearbox, and gearbox+flywheel configs. Tuned position, velocity, and integrator gains across them and watched how reflected inertia changed what the gains needed to be."
      },
      {
        "project": "Competitive High School Robotics",
        "description": "Lead programmer on a competitive VEX team. Wrote autonomous routines, PID-tuned drive and mechanisms, built state machines for match strategy. Four years of competition."
      }
    ]
  },
  "fea": {
    "id": "fea",
    "name": "FEA & Analysis",
    "status": "in-progress",
    "evidence": [
      {
        "project": "FSAE Segment Structural HandCalcs",
        "description": "2024 MATLAB-era structural hand calcs for the UV26 accumulator segment, now ported to Python. Covers polycarbonate lid bending, fastener tension / shear / bearing, Euler-Johnson buckling, G10 bond strength, and passive thermal under SES 20g vertical / 40g lateral crash loads. Governing case: lid bending at SF 1.75, which sized the 3/8\" polycarbonate. All seven load cases pass."
      }
    ]
  },
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
      },
      {
        "project": "Busbar Calculator",
        "description": "Quick project so the team could understand busbar thermal behavior and write better specs. I²R + convection ODE with temperature-dependent resistivity, analytical steady state, numerical transient."
      },
      {
        "project": "Nusselt Correlation Derivation",
        "description": "First-principles derivation of $Nu = C \\cdot Re^m \\cdot Pr^n$ rearranged to isolate $h$. Shows the velocity exponent $m$ dominates the scaling, so doubling cooling capacity roughly needs 16× fan power (fan affinity laws, $m \\approx 0.7$). Grounds the empirical h-correlation I derived on the FSAE accumulator."
      },
      {
        "project": "FSAE Segment Structural HandCalcs",
        "description": "2024 MATLAB-era structural hand calcs for the UV26 accumulator segment pre-design, now ported to Python. Covers polycarbonate lid bending, fastener tension / shear / bearing, Euler-Johnson buckling, G10 bond strength, and passive thermal, all under SES 20g vertical / 40g lateral crash loads. Every safety factor above 1.0."
      },
      {
        "project": "Off-Grid E-Bike Charging Station",
        "description": "Won the UVic/BCSEA hackathon (1st place). Designed an off-grid solar + wind + battery e-bike charging station. Sized every subsystem from provided weather data: demand, solar PV, VAWT, battery storage. Did V-model systems engineering with ConOps, FMEA risk register, and a BOM with real off-the-shelf components."
      },
      {
        "project": "FSAE Gear Ratio Selection",
        "description": "Had to pick a gear ratio with acceleration, motor efficiency, top speed, and packaging all pulling in different directions. Built an iterative traction model that couples weight transfer with acceleration to find worst-case diff torque. Landed on 4.2, which sits on the right edge of the motor efficiency plateau while guaranteeing traction-limited accel and keeping diff loads within spec."
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
        "project": "HV Junction Box",
        "description": "Designed UV24 and redesigned UV26 high-voltage junction boxes. Drew engineering drawings for manufactured parts. Also got into first-principles high-current/high-voltage design and bolt science."
      },
      {
        "project": "FSAE Battery Pack Mounts Jig",
        "description": "Built the jig for accumulator mounting."
      },
      {
        "project": "Battery Cooling Testing",
        "description": "Built the physical airflow test rig. Has a detailed writeup already (link to project page)."
      }
    ]
  },
  "mech-design": {
    "id": "mech-design",
    "name": "Mechanical Design & DFM",
    "status": "in-progress",
    "evidence": [
      {
        "project": "Tesla — Supplier DFM at Scale",
        "description": "Owned overseas-supplier iteration on a novel prototype part targeted at 7-figure annual volume. Authored DFM reference documentation.",
        "nda": true
      },
      {
        "project": "QDD Actuator",
        "description": "Started with decision tables for spec definition. Initial gear design concepts. Aaron did more of the CAD; I focused on design direction and analysis."
      },
      {
        "project": "FSAE Battery Pack Mounts Jig",
        "description": "Machine shop work, bending metal, coordinating with welders."
      }
    ]
  },
  "python": {
    "id": "python",
    "name": "Python & Computational Engineering",
    "status": "strong",
    "evidence": [
      {
        "project": "Tesla — MATLAB for Decision Support",
        "description": "Wrote first-order MATLAB scripts to turn raw test data into defensible, information-dense summaries. Presented multiple director-level program reviews.",
        "nda": true
      },
      {
        "project": "FSAE Laptime Simulations",
        "description": "Three lap sim tiers at different fidelity levels: point-mass for parameter sweeps (50ms/lap), 7DOF for yaw dynamics, and a MATLAB-parity OpenLAP Python rewrite with MF5.2 tires. Modular vehicle, track, solver, drag, and scoring pipeline runs all four FSAE dynamic events end-to-end. Also distributed compute, automation, and data pipeline work on top of the sim stack."
      },
      {
        "project": "DAQ Telemetry Processor",
        "description": "Processes 1GB+ FSAE DAQ files with varied sensor formats and auto unit detection. G-G diagrams, GGV envelopes."
      },
      {
        "project": "CAD Automation Suite",
        "description": "SolidWorks COM API, SQLite metadata, autonomous overnight loop with composite scoring. Works, but not my most interesting project."
      },
      {
        "project": "Busbar Calculator",
        "description": "Transient thermal model for FSAE busbars (I²R + convection ODE, temperature-dependent resistivity)."
      },
      {
        "project": "FSAE Segment Structural HandCalcs",
        "description": "MATLAB-to-Python rewrite of FSAE battery segment structural calcs. Iterable in Colab for SES parameter studies across lid bending, fasteners, buckling, and bond strength."
      },
      {
        "project": "Off-Grid E-Bike Charging Station",
        "description": "Wrote seven Python scripts to size every subsystem from raw weather data: annual demand, solar PV, VAWT, battery, energy balance, and cost analysis for three system variants."
      },
      {
        "project": "FSAE Gear Ratio Selection",
        "description": "475-line traction and weight transfer model that replaced team Excel calculators. Ran parametric lapsim sweeps across the full ratio range with two power configs. Hand-digitized Emrax 228 efficiency curves and fit a poly33 surface for interpolation."
      }
    ]
  },
  "robotics": {
    "id": "robotics",
    "name": "Robotics",
    "status": "demonstrated",
    "evidence": [
      {
        "project": "Competitive High School Robotics",
        "description": "Designed, built, and tested robots for VEX Robotics Competitions across four years. 2x World Championship qualifications. Multiple tournament wins including the pre-COVID Vancouver Island Regional Championship. Received Excellence, Design, Skills, and Sportsmanship awards. Lead programmer in 12th grade, responsible for ~80-90% of programming run points."
      },
      {
        "project": "QDD Actuator",
        "description": "Backdrivability requirement from safety: human must move output by hand. Directly relevant to Optimus joints. Gear train design and STEP export (teammate owned CATIA assembly)."
      },
      {
        "project": "Robotics Judging & Volunteering",
        "description": "Currently volunteer as design judge at local robotics tournaments. Still involved in the community, mentoring high school teams."
      }
    ],
    "gap_note": "More practical/building experience than hard robotics theory. Rubik's cube robot (RCSRC) in progress as a summer project. Honest: FSAE takes most of my time currently."
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
      },
      {
        "project": "Motor Control & Characterization",
        "description": "Have used multiple boards (ODrive, VESC) in different configurations. Fried hardware along the way, but I understand the systems well enough to diagnose what went wrong and fix it. Still active work."
      },
      {
        "project": "FSAE Vehicle Dynamics Lead",
        "description": "Built the team's first structured test day framework: 16 test objectives in three priority tiers, six supporting documents (pre-test GO/NO-GO checklist, run sheet, data collection forms, 48-hour post-test pipeline, 5-Whys problem log, master test matrix), seven go/no-go decision points with named authority."
      }
    ]
  }
};
