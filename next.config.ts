import type { NextConfig } from "next";

// Static export: the site is plain HTML/JS and can be hosted anywhere
// (Vercel, GitHub Pages, Netlify) without a server.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
