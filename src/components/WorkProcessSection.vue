<script setup lang="ts">
import { workSteps } from '@/data/content'
</script>

<template>
  <section id="process" class="section process-section">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Как работаем</p>
        <h2>От задачи до внедрения</h2>
      </div>
      <div class="process-grid">
        <article v-for="step in workSteps" :key="step.title" class="process-card">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  background: var(--bg-elevated);
  border-block: 1px solid var(--border);
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.process-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .process-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.process-card {
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
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
</style>
