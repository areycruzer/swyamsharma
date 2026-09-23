import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <section className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Privacy
      </h1>
      <p>
        This site uses PostHog in cookieless mode to count visits and clicks,
        and records session replays with every form field masked. Location is
        approximate (city level) and comes from the hosting provider.
      </p>
      <p>
        Messages sent through the contact form go to Formspree and then to my
        inbox. There are no advertising cookies.
      </p>
      <p>
        Questions:{" "}
        <a href="mailto:swyam7@gmail.com" className="text-foreground underline underline-offset-4">
          swyam7@gmail.com
        </a>
      </p>
    </section>
  );
}
