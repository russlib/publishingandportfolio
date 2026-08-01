import { Figure } from "@/components/article";

const img = (name: string) => `/projects/competitive-high-school-robotics/${name}`;

export function CompetitiveHighSchoolRoboticsContent() {
  return (
    <article className="article-prose">
      <section>
        <p className="text-[13px] italic" style={{ color: "#687385" }}>
          VEX Robotics Competition, four years (9th through 12th grade).
        </p>

        <p>
          Designed, built, and tested robots to compete in VEX Robotics Competitions. Lead
          programmer in 12th grade, responsible for ~80-90% of programming run points. Wrote
          autonomous routines, PID-tuned drive and mechanisms, and built state machines for
          match strategy.
        </p>

        <Figure
          src={img("robot-awards.jpg")}
          alt="VEX competition robot on display with Tournament Champion and Excellence Award trophies at the Vancouver Island Regional Championship"
          caption="Tower Takeover era robot at the Vancouver Island Regional Championship. Tournament Champion and Excellence Award."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>What the team did</h2>
        <ul>
          <li>2x World Championship qualifications</li>
          <li>Multiple tournament wins, including the pre-COVID Vancouver Island Regional Championship</li>
          <li>Excellence Award, Design Award, Skills Award, Sportsmanship Award</li>
        </ul>
      </section>
    </article>
  );
}
