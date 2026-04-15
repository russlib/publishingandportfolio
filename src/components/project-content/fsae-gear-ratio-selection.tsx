import { Figure } from "@/components/article";

const img = (name: string) => `/projects/fsae-gear-ratio-selection/${name}`;

export function FsaeGearRatioSelectionContent() {
  return (
    <article className="article-prose">
      {/* ── One-line summary ────────────────────────────── */}
      <section>
        <h2>One-line summary</h2>
        <p>
          I built traction, efficiency, and lap-time models to choose a final drive ratio that
          maximized competition points, then used that analysis to support a sprocket change and
          resolve competing subsystem priorities.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Opening ─────────────────────────────────────── */}
      <section>
        <h2>Opening</h2>
        <p>The final drive ratio looked like a simple top-speed tradeoff. It wasn&apos;t.</p>
        <p>
          On a single-speed FSAE EV, one ratio touches acceleration, motor efficiency, top speed,
          packaging, chain forces, and differential torque at the same time. Different people were
          optimizing for different outcomes, and the default intuition was to bias toward top speed.
        </p>
        <p>
          I wanted to answer the real question:{" "}
          <strong>
            what ratio actually makes the car faster in competition, without creating a drivetrain
            or efficiency problem elsewhere?
          </strong>
        </p>
        <p>
          That meant turning a design-review argument into a vehicle-level decision problem with
          physics and scoring behind it.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Engineering problem ─────────────────────────── */}
      <section>
        <h2>The engineering problem</h2>
        <p>A single ratio had to satisfy four competing objectives at once:</p>

        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr>
                <th>Objective</th>
                <th>What it wants</th>
                <th>Ratio direction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Traction-limited acceleration</td>
                <td>Enough wheel torque to reach the tire limit</td>
                <td>Higher</td>
              </tr>
              <tr>
                <td>Motor efficiency</td>
                <td>Stay in the high-efficiency operating region</td>
                <td>Moderate</td>
              </tr>
              <tr>
                <td>Top speed</td>
                <td>More speed at the end of straights</td>
                <td>Lower</td>
              </tr>
              <tr>
                <td>Packaging and chain / diff loads</td>
                <td>Lower transmitted torque and easier mechanical packaging</td>
                <td>Lower</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>That made this a cross-subsystem problem, not just a powertrain tuning choice.</p>
        <p>The naive answer was to optimize for top speed. My analysis showed that was the wrong objective.</p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Governing principle ─────────────────────────── */}
      <section>
        <h2>Governing principle</h2>
        <p>
          The core idea was simple:{" "}
          <strong>the car should be traction-limited, not motor-limited, in acceleration.</strong>
        </p>
        <p>
          If the motor cannot generate enough wheel torque to reach the tire traction limit, the
          car is leaving acceleration on the table. Once the car is traction-limited, increasing
          the ratio further does not improve launch performance, so the problem becomes finding the
          lowest ratio that guarantees traction-limited acceleration without paying for it
          somewhere else.
        </p>
        <p>This turned the whole question into a bounds problem:</p>
        <ul>
          <li>too low, and the motor is the bottleneck</li>
          <li>high enough, and the tires become the bottleneck</li>
          <li>too high, and efficiency starts to fall without a meaningful points return</li>
        </ul>

        <Figure
          src={img("sensitivity_gear_ratio.png")}
          alt="Gear ratio sensitivity plot showing crossover between motor-limited and traction-limited regions"
          caption="The conceptual anchor for the whole project: crossover between motor-limited and traction-limited operation. Makes the design target visible rather than intuitive."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── How I answered it ───────────────────────────── */}
      <section>
        <h2>How I answered it</h2>
        <p>I built three main analysis paths that all converged on the same answer.</p>

        <h3>1. Traction and differential torque model</h3>
        <p>
          The first question was whether a more aggressive final drive would overload the
          differential or chain.
        </p>
        <p>I built a traction model that accounted for:</p>
        <ul>
          <li>vehicle mass</li>
          <li>rear weight fraction</li>
          <li>dynamic weight transfer under acceleration</li>
          <li>tire friction coefficient</li>
          <li>the coupled relationship between acceleration and rear normal force</li>
        </ul>
        <p>
          That let me estimate the <strong>maximum usable torque at the differential</strong>, not
          just the motor&apos;s theoretical output torque.
        </p>
        <p>
          <strong>Key result:</strong> worst-case usable diff torque was about <strong>1000 Nm</strong>,
          set by traction. The differential spec was about <strong>1200 Nm</strong>, so the real
          limit was the tire, not the drivetrain.
        </p>

        <Figure
          src={img("diff-torque-felt-plot.png")}
          alt="Diff torque felt plot showing traction-bounded torque vs ratio"
          caption="Maximum usable differential torque capped by traction, not drivetrain. Once the tire saturates, torque is bounded regardless of ratio."
        />

        <p>
          This mattered because it answered the drivetrain objection directly. The concern was
          that choosing a higher ratio would break the diff. The model showed that once the tire
          saturates, torque is capped by traction anyway.
        </p>

        <h3>2. Lap-time and points sweeps</h3>
        <p>
          The next question was whether a lower ratio, with more top speed, might still score
          better overall.
        </p>
        <p>
          To test that, I ran parametric sweeps across gear ratio and looked at the resulting
          performance in:
        </p>
        <ul>
          <li>acceleration</li>
          <li>autocross</li>
          <li>endurance</li>
          <li>total competition points</li>
        </ul>
        <p>I used two versions of the sweep:</p>
        <ul>
          <li><strong>45 kW / 112 Nm</strong> as a conservative scenario</li>
          <li><strong>73.7 kW / 180 Nm</strong> as a more realistic scenario</li>
        </ul>

        <Figure
          src={img("gear-ratio-sweep-73kw.png")}
          alt="Gear ratio sweep at 73.7 kW / 180 Nm showing points vs ratio"
          caption="Gear ratio sweep at realistic 73.7 kW / 180 Nm. Points drop sharply below the useful band; above it, the curve flattens and extra top speed buys very little."
        />

        <p>The key pattern was not subtle.</p>
        <p>
          Below the useful ratio band, the car loses a large number of points because acceleration
          degrades quickly. Above that band, the performance curve flattens, and extra top speed
          contributes very little.
        </p>
        <p>The risk was asymmetric:</p>
        <ul>
          <li>choosing too low a ratio cost meaningful points</li>
          <li>choosing somewhat higher cost very little until efficiency started to fall off</li>
        </ul>
        <p>
          In the conservative scenario, the penalty for favoring top speed over acceleration was
          on the order of <strong>~50 competition points</strong>. That made the original team
          intuition much easier to challenge.
        </p>

        <h3>3. Motor efficiency mapping</h3>
        <p>
          One of the strongest objections to a higher ratio was motor efficiency. The argument was
          that a lower ratio would keep the motor in a better operating condition and reduce
          losses.
        </p>
        <p>I mapped the operating points against motor efficiency across the ratio range.</p>

        <Figure
          src={img("back-calculated-motor-eff.png")}
          alt="Back-calculated motor efficiency across the gear ratio range"
          caption="Efficiency stays effectively flat across the useful band (3.2 to 4.2) and only starts to degrade above ~4.4."
        />

        <p>
          The result was important: efficiency stayed effectively flat over the useful decision
          band, roughly <strong>3.2 to 4.2</strong>, and only started to noticeably degrade above
          about <strong>4.4</strong>.
        </p>
        <p>
          That meant the efficiency argument against a traction-driven ratio was not valid inside
          the actual candidate range.
        </p>
        <p>
          This was one of the clearest examples of replacing a vague subsystem preference with a
          quantified answer.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Decision window ─────────────────────────────── */}
      <section>
        <h2>The decision window</h2>
        <p>The useful region ended up being relatively narrow and easy to explain.</p>
        <ul>
          <li><strong>Below ~4.0:</strong> the car becomes motor-limited and gives away acceleration</li>
          <li><strong>Around 4.0 to 4.4:</strong> traction-limited, strong points outcome, still inside the efficiency plateau</li>
          <li><strong>Above ~4.4:</strong> efficiency begins to drop without enough competition upside to justify it</li>
        </ul>
        <p>That led to a recommendation centered around <strong>~4.2</strong>.</p>
        <p>
          It was not &ldquo;the one mathematically magical number.&rdquo; It was the strongest
          point inside the band where the major objectives were all satisfied at once.
        </p>

        <h3>Candidate framing</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr>
                <th>Ratio</th>
                <th>Interpretation</th>
                <th>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>~4.2</td>
                <td>Traction-limited and still on the efficiency plateau</td>
                <td><strong>Selected</strong></td>
              </tr>
              <tr>
                <td>~3.4</td>
                <td>Better top speed, but risks giving away acceleration</td>
                <td>Backup only</td>
              </tr>
              <tr>
                <td>~5.5</td>
                <td>Extra torque margin, but efficiency loss with little points gain</td>
                <td>Rejected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Hardware ────────────────────────────────────── */}
      <section>
        <h2>Turning the analysis into hardware</h2>
        <p>The value of the work was not just the plots. It changed the design conversation.</p>
        <p>
          This analysis helped shift the team from &ldquo;which ratio feels right?&rdquo; to
          &ldquo;which ratio wins points without violating real constraints?&rdquo;
        </p>
        <p>It changed the discussion in three places:</p>

        <h3>1. Powertrain discussion</h3>
        <p>
          The default intuition had been to bias toward top speed. The lap-time and scoring sweeps
          showed that acceleration mattered far more and that top-speed gains were worth very
          little in the events we actually cared about.
        </p>

        <h3>2. Drivetrain review</h3>
        <p>
          There was concern that a more aggressive ratio would overload the differential. The
          traction model showed that the diff was traction-bounded, not arbitrarily ratio-bounded,
          which reduced the perceived risk.
        </p>

        <h3>3. Efficiency argument</h3>
        <p>
          There was repeated concern that a higher ratio would hurt motor efficiency. The
          efficiency map showed that the chosen band sat on a broad efficiency plateau, so there
          was no meaningful penalty in the actual decision range.
        </p>

        <p>The analysis was then used to support a sprocket change aligned with the traction-limited strategy.</p>

        <Figure
          src={img("sprocket_comparison_4.4_vs_4.8.png")}
          alt="Sprocket comparison between 4.4 and 4.8 final drive ratios"
          caption="Ratio study translated into a real hardware choice. Made the result actionable for the team."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── What this demonstrates ──────────────────────── */}
      <section>
        <h2>What this project demonstrates</h2>
        <p>This is one of the better examples in my portfolio because it shows a pattern I care about a lot:</p>
        <ol>
          <li>a team is arguing from intuition</li>
          <li>the real decision variable touches multiple subsystems</li>
          <li>the correct objective is not the obvious one</li>
          <li>a relatively small model-building effort can make the right answer legible</li>
        </ol>
        <p>Technically, it demonstrates:</p>
        <ul>
          <li>first-principles reasoning</li>
          <li>coupled tradeoff analysis</li>
          <li>lap-time / scoring sensitivity thinking</li>
          <li>model-building for decision support, not just reporting</li>
          <li>communication across subsystem boundaries</li>
        </ul>
        <p>
          Just as importantly, it shows engineering judgment. The point was not to produce more
          plots. The point was to identify the governing constraint, build only enough analysis to
          expose it, and use that evidence to support a real design choice.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Known gaps ──────────────────────────────────── */}
      <section>
        <h2>Known gaps and honesty notes</h2>
        <p>This project still has a few gaps that should be acknowledged rather than glossed over:</p>
        <ul>
          <li>exact measured before / after acceleration times have not yet been recovered from logs</li>
          <li>some sweep inputs were noted in the original analysis as not being perfectly final</li>
          <li>the public page should avoid overstating precision where the qualitative conclusion is stronger than the exact numeric result</li>
        </ul>
        <p>
          That said, the core decision logic is strong. Multiple independent analyses pointed to
          the same conclusion, and the outcome was robust to uncertainty in the exact parameters.
        </p>
      </section>
    </article>
  );
}
