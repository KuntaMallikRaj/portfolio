import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // fully static site -> produces an `out/` folder
  images: { unoptimized: true },
  trailingSlash: true, // clean static hosting on Netlify / any CDN
};

export default nextConfig;
