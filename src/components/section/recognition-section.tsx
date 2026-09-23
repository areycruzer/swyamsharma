import { DATA } from "@/data/resume";
import {
  BookOpen,
  GitPullRequest,
  ShieldCheck,
  Rocket,
  Award,
} from "lucide-react";
import type { RecognitionGroup } from "@/data/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  GitPullRequest,
  ShieldCheck,
  Rocket,
  Award,
};

function RecognitionGroupSection({ group }: { group: RecognitionGroup }) {
  const IconComp = iconMap[group.icon];
  if (!group.items.length) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        {IconComp && <IconComp className="h-4 w-4 text-muted-foreground" />}
        {group.label}
      </h3>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {group.items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                {item.text}
              </a>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RecognitionSection() {
  const nonEmptyGroups = DATA.recognition.filter((g) => g.items.length > 0);
  if (nonEmptyGroups.length === 0) return null;

  return (
    <section id="recognition">
      <div className="flex min-h-0 flex-col gap-y-8 w-full">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                Recognition
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Papers, PRs and bounties
            </h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {nonEmptyGroups.map((group) => (
            <RecognitionGroupSection key={group.label} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
