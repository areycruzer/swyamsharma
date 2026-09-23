import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-28 pt-12 text-center text-xs text-muted-foreground">
      <p>
        &copy; {year} Swyam Sharma &middot;{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Privacy
        </Link>{" "}
        &middot; Built on the{" "}
        <a
          href="https://github.com/dillionverma/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
        >
          Magic UI portfolio template
        </a>
      </p>
    </footer>
  );
}
