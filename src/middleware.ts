import { NextRequest, NextResponse } from "next/server";

// Password-gate everything under /tools/* (team-only experiments like the TTC
// tyre explorer). The password is read from the TOOLS_PASSWORD env var set in
// Vercel — it is NEVER hardcoded, because the deploy repo is public.
//
// Fails CLOSED: if TOOLS_PASSWORD is not configured, access is denied entirely
// so the tools can never be served unprotected by accident.
export const config = {
  matcher: ["/tools/:path*"],
};

const REALM = 'Basic realm="UVFR Tools", charset="UTF-8"';

export function middleware(req: NextRequest) {
  const diag = req.nextUrl.searchParams.get("__diag") === "1";
  const expected = process.env.TOOLS_PASSWORD;
  if (!expected) {
    return new NextResponse("Tools password not configured.", {
      status: 503,
      headers: diag ? { "x-diag": "no-env" } : undefined,
    });
  }

  const header = req.headers.get("authorization");
  let pwLen = -1;
  if (header?.startsWith("Basic ")) {
    // atob is available in the Edge runtime.
    const decoded = atob(header.slice(6));
    const password = decoded.slice(decoded.indexOf(":") + 1); // username ignored
    pwLen = password.length;
    if (password === expected) {
      return NextResponse.next();
    }
  }

  const headers: Record<string, string> = { "WWW-Authenticate": REALM };
  if (diag) {
    headers["x-diag-has-auth"] = String(!!header);
    headers["x-diag-exp-len"] = String(expected.length);
    headers["x-diag-pw-len"] = String(pwLen);
  }
  return new NextResponse("Authentication required.", { status: 401, headers });
}
