<script setup lang="ts">
import { projects } from '@/data/content'
</script>

<template>
  <section id="projects" class="section projects-section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Конфиденциально</p>
        <h2>Примеры проектов</h2>
        <p class="section-lead">
          Промышленные проекты без указания компаний-заказчиков и без данных объектов.
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
        </article>
      </div>
    </div>
  </section>
</template>
