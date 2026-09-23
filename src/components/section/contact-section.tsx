"use client";

import { useState, useRef, type FormEvent } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Button } from "@/components/ui/button";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Icons } from "@/components/icons";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

type Status = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORMSPREE_ID) return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
        // Capture event with no PII
        try {
          const posthog = (await import("posthog-js")).default;
          posthog.capture("contact_form_submitted");
        } catch {
          // PostHog not loaded
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          (data as Record<string, string>).error ||
            `Something went wrong (${res.status})`
        );
        setStatus("error");
        try {
          const posthog = (await import("posthog-js")).default;
          posthog.capture("contact_form_error", { status: res.status });
        } catch {
          // PostHog not loaded
        }
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative z-10 flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <input type="hidden" name="_subject" value="Portfolio message" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          disabled={status === "submitting"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          disabled={status === "submitting"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={2000}
          rows={4}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          disabled={status === "submitting"}
        />
      </div>

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send message
          </>
        )}
      </Button>

      <div aria-live="polite" className="text-sm text-center">
        {status === "success" && (
          <p className="text-green-600 dark:text-green-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            Thanks, I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 dark:text-red-400 flex items-center justify-center gap-1.5 flex-wrap">
            <AlertCircle className="h-4 w-4" />
            {errorMsg} Or{" "}
            <a
              href="mailto:swyam7@gmail.com"
              className="underline underline-offset-4"
            >
              email me directly
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

function FallbackContact() {
  return (
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className="flex items-center gap-3">
        <a
          href="mailto:swyam7@gmail.com"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <Icons.email className="h-4 w-4" />
          Email me
        </a>
        <a
          href="/go/linkedin?src=contact"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          <Icons.linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Hiring for a SWE, Full-Stack or AI Engineer role, or want to build
          something together? Send a message below or email me at{" "}
          <a
            href="mailto:swyam7@gmail.com"
            className="text-foreground underline underline-offset-4"
          >
            swyam7@gmail.com
          </a>
          .
        </p>

        {FORMSPREE_ID ? <ContactForm /> : <FallbackContact />}

        {/* Always show direct links */}
        <div className="relative z-10 flex items-center gap-3 text-sm text-muted-foreground">
          <a
            href="mailto:swyam7@gmail.com"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
            onClick={() => {
              try {
                import("posthog-js").then((m) =>
                  m.default.capture("email_click", { src: "contact" })
                );
              } catch {
                // PostHog not loaded
              }
            }}
          >
            Email
          </a>
          <span>&middot;</span>
          <a
            href="/go/linkedin?src=contact"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
