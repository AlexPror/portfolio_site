<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { site, heroFacts } from '@/data/content'
import { logger } from '@/lib/logger'
import BlueprintBackground from '@/components/BlueprintBackground.vue'

const faces = [
  { key: 'front', label: 'Revit', to: '/revit', className: 'face-front' },
  { key: 'back', label: 'Revit', to: '/revit', className: 'face-back' },
  { key: 'right', label: 'SolidWorks', to: '/solidworks', className: 'face-right' },
  { key: 'left', label: 'КОМПАС 3D', to: '/kompas', className: 'face-left' },
  { key: 'top', label: 'SolidWorks', to: '/solidworks', className: 'face-top' },
  { key: 'bottom', label: 'КОМПАС 3D', to: '/kompas', className: 'face-bottom' },
] as const

const reducedMotion = ref(false)
const cubeOpen = ref(false)
const dragging = ref(false)
const rotX = ref(-22)
const rotY = ref(-32)
const stageRef = ref<HTMLElement | null>(null)

let hovering = false
let raf = 0
let lastX = 0
let lastY = 0

function tick() {
  if (!reducedMotion.value && !cubeOpen.value && !dragging.value) {
    rotY.value += 0.35
  }
  raf = requestAnimationFrame(tick)
}

function syncOpen() {
  cubeOpen.value = hovering || dragging.value
}

function onCubeEnter(e: PointerEvent) {
  if (e.pointerType === 'touch') return
  hovering = true
  syncOpen()
}

function onCubeLeave() {
  hovering = false
  if (!dragging.value) syncOpen()
}

function onPointerDown(e: PointerEvent) {
  if (e.button !== 1) return
  e.preventDefault()
  dragging.value = true
  syncOpen()
  lastX = e.clientX
  lastY = e.clientY
  stageRef.value?.setPointerCapture(e.pointerId)
  logger.debug('hero cube drag start')
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - lastX
  const dy = e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
  rotY.value += dx * 0.5
  rotX.value = Math.max(-55, Math.min(55, rotX.value - dy * 0.4))
}

function onPointerUp(e: PointerEvent) {
  if (!dragging.value) return
  if (e.button !== 1 && e.type !== 'pointercancel') return
  dragging.value = false
  try {
    stageRef.value?.releasePointerCapture(e.pointerId)
  } catch {
    /* already released */
  }
  syncOpen()
}

function onMiddleMouseDown(e: MouseEvent) {
  if (e.button === 1) e.preventDefault()
}

function onAuxClick(e: MouseEvent) {
  e.preventDefault()
}

function onFaceClick(e: MouseEvent, label: string, to: string) {
  if (e.button !== 0) {
    e.preventDefault()
    return
  }
  if (dragging.value) {
    e.preventDefault()
    return
  }
  logger.debug('hero cube face', { label, to })
}

