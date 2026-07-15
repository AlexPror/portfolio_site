<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

const menuOpen = ref(false)

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
        <a href="#audience" @click="navClick('audience')">Аудитория</a>
        <a href="#deskreview" @click="navClick('deskreview')">DeskReview</a>
        <a href="#projects" @click="navClick('projects')">Примеры</a>
        <a href="#services" @click="navClick('services')">Услуги</a>
        <a href="#contact" @click="navClick('contact')">Контакт</a>
      </nav>

      <a
        class="btn btn-primary btn-sm header-cta"
        :href="site.deskReviewUrl"
        target="_blank"
        rel="noopener"
        @click="navClick('viewer')"
      >
        <span class="cta-full">3D вьювер</span>
        <span class="cta-short" aria-hidden="true">3D</span>
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
      <a href="#audience" @click="navClick('audience')">Аудитория</a>
      <a href="#deskreview" @click="navClick('deskreview')">DeskReview</a>
      <a href="#projects" @click="navClick('projects')">Примеры</a>
      <a href="#services" @click="navClick('services')">Услуги</a>
      <a href="#contact" @click="navClick('contact')">Контакт</a>
      <a
        class="btn btn-primary nav-mobile-cta"
        :href="site.deskReviewUrl"
        target="_blank"
        rel="noopener"
        @click="navClick('viewer')"
      >
        Открыть 3D вьювер
      </a>
    </nav>
  </header>
</template>
