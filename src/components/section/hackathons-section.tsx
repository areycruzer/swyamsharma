/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { DATA, HACKATHON_WINS } from "@/data/resume";
import { Icons } from "@/components/icons";
import { Monogram } from "@/components/monogram";
import {
  Timeline,
  TimelineItem,
  TimelineConnectItem,
} from "@/components/timeline";
import { Trophy } from "lucide-react";

function getIconComponent(icon: string) {
  switch (icon) {
    case "github":
      return Icons.github;
    case "youtube":
      return Icons.youtube;
    case "globe":
    default:
      return Icons.globe;
  }
}

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default function HackathonsSection() {
  const sorted = [...DATA.hackathons].sort((a, b) =>
    b.sortKey.localeCompare(a.sortKey)
  );

  return (
    <section id="hackathons" className="overflow-hidden">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Hackathons
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Built against the clock
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              {HACKATHON_WINS} hackathon wins so far, including Smart India
              Hackathon 2025. Most of my favourite projects started as a weekend
              build with a small team.
            </p>
          </div>
        </div>
        <Timeline>
          {sorted.map((hackathon) => (
            <TimelineItem
              key={hackathon.title + hackathon.dates}
              className="w-full flex items-start justify-between gap-10"
            >
              <TimelineConnectItem className="flex items-start justify-center">
                {hackathon.image ? (
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                  />
                ) : (
                  <Monogram
                    letters={getInitials(hackathon.title)}
                    className="size-10 bg-card z-10"
                  />
                )}
              </TimelineConnectItem>
              <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                {hackathon.dates && (
                  <time className="text-xs text-muted-foreground">
                    {hackathon.dates}
                  </time>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  {hackathon.title && (
                    <h3 className="font-semibold leading-none">
                      {hackathon.title}
                    </h3>
                  )}
                  {hackathon.kind === "bounty" && (
                    <Badge
                      variant="outline"
                      className="text-[10px] h-5 px-1.5"
                    >
                      Bounty
                    </Badge>
                  )}
                </div>
                {hackathon.win && (
                  <Badge className="w-fit flex items-center gap-1 text-xs bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20">
                    <Trophy className="h-3 w-3" />
                    {hackathon.win}
                    {hackathon.prize && ` \u00B7 ${hackathon.prize}`}
                  </Badge>
                )}
                {hackathon.location && (
                  <p className="text-sm text-muted-foreground">
                    {hackathon.location}
                  </p>
                )}
                {hackathon.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                    {hackathon.description}
                  </p>
                )}
                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                    {hackathon.links.map((link, idx) => {
                      const IconComp = getIconComponent(link.icon);
                      return (
                        <a
                          href={link.href}
                          key={idx}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                            <IconComp className="h-3 w-3" />
                            {link.title}
                          </Badge>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
