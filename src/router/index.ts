import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PlatformPage from '@/pages/PlatformPage.vue'
import ResumePage from '@/pages/ResumePage.vue'
import { logger } from '@/lib/logger'
import { applySeo } from '@/lib/seo'
import { homeSeo, resumeSeo } from '@/data/seo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: homeSeo.title,
        description: homeSeo.description,
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
        title: resumeSeo.title,
        description: resumeSeo.description,
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

router.afterEach((to) => {
  applySeo(to)
  logger.debug('route', { path: to.fullPath, name: String(to.name ?? '') })
})

export default router
