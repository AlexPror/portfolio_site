<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'

const root = shallowRef<HTMLElement | null>(null)
const offsetX = ref(0)
const offsetY = ref(0)
const reducedMotion = ref(false)

let host: HTMLElement | null = null
let raf = 0
let targetX = 0
let targetY = 0

function tick() {
  offsetX.value += (targetX - offsetX.value) * 0.08
  offsetY.value += (targetY - offsetY.value) * 0.08
  raf = requestAnimationFrame(tick)
}

function onPointerMove(e: PointerEvent) {
  if (reducedMotion.value || !host) return
  if (e.pointerType === 'touch') return
  const rect = host.getBoundingClientRect()
  const nx = (e.clientX - rect.left) / rect.width - 0.5
  const ny = (e.clientY - rect.top) / rect.height - 0.5
  targetX = nx * 12
  targetY = ny * 8
}

function onPointerLeave() {
  targetX = 0
  targetY = 0
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  host = root.value?.closest('.hero') as HTMLElement | null
  if (!reducedMotion.value && host) {
    raf = requestAnimationFrame(tick)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerleave', onPointerLeave)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  host?.removeEventListener('pointermove', onPointerMove)
  host?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<template>
  <div ref="root" class="blueprint" aria-hidden="true">
    <div
      class="blueprint-layer"
      :style="{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
      }"
    >
      <svg class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
            />
          </pattern>
          <pattern id="bp-major" width="240" height="240" patternUnits="userSpaceOnUse">
            <path
              d="M 240 0 L 0 0 0 240"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid)" class="grid-fine" />
        <rect width="100%" height="100%" fill="url(#bp-major)" class="grid-major" />
        <!-- accent nodes at major intersections feel -->
        <circle cx="20%" cy="28%" r="2.5" class="node" />
        <circle cx="72%" cy="22%" r="2" class="node" />
        <circle cx="58%" cy="62%" r="2.5" class="node" />
        <circle cx="30%" cy="70%" r="1.8" class="node" />
      </svg>
      <div class="blueprint-fade" />
    </div>
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

.blueprint-layer {
  position: absolute;
  inset: -32px;
  will-change: transform;
}

.blueprint-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.grid-fine {
  opacity: 0.22;
}

.grid-major {
  opacity: 0.32;
}

.node {
  fill: var(--accent);
  opacity: 0.45;
}

.blueprint-fade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 55% 50% at 75% 35%, rgba(74, 168, 255, 0.08), transparent 60%),
    linear-gradient(to bottom, transparent 40%, var(--bg) 96%);
}

@media (prefers-reduced-motion: reduce) {
  .blueprint-layer {
    transform: none !important;
  }
}
</style>
