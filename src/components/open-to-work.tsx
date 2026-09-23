import { DATA } from "@/data/resume";

export function OpenToWork() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-700 dark:text-green-400">
      <span className="relative flex h-2 w-2">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      {DATA.openToWork}
    </div>
  );
}
