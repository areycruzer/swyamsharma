import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  const ownerKey = process.env.OWNER_KEY;
  const off = req.nextUrl.searchParams.get("off") === "1";

  if (!key || !ownerKey || !safeCompare(key, ownerKey)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const res = NextResponse.redirect(new URL("/", req.url), 302);

  if (off) {
    res.cookies.set("sw_owner", "", {
      path: "/",
      maxAge: 0,
    });
  } else {
    res.cookies.set("sw_owner", "1", {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "lax",
      secure: true,
      // NOT httpOnly: the client reads this to skip PostHog init
    });
  }

  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
