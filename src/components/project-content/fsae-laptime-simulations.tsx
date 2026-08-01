import { Figure } from "@/components/article";

const img = (name: string) => `/projects/fsae-laptime-simulations/${name}`;

export function FsaeLaptimeSimulationsContent() {
  return (
    <article className="article-prose">
      <section>
        <p>
          A Python lap simulation and vehicle-analysis tool for FSAE EV design work. I
          rebuilt the core simulation in Python around a clearer module structure (vehicle,
          track, solver, drag, scoring).
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>What I built</h2>
        <p>
          Three lap sim tiers at different fidelity levels so the question dictates the tool:
          a point-mass solver for parameter sweeps (~50 ms per lap, used for sensitivity
          work), a 7DOF model for yaw dynamics, and an OpenLAP Python rewrite at MATLAB parity
          with MF5.2 tires. For the OpenLAP port I rejected automated transpilation. The
          pipeline runs all four FSAE dynamic events (acceleration, skidpad, autocross,
          endurance).
        </p>
        {/* BORDERLINE: A3 — "so the question dictates the tool" pithy aphoristic. See BORDERLINE.md */}
        {/* QUARANTINED — see PAGE-PROSE.md */}

        <Figure
          src={img("track-map-speed.png")}
          alt="Track map with speed overlay showing the simulated car's velocity at each point of the lap"
          caption="Track map colored by simulated speed. A validation visual used to sanity-check that the solver was matching track geometry."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Making the model believable</h2>
        <p>
          I built a track-quality audit that identifies which event tracks are usable and
          which are misleading before they get fed into a study. Aero and tire parameters
          were calibrated against known references.
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}

        <Figure
          src={img("ggv-diagram.png")}
          alt="3D GGV diagram showing achievable longitudinal and lateral acceleration across a range of vehicle speeds"
          caption="3D GGV envelope from the Python solver. Combined lateral and longitudinal acceleration limits versus speed."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>What the tool enabled</h2>
        <p>
          The pipeline supported parameter sensitivity sweeps for gear ratio and
          vehicle-mass studies, event-level performance comparisons, and power-limiting and
          endurance energy work. The gear ratio decision drew its lap-time argument from
          this sim.
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      {/* QUARANTINED — see PAGE-PROSE.md (entire "What I took from it" section flagged) */}
    </article>
  );
}
