import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Home, Mail } from "lucide-react";
import { resumeUrl } from "@/data/resume";

const navLinkClass =
  "flex items-center gap-[6px] rounded-[10px] px-[10px] py-[6px] text-[13px] font-medium transition-colors hover:bg-black/[0.04]";
const navLinkColor = { color: "#687385" } as const;

export function SiteNav({ showBack = true }: { showBack?: boolean }) {
  return (
    <nav className="sticky top-[16px] z-50 mx-auto max-w-[720px] px-[24px]">
      <div className="glass-card flex items-center justify-between rounded-[16px] px-[16px] py-[10px]">
        {showBack ? (
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/" />}>
            <ArrowLeft data-icon="inline-start" className="size-4" />
            Home
          </Button>
        ) : (
          <span className="text-[16px] font-medium" style={{ letterSpacing: "-0.3px" }}>
            Russell Bilinski
          </span>
        )}

        <div className="flex items-center gap-[4px]">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            style={navLinkColor}
          >
            <FileText className="size-[14px]" />
            Resume
          </a>

          <a
            href="https://www.linkedin.com/in/russellbilinski/"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            style={navLinkColor}
          >
            LinkedIn
          </a>

          <a
            href="mailto:ruzzcraze@gmail.com"
            className={navLinkClass}
            style={navLinkColor}
          >
            <Mail className="size-[14px]" />
            Email
          </a>

          <Link
            href="/"
            className="group flex items-center gap-[8px] rounded-[10px] px-[10px] py-[6px] transition-colors hover:bg-black/[0.04]"
            aria-label="Home"
          >
            <span className="text-[13px] font-medium" style={navLinkColor}>
              {showBack ? "Russell Bilinski" : "Portfolio"}
            </span>
            <Home className="size-[14px]" style={navLinkColor} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
