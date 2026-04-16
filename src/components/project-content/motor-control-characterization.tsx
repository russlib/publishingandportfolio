import { Figure, Callout, BlockEquation, InlineEquation, Mermaid } from "@/components/article";

const img = (name: string) => `/projects/motor-control-characterization/${name}`;

export function MotorControlCharacterizationContent() {
  return (
    <article className="article-prose">
      {/* ── Overview ─────────────────────────────────────── */}
      <section>
        <h2>Motor Testing and Characterization Platform</h2>
        <p>
          A bench platform for characterizing a D6374 150kv BLDC motor across static parameters,
          no-load dynamics, and flywheel-loaded spin-up, using two different controllers
          (ODrive 3.6 and MKS VESC 75200) as cross-validation. The strongest outputs are not a single
          dyno number but the test structure, the explicit separation of motor behavior from
          controller artifacts, and the iteration history behind each result.
        </p>
        <p>
          <strong>Status:</strong> six closed findings across static, dynamic, and friction
          characterization, cross-validated on two controllers. Loaded steady-state testing blocked
          on a known flywheel identifiability issue (isolation plan written).
        </p>

        <h3>Why I built this</h3>
        <p>
          I want to design humanoid robot actuators, and characterizing a BLDC from scratch is the
          honest prerequisite. I wanted Kt, friction, inertia, and thermal behavior as numbers I
          derived myself, not datasheet values I took on faith. So I built the bench, ran the same
          motor through both an ODrive and a VESC, fried one of them along the way, and ended up
          with results I understand from the instrument up.
        </p>

        <h3>Closed results</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr><th>Finding</th><th>Result</th><th>Signal</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Kt cross-validation</td>
                <td>0.0551 / 0.0558 Nm/A (1.3% agreement)</td>
                <td>Two independent controllers confirm the same physical constant</td>
              </tr>
              <tr>
                <td>Kv</td>
                <td>143.6 &plusmn; 0.7 RPM/V over 5 points</td>
                <td>4.3% below datasheet; tight bench spread</td>
              </tr>
              <tr>
                <td>Sensorless observer overhead</td>
                <td>0.85 A</td>
                <td>Quantified by running both sensored and sensorless on the same motor</td>
              </tr>
              <tr>
                <td>Rotor inertia</td>
                <td>170&ndash;175 g&middot;mm&sup2;</td>
                <td>Matched spin-up / coast-down technique, friction-independent extraction</td>
              </tr>
              <tr>
                <td>Friction after casing rebuild</td>
                <td>45% Tc/J drop, 100&times; repeatability improvement</td>
                <td>Isolated a rotor rub, proved it with before / after data</td>
              </tr>
              <tr>
                <td>Multi-current inertia drift</td>
                <td>Telemetry bias, not mechanical</td>
                <td>Ruled out by holding friction constant; drift persisted identically</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Platform ─────────────────────────────────────── */}
      <section>
        <h2>Platform</h2>
        <ul>
          <li><strong>Motor:</strong> D6374 150kv BLDC, 7 pole pairs, star-wound</li>
          <li><strong>Controllers:</strong> ODrive 3.6 (sensored, 19 A ceiling after M0 FET failure) and MKS VESC 75200 V2 (200 A hardware max)</li>
          <li><strong>Encoder:</strong> CUI AMT-102, 8192 CPR, ABI mode</li>
          <li><strong>Load path:</strong> 5:1 custom 3D-printed planetary gearbox into Saris H2 freehub, ~9 kg flywheel + eddy-current brake</li>
          <li><strong>Bench:</strong> Riden RD6030 55 V DC supply, YMC01 micro-ohm meter, clamp DMM, USB + BLE telemetry</li>
        </ul>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Methodology ──────────────────────────────────── */}
      <section>
        <h2>Methodology</h2>
        <p>
          Every result is tagged to a configuration ID that fixes the controller, sensor mode, and
          mechanical setup:
        </p>
        <ul>
          <li><strong>ODR-ENC:</strong> ODrive 3.6 + AMT-102 encoder (sensored, 0 RPM start capable)</li>
          <li><strong>VESC-SL:</strong> VESC 75200 sensorless (observer works badly at low speeds / high starting inertia)</li>
          <li><strong>VESC-ENC:</strong> VESC 75200 + AMT-102 encoder (in process of debugging why this isn&apos;t working)</li>
        </ul>
        <p>
          Mechanical configs orthogonal: <code>BARE</code>, <code>GEAR</code> (+ 5:1 gearbox),{" "}
          <code>H2</code> (+ gearbox + flywheel). A result reported as <code>VESC-SL / GEAR</code>{" "}
          is not interchangeable with <code>ODR-ENC / BARE</code>, and the differences are documented
          upfront in the Test Setup Log rather than buried in footnotes.
        </p>
        <p>
          Tests follow a dependency graph: static, no-load dynamic, spin-up sanity, flywheel inertia,
          coast-down characterization, loaded dyno. Each test either stands alone or explicitly
          consumes a parameter from an earlier test.
        </p>

        <h3>Tooling</h3>
        <p>
          Every test is scripted. Custom Python drives the ODrive (<code>odrive_sweep.py</code>,{" "}
          <code>odrive_rotor_inertia.py</code>, <code>odrive_kv_verify.py</code>), and{" "}
          <code>odrive_safe_startup.py</code> validates bus voltage and motor parameters before
          energising the power stage so a future cal cycle cannot repeat the M0 failure. The VESC
          side uses a hand-built CLI for remote duty and current commands, plus on-MCU LispBM
          scripts that log Iq, velocity, and FET temperature at the control-loop rate. That was the
          only path that got COMM_LOG packets through reliably after VESC Tool 6.06 was identified
          as a silent packet-dropper; VESC Tool 7.00 is the working version.
        </p>
        <p>
          Configuration state is tracked separately from data. The Test Setup Log freezes the exact
          controller, sensor, and mechanical configuration for every run, and the Motor Test Matrix
          tracks the dependency graph and status across runs. A result without a matching entry in
          both is not considered closed.
        </p>

        <h3>Test coverage at a glance</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr>
                <th>#</th><th>Test</th><th>Status</th><th>Key result or gate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Static parameters</td><td>Done</td><td>R, L, pole pairs, winding confirmed across both controllers</td></tr>
              <tr><td>2.1</td><td>Back-EMF / Kt</td><td>Done</td><td>0.0551 / 0.0558 Nm/A (ODR / VESC), 1.3% cross-tool agreement</td></tr>
              <tr><td>2.2</td><td>Kv verification</td><td>Done</td><td>143.6 &plusmn; 0.7 RPM/V over 5 points</td></tr>
              <tr><td>2.3</td><td>Cogging breakaway</td><td>Done (VESC-ENC re-run pending)</td><td>1.9 A sensored vs 2.75 A sensorless = 0.85 A observer overhead</td></tr>
              <tr><td>2.4</td><td>Friction model</td><td>Done</td><td>Tc/J 167 after new casing, 45% drop from V1</td></tr>
              <tr><td>2.5</td><td>Rotor inertia</td><td>Done</td><td>J = 170 to 175 g&middot;mm&sup2; at 3 A</td></tr>
              <tr><td>2.6</td><td>Step response (no load)</td><td>Done on ODrive</td><td>Bare and gearbox closed; VESC-ENC version pending</td></tr>
              <tr><td>3</td><td>H2 spin-up sanity</td><td>Done</td><td>10 runs, 7.5 t/s max before FOC desync and coupling slip</td></tr>
              <tr><td>4</td><td>Flywheel inertia</td><td>Plan written, blocked</td><td>J through gearbox + freehub is not identifiable; isolation plan written</td></tr>
              <tr><td>5</td><td>Coast-down characterization</td><td>Not started</td><td>Blocked on test 4</td></tr>
              <tr><td>6</td><td>Inertia dyno spin-up</td><td>Not started</td><td>Blocked on tests 4 and 5</td></tr>
              <tr><td>7</td><td>Efficiency and Kv under load</td><td>Not started</td><td>Post-processing on test 6 data</td></tr>
              <tr><td>8</td><td>Gearbox efficiency</td><td>Not started</td><td>Needs test 6 baseline</td></tr>
              <tr><td>9.1</td><td>Torque-speed curve</td><td>Partial</td><td>ODrive hit a 5 t/s PID ceiling; VESC expected to extend</td></tr>
              <tr><td>9.2 to 9.5</td><td>Load / thermal / bandwidth</td><td>Not started</td><td>Needs sensored VESC + load instrumentation</td></tr>
              <tr><td>10</td><td>Environmental durability</td><td>Not started</td><td>Production-validation stage</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Dependency graph</h3>
        <Mermaid
          chart={`flowchart TD
    T1["Test 1<br/>Static<br/>DONE"] --> T2["Test 2<br/>Dynamic<br/>DONE"]
    T2 --> T3["Test 3<br/>H2 Spin-Up Sanity<br/>DONE"]
    T3 --> T4["Test 4<br/>Flywheel J<br/>PINCH POINT"]
    T4 --> T5["Test 5<br/>Coast-Down"]
    T5 --> T6["Test 6<br/>Dyno Spin-Up"]
    T6 --> T7["Test 7<br/>Efficiency / Kv"]
    T6 --> T8["Test 8<br/>Gearbox Eff."]
    T1 -.-> T9["Test 9<br/>Load Testing<br/>PARTIAL"]
    T2 -.-> T9
    T9 --> T10["Test 10<br/>Environmental<br/>DEFERRED"]

    classDef done fill:#c8e6c9,stroke:#2e7d32,color:#1b5e20
    classDef pinch fill:#ffcdd2,stroke:#c62828,color:#b71c1c
    classDef partial fill:#fff9c4,stroke:#f9a825,color:#795548
    classDef future fill:#f5f5f5,stroke:#9e9e9e,color:#616161
    class T1,T2,T3 done
    class T4 pinch
    class T9 partial
    class T5,T6,T7,T8,T10 future`}
        />
        <p>
          Test 4 is the current pinch point. Everything from test 5 onward depends on a cleanly
          identified flywheel inertia, which the current gearbox + freehub path does not provide.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Test 1: Static ───────────────────────────────── */}
      <section>
        <h2>Test 1: Static Parameters (done)</h2>
        <Figure
          src={img("photo-021-measuring-d6374-bldc-motor-phase-resistance.jpg")}
          alt="Four-wire Kelvin measurement of motor phase resistance with a micro-ohm meter"
          caption="Four-wire Kelvin measurement of phase resistance with a (cheap) YMC01 micro-ohm meter; 34 mOhm reading across two phase wires."
        />

        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr><th>Parameter</th><th>ODR-ENC</th><th>VESC-ENC</th></tr>
            </thead>
            <tbody>
              <tr><td>R</td><td>50.2 mOhm (phase-to-phase)</td><td>24.3 mOhm (per-phase)</td></tr>
              <tr><td>L</td><td>23.1 &micro;H</td><td>27.6 &micro;H</td></tr>
              <tr><td>Pole pairs</td><td>7</td><td>7</td></tr>
              <tr><td>Winding</td><td>Star</td><td>Star</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          The 2x apparent R gap is reporting convention, not a motor variation: line-to-line equals
          2x per-phase for a Y-wound motor, so 2 &times; 24.3 = 48.6 mOhm sits within a few percent
          of 50.2 mOhm. The residual gap comes from the different detection methods used by each
          controller. Pole count confirmed by hand rotation. I&apos;m guessing the difference from
          the cheap milliohm meter comes from the additional resistance from the bullet connections
          to the ESC internals.
        </p>

        <Figure
          src={img("photo-052-d6374-motor-connected-saris-h2-flywheel.jpg")}
          alt="D6374 motor on the bench test stand coupled to the Saris H2 flywheel through a 5:1 gearbox"
          caption="D6374 installed in the bench test stand, coupled via 5:1 3D-printed planetary gearbox and a one-way freehub to the Saris H2 flywheel. This is the first-iteration coupling; every dynamic and loaded test below runs on some variant of this stand."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Test 2: No-Load Dynamic ──────────────────────── */}
      <section>
        <h2>Test 2: No-Load Dynamic (done)</h2>

        <h3>Kt / Ke (torque constant)</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Config</th><th>Kt (Nm/A)</th></tr></thead>
            <tbody>
              <tr><td>ODR-ENC</td><td>0.0551</td></tr>
              <tr><td>VESC-ENC</td><td>0.0558</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Cross-tool agreement within 1.3%. This is a strong point of validation. These two
          independent controllers with different detection methods agree on the physically
          meaningful constant.
        </p>

        <h3>Kv verification</h3>
        <p>143.6 &plusmn; 0.7 RPM/V over 5 points, 4.3% below the datasheet rating of 150. Tight spread for bench conditions.</p>

        <h3>Cogging breakaway</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Config</th><th>Breakaway current</th></tr></thead>
            <tbody>
              <tr><td>ODR-ENC</td><td>1.9 A</td></tr>
              <tr><td>VESC-SL</td><td>2.75 A (range 2.2 to 3.2 A)</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The 0.85 A gap is not additional cogging. It is the sensorless observer spending current
          to locate the rotor from back-EMF. Running both configurations made that bias visible and
          quantifiable instead of mixed into a single number.
        </p>

        <Figure
          src={img("2026-04-01-duty-ramp-full.png")}
          alt="VESC duty-ramp trace used for cogging breakaway and friction mapping"
          caption="Full VESC duty-ramp trace used for cogging breakaway identification and friction mapping above the sensorless dead zone."
        />

        <Callout type="warning" title="Planned plot: constant-torque vs back-EMF-limited torque-speed curve">
          <p>
            A future addition to this section: the go-kart / EV style torque-speed plot that is flat
            in the constant-torque region at low speed and drops off linearly as back-EMF approaches
            bus voltage. Same plot ODrive publishes on their product pages.
          </p>
          <p>
            Needed inputs: Test 6 (Inertia Dyno Spin-Up) data at multiple current levels, so the
            kink between constant-torque and back-EMF-limited regions shows up as a function of Iq.
            Blocked until the Test 4 pinch point clears.
          </p>
        </Callout>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Test 2.6 ──────────────────────────────────────── */}
      <section>
        <h2>Test 2.6: Step Response, No Load (done on ODrive)</h2>
        <p>
          Commanded velocity-loop step inputs on ODR-ENC, with and without the 5:1 gearbox, and
          logged encoder response. Two purposes: verify the controller tune, and expose how gearbox
          inertia and friction shift the effective closed-loop bandwidth.
        </p>
        <p>
          Bare and gearbox configurations closed cleanly on ODrive. The VESC version is blocked
          until a VESC-ENC tune pass, because the sensorless observer cannot produce velocity
          feedback tight enough for a meaningful step trace. The ODrive position-control path also
          stopped here after the M0 driver damage described in Failures below.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Test 2.4 / 2.5: Friction and Inertia ─────────── */}
      <section>
        <h2>Test 2.4 / 2.5: Friction and Rotor Inertia (done, with a mechanical iteration)</h2>
        <p>
          Coast-down from regulated speed, fit to a Coulomb + viscous friction model, followed by
          multi-current inertia extraction.
        </p>
        <p>
          <strong>The iteration.</strong> Initial casing had a rotor rub. Rebuilt the casing on
          2026-04-10. Results after the rebuild:
        </p>
        <ul>
          <li><InlineEquation tex="T_c/J" /> dropped from ~304 to 167 (~45% reduction in normalized Coulomb friction)</li>
          <li><InlineEquation tex="b/J" /> settled at 0.602</li>
          <li>Run-to-run standard deviation dropped from 12.3 to 0.1 rad/s<sup>2</sup>, a ~100x repeatability improvement</li>
        </ul>
        <p>
          <strong>Best rotor inertia estimate:</strong>{" "}
          <InlineEquation tex="J" /> = 170 to 175 g&middot;mm&sup2; (at 3 A drive current).
        </p>

        <h3>How we actually pull J out of the data</h3>
        <p>The graph above is a fit to one ODE, not a direct inertia reading. Walk through the math:</p>

        <p><strong>Step 1. Write Newton&apos;s second law for the coasting rotor.</strong> With no drive current, the only torques are Coulomb friction (speed-independent, opposing motion) and viscous drag (proportional to speed):</p>
        <BlockEquation tex="J \frac{d\omega}{dt} = -T_c - b\omega" />

        <p><strong>Step 2. Solve the ODE.</strong> This is linear first-order. The closed-form solution is:</p>
        <BlockEquation tex="\omega(t) = \left(\omega_0 + \frac{T_c}{b}\right) e^{-b t / J} - \frac{T_c}{b}" />
        <p>
          Fitting this curve to a measured coast-down trace gives two numbers: <InlineEquation tex="T_c/J" /> (Coulomb-to-inertia ratio) and <InlineEquation tex="b/J" /> (viscous time constant). That is what the plot below shows. <strong>But notice: neither <InlineEquation tex="T_c" />, <InlineEquation tex="b" />, nor <InlineEquation tex="J" /> appears by itself. We only get ratios.</strong> This is why a single coast-down cannot identify <InlineEquation tex="J" />.
        </p>

        <p><strong>Step 3. Break the symmetry with a matched spin-up.</strong> Now drive the motor with known current <InlineEquation tex="I_q" />. At the same instantaneous speed <InlineEquation tex="\omega" />, write the spin-up equation:</p>
        <BlockEquation tex="J \alpha_\text{up} = K_t I_q - T_c - b\omega" />
        <p>And the coast-down equation at the same <InlineEquation tex="\omega" />:</p>
        <BlockEquation tex="J |\alpha_\text{coast}| = T_c + b\omega" />

        <p><strong>Step 4. Add them.</strong> The friction terms cancel:</p>
        <BlockEquation tex="J \left(\alpha_\text{up} + |\alpha_\text{coast}|\right) = K_t I_q" />
        <BlockEquation tex="\boxed{J = \frac{K_t \, I_q}{\alpha_\text{up} + |\alpha_\text{coast}|}}" />
        <p>No friction model needed. No assumption about how friction scales. The two matched accelerations do the work.</p>

        <p>
          <strong>Result.</strong> Plugging in measured accelerations at{" "}
          <InlineEquation tex="I_q = 3\text{ A}" /> and <InlineEquation tex="K_t = 0.0558\text{ Nm/A}" />{" "}
          gives <InlineEquation tex="J \approx 174" /> g&middot;mm&sup2;. Full procedure and validation
          checks in the Inertia Isolation Test Plan.
        </p>

        <Figure
          src={img("2026-04-07-inertia-multi-method.png")}
          alt="Four independent methods for extracting rotor J from the same dataset"
          caption="Cross-check: four independent methods for extracting rotor J from the same Apr 7 dataset. Geometric estimate (184), point-by-point at 3 A (178), point-by-point at 10 A (211), combined-trajectory fit (198), and steady-state + tau (269). Spread is the honest uncertainty envelope. The 3 A point-by-point and combined-trajectory methods converge near 180-198, which is the working number used elsewhere; the 10 A and steady-state outliers are explained by the Iq telemetry bias discussed below."
        />

        <h3>The drift</h3>
        <p>
          The multi-current inertia drift that had shown up in earlier sweeps did not change after
          the friction fix. That ruled out a mechanical cause and pointed at Iq telemetry bias from
          the controller instead, which is the direction future work continues. Full discussion in
          Cross-Cutting Findings #3.
        </p>

        <Figure
          src={img("2026-04-01-inertia-estimation.png")}
          alt="Coast-down fit to the closed-form omega(t) equation"
          caption="Coast-down fit to the closed-form ω(t) above. Ratios T_c/J and b/J come from this plot; absolute J comes from pairing it with a matched spin-up at known I_q."
        />

        <Figure
          src={img("photo-007-d6374-bldc-motor-mounted-custom-3d.jpg")}
          alt="D6374 motor in the original 3D-printed casing"
          caption="D6374 in the original 3D-printed casing."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Test 3: H2 ───────────────────────────────────── */}
      <section>
        <h2>Test 3: H2 Flywheel Spin-Up (done, with constraints)</h2>
        <p>
          Saris Hammer H2 bike trainer repurposed as an inertia dyno: ~9 kg flywheel + eddy-current
          brake, BLE telemetry at ~1.1 Hz. Motor drives the flywheel through the gearbox and a
          one-way freehub, which means spin-up is motor data and coast-down is drag-only data.
          There is no steady-state loaded operating point through this path.
        </p>
        <p>
          <strong>Max achieved:</strong> 7.5 t/s motor shaft (~450 RPM), before the ODrive FOC
          desync soft ceiling at ~50 t/s mechanical (350 electrical Hz against the 8 kHz current
          loop).
        </p>
        <p>
          <strong>Field workaround.</strong> Winding temperature was read by clipping a DMM across
          the motor thermistor leads and manually converting voltage to temperature through a
          lookup. Not a long-term instrumentation plan, but enough to protect the motor for the
          first campaign while a proper logging path is built.
        </p>

        <Figure
          src={img("photo-053-first-h2-flywheel-dyno-test-thermistor.jpg")}
          alt="First H2 dyno run with clamp DMM on thermistor leads"
          caption="First H2 dyno run. Clamp DMM on the thermistor leads for manual temperature lookup; laptop running the spin-up script."
        />

        <Figure
          src={img("h2-all-runs-overview.png")}
          alt="All 10 H2 spin-up runs overlaid"
          caption="All 10 spin-up runs overlaid. The knee on the smoother ramps is coupling slip, which became a redesign driver (see below)."
        />

        <Figure
          src={img("h2-smooth-ramp-detail.png")}
          alt="Detail view of the best single H2 spin-up run"
          caption="Detail view of the best single H2 run (smooth ramp 0.3 t/s/s, 70 A limit). Top panels: velocity follows commanded ramp until the coupling / FOC ceiling, Iq climbs steadily through friction. Bottom panels (viridis-colored by time): Friction Profile Iq vs Speed and Motor Torque vs Speed. The bottom-left is effectively a heat-map of how much current the drivetrain demands at each operating speed; the spatial density along the curve shows where the motor spent most of its test time."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Test 4 ───────────────────────────────────────── */}
      <section>
        <h2>Test 4: Flywheel Inertia (plan written, blocked)</h2>
        <p>
          The goal was to measure the H2 flywheel&apos;s moment of inertia so that later dyno torque
          extraction (test 6 onward) could use a known J. With the current drive path that turned
          out to be an identifiability problem, not a measurement problem:
        </p>
        <ul>
          <li>The one-way freehub means the motor only drives the flywheel in the positive direction; the motor cannot decelerate the flywheel directly for a clean powered-deceleration coast-down</li>
          <li>The 5:1 gearbox adds its own friction and inertia, and that contribution is not separable from the flywheel itself through the current coupling</li>
        </ul>
        <p>
          The decision was to stop and write an isolation plan rather than collect data that would
          fold motor, gearbox, freehub, and flywheel losses into one number. Two unblockers under
          consideration: direct drive with the flywheel replacing the freehub, or BLE-only
          coast-down of the flywheel alone after an external spin-up.
        </p>

        <h3>Why this has stalled</h3>
        <p>
          I accidentally fried the motor-driver IC on the ODrive board, which forced me onto the
          VESC. The VESC sensored mode has not worked despite many hours of debugging, so
          closed-loop encoder tests are currently blocked on either ESC. Plan after exam season is
          to get one of the two paths working: either replace the chip on the ODrive (or swap to a
          non-deprecated board like the ODrive Pro), or solve the VESC encoder mode directly. Full
          debugging log in Cross-Cutting Findings.
        </p>
        <p>Written up in full as the Inertia Isolation Test Plan. Blocks tests 5, 6, 7, and 8 until resolved.</p>

        <Figure
          src={img("photo-062-saris-h2-flywheel-freehub-motor-adapter.jpg")}
          alt="Freehub interface that makes flywheel J unidentifiable"
          caption="The freehub interface that makes flywheel J unidentifiable through the current drive path. One-way engagement by design; a measurement obstacle for inertia extraction."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── ODrive vs VESC ───────────────────────────────── */}
      <section>
        <h2>ODrive vs VESC</h2>
        <p>
          Two controllers, same motor. The point is not to pick a winner; it is to cross-validate
          and to give each test the controller best suited to it.
        </p>

        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr><th>Role</th><th>ODrive 3.6</th><th>VESC 75200</th></tr>
            </thead>
            <tbody>
              <tr><td>Current headroom</td><td>19 A self-imposed safety ceiling (DRV8301 hardware goes higher; 19 A set after M0 FET failure)</td><td>200 A hardware</td></tr>
              <tr><td>Min reliable speed (sensorless)</td><td>n/a</td><td>~400 RPM</td></tr>
              <tr><td>Position control</td><td>yes</td><td>partial (VESC-ENC not working yet)</td></tr>
              <tr><td>Telemetry depth</td><td><code>odrivetool</code> Python</td><td>custom CLI + VESC Tool GUI + LispBM on-MCU</td></tr>
              <tr><td>Best used for</td><td>fast sensored bring-up, Kv/Kt baseline, rotor inertia</td><td>high-current sweeps, encoder + sensorless contrast, thermal work</td></tr>
            </tbody>
          </table>
        </div>

        <Figure
          src={img("photo-020-odrive-3-6-controller-bench-setup.jpg")}
          alt="ODrive 3.6 with RD6030 bench power supply"
          caption="ODrive 3.6 + RD6030 at 55 V (ODR-ENC). The fans are here so that when I plan to do high current testing, I can unlock much of the operating region of this motor and increase its continuous torque output."
        />

        <Figure
          src={img("photo-025-mksesc-75200-vesc-controller-bench-setup.jpg")}
          alt="MKS VESC 75200 V2 with phase wiring"
          caption="MKS VESC 75200 V2 with phase wiring (VESC-SL / VESC-ENC)."
        />

        <Figure
          src={img("photo-024-interface-between-amt102-encoder-motor-controller.jpg")}
          alt="Hand-crimped JST-PH harness from AMT-102 encoder to VESC sensor header"
          caption="Sensor-port interface on the VESC: hand-crimped JST-PH harness connecting the AMT-102 encoder to the VESC sensor header. This is the connector path whose commutation is still being debugged."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Engineering lessons ──────────────────────────── */}
      <section>
        <h2>Engineering lessons</h2>
        <p>Four that came out of the cross-controller structure and generalize beyond this motor:</p>
        <ol>
          <li>
            <strong>Config IDs paid for themselves.</strong> Tagging each result to{" "}
            <code>ODR-ENC / VESC-SL / VESC-ENC</code> and <code>BARE / GEAR / H2</code> let the
            0.85 A sensorless-observer overhead fall out as a clean delta instead of disappearing
            into run-to-run scatter. Without the tagging, the same data reads as noise.
          </li>
          <li>
            <strong>A single-number Kt is a lie.</strong> Measured Kt dropped ~4% from 2.3 kRPM to
            6.3 kRPM. Speed-proportional iron loss, not an observer artifact. Any Kt reported
            without an operating speed is already half wrong.
          </li>
          <li>
            <strong>Multi-current inertia drift was the telemetry, not the mechanics.</strong> Rotor
            J fits grew with Iq, and the drift stayed identical after a major friction rework. That
            ruled out a mechanical cause and pinned it on VESC Iq window-averaging. Low current is
            where the method stays honest, which is the opposite of the usual signal-to-noise
            intuition.
          </li>
          <li>
            <strong>The gearbox is not a passive modifier.</strong> Adding the 5:1 reduction changed
            the control problem, not just the gain schedule. A ramp rate that worked bare stalled
            the integrator through the reduction, and a separate 3D-printed coupling adapter added
            ~51% to the measured inertia on its own. Load-path geometry is part of the test, not a
            boundary condition.
          </li>
        </ol>
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Failures and Redesigns ───────────────────────── */}
      <section>
        <h2>Failures and Redesigns</h2>
        <p>
          Below are the three physical failures from the campaign. Controller-level tuning
          surprises from the same work are collected separately in the ODrive Tuning Discoveries
          (ODrive era) and Cross-Cutting Findings (VESC era) notes.
        </p>

        <h3>ODrive M0 FETs blown (2026-03-29)</h3>
        <p>
          Current limit raised during troubleshooting, power stage did not survive. The M0 gate
          driver IC shows visible chip damage consistent with either a phase short or pushing bus
          voltage too close to the device limit. This is the reason M1 is the only live motor port
          on the ODrive, why the 19 A ceiling is now a hard rule, and why loaded testing and
          position-control work migrated to the VESC. <code>odrive_safe_startup.py</code> was
          written so future cal cycles validate bus voltage and parameters before energising.
        </p>
        <p><strong>Next steps to bring the ODrive back:</strong></p>
        <ol>
          <li>Order the replacement driver IC (DRV8301-family)</li>
          <li>Rework the M0 power stage on the bench soldering setup</li>
          <li>Bring M0 back online under the 19 A ceiling before trusting it</li>
        </ol>

        <Figure
          src={img("photo-029-odrive-m0-driver-chip-damage.jpg")}
          alt="Damaged M0 driver IC on the ODrive 3.6 with visible package damage"
          caption="Damaged M0 driver IC on the ODrive 3.6. Chipped / cracked package visible on the power stage."
        />

        <Figure
          src={img("h2-stepped-comparison.png")}
          alt="Stepped H2 runs at 35 / 50 / 70 A showing FET thermal rise during stall"
          caption="Evidence for the thermal-during-stall pattern: three stepped velocity tests at 35 / 50 / 70 A current limits. Top panel (velocity) shows the motor holds until the commanded step exceeds what the drivetrain can sustain, then stalls. Middle (Iq) shows current pegs at the set limit during stall. Bottom (FET temperature) shows the 70 A run climbing past 85 °C and hitting the derating line. FETs only cook when the motor is stalled at maximum current. Normal operation through all three runs kept FETs in the 35 to 55 °C band."
        />

        <h3>H2 coupling slip (2026-03-28)</h3>
        <p>
          Freehub interface loosened on higher-torque runs. Visible as the early knee on the
          smoother ramps in the H2 overlay. Captured as a fix item, not glossed over.
        </p>

        <h3>Gearbox V1 drag dominated the friction map</h3>
        <p>
          Once the new casing ruled out the rotor rub, the remaining friction story pointed at the
          reduction, not the motor. V1 was pulled and opened for teardown.
        </p>

        <Figure
          src={img("photo-069-partially-disassembled-3d-printed-planetary-gearbox-v1.jpg")}
          alt="5:1 planetary gearbox V1 opened for teardown"
          caption="5:1 planetary gearbox V1 opened up. First case of gear stripping, no woodruff key at this point."
        />

        <Figure
          src={img("photo-009-custom-white-3d-printed-motor-mount.jpg")}
          alt="Motor shaft after the woodruff-key fix"
          caption="Motor shaft after the woodruff-key fix (plastic key, pressed into a keyway on the motor shaft and the pinion). The key was the change that stopped the interface from rounding out under load. Candidate photo: confirm this is the right shot, otherwise swap."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      {/* ── Status and Next ──────────────────────────────── */}
      <section>
        <h2>Status and Next</h2>
        <ul>
          <li>Tests 1 (static) and 2 (no-load dynamic) closed</li>
          <li>Test 2.3 cogging still needs a VESC-ENC re-run to close the observer-overhead loop with direct sensor data</li>
          <li>Test 3 H2 spin-up sanity closed, 10 runs logged</li>
          <li>Test 4 flywheel inertia blocked: gearbox + one-way freehub makes flywheel J unidentifiable through the current path. The Inertia Isolation Test Plan is written; unblocks via direct-drive or BLE-only coast-down</li>
          <li>Tests 5 through 8 follow once test 4 clears</li>
          <li>Tests 9 (load) and 10 (environmental) are production-validation territory</li>
        </ul>
      </section>
    </article>
  );
}
