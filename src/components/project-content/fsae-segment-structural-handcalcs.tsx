import { Figure, Collapsible, BlockEquation, InlineEquation, ColabBadge } from "@/components/article";

const img = (name: string) => `/projects/fsae-segment-structural-handcalcs/${name}`;

const pythonCode = `import math
import pandas as pd

# Conversion Constants
PSI_TO_PA = 6894.76
MM_TO_M   = 1/1000
INCH_TO_M = 25.4/1000
G         = 9.80665

# 1.1 Module Dimensions
ene_mod_width  = 20.3 * MM_TO_M
ene_seg_height = 105.6 * MM_TO_M
ene_mod_depth  = 69.5 * MM_TO_M
module_weight  = 0.278  # kg

# 1.2 Segment Assembly
ene_segment_depth = 6 * ene_mod_depth
ene_segment_width = ene_mod_width * 4
garolite_thickness = (1/8) * INCH_TO_M
segment_modules_weight = module_weight * 23

# 1.3 Material Properties
garolite_strength = 38000 * PSI_TO_PA
garolite_modulus  = 2400000 * PSI_TO_PA
poly_thickness    = 3/8 * INCH_TO_M
poly_strength     = 93e6    # Pa
poly_modulus      = 2.21e9  # Pa

# 2.1 Load Cases
top_force  = segment_modules_weight * 20 * G   # 20g vertical
side_force = segment_modules_weight * 40 * G   # 40g lateral

# ... full implementation in Colab notebook
`;

const segmentDiagram = `             ____________________________________________________________
            /                                                           /|
           /                     POLYCARBONATE LID                     / |
          /___________________________________________________________/  |
         |                                                           |   | <-- EneSegHeight
         |                                                           |   |       (105.6 mm)
         |___________________________________________________________|   |
         |                                                           |  /
         |                                                           | / <-- EneSegmentWidth
         |___________________________________________________________|/        (81.2 mm)
           <------------------- EneSegmentDepth ------------------->
                                 (417.0 mm)`;

const cellLayout = `      _________________________________________________________
  |  | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ] |
  |  | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ] |
  |  | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ] |   (81.2 mm) WIDTH
  |  | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]           |
  |  |_________________________________________________________| |
  |                                                                |
     <----------------------- DEPTH (417.0 mm) -------------------->`;

