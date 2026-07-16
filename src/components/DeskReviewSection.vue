<script setup lang="ts">
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

function openDemo() {
  logger.info('deskreview section cta', { url: site.deskReviewUrl })
}
</script>

<template>
  <section id="deskreview" class="section deskreview-section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Демонстрация уровня</p>
        <h2>DeskReview 1.0 — PDF и 3D в браузере</h2>
        <p class="section-lead">
          Отдельный продукт: ревью чертежей и моделей без CAD. Основная услуга — заказные плагины;
          DeskReview показывает, как делаю веб-инструменты для инженеров.
        </p>
      </div>
      <div class="deskreview-panel">
        <a
          class="demo-preview"
          :href="site.deskReviewUrl"
          target="_blank"
          rel="noopener"
          @click="openDemo"
        >
          <div class="demo-preview-inner">
            <div class="demo-bar">
              <span /><span /><span />
              <span class="demo-bar-title">DeskReview 1.0</span>
            </div>
            <div class="demo-split">
              <div class="demo-pane demo-pdf">
                <span class="demo-label">2D · PDF</span>
                <div class="demo-lines" />
              </div>
              <div class="demo-pane demo-3d">
                <span class="demo-label">3D · STEP</span>
                <svg class="demo-iso" viewBox="0 0 80 80" aria-hidden="true">
                  <path
                    d="M40 12 L68 28 L68 60 L40 76 L12 60 L12 28 Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                  <path d="M40 12 L40 44 M40 44 L68 28 M40 44 L12 28" stroke="currentColor" stroke-width="0.9" opacity="0.6" />
                </svg>
              </div>
            </div>
            <p class="demo-hint">Нажмите — откроется живое демо</p>
          </div>
        </a>
        <ul class="feature-list">
          <li>PDF: замечания со статусами, sidecar JSON</li>
          <li>3D: измерения, сечения, дерево сборки</li>
          <li>Режим «Рядом» — чертёж и модель на одном экране</li>
          <li>Файлы в браузере, без регистрации и облака</li>
        </ul>
      </div>
      <div class="deskreview-actions">
        <a
          class="btn btn-ghost"
          :href="site.deskReviewUrl"
          target="_blank"
          rel="noopener"
          @click="openDemo"
        >
          Открыть демо →
        </a>
        <a href="#contact" class="btn btn-primary">Заказать разработку</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-preview {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;
  transition: border-color 0.2s, transform 0.15s;
}

.demo-preview:hover {
  transform: translateY(-2px);
}

.demo-preview-inner {
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-card);
}

.demo-preview:hover .demo-preview-inner {
  border-color: var(--accent-dim);
}

.demo-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: #0f1218;
  border-bottom: 1px solid var(--border);
}

.demo-bar span:first-child,
.demo-bar span:nth-child(2),
.demo-bar span:nth-child(3) {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.demo-bar-title {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.demo-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 160px;
}

.demo-pane {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-right: 1px solid var(--border);
}

.demo-pane:last-child {
  border-right: none;
}

.demo-pdf {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 14px,
    rgba(42, 49, 64, 0.45) 14px,
    rgba(42, 49, 64, 0.45) 15px
  );
}

.demo-3d {
  background: radial-gradient(circle at 50% 40%, var(--accent-glow), transparent 65%);
  color: var(--accent);
}

.demo-label {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.demo-lines {
  width: 70%;
  height: 48px;
  border: 1px solid rgba(74, 168, 255, 0.35);
  border-radius: 2px;
}

.demo-iso {
  width: 64px;
  height: 64px;
}

.demo-hint {
  margin: 0;
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  color: var(--accent);
  text-align: center;
  border-top: 1px solid var(--border);
  background: rgba(74, 168, 255, 0.06);
}

.deskreview-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.deskreview-actions .btn {
  width: 100%;
}

@media (min-width: 480px) {
  .deskreview-actions {
    flex-direction: row;
  }

  .deskreview-actions .btn {
    width: auto;
  }
}
</style>
