<script setup lang="ts">
import { projects } from '@/data/content'
import { logger } from '@/lib/logger'

function similarTask(id: string) {
  logger.info('project similar task', { id })
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
          <details class="project-details">
            <summary>Кейс: проблема → подход → ограничения → результат</summary>
            <div class="project-flow">
              <p><strong>Проблема:</strong> {{ p.caseStudy.problem }}</p>
              <p><strong>Подход:</strong> {{ p.caseStudy.approach }}</p>
              <p><strong>Ограничения:</strong> {{ p.caseStudy.constraints }}</p>
              <p><strong>Результат:</strong> {{ p.caseStudy.result }}</p>
            </div>
          </details>
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
}

.project-details summary {
  cursor: pointer;
  padding: 0.65rem 0.85rem;
  font-size: 0.9rem;
  color: var(--accent);
  list-style: none;
}

.project-details summary::-webkit-details-marker {
  display: none;
}

.project-details summary::before {
  content: '▸';
  display: inline-block;
  margin-right: 0.45rem;
  transition: transform 0.15s ease;
}

.project-details[open] summary::before {
  transform: rotate(90deg);
}

.project-flow {
  padding: 0.2rem 0.85rem 0.8rem;
  border-top: 1px solid var(--border);
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
</style>
