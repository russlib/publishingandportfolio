import type { Metadata } from "next";
import Link from "next/link";
import article from "./article.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Current State of DRS — Draft",
  description: "What the current LapSim evidence says about the performance case for DRS on a Formula SAE car. Working editorial draft.",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: "/draft/drs" },
  openGraph: { title: "The Current State of DRS — Draft", url: "/draft/drs", description: "Working editorial draft by Russell Bilinski." },
};

export default function DrsDraft() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}><Link href="/">Russell Bilinski</Link><span>WORKING DRAFT</span></nav>
      <p className={styles.status}>Editorial draft · September 12, 2026 · Analysis and wording under review.</p>
      <article className={styles.article} dangerouslySetInnerHTML={{ __html: article }} />
    </main>
  );
}
