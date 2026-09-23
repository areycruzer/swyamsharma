import { withContentCollections } from "@content-collections/next";

const PH_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const PH_ASSETS = PH_HOST.replace(".i.posthog.com", "-assets.i.posthog.com");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/sw-rx/static/:path*",
        destination: `${PH_ASSETS}/static/:path*`,
      },
      {
        source: "/sw-rx/array/:path*",
        destination: `${PH_ASSETS}/array/:path*`,
      },
      {
        source: "/sw-rx/:path*",
        destination: `${PH_HOST}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
