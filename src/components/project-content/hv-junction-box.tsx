import { Figure } from "@/components/article";

const img = (name: string) => `/projects/hv-junction-box/${name}`;

export function HvJunctionBoxContent() {
  return (
    <article className="article-prose">
      <section>
        <p className="text-[13px] italic" style={{ color: "#687385" }}>
          Spring 2024. Archived project. Designed, reviewed, and drawn for fabrication, but never built.
          An accumulator failure that year cancelled the team&apos;s competition trip, so the box did not go on a car.
          Parts of the design were reused by the team in later years. Co-authored the 90% design review with Taz Oldaker,
          under Byron Oser&apos;s technical direction. Byron owned the busbar, heat gen, and fastener hand calcs.
        </p>

        <h2>What the deck covered</h2>

        <p>
          The HV junction box houses the energy meter, discharge circuit, and HVD plug.
          We had to make it fit a small bounding box under the sidepod, pass FSAE EV rules on
          clearance and interlocking, and be manufacturable in a shop midterm season.
        </p>

        <Figure
          src={img("bounding-box-constraint.png")}
          alt="Bounding box showing the packaging volume the junction box had to fit into"
          caption="Packaging volume drove every downstream decision. Aspect ratio and cost ruled out everything except one OTS Polycase."
        />

        <h2>What I did</h2>

        <ul>
          <li>Walked the design through FSAE EV rules compliance slide by slide: HVIL, discharge circuit, TSMPs, HVD plug, clearance. Actual rule numbers are in the deck as image captures, not text.</li>
          <li>Ran the material tradeoff: sheet metal vs extrusions vs OTS case. Landed on a Polycase box lined with Nomex for waterproofing and shop speed.</li>
          <li>Drew engineering drawings for the milled internal plates, columns, and clamps. These are the only tangible artifacts from the build that made it to the shop queue.</li>
          <li>Spec&apos;d the busbar manufacturing plan: 1/4&quot; 1100-series aluminum, waterjet cut, brake bent. Planned a laser-cut mockup to validate layout before committing material.</li>
          <li>Compared Option A (tack-on external box) against Option B (integrated into the accumulator housing). Landed on A on timeline grounds.</li>
          <li>Compiled the cost breakdown and sourced the housing. The $82 CAD Polycase was a $27 USD box with $30 shipping.</li>
        </ul>

        <Figure
          src={img("manufacturing-drawing.png")}
          alt="Manufacturing drawing for one of the junction box internal plates"
          caption="Engineering drawings for the milled plates and columns. The most portable deliverable from this project. Parts of the drawing set got reused in subsequent years' builds."
        />

        <Figure
          src={img("cost-breakdown.png")}
          alt="Cost breakdown pie chart across manufacturing, OTS, material, and shipping"
          caption="Cost breakdown. OTS dominated because the Polycase and HV connectors are fixed spend."
        />

        <Figure
          src={img("case-fitment.jpg")}
          alt="Rendering of the junction box with internal layout visible"
          caption="Internal layout inside the OTS case. Clearance was tight in every direction."
        />

        <h2>What did not happen</h2>

        <p>
          The car never drove that year. The accumulator ran into issues that forced the team to cancel the competition trip,
          and the junction box was never manufactured. The design review, drawings, and sourcing plan are what exist.
          The validation test box mentioned on slide 18 was planned but never built.
        </p>

        <h2>What I would do differently</h2>

        <p>
          Option B. Integrating the junction box into the accumulator housing lowers mass, shortens HV cabling,
          and moves the volume away from the driver. We flagged it in the deck as the worthwhile future path,
          but it needed a parallel accumulator redesign we could not fit into the schedule.
        </p>

        <Figure
          src={img("future-integration.png")}
          alt="Future recommendation CAD showing junction box integrated into the accumulator"
          caption="Future recommendation: junction box integrated into the accumulator, eliminating the tack-on box entirely."
        />

        <h2>What I could revisit</h2>

        <p>
          The <a href="/project/busbar-calculator">busbar calculator</a> I built later is a natural retrospective tool for this project.
          Running the EV24 busbar geometry through the thermal model would put an I²R and convection-driven temperature rise behind the
          1/4&quot; aluminum busbar spec, turning a 2024 intuition into a verifiable number. That&apos;s a self-contained follow-up
          if I come back to this page.
        </p>
      </section>
    </article>
  );
}
