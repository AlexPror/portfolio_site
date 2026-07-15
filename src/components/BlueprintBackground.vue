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
  gridX.value += (targetX * 0.55 - gridX.value) * 0.07
  gridY.value += (targetY * 0.4 - gridY.value) * 0.07
  draftX.value += (targetX * 1.35 - draftX.value) * 0.1
  draftY.value += (targetY * 1.1 - draftY.value) * 0.1
  scrollY.value += (scrollTarget - scrollY.value) * 0.08
  raf = requestAnimationFrame(tick)
}

function onPointerMove(e: PointerEvent) {
  if (reducedMotion.value || !host) return
  if (e.pointerType === 'touch') return
  const rect = host.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  targetX = nx * 18
  targetY = ny * 12
}

function onPointerLeave() {
  targetX = 0
  targetY = 0
}

function onScroll() {
  if (reducedMotion.value || !host) return
  const rect = host.getBoundingClientRect()
  const viewH = window.innerHeight || 1
  // mild drift while hero is in view
  scrollTarget = Math.max(-24, Math.min(24, (-rect.top / viewH) * 28))
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
        transform: `translate3d(${gridX}px, ${gridY + scrollY * 0.35}px, 0)`,
      }"
    >
      <svg class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" stroke-width="1" />
          </pattern>
          <pattern id="bp-major" width="240" height="240" patternUnits="userSpaceOnUse">
            <path d="M 240 0 L 0 0 0 240" fill="none" stroke="currentColor" stroke-width="1.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid)" class="grid-fine" />
        <rect width="100%" height="100%" fill="url(#bp-major)" class="grid-major" />
      </svg>
    </div>

    <div
      class="layer layer-draft"
      :style="{
        transform: `translate3d(${draftX}px, ${draftY + scrollY * 0.75}px, 0)`,
      }"
    >
      <svg class="blueprint-svg draft-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g class="draft-ink" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <!-- left detail: circular feature + dims -->
          <circle cx="160" cy="150" r="52" stroke-width="1.2" opacity="0.55" />
          <circle cx="160" cy="150" r="28" stroke-width="1" opacity="0.4" />
          <line x1="160" y1="98" x2="160" y2="202" stroke-width="0.9" opacity="0.35" />
          <line x1="108" y1="150" x2="212" y2="150" stroke-width="0.9" opacity="0.35" />
          <!-- diameter callout -->
          <line x1="220" y1="122" x2="290" y2="88" stroke-width="1" opacity="0.5" />
          <line x1="290" y1="88" x2="340" y2="88" stroke-width="1" opacity="0.5" />
          <text x="346" y="92" class="dim-text">Ø120</text>

          <!-- angle / chamfer note -->
          <path d="M 95 230 L 95 280 L 150 280" stroke-width="1.1" opacity="0.45" />
          <path d="M 95 255 A 25 25 0 0 1 120 280" stroke-width="1" opacity="0.4" />
          <text x="128" y="268" class="dim-text">45°</text>

          <!-- vertical height dim -->
          <line x1="70" y1="320" x2="70" y2="520" stroke-width="1" opacity="0.45" />
          <line x1="58" y1="320" x2="82" y2="320" stroke-width="1" opacity="0.45" />
          <line x1="58" y1="520" x2="82" y2="520" stroke-width="1" opacity="0.45" />
          <text x="42" y="425" class="dim-text" transform="rotate(-90 42 425)">200</text>

          <!-- plate outline fragment -->
          <path
            d="M 110 340 L 210 340 L 245 390 L 245 470 L 110 470 Z"
            stroke-width="1.15"
            opacity="0.4"
          />
          <circle cx="145" cy="400" r="10" stroke-width="1" opacity="0.4" />
          <text x="168" y="405" class="dim-text">Ø20</text>
          <line x1="110" y1="490" x2="245" y2="490" stroke-width="1" opacity="0.45" />
          <line x1="110" y1="482" x2="110" y2="498" stroke-width="1" opacity="0.4" />
          <line x1="245" y1="482" x2="245" y2="498" stroke-width="1" opacity="0.4" />
          <text x="162" y="512" class="dim-text">135</text>

          <!-- radius callout -->
          <path d="M 250 470 Q 290 510 250 550" stroke-width="1.1" opacity="0.4" />
          <line x1="275" y1="510" x2="330" y2="540" stroke-width="1" opacity="0.45" />
          <text x="336" y="544" class="dim-text">R40</text>

          <!-- top-right section lines -->
          <line x1="780" y1="90" x2="1080" y2="90" stroke-width="1" opacity="0.35" />
          <line x1="780" y1="90" x2="780" y2="210" stroke-width="1" opacity="0.3" />
          <line x1="1080" y1="90" x2="1080" y2="210" stroke-width="1" opacity="0.3" />
          <line x1="780" y1="210" x2="1080" y2="210" stroke-width="1" opacity="0.35" />
          <line x1="830" y1="130" x2="1030" y2="130" stroke-width="0.9" opacity="0.28" stroke-dasharray="6 5" />
          <line x1="830" y1="170" x2="1030" y2="170" stroke-width="0.9" opacity="0.28" stroke-dasharray="6 5" />
          <text x="900" y="80" class="dim-text">300</text>

          <!-- right iso hint box -->
          <path
            d="M 980 380 L 1120 340 L 1120 460 L 980 500 Z"
            stroke-width="1.1"
            opacity="0.32"
          />
          <path d="M 980 380 L 860 420 L 860 540 L 980 500" stroke-width="1.1" opacity="0.28" />
          <text x="1005" y="425" class="dim-text">ISO</text>
        </g>

        <g class="nodes">
          <circle cx="160" cy="150" r="2.4" />
          <circle cx="245" cy="390" r="2" />
          <circle cx="780" cy="90" r="2" />
          <circle cx="1080" cy="210" r="2.2" />
          <circle cx="980" cy="380" r="2" />
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
  inset: -40px;
  will-change: transform;
}

.blueprint-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.draft-svg {
  opacity: 0.95;
}

.grid-fine {
  opacity: 0.2;
}

.grid-major {
  opacity: 0.3;
}

.draft-ink {
  opacity: 0.85;
}

.dim-text {
  fill: var(--accent);
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 15px;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.nodes circle {
  fill: var(--accent);
  opacity: 0.5;
}

.blueprint-fade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 45% at 78% 32%, rgba(74, 168, 255, 0.1), transparent 58%),
    radial-gradient(ellipse 40% 50% at 12% 55%, rgba(74, 168, 255, 0.06), transparent 55%),
    linear-gradient(to bottom, transparent 35%, var(--bg) 97%);
}

@media (max-width: 699px) {
  .layer-draft {
    opacity: 0.72;
  }

  .dim-text {
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .layer {
    transform: none !important;
  }
}
</style>
