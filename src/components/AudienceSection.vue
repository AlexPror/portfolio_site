<script setup lang="ts">
import { audiences } from '@/data/content'
</script>

<template>
  <section id="audience" class="section audience-section">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Аудитория</p>
        <h2>Кому будет полезно</h2>
      </div>
      <div class="audience-grid">
        <a
          v-for="a in audiences"
          :key="a.title"
          class="audience-card"
          href="#contact"
        >
          <span class="audience-title">{{ a.title }}</span>
          <span class="audience-outcome">{{ a.outcome }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.audience-section {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.audience-section .section-head {
  margin-bottom: 1.5rem;
}

.audience-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .audience-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .audience-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1100px) {
  .audience-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.audience-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  min-height: 5.5rem;
  padding: 1rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  text-decoration: none;
  transition: border-color 0.2s;
  gap: 0.35rem;
}

.audience-card:hover {
  border-color: var(--accent);
}

.audience-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
}

.audience-outcome {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.35;
}

.audience-card:hover .audience-title {
  color: var(--accent);
}
</style>
