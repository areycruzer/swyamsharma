# Swyam Sharma Portfolio

Personal portfolio for Swyam Sharma: Full-Stack and Agentic AI Engineer.

- **Live URL**: [https://swyamsharma.vercel.app](https://swyamsharma.vercel.app)
- **Target Stack**: Next.js 16 (Turbopack), React 19, Tailwind CSS v4, Motion, PostHog cookieless analytics, Formspree contact form.

---

## Getting Started Locally

### Prerequisites
- Node.js 20+ (recommended 22+)
- pnpm 9+ (or pnpm 12)

### Setup
1. Clone and install dependencies:
   ```bash
   git clone https://github.com/areycruzer/swyamsharma.git
   cd swyamsharma
   pnpm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Set your local or staging values for PostHog and Formspree (leave empty if testing locally without analytics).

3. Start development server:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

4. Run tests and verification:
   ```bash
   # Pre-build content checks (em dashes, phone numbers, template strings)
   pnpm check:content

   # Validate outbound links in src/data
   pnpm check:links

   # Production build
   pnpm build
   ```

---

## Content & Data Structure

Site content is cleanly separated from UI components:

- `src/data/resume.tsx`: Core profile data including bio, work history, leadership, education, grouped technical skills, project cards, and hackathons.
- `src/data/links.ts`: Allow-listed short link destinations for tracked redirects (`/resume`, `/go/github`, `/go/linkedin`).
- `src/data/types.ts`: Strict TypeScript type definitions for all profile data models.

### Automatic Hackathon Win Count
The hero section dynamically displays the total hackathon win count:
```ts
export const HACKATHON_WINS = hackathons.filter(
  (h) => h.kind === "hackathon" && Boolean(h.win)
).length;
```
Adding any new entry to `hackathons` in `src/data/resume.tsx` with a `win` property will automatically update the hero description and hackathon section intro without manual edits.

---

## Video Loops & Media Pipeline

Project cards support muted, looping MP4 previews with poster fallbacks. The player respects `prefers-reduced-motion` and `navigator.connection.saveData`.

### Video Encode Recipe (FFmpeg)
To encode video loops under the 1.5 MB target budget:

**Standard Landscape (16:9):**
```bash
ffmpeg -ss 00:00:12 -t 7 -i input.mp4 -an \
  -vf "fps=24,scale=960:540:force_original_aspect_ratio=increase,crop=960:540,format=yuv420p" \
  -c:v libx264 -profile:v high -preset slow -crf 28 -movflags +faststart public/videos/project.mp4

# Generate poster image:
ffmpeg -ss 00:00:12 -i input.mp4 -frames:v 1 \
  -vf "scale=960:540:force_original_aspect_ratio=increase,crop=960:540" -q:v 4 public/videos/project.jpg
```

**Vertical / Mobile (DishEdit blurred-fill):**
```bash
ffmpeg -ss 00:00:05 -t 7 -i input.mp4 -an -filter_complex \
  "[0:v]fps=24,scale=960:540:force_original_aspect_ratio=increase,crop=960:540,boxblur=20:2[bg];[0:v]fps=24,scale=-2:540[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p" \
  -c:v libx264 -preset slow -crf 28 -movflags +faststart public/videos/project.mp4
```

---

## Re-enabling the Blog

The blog pipeline is preserved via Content Collections (`content-collections.ts` and `content/`), but hidden while there are 0 posts (visiting `/blog` returns a 404).

To re-enable:
1. Add one or more `.mdx` files with title, summary, and published date to the `content/` directory.
2. In `src/data/resume.tsx`, add the Blog item back to `DATA.navbar`:
   ```ts
   { href: "/blog", icon: NotebookIcon, label: "Blog" }
   ```

---

## Analytics & Owner Opt-Out

- **Cookieless PostHog**: Analytics runs in cookieless mode with session replay masking all inputs.
- **Reverse Proxy**: Reverse proxied through `/sw-rx/*` in `next.config.mjs`.
- **Owner Opt-Out**: Navigate to `/me?key=<OWNER_KEY>` on your devices to set the opt-out cookie (`sw_owner=1`). Navigate to `/me?key=<OWNER_KEY>&off=1` to clear the cookie.

---

## License & Credits

Based on the MIT-licensed [Magic UI portfolio template](https://github.com/dillionverma/portfolio) by Dillion Verma.

Modifications Copyright (c) 2026 Swyam Sharma. Released under the [MIT License](./LICENSE).
