import styles from "./home-portfolio.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  FileText,
  Mail,
} from "lucide-react";
import { resumeUrl } from "@/data/resume";
import { getHome, getOrganisation } from "@/data/content";
import { Editable } from "@/components/edit/editable";


type Home = Awaited<ReturnType<typeof getHome>>;
type Org = Awaited<ReturnType<typeof getOrganisation>>;

/* ── Hero copy, shared by both variants so they can't drift ── */

/* Every row now goes somewhere, so every row is a real link. Club rows open an
   in-site experience page (shareable detail); work rows open the resume, since
   the job content itself is under NDA. */
const CLUB_SLUG = "uvic-formula-student";
const CLUB_FILE = `experience/${CLUB_SLUG}`;

/* Keep the club panel limited to destinations with public content. */
const clubLinks = [
  { label: "One-pagers", href: "#projects" },
];


/* The club box is not a single link: it holds the role list and separate
   destinations, so it is a panel with buttons rather than one big target. */
function ClubBox({ org, roles }: { org: string; roles: Org["roles"] }) {
  return (
    <li className="sim-xp-item">
      <div className="sim-xp-row is-current sim-xp-panel">
        {/* Org name and its destinations share the top line, so the box
            stays compact instead of running a button row along the bottom. */}
        <span className="sim-xp-line">
          <Briefcase className="size-4 shrink-0" aria-hidden="true" />
          <Editable as="b" path={`${CLUB_FILE}:org`} value={org} />
          <span className="sim-xp-actions">
            {clubLinks.map((link) => (
              <Link key={link.label} href={link.href} className="sim-xp-btn">
                {link.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            ))}
          </span>
        </span>

        <ul className="sim-xp-roles">
          {roles.map((role, i) => (
            <li key={role.title}>
              <Editable as="b" path={`${CLUB_FILE}:roles.${i}.title`} value={role.title} />
              <Editable path={`${CLUB_FILE}:roles.${i}.short`} value={role.short} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function ExperienceRow({
  item,
  index,
}: {
  item: { org: string; role: string };
  index: number;
}) {
  return (
    <li className="sim-xp-item">
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sim-xp-row"
      >
        <span className="sim-xp-line">
          <Briefcase className="size-4 shrink-0" aria-hidden="true" />
          <Editable as="b" path={`home:workExperience.${index}.org`} value={item.org} />
          <span className="dot" aria-hidden="true" />
          <Editable
            className="sim-xp-role"
            path={`home:workExperience.${index}.role`}
            value={item.role}
          />
          {/* Says where the click lands, so the outbound trip is no surprise. */}
          <span className="sim-xp-dest">
            Resume
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>
        </span>
      </a>
    </li>
  );
}

function ExperienceGroup({
  label,
  path,
  children,
  tone,
}: {
  label: string;
  path: string;
  children: React.ReactNode;
  tone?: "work";
}) {
  return (
    <div className={`sim-xp-group${tone === "work" ? " is-work" : ""}`}>
      <span className="sim-xp-eyebrow">
        <i aria-hidden="true" />
        <Editable path={path} value={label} />
      </span>
      <ul className="sim-xp-list">{children}</ul>
    </div>
  );
}

function HeroExperience({ home, club }: { home: Home; club: Org }) {
  return (
    <div className="sim-xp sim-rise sim-d1">
      <ExperienceGroup label={home.clubEyebrow} path="home:clubEyebrow">
        <ClubBox org={club.org} roles={club.roles} />
      </ExperienceGroup>
      <ExperienceGroup
        label={home.workEyebrow}
        path="home:workEyebrow"
        tone="work"
      >
        {home.workExperience.map((item, i) => (
          <ExperienceRow key={item.org} item={item} index={i} />
        ))}
      </ExperienceGroup>
    </div>
  );
}

function HeroIdentity() {
  return (
    <div className="sim-hero-identity sim-rise">
      <h1>Russell Bilinski</h1>
      <p>Mechanical engineering</p>
    </div>
  );
}

function HeroActions({ home }: { home: Home }) {
  return (
    <div className="sim-hero-ctas sim-rise sim-d4">
      <a href="#projects" className="sim-cta-primary">
        <Editable path="home:heroPrimaryCta" value={home.heroPrimaryCta} />
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
      <a href="#contact" className="sim-cta-secondary">
        <Editable path="home:heroSecondaryCta" value={home.heroSecondaryCta} />
      </a>
    </div>
  );
}

/* The photo runs full-bleed behind the nav and the hero copy. Its left third is
   out-of-focus asphalt, which is where the type sits; the scrim carries the
   contrast so white text stays readable over the mid-grey tarmac. */
function HeroFull({ home, club }: { home: Home; club: Org }) {
  return (
    <section className="sim-hero-full">
      <Image
        src="/me/driver-wide.jpg"
        alt={home.heroAlt}
        fill
        priority
        sizes="100vw"
        className="sim-hero-full-img"
      />
      <div className="sim-hero-full-inner">
        <HeroIdentity />
        <HeroExperience home={home} club={club} />
        <HeroActions home={home} />
      </div>
    </section>
  );
}

export default async function Home() {
  const home = await getHome();
  const club = await getOrganisation(CLUB_SLUG);

  return (
    <div className="sim-home sim-home-cinematic">
      <header className="sim-header sim-header-overlay">
        <nav className="sim-nav" aria-label="Primary">
          <Link href="/" className="sim-brand">
            <span className="sim-logo" aria-hidden="true" />
            <span>Russell Bilinski</span>
          </Link>

          <div className="sim-nav-mid">
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="sim-nav-right">
            <a href="mailto:bilinskirussell@gmail.com" className="sim-link-quiet">
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/russell-bilinski/"
              target="_blank"
              rel="noopener noreferrer"
              className="sim-pill sim-pill-gray"
            >
              LinkedIn
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sim-pill sim-pill-dark"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      <main>
        <HeroFull home={home} club={club} />

        <section className={styles.page} id="projects" aria-labelledby="one-pagers-heading">
          <header className={styles.header}>
            <h2 id="one-pagers-heading" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0, letterSpacing: "-1px" }}>One-pagers</h2>
            <a className={styles.download} href="/projects/portfolio/russell-bilinski-portfolio.pdf" download>
              <FileText size={16} aria-hidden="true" /> Download full portfolio
            </a>
          </header>
          <div className={styles.grid}>
            {["FSAE Battery Cooling", "FSAE Battery Pack Projects", "FSAE Executive and Lead Roles"].map((title, i) => (
              <a className={styles.card} key={title} href={`/projects/portfolio/page-${i + 1}.pdf`}>
                <div className={styles.paper}>
                  <Image src={`/projects/portfolio/page-${i + 1}.png`} alt={`Preview of ${title}`} width={980} height={1268} sizes="(max-width: 700px) 90vw, 33vw" unoptimized />
                </div>
                <div className={styles.caption}>
                  <p className={styles.meta}>0{i + 1} / PDF · 1 page</p>
                  <h2>{title}</h2>
                  <span className={styles.open}>View summary <ArrowUpRight size={16} aria-hidden="true" /></span>
                </div>
              </a>
            ))}
          </div>
          <section aria-labelledby="articles-heading" style={{ marginTop: 56, borderTop: "1px solid #d8d8dc", paddingTop: 28 }}>
            <h2 id="articles-heading" style={{ margin: "0 0 16px", fontSize: 28, letterSpacing: "-.5px" }}>Articles</h2>
            <div style={{ border: "1px dashed #c7ccd3", borderRadius: 12, padding: "28px 24px", background: "#f8f9fb" }}>
              <p style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 600 }}>Under revision</p>
              <p style={{ margin: 0, color: "#62636b", lineHeight: 1.6 }}>I’m updating the longer write-ups. In the meantime, my project summaries are available above.</p>
            </div>
          </section>
        </section>

        <section className="sim-bottom-cta" id="contact">
          <Editable as="h2" path="home:contactHeading" value={home.contactHeading} />
          <div className="actions">
            <a href="mailto:bilinskirussell@gmail.com" className="sim-cta-primary">
              <Mail className="size-4" aria-hidden="true" />
              bilinskirussell@gmail.com
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sim-cta-secondary"
            >
              <FileText className="size-4" aria-hidden="true" />
              Resume PDF
            </a>
            <a
              href="https://www.linkedin.com/in/russell-bilinski/"
              target="_blank"
              rel="noopener noreferrer"
              className="sim-cta-secondary"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="sim-footer">
        <Link href="/" className="sim-brand">
          <span className="sim-logo" aria-hidden="true" />
          <span>Russell Bilinski</span>
        </Link>
        <Editable as="p" path="home:footerLine" value={home.footerLine} />
      </footer>
    </div>
  );
}
