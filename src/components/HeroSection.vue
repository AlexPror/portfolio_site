<script setup lang="ts">
import { site, kpis } from '@/data/content'
import { logger } from '@/lib/logger'
import BlueprintBackground from '@/components/BlueprintBackground.vue'

function ctaDemo() {
  logger.info('hero cta demo')
}
function ctaContact() {
  logger.info('hero cta contact')
}
</script>

<template>
  <section class="hero section">
    <BlueprintBackground />
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">CAD · BIM · Production</p>
        <h1>{{ site.tagline }}</h1>
        <p class="lead">{{ site.subtitle }}</p>
        <div class="hero-actions">
          <RouterLink to="/app" class="btn btn-primary" @click="ctaDemo">Открыть 3D вьювер</RouterLink>
          <a href="#contact" class="btn btn-ghost" @click="ctaContact">Обсудить задачу</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="wire-cube">
          <div class="cube-face face-front" />
          <div class="cube-face face-back" />
          <div class="cube-edge e1" />
          <div class="cube-edge e2" />
          <div class="grid-floor" />
        </div>
      </div>
    </div>
    <div class="container kpi-row">
      <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
        <div class="kpi-value">{{ kpi.value }}</div>
        <div class="kpi-label">{{ kpi.label }}</div>
      </div>
    </div>
  </section>
</template>
