import { Figure } from "@/components/article";

const img = (name: string) => `/projects/fsae-vehicle-dynamics-lead/${name}`;

export function FsaeVehicleDynamicsLeadContent() {
  return (
    <article className="article-prose">
      <section>
        <p>
          First dedicated VD lead on UVic&apos;s FSAE team in two years, on the team&apos;s first
          EV build. The job is to turn competition points into vehicle objectives, vehicle
          objectives into subsystem targets, and subsystem targets into the analysis,
          prioritization, and test plans the team can execute.
        </p>
        {/* BORDERLINE: A1 cascading rule-of-three. See BORDERLINE.md */}
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>The first deliverable: a prioritized list of the job</h2>
        <p>
          UVic hadn&apos;t had a dedicated VD lead in two years. The first deliverable was a
          list of 17 work items, PCE-scored (probability, cost, effect), each with a named
          owner. That list became the backlog every weekly meeting now operates against.
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>The meeting loop</h2>
        <p>
          Weekly VD meetings started in February. The Mar 12 meeting produced the 17-item
          backlog itself. Later meetings produced the Top-10 VD Parameters onboarding doc,
          the measurement procedures index, and the test day framework scope.
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Parameter ownership</h2>
        <p>
          The FSAE EV design spec sheet has 159 parameters across 13 subsystem sections. The
          tracker gives each row an owner, a measurement method, and a difficulty estimate.
          91 of the 159 parameters are delegated to 8 named subsystem leads via an ASK column.
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Gear ratio</h2>
        <p>
          The team had conflicting intuitions about final drive ratio. One side wanted to
          protect top speed, another wanted more acceleration. I built three models
          (traction-limited acceleration, drivetrain efficiency, and full lap simulation) to
          bound the question in physics instead of preference. The team adopted the recommended
          ratio. Full build-up of the analysis is on the{" "}
          <a href="/project/fsae-gear-ratio-selection">gear ratio selection page</a>.
        </p>
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Test day framework</h2>
        <p>
          The IC test day plan is a process dry run for EV test days. 16 test objectives in
          three priority tiers (P1 = 5, P2 = 6, P3 = 5) so the day stops cleanly if time runs
          short, 7 GO/NO-GO decision points with named authority, a 4-person minimum team
          below which the day is postponed, and a data flow that routes every measurement to
          its destination: paper forms to the spec sheet tracker, DAQ files to a two-copy
          backup and then to lap sim correlation. The framework is built. First execution is
          waiting on the car being ready to run.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Sim output to subsystem decisions</h2>
        {/* QUARANTINED — see PAGE-PROSE.md */}

        <Figure
          src={img("project-to-points.png")}
          alt="Project-to-Points master diagram: mapping competition points back through vehicle objectives and subsystem targets to the team's projects"
          caption="Project-to-Points master diagram. Every project the team takes on should trace back to competition points through a clear chain. Gear ratio sits on the power and efficiency paths to lap time."
        />

        {/* QUARANTINED — see PAGE-PROSE.md */}

        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr>
                <th>Chain</th>
                <th>Tier</th>
                <th>KPI</th>
                <th>Unit</th>
                <th>Target</th>
                <th>Review Cadence</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Reliability</td><td>0</td><td>P(finish endurance)</td><td>%</td><td>&gt;90%</td><td>Every build milestone</td></tr>
              <tr><td>Thermal Management</td><td>0</td><td>Component temp margin</td><td>C above limit</td><td>0</td><td>Every test day</td></tr>
              <tr><td>Tire Utilization</td><td>3</td><td>Peak grip utilization</td><td>%</td><td>&gt;85%</td><td>Every test day</td></tr>
              <tr><td>Engineering Design</td><td>S</td><td>Rubric self-score</td><td>/150</td><td>&gt;120</td><td>Monthly + pre-comp</td></tr>
              <tr><td colSpan={6} style={{ color: "#687385", fontStyle: "italic", paddingLeft: "24px" }}>... (Mass, Power, Downforce, Drag, Efficiency, CG, Mass Distribution, Driver Confidence, Cost Awareness — targets in progress)</td></tr>
            </tbody>
          </table>
        </div>

        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>What changed</h2>
        <p>
          The team adopted the recommended final drive ratio. First vehicle-level decision
          the structure produced. Spec sheet ownership sits with 8 named subsystem leads
          instead of being vaguely on someone&apos;s plate. Weekly meetings run against a
          tracked 17-item backlog and nothing falls through. The test day framework is
          built and committed. What remains is execution on a car that runs.
        </p>
        {/* BORDERLINE: A2/A3 — "First vehicle-level decision the structure produced" + "nothing falls through" closers. See BORDERLINE.md */}
        {/* QUARANTINED — see PAGE-PROSE.md */}
      </section>
    </article>
  );
}
