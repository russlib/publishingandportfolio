import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import {
  getOrganisation,
  getPublishedArticleSlugs,
} from "@/data/content";
import { Editable } from "@/components/edit/editable";
import { RoleDisclosure } from "@/components/experience/role-disclosure";

const SLUG = "uvic-formula-student";
/* Every Editable path points back at the YAML field it renders. */
const FILE = `experience/${SLUG}`;

export async function generateMetadata(): Promise<Metadata> {
  const org = await getOrganisation(SLUG);
  return {
    title: org.org,
    description: org.intro,
    alternates: { canonical: `/experience/${SLUG}` },
    openGraph: {
      type: "profile",
      url: `/experience/${SLUG}`,
      title: `${org.org} | Russell Bilinski`,
      description: org.intro,
      images: [
        {
          url: "/me/driver-wide.jpg",
          alt: "Russell Bilinski in the UVic Formula Student race car",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${org.org} | Russell Bilinski`,
      description: org.intro,
      images: ["/me/driver-wide.jpg"],
    },
  };
}

/* Every word on this page comes from content/experience/uvic-formula-student.yaml,
   edited at /keystatic. Nothing here should be prose. */

export default async function UVicFormulaStudentPage() {
  const [org, publishedSlugs] = await Promise.all([
    getOrganisation(SLUG),
    getPublishedArticleSlugs(),
  ]);
  const publishedArticles = org.articles
    .map((article, index) => ({ article, index }))
    .filter(({ article }) => publishedSlugs.has(article.slug));

  return (
    <>
      <SiteNav />

      <div className="sim-home">
        <main className="xp-page">
          <div className="xp-role-top" style={{ marginBottom: "14px" }}>
            <span className="xp-tag">Club Experience</span>
            {org.current && <span className="xp-tag is-current">Current</span>}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(34px, 5vw, 46px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {org.org}
          </h1>

          <Editable as="p" className="xp-lede" path={`${FILE}:intro`} value={org.intro} />

          <section className="xp-section">
            <Editable as="h2" path={`${FILE}:rolesHeading`} value={org.rolesHeading} />
            <Editable as="p" path={`${FILE}:rolesIntro`} value={org.rolesIntro} />
            <div className="xp-roles">
              {org.roles.map((role, i) => (
                <RoleDisclosure
                  key={role.title}
                  detail={role.detail}
                  file={FILE}
                  index={i}
                  short={role.short}
                  tag={role.tag}
                  title={role.title}
                />
              ))}
            </div>
          </section>

          <section className="xp-section" id="articles">
            <Editable as="h2" path={`${FILE}:articlesHeading`} value={org.articlesHeading} />
            <Editable as="p" path={`${FILE}:articlesIntro`} value={org.articlesIntro} />
            <div className="sim-project-grid">
              {publishedArticles.map(({ article, index }) => (
                <Link
                  key={article.slug}
                  href={`/project/${article.slug}`}
                  className="sim-project-card"
                >
                  <div className="sim-project-thumb">
                    <Image
                      src={article.thumbnail}
                      alt=""
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>
                  <div className="sim-project-body">
                    <Editable
                      as="small"
                      path={`${FILE}:articles.${index}.role`}
                      value={article.role}
                    />
                    <Editable
                      as="h3"
                      path={`${FILE}:articles.${index}.name`}
                      value={article.name}
                    />
                    <Editable
                      as="p"
                      path={`${FILE}:articles.${index}.hook`}
                      value={article.hook}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
