/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { Monogram } from "@/components/monogram";
import type { Experience } from "@/data/types";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <div className="grid gap-6">
      {items.map((item) => (
        <div
          key={`${item.org}-${item.title}`}
          className="flex items-start gap-x-3"
        >
          {/* Logo or monogram */}
          <div className="mt-0.5 flex-none">
            {item.logoUrl ? (
              <LogoImage src={item.logoUrl} alt={item.org} />
            ) : (
              <Monogram letters={getInitials(item.org)} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <div className="font-semibold leading-none">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      {item.org}
                    </a>
                  ) : (
                    item.org
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.title}
                  {(item.type || item.location) && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      &middot;{" "}
                      {[item.type, item.location].filter(Boolean).join(" \u00B7 ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs tabular-nums text-muted-foreground text-right flex-none whitespace-nowrap">
                {item.start} - {item.end ?? "Present"}
              </div>
            </div>

            {item.bullets.length > 0 && (
              <ul className="mt-2 ml-4 list-disc text-xs sm:text-sm text-muted-foreground space-y-1">
                {item.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