function ctaContact() {
  logger.debug('hero cta contact')
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
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
        <p class="hero-trust">
          {{ site.author }} · {{ site.experience }} · {{ site.location }}
        </p>
        <div class="hero-actions">
          <a href="#platforms" class="btn btn-primary" @click="ctaContact">Выбрать платформу</a>
          <a href="#contact" class="btn btn-ghost" @click="ctaContact">Оставить заявку</a>
        </div>
      </div>
      <div class="hero-visual">
        <div
          ref="stageRef"
          class="cube-stage"
          :class="{ open: cubeOpen, dragging }"
          @pointerenter="onCubeEnter"
          @pointerleave="onCubeLeave"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @mousedown="onMiddleMouseDown"
          @auxclick="onAuxClick"
        >
          <div
            class="cube"
            role="navigation"
            aria-label="Платформы CAD. Зажмите колесико мыши и двигайте, чтобы вращать."
            :style="{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }"
          >
            <RouterLink
              v-for="f in faces"
              :key="f.key"
              :to="f.to"
              class="face"
              :class="[f.className, { 'face-label-sm': f.label.length > 8 }]"
              :title="`${f.label} — кейсы`"
              @click="onFaceClick($event, f.label, f.to)"
            >
              <span class="face-label">{{ f.label }}</span>
            </RouterLink>
          </div>
          <p class="cube-hint">Наведите · СКМ — вращение · клик — платформа</p>
        </div>
      </div>
    </div>
    <div class="container kpi-row">
      <div v-for="(fact, i) in heroFacts" :key="`${i}-${fact.value}-${fact.label}`" class="kpi-card">
        <div v-if="fact.value" class="kpi-value">{{ fact.value }}</div>
        <div v-if="fact.label" class="kpi-label">{{ fact.label }}</div>
        <p v-if="fact.note" class="kpi-note">{{ fact.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cube-stage {
  --cube: 120px;
  --half: 60px;
  --gap: 0px;
  position: relative;
  width: min(240px, 52vw);
  height: min(240px, 52vw);
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 900px;
  perspective-origin: 50% 42%;
  transform-style: preserve-3d;
  touch-action: none;
}

.cube-stage.open {
  --gap: 12px;
  cursor: grab;
}

.cube-stage.dragging {
  cursor: grabbing;
  user-select: none;
}

.cube {
  position: relative;
  z-index: 1;
  width: var(--cube);
  height: var(--cube);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  /* no filter here — filter flattens preserve-3d to a single plane */
}

.cube-stage::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 10%;
  width: 72%;
  height: 20%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(74, 168, 255, 0.28) 0%, transparent 72%);
  pointer-events: none;
  z-index: 0;
}

.face {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--cube);
  height: var(--cube);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid rgba(150, 195, 255, 0.42);
  background: linear-gradient(
    145deg,
    rgba(110, 160, 210, 0.28) 0%,
    rgba(55, 75, 105, 0.4) 48%,
    rgba(36, 48, 68, 0.48) 100%
  );
  color: #c5e0ff;
  text-decoration: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 -1px 0 rgba(20, 30, 45, 0.25),
    inset 0 0 24px rgba(74, 168, 255, 0.07);
  transition:
    transform 0.32s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

/* CAD viewport frame */
a.face::before {
  content: '';
  position: absolute;
  inset: 7px;
  border: 1px solid rgba(170, 210, 255, 0.18);
  pointer-events: none;
}

a.face::after {
  content: '';
  position: absolute;
  inset: 4px;
  background:
    linear-gradient(#7ec4ff, #7ec4ff) 0 0 / 8px 1px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 0 0 / 1px 8px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 100% 0 / 8px 1px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 100% 0 / 1px 8px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 0 100% / 8px 1px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 0 100% / 1px 8px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 100% 100% / 8px 1px no-repeat,
    linear-gradient(#7ec4ff, #7ec4ff) 100% 100% / 1px 8px no-repeat;
  opacity: 0.55;
  pointer-events: none;
}

.cube-stage.dragging .face {
  transition: transform 0.32s ease;
}

a.face:hover,
a.face:focus-visible {
  border-color: rgba(180, 220, 255, 0.85);
  background: linear-gradient(
    145deg,
    rgba(130, 180, 230, 0.4) 0%,
    rgba(70, 100, 140, 0.52) 50%,
    rgba(45, 65, 95, 0.58) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 0 28px rgba(74, 168, 255, 0.16),
    0 0 16px rgba(74, 168, 255, 0.22);
  color: #e8f4ff;
  outline: none;
}

.face-label {
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.25;
  padding: 0.35rem;
  pointer-events: none;
  user-select: none;
  text-shadow:
    0 0 10px rgba(12, 24, 40, 0.9),
    0 1px 2px rgba(0, 0, 0, 0.55);
}

.face-label-sm .face-label {
  font-size: 0.52rem;
  letter-spacing: 0.05em;
}

.face-front {
  transform: rotateY(0deg) translateZ(calc(var(--half) + var(--gap)));
}

.face-back {
  transform: rotateY(180deg) translateZ(calc(var(--half) + var(--gap)));
}

.face-right {
  transform: rotateY(90deg) translateZ(calc(var(--half) + var(--gap)));
}

.face-left {
  transform: rotateY(-90deg) translateZ(calc(var(--half) + var(--gap)));
}

.face-top {
  transform: rotateX(90deg) translateZ(calc(var(--half) + var(--gap)));
}

.face-bottom {
  transform: rotateX(-90deg) translateZ(calc(var(--half) + var(--gap)));
}

.cube-hint {
  position: absolute;
  bottom: 0.35rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  width: max-content;
  max-width: 100%;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  opacity: 0.75;
  text-align: center;
  pointer-events: none;
}

@media (max-width: 519px) {
  .cube-hint {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cube-stage.open {
    --gap: 8px;
  }
}
</style>
