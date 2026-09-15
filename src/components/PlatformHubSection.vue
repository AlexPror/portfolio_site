<script setup lang="ts">
import { platforms } from '@/data/platforms'
</script>

<template>
  <section id="platforms" class="section platforms-hub">
    <div class="container">
      <div class="section-head center">
        <p class="eyebrow">Платформы</p>
        <h2>Выберите программу — посмотрим, что можно ускорить</h2>
        <p class="section-lead">
          Это не витрина готовых продуктов. Это вход в разговор о заказе: внутри — примеры работ и заявка.
        </p>
      </div>
      <div class="hub-grid">
        <RouterLink
          v-for="p in platforms"
          :key="p.id"
          :to="`/${p.slug}`"
          class="hub-card"
          :class="p.themeClass"
        >
          <span class="hub-brand">{{ p.brand }}</span>
          <h3>{{ p.title }}</h3>
          <p>{{ p.subtitle }}</p>
          <span class="hub-cta">Подробнее →</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platforms-hub {
  background: var(--bg);
  border-block: none;
}

.platforms-hub .section-head {
  text-align: center;
}

.hub-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 800px) {
  .hub-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.hub-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.85rem 1.6rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  color: inherit;
  text-decoration: none;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  min-height: 12rem;
}

.hub-card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);
  background: var(--bg-elevated);
  color: inherit;
}

.hub-brand {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-transform: none;
  color: var(--accent);
  margin-bottom: 0.65rem;
}

.hub-card h3 {
  font-size: 1.15rem;
  margin: 0 0 0.5rem;
}

.hub-card p {
  margin: 0;
  flex: 1;
  color: var(--text-muted);
  font-size: 0.98rem;
}

.hub-cta {
  margin-top: 1rem;
  font-weight: 500;
  color: var(--accent);
  font-size: 0.95rem;
}

.theme-kompas {
  --accent: #3ecf9a;
  --accent-dim: #2fa87d;
}

.theme-revit {
  --accent: #6b9fff;
  --accent-dim: #4f82e0;
}

.theme-solidworks {
  --accent: #e07a4a;
  --accent-dim: #c46538;
}
</style>
