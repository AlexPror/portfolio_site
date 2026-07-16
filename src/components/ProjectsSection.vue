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
</style>
