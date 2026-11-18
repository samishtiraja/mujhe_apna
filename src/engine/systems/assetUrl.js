/**
 * Resolves static asset URLs (/assets/..., /song/...) against Vite's BASE_URL
 * so they work seamlessly both on localhost (/) and GitHub Pages (/mujhe_apna/).
 */
export function resolveAssetUrl(url) {
  if (!url || typeof url !== 'string') return url
  if (url === 'none' || /^(https?:|data:|blob:|#)/i.test(url)) return url

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`

  if (normalizedBase !== '/' && url.startsWith(normalizedBase)) {
    return url
  }
  if (url.startsWith('/')) {
    return `${normalizedBase}${url.slice(1)}`
  }
  return `${normalizedBase}${url}`
}
