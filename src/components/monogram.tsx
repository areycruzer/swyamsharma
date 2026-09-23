"use client";

import { cn } from "@/lib/utils";

export function Monogram({
  letters,
  className,
}: {
  letters: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "size-8 md:size-10 flex items-center justify-center rounded-full border shadow ring-2 ring-border bg-muted text-muted-foreground text-xs font-semibold select-none flex-none",
        className
      )}
      aria-hidden="true"
    >
      {letters.slice(0, 4)}
    </div>
  );
}
