<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'

const root = shallowRef<HTMLElement | null>(null)
const gridX = ref(0)
const gridY = ref(0)
const draftX = ref(0)
const draftY = ref(0)
const scrollY = ref(0)
const reducedMotion = ref(false)

let host: HTMLElement | null = null
let raf = 0
let targetX = 0
let targetY = 0
let scrollTarget = 0

function tick() {
  gridX.value += (targetX * 0.4 - gridX.value) * 0.06
  gridY.value += (targetY * 0.3 - gridY.value) * 0.06
  draftX.value += (targetX * 0.95 - draftX.value) * 0.08
  draftY.value += (targetY * 0.75 - draftY.value) * 0.08
  scrollY.value += (scrollTarget - scrollY.value) * 0.07
  raf = requestAnimationFrame(tick)
}

function onPointerMove(e: PointerEvent) {
  if (reducedMotion.value || !host) return
  if (e.pointerType === 'touch') return
  const rect = host.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  targetX = nx * 14
  targetY = ny * 9
}

function onPointerLeave() {
  targetX = 0
  targetY = 0
}

function onScroll() {
  if (reducedMotion.value || !host) return
  const rect = host.getBoundingClientRect()
  const viewH = window.innerHeight || 1
  scrollTarget = Math.max(-16, Math.min(16, (-rect.top / viewH) * 20))
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  host = root.value?.closest('.hero') as HTMLElement | null
  if (!reducedMotion.value && host) {
    raf = requestAnimationFrame(tick)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  host?.removeEventListener('pointermove', onPointerMove)
  host?.removeEventListener('pointerleave', onPointerLeave)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div ref="root" class="blueprint" aria-hidden="true">
    <div
      class="layer layer-grid"
      :style="{
        transform: `translate3d(${gridX}px, ${gridY + scrollY * 0.3}px, 0)`,
      }"
    >
      <svg class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.75" />
          </pattern>
          <pattern id="bp-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid)" class="grid-fine" />
        <rect width="100%" height="100%" fill="url(#bp-major)" class="grid-major" />
      </svg>
    </div>

    <div
      class="layer layer-draft"
      :style="{
        transform: `translate3d(${draftX}px, ${draftY + scrollY * 0.55}px, 0)`,
      }"
    >
      <!--
        One coherent sheet fragment: flange plate — front + side orthographic.
        Lineweights and dims follow ordinary 2D drafting, not scattered ornaments.
      -->
      <svg
        class="blueprint-svg draft-svg"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker
            id="dim-arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.2 L 9 5 L 0 8.8 Z" fill="currentColor" />
          </marker>
        </defs>
        <g class="geom" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter">
          <!-- FRONT: rectangular flange -->
          <rect x="140" y="120" width="280" height="220" stroke-width="1.35" />
          <!-- outer bolt circle -->
          <circle cx="280" cy="230" r="78" stroke-width="1.1" />
          <!-- hub -->
          <circle cx="280" cy="230" r="42" stroke-width="1.2" />
          <!-- bore -->
          <circle cx="280" cy="230" r="22" stroke-width="1.15" />
          <!-- centerlines -->
          <line x1="280" y1="118" x2="280" y2="342" stroke-width="0.7" stroke-dasharray="8 4 2 4" class="center" />
          <line x1="138" y1="230" x2="422" y2="230" stroke-width="0.7" stroke-dasharray="8 4 2 4" class="center" />
          <!-- 4 bolt holes on PCD -->
          <circle cx="280" cy="152" r="7" stroke-width="1" />
          <circle cx="280" cy="308" r="7" stroke-width="1" />
          <circle cx="202" cy="230" r="7" stroke-width="1" />
          <circle cx="358" cy="230" r="7" stroke-width="1" />

          <!-- SIDE: thickness + hub protrusion -->
          <rect x="500" y="145" width="36" height="170" stroke-width="1.35" />
          <rect x="536" y="188" width="48" height="84" stroke-width="1.2" />
          <!-- bore as hidden in side -->
          <line x1="500" y1="208" x2="584" y2="208" stroke-width="0.75" stroke-dasharray="5 3" class="hidden" />
          <line x1="500" y1="252" x2="584" y2="252" stroke-width="0.75" stroke-dasharray="5 3" class="hidden" />
          <line x1="520" y1="145" x2="520" y2="315" stroke-width="0.65" stroke-dasharray="8 4 2 4" class="center" />

          <!-- section hatching on side flange face hint -->
          <g class="hatch" stroke-width="0.55">
            <line x1="506" y1="155" x2="530" y2="175" />
            <line x1="506" y1="170" x2="530" y2="190" />
            <line x1="506" y1="185" x2="530" y2="205" />
            <line x1="506" y1="255" x2="530" y2="275" />
            <line x1="506" y1="270" x2="530" y2="290" />
            <line x1="506" y1="285" x2="530" y2="305" />
          </g>
        </g>

        <g class="dims" fill="none" stroke="currentColor" stroke-width="0.85" stroke-linecap="butt">
          <!-- overall width 280 -->
          <line x1="140" y1="96" x2="420" y2="96" marker-start="url(#dim-arr)" marker-end="url(#dim-arr)" />
          <line x1="140" y1="104" x2="140" y2="120" />
          <line x1="420" y1="104" x2="420" y2="120" />
          <text x="268" y="88" class="dim-text">280</text>

          <!-- height 220 -->
          <line x1="100" y1="120" x2="100" y2="340" marker-start="url(#dim-arr)" marker-end="url(#dim-arr)" />
          <line x1="100" y1="120" x2="132" y2="120" />
          <line x1="100" y1="340" x2="132" y2="340" />
          <text x="78" y="236" class="dim-text" transform="rotate(-90 78 236)">220</text>

          <!-- PCD Ø156 -->
          <line x1="280" y1="230" x2="350" y2="165" />
          <line x1="350" y1="165" x2="398" y2="165" />
          <text x="404" y="169" class="dim-text">Ø156</text>

          <!-- bore -->
          <line x1="280" y1="230" x2="248" y2="268" />
          <line x1="236" y1="278" x2="248" y2="268" />
          <text x="198" y="292" class="dim-text">Ø44</text>

          <!-- bolt hole -->
          <line x1="358" y1="230" x2="395" y2="248" />
          <text x="400" y="252" class="dim-text">Ø14</text>

          <!-- flange thickness -->
          <line x1="500" y1="370" x2="536" y2="370" marker-start="url(#dim-arr)" marker-end="url(#dim-arr)" />
          <line x1="500" y1="324" x2="500" y2="370" />
          <line x1="536" y1="324" x2="536" y2="370" />
          <text x="506" y="388" class="dim-text">18</text>

          <!-- hub length -->
          <line x1="536" y1="392" x2="584" y2="392" marker-start="url(#dim-arr)" marker-end="url(#dim-arr)" />
          <line x1="536" y1="328" x2="536" y2="392" />
          <line x1="584" y1="280" x2="584" y2="392" />
          <text x="544" y="410" class="dim-text">45</text>
        </g>

        <!-- quiet sheet corner (no fake title block text clutter) -->
        <g class="sheet-frame" fill="none" stroke="currentColor" stroke-width="0.9">
          <rect x="920" y="480" width="220" height="160" opacity="0.35" />
          <line x1="920" y1="520" x2="1140" y2="520" opacity="0.3" />
          <line x1="1000" y1="480" x2="1000" y2="640" opacity="0.25" />
          <line x1="1070" y1="480" x2="1070" y2="640" opacity="0.25" />
        </g>
      </svg>
    </div>

    <div class="blueprint-fade" />
  </div>
