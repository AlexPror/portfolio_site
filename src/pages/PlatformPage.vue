<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPlatform, platforms } from '@/data/platforms'
import ContactSection from '@/components/ContactSection.vue'

const route = useRoute()
const platform = computed(() => getPlatform(String(route.params.slug || '')))
const openCaseId = ref<string | null>(null)

function toggleCase(id: string) {
  openCaseId.value = openCaseId.value === id ? null : id
}

const others = computed(() => platforms.filter((p) => p.slug !== platform.value?.slug))

const cssVars = computed(() => {
  const p = platform.value
  if (!p) return {}
  return {
    '--accent': p.accent,
    '--accent-dim': p.accentDim,
    '--accent-glow': p.accentGlow,
  }
})
</script>

<template>
  <div v-if="platform" class="platform-page" :class="platform.themeClass" :style="cssVars">
    <section class="section platform-hero">
      <div class="container platform-center">
        <p class="eyebrow">{{ platform.brand }}</p>
        <h1>{{ platform.title }}</h1>
        <p class="lead">{{ platform.heroLead }}</p>
        <div class="platform-actions">
          <a href="#contact" class="btn btn-primary">Оставить заявку</a>
          <RouterLink to="/" class="btn btn-ghost">← Все платформы</RouterLink>
        </div>

        <div class="stat-grid" aria-label="Ключевые цифры">
          <article v-for="s in platform.stats" :key="s.label" class="stat-card">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
            <p v-if="s.note" class="stat-note">{{ s.note }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-if="platform.compare" class="section compare-section">
      <div class="container platform-center">
        <div class="section-head center">
          <p class="eyebrow">Эффект</p>
          <h2>Было → стало</h2>
          <p class="section-lead">{{ platform.compare.caption }}</p>
        </div>
        <div class="compare-row">
          <div class="compare-card before">
            <span class="compare-tag">Было</span>
            <p>{{ platform.compare.before }}</p>
          </div>
          <div class="compare-arrow" aria-hidden="true">→</div>
          <div class="compare-card after">
            <span class="compare-tag">Стало</span>
            <p>{{ platform.compare.after }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section flow-section">
      <div class="container platform-center">
        <div class="section-head center">
          <p class="eyebrow">Процесс</p>
          <h2>Как выглядит работа</h2>
        </div>
        <ol class="flow-track">
          <li v-for="(step, i) in platform.flow" :key="step" class="flow-step">
            <span class="flow-num">{{ i + 1 }}</span>
            <span class="flow-text">{{ step }}</span>
          </li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="container platform-center">
        <div class="section-head center">
          <p class="eyebrow">Кейсы</p>
          <h2>Что сделано</h2>
        </div>
        <div class="project-grid" :class="`count-${platform.cases.length}`">
          <article v-for="c in platform.cases" :key="c.id" class="project-card">
            <div class="project-platform">{{ c.platform }}</div>
            <h3>{{ c.title }}</h3>
            <p>{{ c.description }}</p>
            <ul>
              <li v-for="b in c.bullets" :key="b">{{ b }}</li>
            </ul>
            <div class="project-details" :class="{ open: openCaseId === c.id }">
              <button
                type="button"
                class="project-details-toggle"
                :aria-expanded="openCaseId === c.id"
                @click="toggleCase(c.id)"
              >
                Подробнее: проблема → результат
              </button>
              <div class="project-flow-wrap">
                <div class="project-flow">
                  <div class="mini-flow">
                    <div><span>Проблема</span><p>{{ c.caseStudy.problem }}</p></div>
                    <div><span>Подход</span><p>{{ c.caseStudy.approach }}</p></div>
                    <div><span>Ограничения</span><p>{{ c.caseStudy.constraints }}</p></div>
                    <div><span>Результат</span><p>{{ c.caseStudy.result }}</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tag-row">
              <span v-for="t in c.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section offers-section">
      <div class="container platform-center">
        <div class="section-head center">
          <p class="eyebrow">Услуги</p>
          <h2>Ориентиры</h2>
          <p class="section-lead">Смета — после разбора. Прототип обычно занимает 2–6 недель.</p>
        </div>
        <div class="offers-grid">
          <article v-for="o in platform.offers" :key="o.title" class="offer-card">
            <h3>{{ o.title }}</h3>
            <p>{{ o.description }}</p>
            <span v-if="o.from" class="offer-from">{{ o.from }}</span>
          </article>
        </div>
        <div class="tag-row platform-stack center-tags">
          <span v-for="t in platform.stacks" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
    </section>

    <ContactSection
      :initial-platform="platform.formPlatform"
      hide-platform-select
      :id-prefix="`plat-${platform.id}`"
      :heading="`Заявка по ${platform.navLabel}`"
      :lead="platform.applicationLead"
    />

    <section class="section other-platforms">
      <div class="container platform-center">
        <p class="eyebrow" style="text-align: center">Другие платформы</p>
        <div class="other-row">
          <RouterLink v-for="p in others" :key="p.id" :to="`/${p.slug}`" class="other-link">
            {{ p.navLabel }} →
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="section container">
    <h1>Страница не найдена</h1>
    <RouterLink to="/">На главную</RouterLink>
  </div>
</template>

<style scoped>
.platform-page {
  --accent: #4aa8ff;
}

.platform-center {
  max-width: 920px;
  margin-inline: auto;
  text-align: center;
}

.platform-center .section-head {
  text-align: center;
}

.platform-hero {
  padding-top: 2.5rem;
  padding-bottom: 2.25rem;
  border-bottom: 1px solid var(--border);
  background:
    radial-gradient(ellipse 70% 55% at 50% 0%, var(--accent-glow), transparent 60%),
    var(--bg);
}

.platform-hero h1 {
  font-size: clamp(1.7rem, 4vw, 2.35rem);
  margin: 0.35rem 0 0.75rem;
  line-height: 1.2;
}

.platform-hero .lead {
  max-width: 38rem;
  margin-inline: auto;
  color: var(--text-muted);
}

.platform-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.25rem 0 1.75rem;
}

.stat-grid {
  display: grid;
  gap: 0.75rem;
  text-align: left;
}

@media (min-width: 640px) {
  .stat-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  padding: 1.1rem 1.15rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.stat-value {
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
  font-weight: 700;
  color: var(--accent);
  line-height: 1.25;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  margin-top: 0.35rem;
  font-size: 0.95rem;
  color: var(--text);
}

.stat-note {
  margin: 0.25rem 0 0;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.compare-section {
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}

.compare-row {
  display: grid;
  gap: 0.75rem;
  align-items: stretch;
}

@media (min-width: 700px) {
  .compare-row {
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }
}

.compare-card {
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  text-align: left;
}

.compare-card.after {
  border-color: var(--accent-dim);
  background: linear-gradient(160deg, var(--accent-glow), var(--bg-card) 55%);
}

.compare-tag {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.compare-card p {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 550;
}

.compare-arrow {
  display: none;
  font-size: 1.5rem;
  color: var(--accent);
}

@media (min-width: 700px) {
  .compare-arrow {
    display: block;
  }
}

.flow-section {
  border-bottom: 1px solid var(--border);
}

.flow-track {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

@media (min-width: 720px) {
  .flow-track {
    grid-template-columns: repeat(4, 1fr);
  }
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  position: relative;
}

.flow-num {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: #0a121c;
  font-weight: 700;
  font-size: 0.9rem;
}

.flow-text {
  font-size: 0.95rem;
  font-weight: 500;
}

.project-grid,
.offers-grid {
  text-align: left;
}

.project-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

/* Override global .project-grid 2-col from main.css */
@media (min-width: 700px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

.project-grid.count-1 {
  max-width: 720px;
  margin-inline: auto;
  width: 100%;
}

.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.project-card > .tag-row {
  margin-top: auto;
  padding-top: 1rem;
}

.project-card ul {
  margin: 1rem 0 1.15rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  line-height: 1.2;
}

.offers-section {
  background: var(--bg);
  border-block: none;
}

.offers-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .offers-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.offer-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
}

.offer-card h3 {
  margin: 0 0 0.45rem;
  font-size: 1.05rem;
}

.offer-card p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  flex: 1;
}

.offer-from {
  display: block;
  margin-top: auto;
  padding-top: 1rem;
  font-weight: 600;
  color: var(--accent);
}

.center-tags {
  justify-content: center;
  margin-top: 1.5rem;
}

.other-platforms {
  padding-top: 2rem;
  padding-bottom: 2.5rem;
}

.other-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
}

.other-link {
  font-weight: 500;
}

.project-details {
  margin: 0.25rem 0 0;
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
  padding: 0.75rem 0.85rem 0.9rem;
  border-top-color: var(--border);
  opacity: 1;
  overflow: visible;
}

.mini-flow {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: 1fr;
}

@media (min-width: 720px) {
  .mini-flow {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .mini-flow {
    grid-template-columns: repeat(4, 1fr);
  }
}

.mini-flow > div {
  padding: 0.75rem 0.85rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  text-align: left;
  min-width: 0;
}

.mini-flow span {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.4rem;
}

.mini-flow p {
  margin: 0;
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .project-details-toggle::before,
  .project-flow-wrap,
  .project-flow {
    transition: none;
  }
}
</style>
