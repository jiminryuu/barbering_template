import type { NextConfig } from "next";
import path from "path";

const semverPath = path.join(
  process.cwd(),
  "node_modules",
  "sanity",
  "node_modules",
  "semver"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Next.js 16 uses Turbopack by default
  turbopack: {
    resolveAlias: {
      "sanity/node_modules/semver": semverPath,
    },
  },
  webpack: (config) => {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["sanity/node_modules/semver"] = semverPath;
    return config;
  },
};

export default nextConfig;
