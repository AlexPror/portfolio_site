import type { RouteLocationNormalized } from 'vue-router'
import { SITE_ORIGIN, homeSeo, platformSeo, resumeSeo } from '@/data/seo'
import { getPlatform } from '@/data/platforms'

function ensureMeta(attr: 'name' | 'property', key: string): HTMLMetaElement {
  const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  return el
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  ensureMeta(attr, key).setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

export function resolveSeo(to: RouteLocationNormalized): {
  title: string
  description: string
  canonical: string
} {
  const path = to.path === '/' ? '/' : to.path.replace(/\/$/, '')
  const canonical = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`

  if (to.name === 'home') {
    return { title: homeSeo.title, description: homeSeo.description, canonical }
  }
  if (to.name === 'resume') {
    return { title: resumeSeo.title, description: resumeSeo.description, canonical }
  }
  if (to.name === 'platform') {
    const slug = String(to.params.slug || '')
    const seo = platformSeo[slug]
    const p = getPlatform(slug)
    if (seo) {
      return { title: seo.title, description: seo.description, canonical }
    }
    if (p) {
      return {
        title: `${p.title} — CAD · BIM · Production`,
        description: p.heroLead,
        canonical,
      }
    }
  }

  return {
    title: homeSeo.title,
    description: homeSeo.description,
    canonical,
  }
}

/** Обновляет title, description, canonical и Open Graph / Twitter под текущий маршрут. */
export function applySeo(to: RouteLocationNormalized) {
  const { title, description, canonical } = resolveSeo(to)

  document.title = title
  setMeta('name', 'description', description)
  setCanonical(canonical)

  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:type', to.name === 'home' ? 'website' : 'article')
  setMeta('property', 'og:locale', 'ru_RU')

  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:card', 'summary_large_image')
}
