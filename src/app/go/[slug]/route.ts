import { NextRequest, NextResponse, after } from "next/server";
import { LINKS, type LinkSlug } from "@/data/links";
import { captureServerEvent } from "@/lib/posthog-server";

const BOT =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|linkedin|slack|twitter|skype|headless|lighthouse|vercel/i;
const SRC = /^[a-z0-9-]{1,24}$/;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const link = LINKS[slug as LinkSlug];
  if (!link) return new NextResponse("Not found", { status: 404 });

  const h = req.headers;
  const ua = h.get("user-agent") ?? "";
  const prefetch =
    /prefetch|prerender/i.test(
      `${h.get("sec-purpose") ?? ""} ${h.get("purpose") ?? ""}`
    ) || h.has("next-router-prefetch");
  const owner = req.cookies.get("sw_owner")?.value === "1";
  const srcRaw = req.nextUrl.searchParams.get("src") ?? "direct";
  const src = SRC.test(srcRaw) ? srcRaw : "other";

  if (!prefetch && !owner) {
    const ref = h.get("referer");
    after(() =>
      captureServerEvent("link_redirect", {
        slug,
        label: link.label,
        src,
        is_bot: BOT.test(ua),
        referrer_host: ref
          ? (() => {
              try {
                return new URL(ref).host;
              } catch {
                return "invalid";
              }
            })()
          : "direct",
        city: decodeURIComponent(
          h.get("x-vercel-ip-city") ?? "unknown"
        ),
        region: h.get("x-vercel-ip-country-region") ?? "",
        country: h.get("x-vercel-ip-country") ?? "unknown",
        device: /mobile|android|iphone|ipad/i.test(ua)
          ? "mobile"
          : "desktop",
        os: /android/i.test(ua)
          ? "Android"
          : /iphone|ipad|ios/i.test(ua)
            ? "iOS"
            : /mac os/i.test(ua)
              ? "macOS"
              : /windows/i.test(ua)
                ? "Windows"
                : /linux/i.test(ua)
                  ? "Linux"
                  : "other",
      })
    );
  }
  const res = NextResponse.redirect(link.href, 302);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}
