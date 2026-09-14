import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PlatformPage from '@/pages/PlatformPage.vue'
import ResumePage from '@/pages/ResumePage.vue'
import { logger } from '@/lib/logger'
import { getPlatform } from '@/data/platforms'

const SITE_ORIGIN = 'https://vorobjev.pro'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'CAD · BIM · Production — плагины Revit, КОМПАС, SolidWorks',
        description:
          'Разработка ПО для CAD, BIM и производства: плагины Revit, КОМПАС-3D и SolidWorks. Отдельные кейсы по платформам.',
      },
    },
    {
      path: '/:slug(kompas|revit|solidworks)',
      name: 'platform',
      component: PlatformPage,
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumePage,
      meta: {
        title: 'Резюме — Воробьёв Александр Сергеевич · Инженер-конструктор',
        description:
          'Инженер-конструктор, КМ/КМД, листовой металл, автоматизация CAD (КОМПАС, SolidWorks, Revit). Удалённо.',
      },
    },
    {
      path: '/app',
      redirect: { path: '/', hash: '#deskreview' },
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

function applySeo(to: RouteLocationNormalized) {
  let title = typeof to.meta.title === 'string' ? to.meta.title : undefined
  let description = typeof to.meta.description === 'string' ? to.meta.description : undefined

  if (to.name === 'platform') {
    const p = getPlatform(String(to.params.slug || ''))
    if (p) {
      title = `${p.title} — CAD · BIM · Production`
      description = p.heroLead
    }
  }

  if (title) document.title = title

  if (description) {
    let el = document.querySelector('meta[name="description"]')
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'description')
      document.head.appendChild(el)
    }
    el.setAttribute('content', description)
  }

  const path = to.path === '/' ? '/' : to.path.replace(/\/$/, '')
  const canonicalHref = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = canonicalHref
}

router.afterEach((to) => {
  applySeo(to)
  logger.debug('route', { path: to.fullPath, name: String(to.name ?? '') })
})

export default router
