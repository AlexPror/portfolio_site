<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '@/data/content'
import { logger } from '@/lib/logger'

const openCaseId = ref<string | null>(null)

function similarTask(id: string) {
  logger.debug('project similar task', { id })
}

function toggleCase(id: string) {
  openCaseId.value = openCaseId.value === id ? null : id
  logger.debug('project case toggle', { id, open: openCaseId.value === id })
}
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Конфиденциально</p>
        <h2>Примеры проектов</h2>
        <p class="section-lead">
          Промышленные кейсы без названий заказчиков. Металлоконструкции, листовой металл, BIM.
        </p>
      </div>
      <div class="project-grid">
        <article v-for="p in projects" :key="p.id" class="project-card">
          <div class="project-platform">{{ p.platform }}</div>
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
          <ul>
            <li v-for="b in p.bullets" :key="b">{{ b }}</li>
          </ul>
          <div class="project-details" :class="{ open: openCaseId === p.id }">
            <button
              type="button"
              class="project-details-toggle"
              :aria-expanded="openCaseId === p.id"
              :aria-controls="`case-${p.id}`"
              @click="toggleCase(p.id)"
            >
              Кейс: проблема → подход → ограничения → результат
            </button>
            <div :id="`case-${p.id}`" class="project-flow-wrap">
              <div class="project-flow">
                <p><strong>Проблема:</strong> {{ p.caseStudy.problem }}</p>
                <p><strong>Подход:</strong> {{ p.caseStudy.approach }}</p>
                <p><strong>Ограничения:</strong> {{ p.caseStudy.constraints }}</p>
                <p><strong>Результат:</strong> {{ p.caseStudy.result }}</p>
              </div>
            </div>
          </div>
          <div class="tag-row">
            <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
          </div>
          <a href="#contact" class="project-cta" @click="similarTask(p.id)">Похожая задача →</a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-cta {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--accent);
}

.project-cta:hover {
  color: #6cb8ff;
}

.project-details {
  margin-top: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.project-details-toggle {
  display: block;
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 0;
  background: transparent;
  color: var(--accent);
  font: inherit;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
}

.project-details-toggle::before {
  content: '▸';
  display: inline-block;
  margin-right: 0.45rem;
  transition: transform 0.25s ease;
}

.project-details.open .project-details-toggle::before {
  transform: rotate(90deg);
}

.project-flow-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}

.project-details.open .project-flow-wrap {
  grid-template-rows: 1fr;
}

.project-flow {
  min-height: 0;
  overflow: hidden;
  padding: 0 0.85rem;
  border-top: 1px solid transparent;
  opacity: 0;
  transition:
    opacity 0.25s ease,
    padding 0.35s ease,
    border-color 0.35s ease;
}

.project-details.open .project-flow {
  padding: 0.2rem 0.85rem 0.8rem;
  border-top-color: var(--border);
  opacity: 1;
}

.project-flow p {
  margin: 0.55rem 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.project-flow p:first-child {
  margin-top: 0;
}

.project-flow strong {
  color: var(--text);
}

@media (prefers-reduced-motion: reduce) {
  .project-details-toggle::before,
  .project-flow-wrap,
  .project-flow {
    transition: none;
  }
}
</style>
