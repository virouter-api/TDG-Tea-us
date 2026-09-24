/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "1";
const pagesBase = "/TDG-Tea-us";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGitHubPages
    ? { basePath: pagesBase, assetPrefix: pagesBase }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
