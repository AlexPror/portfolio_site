<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { site, kpis } from '@/data/content'
import { logger } from '@/lib/logger'
import BlueprintBackground from '@/components/BlueprintBackground.vue'

/** Unit cube corners: x,y,z in [-1, 1] */
const VERTS: [number, number, number][] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
]

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
]

const projected = ref<{ x: number; y: number }[]>(
  VERTS.map(() => ({ x: 0, y: 0 })),
)

const segments = computed(() =>
  EDGES.map(([a, b]) => ({
    x1: projected.value[a].x,
    y1: projected.value[a].y,
    x2: projected.value[b].x,
    y2: projected.value[b].y,
  })),
)

const reducedMotion = ref(false)
let heroEl: HTMLElement | null = null
let raf = 0
let tx = 0
let ty = 0
let cx = 0
let cy = 0
let spin = 0

function project() {
  const yaw = ((-32 + cx + spin) * Math.PI) / 180
  const pitch = ((22 + cy) * Math.PI) / 180
  const cosY = Math.cos(yaw)
  const sinY = Math.sin(yaw)
  const cosX = Math.cos(pitch)
  const sinX = Math.sin(pitch)
  const scale = 58
  const cx0 = 100
  const cy0 = 92

  projected.value = VERTS.map(([x, y, z]) => {
    // yaw (Y), then pitch (X)
    const x1 = x * cosY + z * sinY
    const z1 = -x * sinY + z * cosY
    const y1 = y * cosX - z1 * sinX
    const z2 = y * sinX + z1 * cosX
    const persp = 3.2 / (3.2 + z2)
    return {
      x: cx0 + x1 * scale * persp,
      y: cy0 + y1 * scale * persp,
    }
  })
}

function tick() {
  cx += (tx - cx) * 0.08
  cy += (ty - cy) * 0.08
  if (!reducedMotion.value) spin += 0.35
  project()
  raf = requestAnimationFrame(tick)
}

function onPointerMove(e: PointerEvent) {
  if (reducedMotion.value || !heroEl) return
  if (e.pointerType === 'touch') return
  const rect = heroEl.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  tx = nx * 18
  ty = ny * -14
}

function onPointerLeave() {
  tx = 0
  ty = 0
}

function ctaDemo() {
  logger.info('hero cta demo')
}
function ctaContact() {
  logger.info('hero cta contact')
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  heroEl = document.querySelector('.hero')
  project()
  raf = requestAnimationFrame(tick)
  if (heroEl) {
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
          <a href="#contact" class="btn btn-ghost" @click="ctaContact">Оставить заявку</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="cube-stage">
          <svg class="wire-cube-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cube-glow" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stop-color="rgba(74,168,255,0.14)" />
                <stop offset="100%" stop-color="rgba(74,168,255,0)" />
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="168" rx="62" ry="14" fill="url(#cube-glow)" />
            <g class="cube-edges" fill="none" stroke="currentColor" stroke-linecap="round">
              <line
                v-for="(s, i) in segments"
                :key="i"
                :x1="s.x1"
                :y1="s.y1"
                :x2="s.x2"
                :y2="s.y2"
                stroke-width="1.6"
              />
            </g>
            <circle
              v-for="(p, i) in projected"
              :key="'v' + i"
              :cx="p.x"
              :cy="p.y"
              r="1.8"
              class="cube-vertex"
            />
          </svg>
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
