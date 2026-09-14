<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { site, heroFacts } from '@/data/content'
import { logger } from '@/lib/logger'
import BlueprintBackground from '@/components/BlueprintBackground.vue'

const router = useRouter()

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

type FaceDef = {
  id: string
  indices: [number, number, number, number]
  label: string
  to: string
  normal: [number, number, number]
}

const FACE_DEFS: FaceDef[] = [
  { id: 'front', indices: [4, 5, 6, 7], label: 'Revit', to: '/revit', normal: [0, 0, 1] },
  { id: 'back', indices: [1, 0, 3, 2], label: 'Revit', to: '/revit', normal: [0, 0, -1] },
  { id: 'right', indices: [5, 1, 2, 6], label: 'SolidWorks', to: '/solidworks', normal: [1, 0, 0] },
  { id: 'left', indices: [0, 4, 7, 3], label: 'КОМПАС 3D', to: '/kompas', normal: [-1, 0, 0] },
  { id: 'top', indices: [7, 6, 2, 3], label: 'SolidWorks', to: '/solidworks', normal: [0, 1, 0] },
  { id: 'bottom', indices: [0, 1, 5, 4], label: 'КОМПАС 3D', to: '/kompas', normal: [0, -1, 0] },
]

const reducedMotion = ref(false)
const cubeOpen = ref(false)
const dragging = ref(false)
const stageRef = ref<SVGSVGElement | null>(null)
const yawRef = ref(-32)
const pitchRef = ref(22)
const rollRef = ref(0)
const explodeRef = ref(0)

let hovering = false
let raf = 0
let lastX = 0
let lastY = 0
let yaw = -32
let pitch = 22
let roll = 0
let explode = 0
let explodeTarget = 0
let yawVel = 0.32
let pitchVel = 0.12
let rollVel = 0.1
let nextSteerAt = 0

function pickRandomSpin() {
  const s = () => (Math.random() < 0.5 ? -1 : 1)
  yawVel = s() * (0.18 + Math.random() * 0.42)
  pitchVel = s() * (0.1 + Math.random() * 0.32)
  rollVel = s() * (0.08 + Math.random() * 0.28)
  nextSteerAt = performance.now() + 2000 + Math.random() * 4000
}

function syncOpen() {
  cubeOpen.value = hovering || dragging.value
  explodeTarget = cubeOpen.value ? 0.28 : 0
}

/** yaw(Y) → pitch(X) → roll(Z) */
function transformVec(
  x: number,
  y: number,
  z: number,
  cosY: number,
  sinY: number,
  cosX: number,
  sinX: number,
  cosZ: number,
  sinZ: number,
) {
  const x1 = x * cosY + z * sinY
  const z1 = -x * sinY + z * cosY
  const y1 = y

  const y2 = y1 * cosX - z1 * sinX
  const z2 = y1 * sinX + z1 * cosX
  const x2 = x1

  const x3 = x2 * cosZ - y2 * sinZ
  const y3 = x2 * sinZ + y2 * cosZ
  return { x: x3, y: y3, z: z2 }
}

function projectPoint(
  x: number,
  y: number,
  z: number,
  cosY: number,
  sinY: number,
  cosX: number,
  sinX: number,
  cosZ: number,
  sinZ: number,
) {
  const scale = 58
  const cx0 = 100
  const cy0 = 92
  const t = transformVec(x, y, z, cosY, sinY, cosX, sinX, cosZ, sinZ)
  const persp = 3.2 / (3.2 + t.z)
  return {
    x: cx0 + t.x * scale * persp,
    y: cy0 + t.y * scale * persp,
    z: t.z,
  }
}

