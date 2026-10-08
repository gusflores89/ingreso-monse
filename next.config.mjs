import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows a fresh local build when a synchronized cache is locked on Windows.
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
