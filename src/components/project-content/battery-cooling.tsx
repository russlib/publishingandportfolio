import Link from "next/link";
import {
  Figure,
  Callout,
  Collapsible,
  BlockEquation,
  InlineEquation,
  ProjectToc,
} from "@/components/article";

const img = (name: string) => `/projects/battery-cooling/${name}`;

const toc = [
  { id: "summary", title: "The Summary" },
  { id: "understanding", title: "Understanding" },
  { id: "designing", title: "Designing" },
  { id: "testing", title: "Testing" },
  { id: "takeaways", title: "Creating Takeaways" },
];

export function BatteryCoolingContent() {
  return (
    <article className="article-prose">
      <ProjectToc entries={toc} />

      {/* ── Summary ─────────────────────────────────────── */}
      <section>
        <h2 id="summary">The Summary</h2>

        <p>
          <strong>Decision:</strong> 6 W server fan operating point. Delivers{" "}
          <InlineEquation tex="h \approx 21\;\text{W/m}^2\text{K}" />, holding cells under
          60 &deg;C up to 39 &deg;C ambient, which covers nearly all FSAE competition conditions.
          Enough margin to downgrade from a 10k to a 7k RPM fan without risk.
        </p>
        <p>
          <strong>What it eliminated:</strong> Whether our pack needed active cooling at all, how
          much fan power, and which fan topology. Server fans outperforming blowers at equal power
          was the unexpected result that changed the hardware selection.
        </p>
        <p>
          <strong>Evidence boundary:</strong> The h-correlation itself is experimentally validated
          across four power levels. Max safe ambient estimates depend on mass flow rate, which was
          back-calculated from h rather than measured directly.
        </p>

        <h3>Motivation</h3>
        <p>
          Over the course of endurance (22 km, ~25 minutes) our battery pack has to maintain
          temperatures under 60 &deg;C (FSAE rules for maximum cell temperature). My cell and race
          profile modeling tools showed either cooling or power limiting must be done to keep our
          pack within temperatures.
        </p>

        <h3>Action</h3>
        <p>
          It was determined that doing physical airflow testing on our battery would produce higher
          quality results faster than CFD. The result of this experiment was creating a correlation
          between fan power and the heat transfer coefficient (cooling ability).
        </p>

        <h3>Result</h3>
        <Figure
          src={img("correlation-graph.png")}
          alt="Fan power vs heat transfer coefficient correlation"
          caption="Fan power vs heat transfer coefficient — the key deliverable from physical testing"
        />
        <p>
          The correlation{" "}
          <InlineEquation tex="h = 9.97 \times P^{0.462}" /> allows us to predict cooling
          performance at any fan power setting. At 10 W fan power, we achieve{" "}
          <InlineEquation tex="h \approx 24\;\text{W/m}^2\text{K}" />. However, the h-coefficient
          alone doesn&apos;t tell the whole story. As air flows past each row of cells, it absorbs
          heat and warms up, reducing cooling effectiveness for downstream rows. Our analysis
          accounts for this cumulative air heating effect to determine realistic &ldquo;max safe
          ambient&rdquo; temperatures, giving us high confidence that our cooling system can maintain
          cell temperatures below 60 &deg;C even in unusually hot conditions.
        </p>

        <h3>Why Physical Testing?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] my-[24px] items-end justify-items-center">
          <figure className="flex w-full flex-col items-center">
            <div className="flex h-[320px] w-full items-center justify-center">
              <img
                src={img("enepaq-module-cad.png")}
                alt="CAD view of Enepaq module showing irregular airflow path"
                className="max-h-full max-w-full rounded-[8px] object-contain"
              />
            </div>
            <figcaption className="mt-[8px] text-center text-[13px] italic" style={{ color: "#687385" }}>
              Front view of our module design (23 Enepaq bricks in a module)
            </figcaption>
          </figure>
          <figure className="flex w-full flex-col items-center">
            <div className="flex h-[320px] w-full items-center justify-center">
              <img
                src={img("enepaq-brick-render.png")}
                alt="Single Enepaq brick structure"
                className="max-h-full max-w-full rounded-[8px] object-contain"
              />
            </div>
            <figcaption className="mt-[8px] text-center text-[13px] italic" style={{ color: "#687385" }}>
              Single Enepaq brick structure
            </figcaption>
          </figure>
        </div>
        <p>
          The irregular geometry of Enepaq modules makes analytical heat transfer calculations (from
          array cooling textbook examples) unreliable. Physical testing was the fastest path to valid
          results.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Understanding ───────────────────────────────── */}
      <section>
        <h2 id="understanding">Understanding</h2>
        <p>The fundamental energy balance for cell cooling:</p>
        <BlockEquation tex="\dot{Q}_{gen} = \dot{Q}_{conv} + \dot{Q}_{rad} + \dot{Q}_{cond} + \dot{Q}_{stored}" />
        <p>
          During cooldown testing, we simplify by eliminating heat generation and assuming convection
          dominates:
        </p>
        <BlockEquation tex="\cancel{\dot{Q}_{gen}} = \dot{Q}_{conv} + \cancel{\dot{Q}_{rad}} + \cancel{\dot{Q}_{cond}} + \dot{Q}_{stored}" />
        <p>Which gives us Newton&apos;s law of cooling with thermal mass:</p>
        <BlockEquation tex="mc\frac{dT}{dt} = -hA(T_{cell} - T_{ambient})" />

        <h3>CFD vs Experimentation</h3>
        <p>
          This project originally started because I set out to create realistic cooling estimates for
          our battery. I had a brief stint of trying to set up thermal CFD but quickly realized that
          I was neither confident in heat transfer fundamentals (started this in 2024), nor
          understood CFD solvers. I ended up asking the FSAE discord and Ethan Perrin (Tesla Battery
          Engineer, personal communication) pointed me toward IRL physical testing being much more
          likely to give valid results much faster.
        </p>

        <Collapsible title="CFD Attempts & Discord Advice">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <Figure
              src={img("cfd-attempt.webp")}
              alt="Early CFD attempt with colorful thermal visualization"
              caption="Very nice colors, oooh ahhhh."
              width={400}
            />
            <Figure
              src={img("bench-testing-idea.png")}
              alt="Notes about wanting to do bench testing"
              caption="I very much wanted to try out testing on the real thing"
              width={400}
            />
            <Figure
              src={img("discord-advice-1.png")}
              alt="FSAE discord conversation about testing approach"
              caption="Getting some advice from the FSAE discord"
              width={400}
            />
            <Figure
              src={img("discord-advice-2.png")}
              alt="Discord advice pointing toward valid results"
              caption="Put on the path of getting a valid result and not just a result"
              width={400}
            />
          </div>
          <p className="mt-[12px] text-[13px] italic" style={{ color: "#687385" }}>
            Early attempts at CFD and the conversation that redirected me toward physical testing.
          </p>
        </Collapsible>

        <h3>Heat Transfer First Principles and MATLAB Files</h3>
        <p>
          The start of this project was in the semester before I had taken my university&apos;s heat
          transfer course. Before I designed any test setups or plans I worked on a couple thermal
          models in MATLAB.
        </p>

        <Callout type="note">
          For the algebra behind how <InlineEquation tex="h" /> scales with velocity and fan power,
          see the{" "}
          <Link href="/project/nusselt-correlation-derivation" className="underline underline-offset-[3px]">
            Nusselt correlation derivation
          </Link>
          {" "}&mdash; it predicts roughly 16&times; fan power to double cooling, which matches
          what this experiment measured.
        </Callout>

        <Collapsible title="MATLAB Files & Learning Process">
          <Figure
            src={img("early-cooling-graph.webp")}
            alt="Early cooling graph from MATLAB with poor labels"
            caption='What even is 2 m/s?'
            width={500}
          />
          <p className="text-[13px] italic" style={{ color: "#687385" }}>
            Early thermal models I built before taking heat transfer: array cooling, dynamic
            similarity, Nusselt correlations.
          </p>
        </Collapsible>

        <h3>Remaining Unknowns</h3>
        <p>
          The MATLAB models gave me fundamental understanding, but several parameters remained
          uncertain. I have ideas to look deeper into these, but more pressing priorities take up my
          time for the amount of benefit these would give.
        </p>
        <ul>
          <li>
            <strong>Airflow velocity</strong> &mdash; fan specs don&apos;t translate directly to air
            speed over cells
          </li>
          <li>
            <strong>Turbulence effects</strong> &mdash; how does fan-induced turbulence affect heat
            transfer?
          </li>
          <li>
            <strong>Pressure drop</strong> &mdash; what&apos;s the system impedance across the
            module?
          </li>
          <li>
            <strong>Cumulative error</strong> &mdash; how do uncertainties compound in detailed
            models?
          </li>
        </ul>
        <p>These unknowns motivated physical testing over analytical approaches.</p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Designing ───────────────────────────────────── */}
      <section>
        <h2 id="designing">Designing</h2>
        <p>
          The goal: create a mock Enepaq brick that could be heated and have air blown past it.
          Success criteria:
        </p>
        <ul>
          <li>Build quickly</li>
          <li>Approximate thermal characteristics of real batteries</li>
          <li>Test quickly and repeatably</li>
        </ul>
        <p>
          Aluminum turned out to be ideal. It has similar density and heat capacity to lithium-ion
          cells at room temperature. The problem was I could only source imperial stock in Canada
          (5/8&quot; vs 18 mm cells).
        </p>
        <p>
          I wrote a dynamic similarity script (see MATLAB dropdown above) to check if imperial stock
          would skew results. Verdict: close enough for valid data, but 18 mm stock would make the
          mock modules dimensionally identical to real ones. Worth the wait.
        </p>

        <h3>The AliExpress Saga</h3>
        <p>
          University purchasing delays pushed this project back over a month. I ended up buying the
          aluminum myself from AliExpress. I designed two mock brick versions:
        </p>
        <ul>
          <li>
            <strong>3D printed:</strong> Cheap, fast. Mainly for validating system airflow impedance
          </li>
          <li>
            <strong>Laser cut:</strong> Wood + aluminum rods. Enables oven preheating to test
            progressive air heating
          </li>
        </ul>
        <p>
          The designs worked surprisingly well. The downside was by the time everything arrived and
          laser cutting was done, finals season was approaching.
        </p>

        <h3>Mock Brick Design</h3>
        <Figure
          src={img("lasercut-brick.webp")}
          alt="Laser-cut mock Enepaq brick with aluminum rods on desk"
          caption="Laser-cut mock Enepaq brick with aluminum rods. Similar thermal mass to real 18650 cells"
          width={500}
        />

        <Collapsible title="Design Gallery: Mock Brick Photos & CAD">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <Figure
              src={img("3d-printed-brick.jpg")}
              alt="3D printed Enepaq brick"
              caption="3D printed brick"
              width={300}
            />
            <Figure
              src={img("lasercut-cad.png")}
              alt="SolidWorks CAD model of laser-cut brick"
              caption="CAD model of laser-cut design"
              width={300}
            />
            <Figure
              src={img("lasercut-progress.webp")}
              alt="Laser cutting in progress"
              caption="Laser cutting in progress"
              width={300}
            />
            <Figure
              src={img("lasercut-cad-solid.png")}
              alt="Non-transparent CAD view of laser-cut brick"
              caption="Non-transparent CAD view"
              width={300}
            />
          </div>
          <p className="mt-[12px] text-[13px] italic" style={{ color: "#687385" }}>
            3D printed and laser-cut mock Enepaq brick designs.
          </p>
        </Collapsible>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Testing ─────────────────────────────────────── */}
      <section>
        <h2 id="testing">Testing</h2>
        <p>The physical testing can be broken up into two categories:</p>
        <ul>
          <li>Aluminum mock Enepaq brick (heated externally by heat gun)</li>
          <li>Real Enepaq brick (heated by electrical discharge)</li>
        </ul>

        <h3>Scrappy Test Setup</h3>
        <p>
          Temperature measurement used K-type thermocouples with thermal paste, taped to the
          aluminum surface. Data was logged via a Chinese TC logger to CSV files.
        </p>
        <Figure
          src={img("scrappy-test-setup.jpeg")}
          alt="Test setup showing thermocouple placement and airflow configuration"
          caption="Test setup showing thermocouple placement and airflow configuration. This was the first day everything was printed out and the DAQ was working. This is NOT the setup used, it's my best photo that displays everything in one view."
          width={500}
        />
        <Figure
          src={img("early-matlab-plot.webp")}
          alt="Messy MATLAB plot from initial aluminum brick testing"
          caption="Early testing with aluminum 'dummy' bricks — these initial experiments gave us unusually high h-coefficients due to unreliable thermocouple adherence and didn't account for the 'hottest cell rule' or progressive air heating across rows"
          width={500}
        />

        <h3>Real Enepaq Brick Testing</h3>
        <Figure
          src={img("full-test-setup.jpeg")}
          alt="Full battery cooling test setup with Enepaq brick, airflow segment, power supply, and data logging"
          caption="Full test setup overview — Enepaq brick, airflow segment, power supply, and data logging"
          width={500}
        />
        <p>
          The Enepaq brick&apos;s built-in thermistors provided comparison data for the live cell
          tests. These internal sensors are shielded by the plastic casing, which means they lag
          behind actual cell surface temperature. Important context when comparing to thermocouple
          readings.
        </p>

        <Collapsible title="Test Setup Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <Figure
              src={img("mock-vs-real-cell.jpeg")}
              alt="Mock Enepaq brick next to real VTC6 cell"
              caption="Mock brick vs real VTC6 cell — aluminum has a similar thermal mass and density"
              width={400}
            />
            <Figure
              src={img("enepaq-sensor-layout.png")}
              alt="Enepaq temperature sensor layout"
              caption="Enepaq temperature sensors are shielded by plastic casing — thermistor readings lag actual cell temperature"
              width={400}
            />
            <Figure
              src={img("mock-bricks-in-casing.jpeg")}
              alt="Mock bricks installed in airflow segment casing"
              caption="Mock bricks in airflow segment casing, ESP32 data logger in background"
              width={400}
            />
            <Figure
              src={img("3d-printed-impedance-bricks.jpeg")}
              alt="3D printed mock bricks for airflow impedance matching"
              caption="3D printed mock bricks to match system airflow impedance"
              width={400}
            />
            <Figure
              src={img("crimping-and-esp32.jpeg")}
              alt="Clean crimped high-current cables with messy ESP32 wiring"
              caption="Clean crimping on high-current cables... less clean ESP32 wiring"
              width={400}
            />
          </div>
        </Collapsible>

        <h3>Test Parameters</h3>
        <div className="overflow-x-auto my-[24px]">
          <table>
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cell rows</td><td>6</td></tr>
              <tr><td>Cells per row</td><td>4</td></tr>
              <tr><td>Segment bricks</td><td>1 (of 23 in full pack)</td></tr>
              <tr><td>Discharge current</td><td>35 A constant</td></tr>
              <tr><td>Start voltage</td><td>4.185 V</td></tr>
              <tr><td>End voltage</td><td>2.8 V (most tests)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto my-[24px]">
          <table>
            <thead>
              <tr>
                <th>Run</th>
                <th>Fan Type</th>
                <th>Power</th>
                <th>Median h*</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Run 1</td><td>10k Server Fan</td><td>2.75 W</td><td>13.4 W/m&sup2;K</td></tr>
              <tr><td>Run 2</td><td>10k Server Fan</td><td>6.0 W</td><td>21.0 W/m&sup2;K</td></tr>
              <tr><td>Run 3</td><td>10k Server Fan</td><td>10.0 W</td><td>23.6 W/m&sup2;K</td></tr>
              <tr><td>Run 4</td><td>10k Server Fan</td><td>16.0 W</td><td>26.2 W/m&sup2;K</td></tr>
              <tr><td>Run 5</td><td>5015 Blower</td><td>2.75 W</td><td>9.3 W/m&sup2;K</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-[13px] italic" style={{ color: "#687385" }}>
          *h-coefficient calculated from the hottest cell temperature — this is the conservative
          approach since we care about the worst-case cell.
        </p>

        <Callout type="note" title="Why a 10k Server Fan?">
          <p>
            A server fan is massive overkill for this application, but it was chosen deliberately to
            give us flexibility during testing. We could easily characterize performance across a
            wide power range and have confidence we&apos;d find a workable operating point and better
            correlation.
          </p>
        </Callout>

        <h3>Representative Test Analysis</h3>
        <Figure
          src={img("run3-analysis.png")}
          alt="Run 3 four-axis analysis plot"
          caption="Run 3 (10k server fan at 10 W): Four-axis plot showing h-coefficient stabilization, heat loss, temperature decay, and battery (recovery) voltage over time"
        />
        <p>The h-coefficient calculation uses Newton&apos;s law of cooling:</p>
        <BlockEquation tex="h = -\frac{mc \cdot \frac{dT}{dt}}{A \cdot \Delta T}" />
        <p>Where:</p>
        <ul>
          <li>
            <InlineEquation tex="mc" /> = thermal mass of cells (5 cells &times; 49 g &times; 900
            J/kg&middot;K)
          </li>
          <li>
            <InlineEquation tex="A" /> = exposed surface area (90% of cylindrical surface)
          </li>
          <li>
            <InlineEquation tex="\Delta T" /> = temperature difference between cell and ambient
          </li>
        </ul>

        <h3>Comparison Across Runs</h3>
        <Figure
          src={img("h-comparison.png")}
          alt="Overlay of h-coefficient vs time for all test runs"
          caption="Overlay of h-coefficient vs time for all test runs. Faster cooling = shorter test time. Plots truncated to keep clean data. Median h-coefficient is taken from these graphs to avoid the effect of h rising due to thermal inertia."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Takeaways ───────────────────────────────────── */}
      <section>
        <h2 id="takeaways">Creating Takeaways</h2>

        <Callout type="warning" title="Purposeful Pessimism">
          <p>
            This is UVic FSAE&apos;s first year with this battery architecture. We&apos;re applying
            conservative safety factors because:
          </p>
          <ol className="list-decimal pl-[20px] mt-[8px] space-y-[4px]">
            <li>
              <strong>Overheating = DNF</strong> — exceeding 60 &deg;C during endurance means we
              fail
            </li>
            <li>
              <strong>Data quality will improve</strong> — once the car is running, we&apos;ll get
              real-world validation
            </li>
            <li>
              <strong>We have the budget</strong> — our LV power budget can accommodate oversized
              cooling if needed
            </li>
          </ol>
          <p className="mt-[8px]">Better to be overly cautious now and dial back later.</p>
        </Callout>

        <h3>The Correlation</h3>
        <Figure
          src={img("correlation-graph.png")}
          alt="Power law fit for h-coefficient vs fan power"
          caption="Power law fit: h = 9.97 × P^0.462 for the 10k server fan configuration. Blower immediately seen as less effective even at its max nominal power draw"
        />
        <p>
          This correlation is the primary deliverable. It allows predicting heat transfer coefficient
          for any fan power setting without additional physical testing.
        </p>

        <h3>Golden Table (with High Safety Margins)</h3>
        <div className="overflow-x-auto my-[24px]">
          <table>
            <thead>
              <tr>
                <th>Run</th>
                <th>Fan Config</th>
                <th>Power</th>
                <th>Median h</th>
                <th>Cell &Delta;T</th>
                <th>Air Heating</th>
                <th>Max Safe Ambient</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Run 1</td><td>10k Server</td><td>2.75 W</td><td>13.43</td>
                <td>32.5 &deg;C</td><td>+11.0 &deg;C</td><td className="font-semibold">16.5 &deg;C</td>
              </tr>
              <tr>
                <td>Run 2</td><td>10k Server</td><td>6.0 W</td><td>21.00</td>
                <td>15.3 &deg;C</td><td>+5.4 &deg;C</td><td className="font-semibold">39.3 &deg;C</td>
              </tr>
              <tr>
                <td>Run 3</td><td>10k Server</td><td>10.0 W</td><td>23.57</td>
                <td>13.9 &deg;C</td><td>+4.4 &deg;C</td><td className="font-semibold">41.8 &deg;C</td>
              </tr>
              <tr>
                <td>Run 4</td><td>10k Server</td><td>16.0 W</td><td>26.23</td>
                <td>12.4 &deg;C</td><td>+3.5 &deg;C</td><td className="font-semibold">44.1 &deg;C</td>
              </tr>
              <tr>
                <td>Run 5</td><td>Blower</td><td>2.75 W</td><td>9.29</td>
                <td>28.8 &deg;C</td><td>+15.0 &deg;C</td><td className="font-semibold">16.3 &deg;C</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[13px]" style={{ color: "#687385" }}>
          Max Safe Ambient = 60 &deg;C limit &minus; Cell &Delta;T &minus; Air Heating offset.
          <br />
          Air heating estimates depend heavily on mass flow rate. Mass flow wasn&apos;t measured
          directly — it was back-calculated from the h-coefficient correlation to airspeed. This
          table will be updated once I measure actual volumetric flow rate with my &ldquo;low-backpressure
          trash bag air catcher&rdquo; (yes, it&apos;s exactly what it sounds like).
        </p>

        <h3>Air Temperature Gradient</h3>
        <Figure
          src={img("air-temp-gradient.png")}
          alt="Estimated air temperature rise across 6 cell rows"
          caption="Estimated air temperature rise across 6 cell rows — higher fan power reduces cumulative heating"
        />

        <Callout type="note" title="Mass Flow Measurement Pending">
          <p>
            These curves rely on estimated mass flow. Direct measurement will improve accuracy
            significantly.
          </p>
        </Callout>

        <h3>Design Implications</h3>
        <ol className="list-decimal pl-[20px] space-y-[8px]">
          <li>
            <strong>Fan selection:</strong> Server fans actually outperform blowers at equivalent
            power — this was unexpected. The 10k server fan handles both static pressure and high
            airflow well.
          </li>
          <li>
            <strong>Operating point:</strong> 6 W fan power provides{" "}
            <InlineEquation tex="h \approx 21\;\text{W/m}^2\text{K}" />, sufficient for almost all
            race conditions (ambient &lt; 39 &deg;C).
          </li>
          <li>
            <strong>Blowers inadequate:</strong> Same power input yields ~30% lower h-coefficient,
            unexpected result.
          </li>
          <li>
            <strong>Room to optimize:</strong> Very confident we can downgrade to a 7k RPM fan and
            still meet thermal requirements with margin.
          </li>
        </ol>

        <h3>Analysis Code</h3>
        <p>Processing pipeline:</p>
        <ul>
          <li>Smoothing for noise reduction</li>
          <li>Newton&apos;s law of cooling for h-coefficient extraction</li>
          <li>Power law curve fitting for correlation</li>
          <li>Row-by-row air temperature gradient simulation</li>
        </ul>

        <h3>Future Work</h3>
        <ul>
          <li>Weather statistics to make decisions on ambient conditions at competition venues</li>
          <li>Effect of additional heating from sun exposure and hot pavement</li>
          <li>Pre-cooling strategies (ice intake air) for extreme conditions</li>
          <li>Trash-bag air measurement test</li>
        </ul>
      </section>
    </article>
  );
}
