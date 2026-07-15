<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

const externalUrl = computed(() => site.deskReviewUrl.trim())

onMounted(() => {
  logger.info('deskreview page mounted', { hasExternalUrl: Boolean(externalUrl.value) })
})

function openExternal() {
  if (!externalUrl.value) return
  logger.info('deskreview external open', { url: externalUrl.value })
  window.open(externalUrl.value, '_blank', 'noopener')
}
</script>

<template>
  <section class="section demo-page">
    <div class="container demo-card">
      <p class="eyebrow">DeskReview</p>
      <h1>3D / PDF вьювер</h1>
      <p class="section-lead">
        Полный DeskReview — отдельное приложение (Vue + Three.js). Запустите его локально из каталога
        <code>3d_viewer</code> или укажите URL в переменной <code>VITE_DESKREVIEW_URL</code>.
      </p>

      <div class="demo-actions">
        <button
          v-if="externalUrl"
          type="button"
          class="btn btn-primary"
          @click="openExternal"
        >
          Открыть DeskReview
        </button>
        <RouterLink v-else to="/" class="btn btn-primary">На главную</RouterLink>
        <RouterLink to="/" class="btn btn-ghost">← Назад</RouterLink>
      </div>

      <div class="demo-steps">
        <h2>Локальный запуск DeskReview</h2>
        <ol>
          <li><code>cd ..\3d_viewer\viewer</code></li>
          <li><code>npm install</code></li>
          <li><code>npm run dev</code></li>
          <li>Добавьте в <code>.env</code>: <code>VITE_DESKREVIEW_URL=http://localhost:5173</code></li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-card {
  max-width: 720px;
}

.demo-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0 2rem;
}

.demo-steps {
  padding: 1.25rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.demo-steps ol {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
  color: var(--text-muted);
}

.demo-steps li {
  margin-bottom: 0.5rem;
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--accent);
}
</style>
