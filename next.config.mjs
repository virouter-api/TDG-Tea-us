/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "1";
const pagesBase = "/TDG-Tea-us";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGitHubPages
    ? { basePath: pagesBase, assetPrefix: pagesBase }
    : {}),
  env: {
    // next/image (unoptimized) does not auto-prefix basePath — clients use this.
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? pagesBase : "",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
