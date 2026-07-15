<script setup lang="ts">
import { techStack } from '@/data/content'
</script>

<template>
  <section class="section stack-section">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Стек</p>
        <h2>Технологии</h2>
      </div>
      <div class="stack-cloud">
        <span v-for="t in techStack" :key="t" class="stack-chip">{{ t }}</span>
      </div>
    </div>
  </section>
</template>