export function FsaeSegmentStructuralHandcalcsContent() {
  return (
    <article className="article-prose">
      <section>
        <h2>Battery Module Structural Analysis</h2>
        <Figure
          src={img("segment-casing.png")}
          alt="FSAE battery segment casing showing polycarbonate lid over cell modules"
          caption="FSAE battery segment casing."
        />
        <p>
          These hand calcs, translated into a Python script, let me iterate quickly on the
          structural design of the UV26 accumulator segment. The initial version was MATLAB back
          in early 2024, pre-design of the segment. This page covers the current SES calculations,
          calculations expected for 2026, and sanity checks I wanted for solid mechanical design.
        </p>

        <ColabBadge
          href="https://colab.research.google.com/github/russlib/SegmentHandCalcs/blob/main/FSAESegmentHandCalcs.ipynb"
          caption="Open the Colab notebook to change dimensions, materials, or load factors and re-run."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>1. Constants and Geometry</h2>

        <h3>Segment assembly</h3>
        <pre
          className="text-[11px] leading-[14px] font-mono overflow-x-auto p-[12px] rounded-[8px]"
          style={{ background: "#f5f7fa", color: "#3c4257" }}
        >
          {segmentDiagram}
        </pre>

        <h3>Cell layout (top view)</h3>
        <pre
          className="text-[11px] leading-[14px] font-mono overflow-x-auto p-[12px] rounded-[8px]"
          style={{ background: "#f5f7fa", color: "#3c4257" }}
        >
          {cellLayout}
        </pre>

        <h3>Input parameters</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Parameter</th><th>Value</th><th>Unit</th></tr></thead>
            <tbody>
              <tr><td>Module width</td><td>20.3</td><td>mm</td></tr>
              <tr><td>Segment height</td><td>105.6</td><td>mm</td></tr>
              <tr><td>Module depth</td><td>69.5</td><td>mm</td></tr>
              <tr><td>Module weight</td><td>0.278</td><td>kg</td></tr>
              <tr><td>Segment depth</td><td>417.0</td><td>mm</td></tr>
              <tr><td>Segment width</td><td>81.2</td><td>mm</td></tr>
              <tr><td>Garolite thickness</td><td>3.175 (1/8&quot;)</td><td>mm</td></tr>
              <tr><td>Polycarbonate thickness</td><td>9.525 (3/8&quot;)</td><td>mm</td></tr>
              <tr><td>Total modules</td><td>23</td><td>-</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Material properties</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Material</th><th>Property</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td><strong>Garolite G10</strong></td><td>Strength</td><td>262 MPa</td></tr>
              <tr><td></td><td>Modulus</td><td>16.5 GPa</td></tr>
              <tr><td><strong>Polycarbonate</strong></td><td>Flexural strength</td><td>93 MPa</td></tr>
              <tr><td></td><td>Modulus</td><td>2.21 GPa</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>2. Load Cases and Bending Stress</h2>
        <p>
          Calculated for <strong>20g vertical</strong> and <strong>40g lateral</strong> crash
          loads per SES requirements. Assuming a uniformly distributed load where total force{" "}
          <InlineEquation tex="F" /> relates to distributed load <InlineEquation tex="w" /> by{" "}
          <InlineEquation tex="F = w \cdot L" />:
        </p>

        <h3>Maximum bending moment</h3>
        <BlockEquation tex="M_{max} = \frac{wL^2}{8} = \frac{F \cdot L}{8}" />

        <h3>Bending stress</h3>
        <BlockEquation tex="\sigma = \frac{M \cdot c}{I}" />

        <h3>Maximum deflection</h3>
        <BlockEquation tex="\delta_{max} = \frac{5 w L^4}{384 EI} = \frac{5 F \cdot L^3}{384 EI}" />

        <h3>Results &mdash; polycarbonate lid</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Vertical force (20g)</td><td>1254.5 N</td></tr>
              <tr><td>Bending moment</td><td>65.4 N&middot;m</td></tr>
              <tr><td><strong>Lid safety factor</strong></td><td><strong>1.75</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <em>
            Verifies the polycarbonate lid survives a 20g vertical crash load. Cells stay in.
          </em>
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>3. Fasteners</h2>

        <h3>Tensile stress area</h3>
        <p>
          For a threaded rod in pure tension, strength is defined by the average of minor and
          pitch diameters. The tensile-stress area <InlineEquation tex="A_t" /> is:
        </p>
        <BlockEquation tex="A_t = \frac{\pi}{4} \left( \frac{d_p + d_r}{2} \right)^2" />
        <p>For ISO metric threads (M6):</p>
        <BlockEquation tex="d_p = d - 0.649519 p, \quad d_r = d - 1.226869 p" />
        <p>
          Where <InlineEquation tex="d" /> = major diameter (6.0 mm),{" "}
          <InlineEquation tex="p" /> = thread pitch (1.0 mm).
        </p>
        <p>Axial tensile stress:</p>
        <BlockEquation tex="\sigma_t = \frac{F}{A_t}" />
        <p className="text-[13px] italic" style={{ color: "#687385" }}>
          Ref: Norton, R. L. (2020). Machine Design: An Integrated Approach, 6th ed., p. 907.
        </p>

        <h3>Fastener results (M6 bolts)</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Load case</th><th>Safety factor</th></tr></thead>
            <tbody>
              <tr><td>Bolt tension (20g vertical)</td><td><strong>39.83</strong></td></tr>
              <tr><td>Bolt plug shear (20g vertical)</td><td><strong>23.88</strong></td></tr>
              <tr><td>Bolt shear (40g horizontal)</td><td><strong>3.32</strong></td></tr>
              <tr><td>Bolt tear-out (40g horizontal)</td><td><strong>2.65</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>4. Bond Strength</h2>
        <p>
          How strong is the bonded G10 under simple loading? This doesn&apos;t account for finger
          joints (which add more strength).
        </p>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>FR4 / G10 bond strength</td><td>15.2 MPa</td></tr>
              <tr><td>40g horizontal force</td><td>2509.0 N</td></tr>
              <tr><td><strong>Bond safety factor</strong></td><td><strong>2.80</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>5. Euler-Johnson Buckling</h2>

        <p>Critical slenderness ratio and radius of gyration:</p>
        <BlockEquation tex="C_c = \pi \sqrt{\frac{2E}{\sigma_y}}, \quad k = \sqrt{\frac{I_{xx}}{A}}" />

        <p>Johnson (inelastic) buckling if <InlineEquation tex="SR < C_c" />:</p>
        <BlockEquation tex="P_{cr} = A \left[ \sigma_y - \frac{1}{E} \left( \frac{\sigma_y \cdot SR}{2\pi} \right)^2 \right]" />

        <p>Euler (elastic) buckling if <InlineEquation tex="SR \ge C_c" />:</p>
        <BlockEquation tex="P_{cr} = \frac{\pi^2 E I_{xx}}{L^2}" />

        <p className="text-[13px] italic" style={{ color: "#687385" }}>
          Ref: Norton, Machine Design, 6th ed., p. 231.
        </p>

        <h3>Results</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Buckling mode</td><td>Johnson (inelastic)</td></tr>
              <tr><td><strong>Buckling safety factor</strong></td><td><strong>120.70</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>6. Passive Thermal</h2>
        <p>Conductive heat dissipation capacity through the segment casing.</p>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Total surface area</td><td>0.156 m&sup2;</td></tr>
              <tr><td>Garolite conductivity</td><td>0.288 W/(m&middot;K)</td></tr>
              <tr><td><strong>Passive heat transfer rate</strong></td><td><strong>14.13 W/K</strong></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>7. Summary</h2>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Section</th><th>Load case</th><th>Safety factor</th></tr></thead>
            <tbody>
              <tr><td>2.4</td><td>Lid &mdash; 20g vertical</td><td>1.75</td></tr>
              <tr><td>3.2</td><td>Bolt tension &mdash; 20g vertical</td><td>39.83</td></tr>
              <tr><td>3.3</td><td>Bolt plug-out &mdash; 20g vertical</td><td>23.88</td></tr>
              <tr><td>3.4</td><td>Bolt shear &mdash; 40g horizontal</td><td>3.32</td></tr>
              <tr><td>3.5</td><td>Bolt tear-out &mdash; 40g horizontal</td><td>2.65</td></tr>
              <tr><td>4.1</td><td>Bond strength &mdash; 40g horizontal</td><td>2.80</td></tr>
              <tr><td>5.2</td><td>Casing buckling &mdash; 40g horizontal</td><td>120.70</td></tr>
            </tbody>
          </table>
        </div>
        <p><strong>All safety factors &gt; 1.0.</strong> Structure passes SES crash load requirements.</p>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Code</h2>
        <Collapsible title="Python implementation (click to expand)">
          <pre
            className="text-[12px] font-mono overflow-x-auto p-[12px] rounded-[8px]"
            style={{ background: "#f5f7fa", color: "#3c4257" }}
          >
            {pythonCode}
          </pre>
          <p className="mt-[12px] text-[13px] italic" style={{ color: "#687385" }}>
            Full implementation in the Colab notebook above.
          </p>
        </Collapsible>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Sources</h2>
        <ol>
          <li>
            <a
              href="https://enepaq.com/wp-content/uploads/2023/09/VTC6-Sony-Murata-Li-ion-Battery-Module-With-Temperature-Sensor-Datasheet-Tesla-Battery-Sponsorship-Formula-SAE-Electric-Formula-Student-Battery-Pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[3px]"
            >
              Enepaq VTC6 Module Datasheet
            </a>
            {" "}&mdash; module dimensions and weight.
          </li>
          <li>
            <a
              href="https://laminatedplastics.com/g-10.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[3px]"
            >
              Laminated Plastics G-10 / FR4 Data
            </a>
            {" "}&mdash; material strengths, bonding, tear-out.
          </li>
          <li>
            <a
              href="https://www.matweb.com/search/DataSheet.aspx?MatGUID=501acbb63cbc4f748faa7490884cdbca"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[3px]"
            >
              MatWeb Polycarbonate Data
            </a>
            {" "}&mdash; mechanical properties for the lid.
          </li>
        </ol>
      </section>
    </article>
  );
}
