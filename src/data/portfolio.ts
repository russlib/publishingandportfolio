// AUTO-GENERATED — do not edit directly.
// Source: MegaVault/Projects/Mini/tesla-portfolio-site/content/skills/*.md
// Rebuild: node scripts/build-content.js

export type Evidence = {
  project: string;
  description: string;
  metric?: string;
};

export type Skill = {
  id: string;
  name: string;
  status: "strong" | "demonstrated" | "in-progress" | "gap";
  preview: string;
  evidence: Evidence[];
  gap_note?: string;
};

export const skills: Record<string, Skill> = {
  "cad": {
    "id": "cad",
    "name": "CAD & SolidWorks",
    "status": "strong",
    "preview": "SolidWorks: COM API automation over 13,740-part PDM vault, parametric modeling, custom gear STEP export via pygeartrain. CATIA experience from Tesla internship: test jigs, battery assemblies, prototype fixturing.",
    "evidence": [
      {
        "project": "CAD Automation Suite",
        "description": "Python platform automating SolidWorks via COM API. Mass extraction, similarity search, and part generation across 13,740 indexed parts. Autonomous overnight learn-by-recreation loop."
      },
      {
        "project": "pygeartrain — Gear Profile Generation",
        "description": "Modified open-source gear library to generate STEP files directly (portable, CAD-agnostic profiles). Interference sweeps to find backlash targets. My part of the QDD actuator was gear train design, STEP export, and design direction. Teammate owned bearing integration and CATIA assembly."
      },
      {
        "project": "HV Junction Box",
        "description": "Full SolidWorks part and assembly modeling for FSAE HV junction box. Made engineering drawings for manufactured parts."
      },
      {
        "project": "Tesla Internship — CATIA",
        "description": "CATIA V5 from Tesla: test jigs, battery assemblies, prototype fixturing for validation tests. Details limited (NDA), see resume for scope."
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
    "preview": "VD Lead for UVic's first FSAE EV. Autonomous decision-making, building team skills, driving decisions across subsystems with simulation tools. The breadth and depth of projects on this portfolio IS the demonstration of curiosity. I just like doing engineering stuff.",
    "evidence": [
      {
        "project": "VD Lead",
        "description": "First dedicated VD lead on the team in two years. Restarted weekly meetings and built the tuning pipeline from first principles. Set up the infrastructure for the team to extract real information from the car and turn it into tangible improvements: a 135-parameter spec-sheet ownership tracker (difficulty, location, measurement method, owner), a Top-10 VD Parameters self-study document for new-member onboarding, and a structured test day framework.",
        "metric": "First dedicated VD lead in 2 years"
      },
      {
        "project": "FSAE Laptime Simulations",
        "description": "The sim is only useful if the team can act on it. I pick which outputs to show and how to frame them so an engineering choice is obvious, not buried in data."
      },
      {
        "project": "Curiosity Through Projects",
        "description": "Thermal modeling, CAD automation, lap sims, motor control, hackathons. I just like doing engineering stuff, and the range of projects here shows that."
      },
      {
        "project": "Off-Grid E-Bike Charging Station",
        "description": "3-minute pitch to a 4-judge panel (energy researchers and industry). Looked up each judge's background beforehand and adjusted emphasis. Won, and the top 3 teams were invited to build the prototype.",
        "metric": "1st place · Invited to build prototype"
      }
    ]
  },
  "controls": {
    "id": "controls",
    "name": "Controls & Motor Control",
    "status": "demonstrated",
    "preview": "PID tuning on real hardware (ODrive + VESC), motor characterization, trapezoidal trajectory control. Practical experience tuning based on parameters, seeing how gains, inertia, and damping affect behavior. Reflected inertia concepts. Ties back to FSAE: using theory to lock in specs.",
    "evidence": [
      {
        "project": "Motor Control & Characterization",
        "description": "Work in progress. Will be a lot stronger once I have motor + gearbox + end effector testing done. Might end up being VESC motor control depending on which hardware I'm running."
      },
      {
        "project": "MATLAB Dynamics Study",
        "description": "Need to find this and clean it up. Could turn into an instantaneous force calculator with real part dimensions."
      }
    ]
  },
  "fea": {
    "id": "fea",
    "name": "FEA & Analysis",
    "status": "in-progress",
    "preview": "Work in progress. Current stress analysis is calculator/spreadsheet-based (Hertzian, Lewis, energy methods). Planning a basic FEA demo project to build and demonstrate fundamentals.",
    "evidence": [
      {
        "project": "Hand Calculations (Current Approach)",
        "description": "Hertzian contact stress, Lewis bending, energy methods, all spreadsheet/calculator-level complexity. This is honest: most of the engineering work I do is at this level, and for battery design a good spreadsheet often is the right tool. FEA software experience is the gap."
      }
    ],
    "gap_note": "Work in progress. Planning: basic FEA demo project covering mesh convergence, boundary conditions, and part optimization in SolidWorks Simulation. Goal is to demonstrate I understand the fundamentals, not claim expertise I don't have."
  },
  "first-principles": {
    "id": "first-principles",
    "name": "First-Principles Problem Solving",
    "status": "strong",
    "preview": "Start from physics, not templates. Energy balances, ODE heat transfer, thermal modeling. Want to show equations on the portfolio with graphs showing how they relate, demonstrating that I understand the relationships, not just the formula.",
    "evidence": [
      {
        "project": "Battery Cooling Testing",
        "description": "Discharged cells, built a test rig, collected thermocouple data, and derived an h-correlation from it. There's no guidebook for cooling an FSAE accumulator with irregular geometry, so I just did the heat transfer from scratch. Touches a lot of skills in one go."
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
        "description": "Won the UVic/BCSEA hackathon (1st place). Designed an off-grid solar + wind + battery e-bike charging station. Sized every subsystem from provided weather data: demand, solar PV, VAWT, battery storage. Did V-model systems engineering with ConOps, FMEA risk register, and a BOM with real off-the-shelf components.",
        "metric": "1st place · Invited to build prototype"
      },
      {
        "project": "FSAE Gear Ratio Selection",
        "description": "Had to pick a gear ratio with acceleration, motor efficiency, top speed, and packaging all pulling in different directions. Built an iterative traction model that couples weight transfer with acceleration to find worst-case diff torque. Landed on 4.2, which sits on the right edge of the motor efficiency plateau while guaranteeing traction-limited accel and keeping diff loads within spec. Three separate design review objections answered with numbers.",
        "metric": "~50 pts at stake · 3 objections resolved"
      }
    ],
    "gap_note": "Want to include more equations with graphs on the portfolio, showing relationships between variables, not just listing formulas. Gear trade-offs and shaker rig torque budget are analysis-complete but not deeply explored yet."
  },
  "hands-on": {
    "id": "hands-on",
    "name": "Hands-On & Shop Experience",
    "status": "demonstrated",
    "preview": "3D printer since 11th grade, so I really know design-for-FDM limitations, rapid prototyping, print orientation trade-offs. Machine shop work on FSAE accumulator. Engineering drawings for HV junction box and manufactured parts. Test rig construction, soldering, assembly.",
    "evidence": [
      {
        "project": "3D Printing & Rapid Prototyping",
        "description": "Had a 3D printer since 11th grade. Heavily modified it (extruder, Klipper on a Raspberry Pi back before that was easy). Know FDM tolerances, material tradeoffs, and how to design parts that actually print well."
      },
      {
        "project": "QDD Actuator",
        "description": "Decision tables for specs, motor control, testing. All geometry designed around FDM constraints. More detail to come (need to get Aaron's input on his contributions)."
      },
      {
        "project": "HV Junction Box",
        "description": "Designed UV24 and redesigned UV26 high-voltage junction boxes. Drew engineering drawings for manufactured parts. Also got into first-principles high-current/high-voltage design and bolt science. Had to problem-solve to get it on the car under time pressure."
      },
      {
        "project": "FSAE Battery Pack Mounts Jig",
        "description": "Built the jig for accumulator mounting. A lot of thought went into tolerances and how it interfaces with the rest of the car, even though the end solution was simple."
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
    "preview": "DFM across FDM, laser cut, and welding. Worked with suppliers on prototype parts. Engineering drawings for HV junction box and jigs. GD&T is a gap. Building toward it.",
    "evidence": [
      {
        "project": "QDD Actuator",
        "description": "Started with decision tables for spec definition. Spent a lot of time on first principles of 3D-printed gear design and what actually works in FDM. Initial gear design concepts. Aaron did more of the CAD; I focused on design direction and analysis."
      },
      {
        "project": "FSAE Battery Pack Mounts Jig",
        "description": "Machine shop work, bending metal, coordinating with welders. DFM here was asking the right questions, communicating to fabricators, keeping complexity low. The jig worked well despite being simple."
      },
      {
        "project": "Supplier Prototyping",
        "description": "From Tesla internship. Managed design-to-fabrication handoff. See resume for scope. Did not produce formal GD&T drawings for this, which is an honest gap."
      }
    ],
    "gap_note": "Work in progress. Have engineering drawings for manufactured parts but no dedicated GD&T showcase yet. Planning a focused study on interview-relevant GD&T basics."
  },
  "python": {
    "id": "python",
    "name": "Python & Computational Engineering",
    "status": "strong",
    "preview": "30k+ LOC Python connected to physics: 7DOF lap sim with Newton+SciPy solvers, SolidWorks COM automation, 1GB+ telemetry processing, transient ODE heat transfer. Haven't modeled an actuator specifically, but I model battery systems, vehicle dynamics, and thermal systems in code. The pattern transfers. Fluent MATLAB.",
    "evidence": [
      {
        "project": "FSAE Laptime Simulations",
        "description": "Three lap sim tiers at different fidelity levels: point-mass for parameter sweeps (50ms/lap), 7DOF for yaw dynamics, and a MATLAB-parity OpenLAP Python rewrite with MF5.2 tires. For the OpenLAP port I rejected automated transpilation so the code stays inspectable and extensible — modular vehicle, track, solver, drag, and scoring pipeline runs all four FSAE dynamic events end-to-end. Track-quality audits and aero/tire parameter calibration made outputs trustworthy enough for design decisions, not just to produce numbers. Also distributed compute, automation, and data pipeline work on top of the sim stack."
      },
      {
        "project": "DAQ Telemetry Processor",
        "description": "Processes 1GB+ FSAE DAQ files with varied sensor formats and auto unit detection. I use this to turn raw logs into something the team can actually read and make decisions from. G-G diagrams, GGV envelopes."
      },
      {
        "project": "CAD Automation Suite",
        "description": "SolidWorks COM API, SQLite metadata, autonomous overnight loop with composite scoring. Works, but not my most interesting project."
      },
      {
        "project": "Busbar Calculator",
        "description": "Transient thermal model for FSAE busbars (I²R + convection ODE, temperature-dependent resistivity). Built it so the team could see how busbar temperature actually behaves, not just get a number."
      },
      {
        "project": "FSAE Segment Structural HandCalcs",
        "description": "MATLAB-to-Python rewrite of FSAE battery segment structural calcs. Iterable in Colab for SES parameter studies across lid bending, fasteners, buckling, and bond strength."
      },
      {
        "project": "Off-Grid E-Bike Charging Station",
        "description": "Wrote seven Python scripts to size every subsystem from raw weather data: annual demand, solar PV, VAWT, battery, energy balance, and cost analysis for three system variants. Replaced the spreadsheet approach with something repeatable."
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
    "preview": "Robotics since 9th grade. Started dead last, regional champions by 11th grade, qualified for world championships. Lead programmer in 12th grade (~80-90% of programming run points). Currently: QDD actuator for humanoid joints, design judging at local tournaments.",
    "evidence": [
      {
        "project": "High School Robotics — Growth Arc",
        "description": "9th grade: dead last. 11th grade: regional champions, worlds qualifier. 12th grade: lead programmer, ~80-90% of programming run points. Building, designing, programming real competition robots.",
        "metric": "Regional champions · Worlds qualifier · Lead programmer"
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
    "preview": "Methodical approach to testing: deciding what to test, optimizing test time, making results scientific and applied. Arduino + sensors for data collection across multiple projects. I know the inputs, outputs, and how to get hardware working. Motor characterization (ODrive + VESC), physical cooling experiments with derived h-correlation. As VD lead, I decide what we test, where, and why.",
    "evidence": [
      {
        "project": "Battery Cooling Testing",
        "description": "Chose experiment over CFD because the geometry was too irregular to trust a sim. Derived h-coefficient from raw thermocouple and power data. De-risked accumulator overheating during endurance."
      },
      {
        "project": "Motor Control & Characterization",
        "description": "Have used multiple boards (ODrive, VESC) in different configurations. Fried hardware along the way, but I understand the systems well enough to diagnose what went wrong and fix it. Still active work."
      },
      {
        "project": "Arduino Sensor Projects",
        "description": "Arduino + sensors for data collection. Same approach I used in the battery cooling project: cheap hardware, real data."
      },
      {
        "project": "VD Lead",
        "description": "Built the team's first structured test day framework: 17 test objectives in three priority tiers so the day stops cleanly if time runs short, six supporting documents (pre-test GO/NO-GO checklist, run sheet, data collection forms, 48-hour post-test pipeline, 5-Whys problem log, master test matrix), seven go/no-go decision points with named authority. The IC test day will be the first full execution, a process dry-run on hardware that exists now so EV test time isn't wasted on logistics."
      }
    ]
  }
};
