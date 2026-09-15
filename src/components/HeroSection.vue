<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { site, heroFacts } from '@/data/content'
import { logger } from '@/lib/logger'
import BlueprintBackground from '@/components/BlueprintBackground.vue'

/**
 * Real CSS 3D cube (Desandro / Bauhaus navigator pattern):
 * each face is a DOM node; labels are static children of faces.
 * Refs: https://3dtransforms.desandro.com/cube
 *       https://codefronts.com/design-styles/css-3d/bauhaus-cube-navigator/
 */

const router = useRouter()

type Face = {
  id: string
  label: string
  to: string
  faceClass: string
}

const FACES: Face[] = [
  // Opposite pairs share a platform; default corner (front+right+top) shows all three
  { id: 'front', label: 'Revit', to: '/revit', faceClass: 'face-front' },
  { id: 'back', label: 'Revit', to: '/revit', faceClass: 'face-back' },
  { id: 'right', label: 'SolidWorks', to: '/solidworks', faceClass: 'face-right' },
  { id: 'left', label: 'SolidWorks', to: '/solidworks', faceClass: 'face-left' },
  { id: 'top', label: 'КОМПАС 3D', to: '/kompas', faceClass: 'face-top' },
  { id: 'bottom', label: 'КОМПАС 3D', to: '/kompas', faceClass: 'face-bottom' },
]

const PLATFORMS = [
  { label: 'Revit', to: '/revit' },
  { label: 'SolidWorks', to: '/solidworks' },
  { label: 'КОМПАС 3D', to: '/kompas' },
] as const

const ZOOM_MIN = 1
const ZOOM_MAX = 1.85
const HALF = 60 // px — half of face size (120px)
/** Corner toward camera: atan(1/√2) ≈ 35.264°, yaw 45° */
const VERTEX_PITCH = -35.264
const VERTEX_YAW = 45

const reducedMotion = ref(false)
const cubeOpen = ref(false)
const dragging = ref(false)
const stageRef = ref<HTMLElement | null>(null)
const yawRef = ref(VERTEX_YAW)
const pitchRef = ref(VERTEX_PITCH)
const rollRef = ref(0)
const explodeRef = ref(0)
const zoomRef = ref(1)

let hovering = false
let raf = 0
let lastX = 0
let lastY = 0
let lastTs = 0
let yaw = VERTEX_YAW
let pitch = VERTEX_PITCH
let roll = 0
let explode = 0
let explodeTarget = 0
let zoom = 1
let yawVel = 3.2
let yawVelTarget = 3.2
let nextSteerAt = 0

function pickRandomSpin() {
  const s = () => (Math.random() < 0.5 ? -1 : 1)
  // Auto: gentle yaw only — full tumble is MMB-only
  yawVelTarget = s() * (2.2 + Math.random() * 2.2)
  nextSteerAt = performance.now() + 20000 + Math.random() * 16000
}

function syncOpen() {
  cubeOpen.value = hovering || dragging.value
  explodeTarget = cubeOpen.value ? 14 : 0
}

const cubeStyle = computed(() => ({
  transform: `scale(${zoomRef.value}) rotateX(${pitchRef.value}deg) rotateY(${yawRef.value}deg) rotateZ(${rollRef.value}deg)`,
  '--explode': `${explodeRef.value}px`,
  '--half': `${HALF}px`,
}))

function tick(ts: number) {
  if (!lastTs) lastTs = ts
  const dt = Math.min(0.05, (ts - lastTs) / 1000)
  lastTs = ts

  explode += (explodeTarget - explode) * Math.min(1, 14 * dt)
  zoomRef.value = zoom

  const reading = zoom > 1.05
  if (!reducedMotion.value && !cubeOpen.value && !dragging.value && !reading) {
    if (ts >= nextSteerAt) pickRandomSpin()
    const blend = 1 - Math.exp(-1.2 * dt)
    yawVel += (yawVelTarget - yawVel) * blend
    yaw += yawVel * dt
    // Keep vertex-toward-camera tilt; roll settles after MMB
    pitch += (VERTEX_PITCH - pitch) * Math.min(1, 1.6 * dt)
    roll += (0 - roll) * Math.min(1, 1.6 * dt)
  }

  yawRef.value = yaw
  pitchRef.value = pitch
  rollRef.value = roll
  explodeRef.value = explode
  raf = requestAnimationFrame(tick)
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

function onWheel(e: WheelEvent) {
  e.preventDefault()
  zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom - e.deltaY * 0.0018))
  zoomRef.value = zoom
}

function onPointerDown(e: PointerEvent) {
  if (e.button !== 1) return
  e.preventDefault()
  dragging.value = true
  syncOpen()
  lastX = e.clientX
  lastY = e.clientY
  stageRef.value?.setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - lastX
  const dy = e.clientY - lastY
  lastX = e.clientX
  lastY = e.clientY
  // Free orbit — no angle clamps
  yaw += dx * 0.5
  pitch -= dy * 0.4
  roll += dx * 0.08 + dy * 0.06
}

