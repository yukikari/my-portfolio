const basePath = process.env.STATIC_EXPORT === 'true' ? '/portfolio' : ''

/**
 * Prefixes a `public/`-relative path with the static export basePath
 * (`/portfolio`) when building for GitHub Pages, and leaves it untouched
 * for `next dev` / normal builds.
 */
export function assetPath(p: string): string {
  return `${basePath}${p}`
}