</template>

<style scoped>
.blueprint {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  color: var(--accent);
}

.layer {
  position: absolute;
  inset: -36px;
  will-change: transform;
}

.blueprint-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.grid-fine {
  opacity: 0.14;
}

.grid-major {
  opacity: 0.22;
}

.draft-svg {
  opacity: 0.55;
}

.geom {
  opacity: 0.9;
}

.center,
.hidden {
  opacity: 0.75;
}

.hatch {
  opacity: 0.45;
}

.dims {
  opacity: 0.8;
}

.dim-text {
  fill: currentColor;
  stroke: none;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 13px;
  letter-spacing: 0.02em;
  opacity: 0.85;
}

.sheet-frame {
  opacity: 0.9;
}

.blueprint-fade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 48% 42% at 72% 30%, rgba(74, 168, 255, 0.07), transparent 60%),
    linear-gradient(to right, rgba(22, 27, 36, 0.15) 0%, transparent 28%, transparent 62%, rgba(22, 27, 36, 0.35) 100%),
    linear-gradient(to bottom, transparent 42%, var(--bg) 96%);
}

@media (max-width: 699px) {
  .draft-svg {
    opacity: 0.4;
  }
}

@media (prefers-reduced-motion: reduce) {
  .layer {
    transform: none !important;
  }
}
</style>
