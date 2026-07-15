import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DeskReviewPage from '@/pages/DeskReviewPage.vue'
import { logger } from '@/lib/logger'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/app', name: 'deskreview', component: DeskReviewPage },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  logger.info('route', { path: to.fullPath, name: String(to.name ?? '') })
})

export default router
