import { PostHog } from "posthog-node";

export async function captureServerEvent(
  event: string,
  properties: Record<string, unknown>
) {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return;
  const ph = new PostHog(token, {
    host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
  ph.capture({
    distinctId: crypto.randomUUID(),
    event,
    properties: { ...properties, $process_person_profile: false },
  });
  await ph.shutdown();
}
