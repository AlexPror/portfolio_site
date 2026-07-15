import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DeskReviewPage from '@/pages/DeskReviewPage.vue'
import { logger } from '@/lib/logger'

const SITE_ORIGIN = 'https://alexpror.github.io/portfolio_site'

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
          'Разработка ПО для CAD, BIM и производства: плагины Revit, КОМПАС-3D и SolidWorks, спецификации, выпуск чертежей, DeskReview — PDF и 3D в браузере.',
      },
    },
    {
      path: '/app',
      name: 'deskreview',
      component: DeskReviewPage,
      meta: {
        title: 'DeskReview 1.0 — PDF и 3D в браузере | CAD · BIM · Production',
        description:
          'DeskReview 1.0: ревью чертежей и моделей в браузере без CAD. PDF, STEP, STL, IGES, GLB — замечания, измерения, сечения, отчёт.',
      },
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

function applySeo(to: RouteLocationNormalized) {
  const title = typeof to.meta.title === 'string' ? to.meta.title : undefined
  const description = typeof to.meta.description === 'string' ? to.meta.description : undefined
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
  logger.info('route', { path: to.fullPath, name: String(to.name ?? '') })
})

export default router
