import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export function SiteNav({ showBack = true }: { showBack?: boolean }) {
  return (
    <nav className="sticky top-[16px] z-50 mx-auto max-w-[720px] px-[24px]">
      <div className="glass-card flex items-center justify-between rounded-[16px] px-[16px] py-[10px]">
        {showBack ? (
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/" />}>
            <ArrowLeft data-icon="inline-start" className="size-4" />
            Back to posting
          </Button>
        ) : (
          <span className="text-[16px] font-medium" style={{ letterSpacing: "-0.3px" }}>
            Russell Bilinski
          </span>
        )}

        <Link
          href="/"
          className="group flex items-center gap-[8px] rounded-[10px] px-[10px] py-[6px] transition-colors hover:bg-black/[0.04]"
          aria-label="Home"
        >
          <span className="text-[13px] font-medium" style={{ color: "#687385" }}>
            {showBack ? "Russell Bilinski" : "Portfolio"}
          </span>
          <Home className="size-[14px]" style={{ color: "#687385" }} />
        </Link>
      </div>
    </nav>
  );
}
