/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import RecognitionSection from "@/components/section/recognition-section";
import LeadershipSection from "@/components/section/leadership-section";
import { ExperienceList } from "@/components/section/work-section";
import { OpenToWork } from "@/components/open-to-work";
import { Monogram } from "@/components/monogram";
import { FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      {/* Hero */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                <OpenToWork />
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href="/resume?src=hero"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Resume
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Get in touch
                  </a>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                <AvatarImage alt="Swyam Sharma" src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Work */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <ExperienceList items={DATA.work} />
          </BlurFade>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership">
        <BlurFade delay={BLUR_FADE_DELAY * 6.5}>
          <LeadershipSection />
        </BlurFade>
      </section>

      {/* Education */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-x-3 group"
                >
                  <div className="mt-0.5 flex-none">
                    {education.logoUrl ? (
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                    ) : (
                      <Monogram
                        letters={getInitials(education.school)}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {education.school}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        </div>
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.degree}
                        </div>
                        {education.details && (
                          <div className="font-sans text-xs text-muted-foreground/70 mt-1">
                            {education.details}
                          </div>
                        )}
                      </div>
                      <div className="text-xs tabular-nums text-muted-foreground text-right flex-none whitespace-nowrap">
                        {education.start} - {education.end}
                      </div>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills (grouped) */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-col gap-4">
            {DATA.skills.map((group, gi) => (
              <BlurFade
                key={group.label}
                delay={BLUR_FADE_DELAY * 10 + gi * 0.03}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2"
                      >
                        {skill.icon && (
                          <skill.icon className="size-4 rounded overflow-hidden object-contain" />
                        )}
                        <span className="text-foreground text-sm font-medium">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      {/* Hackathons */}
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>

      {/* Recognition */}
      <section id="recognition">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <RecognitionSection />
        </BlurFade>
      </section>

      {/* Contact */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Swyam Sharma",
            url: DATA.url,
            image: `${DATA.url}/me.jpg`,
            jobTitle: "Full-Stack & Agentic AI Engineer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Noida",
              addressCountry: "IN",
            },
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Guru Gobind Singh Indraprastha University",
            },
            sameAs: [
              "https://github.com/areycruzer",
              "https://www.linkedin.com/in/areyswyam/",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
