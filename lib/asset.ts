/**
 * Keep public asset paths rooted at `/` in production server mode.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
}
