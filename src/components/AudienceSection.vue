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
          href="#services"
        >
          {{ a.title }}
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
    grid-template-columns: repeat(5, 1fr);
  }
}

.audience-card {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 4.5rem;
  padding: 1rem 0.85rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.3;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}

.audience-card:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
