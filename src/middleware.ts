import { NextRequest, NextResponse } from "next/server";

// Password-gate everything under /tools/* (team-only experiments like the TTC
// tyre explorer). The password is read from the TOOLS_PASSWORD env var set in
// Vercel — it is NEVER hardcoded, because the deploy repo is public.
//
// Fails CLOSED: if TOOLS_PASSWORD is not configured, access is denied entirely
// so the tools can never be served unprotected by accident. Both the env value
// and the submitted password are trimmed so a stray space/newline (easy to add
// in the dashboard) doesn't silently lock everyone out.
export const config = {
  matcher: ["/tools/:path*"],
};

const REALM = 'Basic realm="UVFR Tools", charset="UTF-8"';

export function middleware(req: NextRequest) {
  const expected = process.env.TOOLS_PASSWORD?.trim();
  if (!expected) {
    return new NextResponse("Tools password not configured.", { status: 503 });
  }

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    // atob is available in the Edge runtime.
    const decoded = atob(header.slice(6));
    const password = decoded.slice(decoded.indexOf(":") + 1).trim(); // username ignored
    if (password === expected) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": REALM },
  });
}
