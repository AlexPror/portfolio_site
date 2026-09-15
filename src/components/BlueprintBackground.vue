<script setup lang="ts">
/** Quiet blueprint grid only — no draft drawing, no parallax distraction. */
</script>

<template>
  <div class="blueprint" aria-hidden="true">
    <div class="layer layer-grid">
      <svg class="blueprint-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.75" />
          </pattern>
          <pattern id="bp-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="none" stroke="currentColor" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid)" class="grid-fine" />
        <rect width="100%" height="100%" fill="url(#bp-grid-lg)" class="grid-major" />
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
  inset: 0;
}

.blueprint-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.grid-fine {
  opacity: 0.2;
}

.grid-major {
  opacity: 0.28;
}

.blueprint-fade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 48% 40% at 72% 30%, rgba(0, 113, 227, 0.05), transparent 62%),
    linear-gradient(to right, rgba(245, 245, 247, 0.92) 0%, rgba(245, 245, 247, 0.55) 36%, transparent 62%),
    linear-gradient(to bottom, transparent 55%, var(--bg) 96%);
}
</style>
