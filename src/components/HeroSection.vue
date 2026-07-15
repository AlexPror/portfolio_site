<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { site, kpis } from '@/data/content'
import { logger } from '@/lib/logger'
import BlueprintBackground from '@/components/BlueprintBackground.vue'

const cubeStyle = ref<Record<string, string>>({})
const reducedMotion = ref(false)

let heroEl: HTMLElement | null = null
let raf = 0
let tx = 0
let ty = 0
let cx = 0
let cy = 0
let spin = 0

function ctaDemo() {
  logger.info('hero cta demo')
}
function ctaContact() {
  logger.info('hero cta contact')
}

function tick() {
  cx += (tx - cx) * 0.08
  cy += (ty - cy) * 0.08
  spin += 0.25
  cubeStyle.value = {
    transform: `rotateX(${18 + cy}deg) rotateY(${-22 + cx + spin * 0.15}deg) rotateZ(${spin * 0.08}deg)`,
  }
  raf = requestAnimationFrame(tick)
}

function onPointerMove(e: PointerEvent) {
  if (reducedMotion.value || !heroEl) return
  if (e.pointerType === 'touch') return
  const rect = heroEl.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  tx = nx * 28
  ty = ny * -18
}

function onPointerLeave() {
  tx = 0
  ty = 0
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  heroEl = document.querySelector('.hero')
  if (!reducedMotion.value && heroEl) {
    raf = requestAnimationFrame(tick)
    heroEl.addEventListener('pointermove', onPointerMove)
    heroEl.addEventListener('pointerleave', onPointerLeave)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  heroEl?.removeEventListener('pointermove', onPointerMove)
  heroEl?.removeEventListener('pointerleave', onPointerLeave)
})
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
          <a
            class="btn btn-primary"
            :href="site.deskReviewUrl"
            target="_blank"
            rel="noopener"
            @click="ctaDemo"
          >
            Открыть 3D вьювер
          </a>
          <a href="#contact" class="btn btn-ghost" @click="ctaContact">Обсудить задачу</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="cube-stage">
          <div class="wire-cube" :style="cubeStyle">
            <div class="cube-face face-front" />
            <div class="cube-face face-back" />
            <div class="cube-face face-top" />
            <div class="cube-edge e1" />
            <div class="cube-edge e2" />
            <div class="cube-edge e3" />
            <div class="grid-floor" />
          </div>
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
