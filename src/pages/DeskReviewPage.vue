<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

const viewerUrl = computed(() => site.deskReviewUrl.trim())

onMounted(() => {
  logger.info('deskreview page mounted', { url: viewerUrl.value })
})

function openViewer() {
  logger.info('deskreview open', { url: viewerUrl.value })
  window.open(viewerUrl.value, '_blank', 'noopener')
}
</script>

<template>
  <section class="section demo-page">
    <div class="container demo-card">
      <p class="eyebrow">DeskReview 1.0</p>
      <h1>3D / PDF вьювер</h1>
      <p class="section-lead">
        Ревью чертежей и моделей в Chrome / Edge / Firefox: замечания со статусами (sidecar JSON),
        измерения и сечения на 3D, режим «Рядом», скриншот-отчёт в PDF.
        STL / GLB / STEP / IGES — без установки CAD; на демо STEP до ~30&nbsp;МБ через WASM.
      </p>

      <div class="demo-actions">
        <button type="button" class="btn btn-primary" @click="openViewer">
          Открыть DeskReview
        </button>
        <a
          class="btn btn-ghost"
          :href="viewerUrl"
          target="_blank"
          rel="noopener"
        >
          Открыть в новой вкладке →
        </a>
        <RouterLink to="/" class="btn btn-ghost">← Назад</RouterLink>
      </div>

      <p class="demo-url">
        <span class="muted">Демо:</span>
        <a :href="viewerUrl" target="_blank" rel="noopener">{{ viewerUrl }}</a>
      </p>
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
  margin: 1.5rem 0 1.25rem;
}

.demo-url {
  font-size: 0.95rem;
  word-break: break-all;
}

.demo-url .muted {
  color: var(--text-muted);
  margin-right: 0.35rem;
}

.demo-url a {
  color: var(--accent);
}
</style>
