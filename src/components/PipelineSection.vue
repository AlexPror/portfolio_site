<script setup lang="ts">
import { pipelineSteps } from '@/data/content'
</script>

<template>
  <section class="section pipeline-section">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Процесс</p>
        <h2>От модели до цеха</h2>
      </div>
      <div class="pipeline-track">
        <template v-for="(step, i) in pipelineSteps" :key="step">
          <div class="pipeline-step">{{ step }}</div>
          <div v-if="i < pipelineSteps.length - 1" class="pipeline-arrow" aria-hidden="true">→</div>
        </template>
      </div>
      <p class="pipeline-note">
        Параллельно — <strong>DeskReview</strong> для согласования PDF и 3D в браузере.
      </p>
    </div>
  </section>
</template>
