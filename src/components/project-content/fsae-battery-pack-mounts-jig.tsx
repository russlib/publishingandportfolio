import { Figure } from "@/components/article";

const img = (name: string) => `/projects/fsae-battery-pack-mounts-jig/${name}`;

export function FsaeBatteryPackMountsJigContent() {
  return (
    <article className="article-prose">
      <section>
        <h2>Photos</h2>

        <Figure
          src={img("welding-in-progress.png")}
          alt="Teammate TIG welding on the aluminum accumulator enclosure, clamped to the jig baseplate"
          caption="TIG welding the aluminum enclosure, clamped to the jig baseplate"
        />

        <Figure
          src={img("baseplate-with-inserts.png")}
          alt="Baseplate with interchangeable inserts visible under the enclosure"
          caption="Single baseplate with swappable inserts — same fixture handles aluminum TIG and steel welds"
        />

        <Figure
          src={img("clamped-tabs-detail.png")}
          alt="Close-up of clamped mount tabs indexed against the baseplate inserts"
          caption="Detail of mount tabs indexed against the inserts, holding position during weld"
        />

        <Figure
          src={img("finished-assembly.png")}
          alt="Finished enclosure with tabs welded in place, still on the jig"
          caption="Finished enclosure on the jig after steel-insert pass"
        />
      </section>
    </article>
  );
}
