import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, Mail } from "lucide-react";
import { resumeUrl } from "@/data/resume";

/** Inner-page nav — matches SimScale header chrome (72px, pills). */
export function SiteNav({ showBack = true }: { showBack?: boolean }) {
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-[#e4e4e8]/90 bg-[#f7f7f7]/92 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between gap-2 px-4 sm:gap-4 sm:px-7">
        <Link
          href="/"
          className="inline-flex min-h-11 min-w-0 items-center gap-2.5 font-semibold tracking-[-0.02em] text-[#070a27]"
        >
          <span
            aria-hidden="true"
            className="size-7 flex-none rounded-full shadow-[inset_0_0_0_3px_rgba(255,255,255,0.25),0_4px_12px_rgba(37,99,235,0.25)]"
            style={{
              background:
                "conic-gradient(from 210deg, #60a5fa, #2563eb, #1d4ed8, #38bdf8, #60a5fa)",
            }}
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="whitespace-nowrap text-[13px] sm:text-[16px]">
              Russell Bilinski
            </span>
            <span className="mt-1 whitespace-nowrap text-[9px] font-medium tracking-[0.04em] text-[#687385] sm:text-[10px]">
              Mechanical engineering
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2.5 text-[14px] font-semibold">
          {showBack && (
            <Link
              href="/"
              className="hidden min-h-11 items-center gap-1.5 px-2.5 text-[#2b2c33] sm:inline-flex"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Portfolio
            </Link>
          )}
          <a
            href="mailto:bilinskirussell@gmail.com"
            aria-label="Email Russell Bilinski"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-2.5 text-[#2b2c33]"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#070a27] px-3 text-white shadow-[0_8px_18px_rgba(7,10,39,0.14)] sm:px-4"
          >
            <FileText className="size-3.5" aria-hidden="true" />
            Resume
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
