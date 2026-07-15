<script setup lang="ts">
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

function navClick(label: string) {
  logger.debug('nav click', { label })
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo" @click="navClick('logo')">
        <span class="logo-mark" aria-hidden="true" />
        <span>{{ site.name }}</span>
      </RouterLink>
      <nav class="nav" aria-label="Основная навигация">
        <a href="#audience" @click="navClick('audience')">Аудитория</a>
        <a href="#deskreview" @click="navClick('deskreview')">DeskReview</a>
        <a href="#projects" @click="navClick('projects')">Примеры</a>
        <a href="#services" @click="navClick('services')">Услуги</a>
        <a href="#contact" @click="navClick('contact')">Контакт</a>
      </nav>
      <RouterLink to="/app" class="btn btn-primary btn-sm" @click="navClick('viewer')">
        3D вьювер
      </RouterLink>
    </div>
  </header>
</template>
