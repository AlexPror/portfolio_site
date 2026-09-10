<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '@/data/content'
import { platforms } from '@/data/platforms'
import { logger } from '@/lib/logger'

const route = useRoute()
const menuOpen = ref(false)
const isHome = computed(() => route.name === 'home')

function navClick(label: string) {
  logger.debug('nav click', { label })
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  logger.debug('nav menu', { open: menuOpen.value })
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false
}

function onResize() {
  if (window.innerWidth >= 900) menuOpen.value = false
}

function hashHref(hash: string) {
  if (isHome.value) return hash
  return `${import.meta.env.BASE_URL}${hash.replace(/^\//, '')}`
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'menu-open': menuOpen }">
    <div class="container header-inner">
      <RouterLink to="/" class="logo" @click="navClick('logo')">
        <span class="logo-mark" aria-hidden="true" />
        <span class="logo-text">{{ site.name }}</span>
      </RouterLink>

      <nav class="nav nav-desktop" aria-label="Основная навигация">
        <RouterLink
          v-for="p in platforms"
          :key="p.id"
          :to="`/${p.slug}`"
          @click="navClick(p.slug)"
        >
          {{ p.navLabel }}
        </RouterLink>
        <a :href="hashHref('#process')" @click="navClick('process')">Как работаем</a>
        <a :href="hashHref('#contact')" @click="navClick('contact')">Контакт</a>
        <RouterLink to="/resume" @click="navClick('resume')">Резюме</RouterLink>
      </nav>

      <a :href="hashHref('#contact')" class="btn btn-primary btn-sm header-cta" @click="navClick('cta')">
        Заявка
      </a>

      <button
        type="button"
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        aria-label="Меню"
        @click="toggleMenu"
      >
        <span class="menu-bar" aria-hidden="true" />
        <span class="menu-bar" aria-hidden="true" />
        <span class="menu-bar" aria-hidden="true" />
      </button>
    </div>

    <div
      v-show="menuOpen"
      class="nav-backdrop"
      aria-hidden="true"
      @click="menuOpen = false"
    />

    <nav
      id="mobile-nav"
      class="nav-mobile"
      :class="{ open: menuOpen }"
      aria-label="Мобильная навигация"
      :aria-hidden="!menuOpen"
    >
      <RouterLink
        v-for="p in platforms"
        :key="p.id"
        :to="`/${p.slug}`"
        @click="navClick(p.slug)"
      >
        {{ p.navLabel }}
      </RouterLink>
      <a :href="hashHref('#process')" @click="navClick('process')">Как работаем</a>
      <a :href="hashHref('#deskreview')" @click="navClick('deskreview')">DeskReview</a>
      <RouterLink to="/resume" @click="navClick('resume')">Резюме</RouterLink>
      <a :href="hashHref('#contact')" class="btn btn-primary nav-mobile-cta" @click="navClick('contact')">
        Оставить заявку
      </a>
    </nav>
  </header>
</template>
