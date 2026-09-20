import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets a production build run without clobbering a dev server's .next cache:
  //   NEXT_DIST_DIR=.next-prod npm run build && NEXT_DIST_DIR=.next-prod npm start
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // A stray lockfile in the parent folder makes Next infer the wrong workspace
  // root; pin it to this project.
  outputFileTracingRoot: __dirname,
  images: {
    // Fleet and editorial photography is served from /public/assets as plain files.
    // Keeping the default loader means the export's exact filenames stay drop-in replaceable.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