function onPointerUp(e: PointerEvent) {
  if (!dragging.value) return
  if (e.button !== 1 && e.type !== 'pointercancel') return
  dragging.value = false
  try {
    stageRef.value?.releasePointerCapture(e.pointerId)
  } catch {
    /* ok */
  }
  syncOpen()
}

function onMiddleMouseDown(e: MouseEvent) {
  if (e.button === 1) e.preventDefault()
}

function onAuxClick(e: MouseEvent) {
  e.preventDefault()
}

function onFaceActivate(label: string, to: string) {
  if (dragging.value) return
  logger.debug('hero cube face', { label, to })
  router.push(to)
}

function ctaContact() {
  logger.debug('hero cta contact')
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  pickRandomSpin()
  lastTs = 0
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
        <p class="eyebrow">CAD · BIM · производство</p>
        <h1>{{ site.tagline }}</h1>
        <p class="lead">{{ site.subtitle }}</p>
        <p class="hero-trust">
          {{ site.author }} · {{ site.location }}
        </p>
        <div class="hero-actions">
          <a href="#platforms" class="btn btn-primary" @click="ctaContact">Выбрать программу</a>
          <a href="#contact" class="btn btn-ghost" @click="ctaContact">Обсудить задачу →</a>
        </div>
      </div>

      <div class="hero-visual">
        <div
          ref="stageRef"
          class="cube-stage"
          :class="{ open: cubeOpen, dragging, zoomed: zoomRef > 1.05 }"
          role="navigation"
          aria-label="Платформы CAD. Наведите — разлёт граней, СКМ — вращение, клик — страница."
          @pointerenter="onCubeEnter"
          @pointerleave="onCubeLeave"
          @wheel.prevent="onWheel"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @mousedown="onMiddleMouseDown"
          @auxclick="onAuxClick"
        >
          <div class="cube-scene">
            <div class="cube" :style="cubeStyle">
              <button
                v-for="f in FACES"
                :key="f.id"
                type="button"
                class="face"
                :class="f.faceClass"
                :aria-label="`${f.label} — кейсы`"
                @click="onFaceActivate(f.label, f.to)"
              >
                <span class="face-label">{{ f.label }}</span>
              </button>
            </div>
          </div>
          <div class="cube-shadow" aria-hidden="true" />
        </div>

        <div class="cube-links" aria-label="Платформы">
          <router-link v-for="p in PLATFORMS" :key="p.to" :to="p.to" class="cube-chip">
            {{ p.label }}
          </router-link>
        </div>
          <p class="cube-hint">Наведите · клик по грани · СКМ вращает</p>
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
.hero-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.cube-stage {
  position: relative;
  width: min(220px, 52vw);
  height: min(200px, 48vw);
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
  overflow: visible;
}

.cube-stage.open {
  cursor: grab;
}

.cube-stage.dragging {
  cursor: grabbing;
  user-select: none;
}

.cube-scene {
  width: 120px;
  height: 120px;
  perspective: 720px;
  perspective-origin: 50% 45%;
}

.cube {
  width: 120px;
  height: 120px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  will-change: transform;
}

.face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #ffffff;
  color: #1d1d1f;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  cursor: pointer;
  outline: none;
  font: inherit;
  transition:
    background 0.25s ease,
    border-color 0.25s ease;
}

.face:hover,
.face:focus-visible {
  background: #f5f5f7;
  border-color: rgba(0, 113, 227, 0.45);
}

.face-label {
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: none;
  text-align: center;
  line-height: 1.15;
  pointer-events: none;
}

.face-front {
  transform: rotateY(0deg) translateZ(calc(var(--half) + var(--explode, 0px)));
}
.face-back {
  transform: rotateY(180deg) translateZ(calc(var(--half) + var(--explode, 0px)));
}
.face-right {
  transform: rotateY(90deg) translateZ(calc(var(--half) + var(--explode, 0px)));
}
.face-left {
  transform: rotateY(-90deg) translateZ(calc(var(--half) + var(--explode, 0px)));
}
.face-top {
  transform: rotateX(90deg) translateZ(calc(var(--half) + var(--explode, 0px)));
}
.face-bottom {
  transform: rotateX(-90deg) translateZ(calc(var(--half) + var(--explode, 0px)));
}

.cube-shadow {
  position: absolute;
  bottom: 8%;
  left: 50%;
  width: 70%;
  height: 14px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1), transparent 70%);
  pointer-events: none;
}

.cube-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
}

.cube-chip {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--text-muted);
  text-decoration: none;
  border: 1px solid var(--border);
  padding: 0.28rem 0.55rem;
  border-radius: 980px;
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}

.cube-chip:hover {
  color: var(--text);
  border-color: var(--accent);
  background: rgba(0, 113, 227, 0.06);
}

.cube-hint {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.72rem;
  letter-spacing: -0.01em;
  color: var(--text-muted);
  opacity: 0.8;
  text-align: center;
}

@media (max-width: 519px) {
  .cube-hint {
    display: none;
  }
}
</style>
