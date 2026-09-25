/**
 * Prefix static asset paths with the GitHub Pages basePath when building
 * for Pages. Local / EC2 builds keep paths rooted at `/`.
 *
 * next/image with `images.unoptimized: true` does NOT auto-prefix basePath,
 * so every absolute asset URL must go through this helper.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${normalized}`;
}
