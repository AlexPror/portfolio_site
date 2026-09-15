<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { workSteps } from '@/data/content'

const visible = ref(false)
const sectionEl = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.25 },
  )
  if (sectionEl.value) observer.observe(sectionEl.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="process" ref="sectionEl" class="section process-section" :class="{ visible }">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Как это проходит</p>
        <h2>От разговора до рабочего инструмента</h2>
      </div>
      <div class="process-grid">
        <article
          v-for="(step, i) in workSteps"
          :key="step.title"
          class="process-card"
          :style="{ '--delay': `${i * 90}ms` }"
        >
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  background: var(--bg);
  border-block: none;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.process-grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 720px) {
  .process-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.process-card {
  padding: 1.75rem 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
  transition-delay: var(--delay, 0ms);
}

.process-section.visible .process-card {
  opacity: 1;
  transform: translateY(0);
}

.process-card h3 {
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
  color: var(--accent);
}

.process-card p {
  margin: 0;
  font-size: 0.98rem;
  color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .process-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