const sortedFaces = computed(() => {
  const y = yawRef.value
  const p = pitchRef.value
  const r = rollRef.value
  const ex = explodeRef.value
  const cosY = Math.cos((y * Math.PI) / 180)
  const sinY = Math.sin((y * Math.PI) / 180)
  const cosX = Math.cos((p * Math.PI) / 180)
  const sinX = Math.sin((p * Math.PI) / 180)
  const cosZ = Math.cos((r * Math.PI) / 180)
  const sinZ = Math.sin((r * Math.PI) / 180)

  const models = FACE_DEFS.map((face) => {
    const pts = face.indices.map((i) => {
      const [vx, vy, vz] = VERTS[i]
      const [nx, ny, nz] = face.normal
      return projectPoint(
        vx + nx * ex,
        vy + ny * ex,
        vz + nz * ex,
        cosY,
        sinY,
        cosX,
        sinX,
        cosZ,
        sinZ,
      )
    })
    const depth = pts.reduce((s, pt) => s + pt.z, 0) / pts.length
    const n = transformVec(face.normal[0], face.normal[1], face.normal[2], cosY, sinY, cosX, sinX, cosZ, sinZ)
    const facing = n.z > 0.12
    const cx = pts.reduce((s, pt) => s + pt.x, 0) / pts.length
    const cy = pts.reduce((s, pt) => s + pt.y, 0) / pts.length
    const points = pts.map((pt) => `${pt.x.toFixed(2)},${pt.y.toFixed(2)}`).join(' ')
    return { ...face, points, depth, facing, cx, cy }
  })
  return models.sort((a, b) => a.depth - b.depth)
})

function tick() {
  explode += (explodeTarget - explode) * 0.18
  const now = performance.now()
  if (!reducedMotion.value && !cubeOpen.value && !dragging.value) {
    if (now >= nextSteerAt) pickRandomSpin()
    yaw += yawVel
    pitch += pitchVel
    roll += rollVel
    if (pitch > 42) {
      pitch = 42
      pitchVel = -Math.abs(pitchVel)
    } else if (pitch < -42) {
      pitch = -42
      pitchVel = Math.abs(pitchVel)
    }
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
  yaw += dx * 0.5
  pitch = Math.max(-40, Math.min(40, pitch - dy * 0.4))
  // slight roll from diagonal drag for 3-axis feel while steering
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
          <svg
            ref="stageRef"
            class="wire-cube-svg"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            role="navigation"
            aria-label="Платформы CAD. Наведите, СКМ — вращение, клик — страница."
          >
            <defs>
              <radialGradient id="cube-glow" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stop-color="rgba(74,168,255,0.18)" />
                <stop offset="100%" stop-color="rgba(74,168,255,0)" />
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="168" rx="62" ry="14" fill="url(#cube-glow)" />
            <g class="cube-faces">
              <g
                v-for="f in sortedFaces"
                :key="f.id"
                class="face-hit"
                :class="{ facing: f.facing }"
                role="link"
                tabindex="0"
                :aria-label="`${f.label} — кейсы`"
                @click="onFaceActivate(f.label, f.to)"
                @keydown.enter="onFaceActivate(f.label, f.to)"
              >
                <polygon :points="f.points" class="face-poly" :class="{ dim: !f.facing }" />
                <text
                  v-if="f.facing"
                  :x="f.cx"
                  :y="f.cy"
                  class="face-label"
                  :class="{ sm: f.label.length > 8 }"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  {{ f.label }}
                </text>
              </g>
            </g>
          </svg>
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
  position: relative;
  width: min(240px, 52vw);
  height: min(240px, 52vw);
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}

.cube-stage.open {
  cursor: grab;
}

.cube-stage.dragging {
  cursor: grabbing;
  user-select: none;
}

.wire-cube-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.face-hit {
  cursor: pointer;
  outline: none;
}

.face-poly {
  fill: #243044;
  stroke: rgba(120, 175, 235, 0.7);
  stroke-width: 1.35;
  transition:
    fill 0.15s ease,
    stroke 0.15s ease;
}

.face-poly.dim {
  fill: #1a2230;
  stroke: rgba(90, 130, 180, 0.4);
}

.face-hit.facing .face-poly {
  fill: #2a3a52;
  stroke: rgba(150, 200, 255, 0.85);
}

.face-hit:hover .face-poly,
.face-hit:focus-visible .face-poly {
  fill: #334a68;
  stroke: #9fd0ff;
}

.face-label {
  fill: #eaf4ff;
  font-family: var(--font-mono);
  font-size: 7.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  pointer-events: none;
  paint-order: stroke fill;
  stroke: rgba(12, 20, 32, 0.92);
  stroke-width: 1.1px;
}

.face-label.sm {
  font-size: 5.6px;
  letter-spacing: 0.04em;
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
</style>
