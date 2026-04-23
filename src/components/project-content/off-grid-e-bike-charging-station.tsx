export function OffGridEBikeChargingStationContent() {
  return (
    <article className="article-prose">
      <section>
        <p className="text-[13px] italic" style={{ color: "#687385" }}>
          UVic / BCSEA hackathon, 2024. Team entry, 1st place. Top three teams were invited to
          build the prototype.
        </p>

        <p>
          Design an off-grid solar, wind, and battery e-bike charging station from a provided
          weather dataset. The deliverable was a working systems engineering package: concept
          of operations, sized subsystems, a cost and risk analysis, and a 3-minute pitch.
        </p>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>What I did</h2>

        <ul>
          <li>
            Wrote seven Python scripts that sized every subsystem from raw weather data:
            annual demand, solar PV, vertical-axis wind turbine, battery storage, energy
            balance, and cost analysis across three system variants. Replaced the team&apos;s
            spreadsheet approach with something repeatable.
          </li>
          <li>
            Drove the systems engineering side: V-model breakdown, ConOps, FMEA risk
            register, and a bill of materials with real off-the-shelf components.
          </li>
          <li>
            Delivered the 3-minute pitch to a four-judge panel of energy researchers and
            industry reps. Looked up each judge&apos;s background beforehand and adjusted
            emphasis (research judges got the model and assumptions, industry judges got the
            cost and deployability story).
          </li>
        </ul>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Outcome</h2>
        <p>
          1st place. Top three teams were invited to build the prototype. The project is the
          cleanest example I have of doing a full systems engineering loop end-to-end under a
          real deadline, from weather data all the way to a sourced BOM, and presenting it to
          a technical audience.
        </p>
        {/* BORDERLINE: B3/B4/D2 — "cleanest example... end-to-end" self-framing. See BORDERLINE.md */}
      </section>
    </article>
  );
}
