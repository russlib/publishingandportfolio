import Link from "next/link";
import { BlockEquation, InlineEquation } from "@/components/article";

export function NusseltCorrelationDerivationContent() {
  return (
    <article className="article-prose">
      <section>
        <h2>Derivation</h2>
        <p>
          Short first-principles derivation. The Nusselt correlation gives a non-dimensional form
          for convection; rearranging it shows how the heat transfer coefficient <InlineEquation tex="h" />
          {" "}actually scales with fluid velocity.
        </p>

        <h3>Nusselt Correlation</h3>
        <BlockEquation tex="Nu = \frac{hL}{k} = C \cdot Re^m \cdot Pr^n" />

        <h3>Reynolds and Prandtl</h3>
        <BlockEquation tex="Re = \frac{VL}{\nu}, \quad Pr = \frac{\nu \rho C_p}{k}" />

        <h3>Substituting</h3>
        <BlockEquation tex="\frac{hL}{k} = C \left( \frac{VL}{\nu} \right)^m \left( \frac{\nu \rho C_p}{k} \right)^n" />

        <h3>Rearranging</h3>
        <BlockEquation tex="h = \frac{k}{L} \cdot C \cdot \frac{V^m L^m}{\nu^m} \cdot \frac{\nu^n \rho^n C_p^n}{k^n}" />

        <h3>Simplified</h3>
        <BlockEquation tex="h = C \cdot L^{m-1} \cdot V^m \cdot \nu^{n-m} \cdot \rho^n \cdot C_p^n \cdot k^{1-n}" />
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>What this tells you</h2>
        <p>
          <InlineEquation tex="h" /> scales with velocity to the <InlineEquation tex="m" /> power.
          For most forced-convection correlations I&apos;ve seen, <InlineEquation tex="m" /> is
          around 0.6 to 0.7.
        </p>
        <p>
          Combine that with fan affinity laws, which say flow <InlineEquation tex="V" /> scales
          with fan power as <InlineEquation tex="V \propto P^{1/3}" />. So{" "}
          <InlineEquation tex="h \propto V^m \propto P^{m/3}" />.
        </p>
        <p>
          With <InlineEquation tex="m \approx 0.7" />, doubling cooling capacity takes roughly
          16&times; the fan power. That&apos;s the practical takeaway: pushing harder on fans gets
          expensive fast.
        </p>
        <p>
          I later <Link href="/project/battery-cooling-testing" className="underline underline-offset-[3px]">validated this experimentally</Link> on the
          FSAE accumulator and got <InlineEquation tex="h = 9.97 \cdot P^{0.462}" />, which sits
          inside the range this derivation predicts.
        </p>
      </section>
    </article>
  );
}
