import posthog from "posthog-js";

if (typeof window !== "undefined") {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
  const isOwner = document.cookie.split("; ").includes("sw_owner=1");

  if (token && !isOwner && !navigator.webdriver) {
    posthog.init(token, {
      api_host: "/sw-rx",
      ui_host: host.replace(".i.posthog.com", ".posthog.com"),
      person_profiles: "never",
      persistence: "memory",
      session_recording: { maskAllInputs: true },
      capture_pageview: true,
      capture_pageleave: true,
    });
  }
}
