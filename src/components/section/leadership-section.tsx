import BlurFade from "@/components/magicui/blur-fade";
import { ExperienceList } from "@/components/section/work-section";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function LeadershipSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <BlurFade delay={BLUR_FADE_DELAY * 6.5}>
        <h2 className="text-xl font-bold">Leadership & Community</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 6.7}>
        <ExperienceList items={DATA.leadership} />
      </BlurFade>
    </div>
  );
}
