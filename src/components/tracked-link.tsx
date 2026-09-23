"use client";

import type { LinkSlug } from "@/data/links";

interface TrackedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  slug: LinkSlug;
  src?: string;
  children: React.ReactNode;
}

export function TrackedLink({
  slug,
  src = "page",
  children,
  className,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      href={`/go/${slug}?src=${src}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        try {
          import("posthog-js").then((m) =>
            m.default.capture("outbound_click", { slug, src })
          );
        } catch {
          // PostHog not loaded
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
