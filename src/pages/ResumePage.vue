<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  resumeModeList,
  resumeProfiles,
  resolveResumeMode,
  type ResumeMode,
} from '@/data/resume'

const route = useRoute()
const router = useRouter()
const STORAGE_KEY = 'vorobjev_resume_mode'

const mode = computed<ResumeMode>(() => {
  const fromQuery = resolveResumeMode(String(route.query.mode || ''))
  if (route.query.mode === 'constructor' || route.query.mode === 'automation') {
    return fromQuery
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return resolveResumeMode(saved)
  } catch {
    return 'constructor'
  }
})

const resume = computed(() => resumeProfiles[mode.value])

function setMode(next: ResumeMode) {
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
  router.replace({ query: { ...route.query, mode: next } })
}

watch(
  mode,
  (m) => {
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch {
      /* ignore */
    }
  },
  { immediate: true },
)

function downloadPdf() {
  window.print()
}

function shortUrl(href: string) {
  try {
    const u = new URL(href)
    const path = u.pathname === '/' ? '' : u.pathname
    return `${u.host}${path}`.replace(/\/$/, '')
  } catch {
    return href
  }
}
</script>

<template>
  <div class="resume-page" :data-mode="mode">
    <section class="section resume-hero no-print-extra">
      <div class="container resume-doc">
        <div class="mode-switch no-print" role="tablist" aria-label="Тип резюме">
          <button
            v-for="m in resumeModeList"
            :key="m.id"
            type="button"
            role="tab"
            class="mode-tab"
            :class="{ on: mode === m.id }"
            :aria-selected="mode === m.id"
            @click="setMode(m.id)"
          >
            <strong>{{ m.tabLabel }}</strong>
            <small>{{ m.tabHint }}</small>
          </button>
        </div>
        <p class="mode-badge no-print">
          {{ resumeModeList.find((m) => m.id === mode)?.badge }}
          · ссылка на этот профиль:
          <code>{{ mode === 'constructor' ? '/resume?mode=constructor' : '/resume?mode=automation' }}</code>
        </p>

        <div class="resume-top">
          <div>
            <p class="resume-meta">Резюме · обновлено {{ resume.updatedAt }}</p>
            <h1>{{ resume.fullName }}</h1>
            <p class="resume-sub">{{ resume.genderAge }}</p>
            <p class="resume-role">{{ resume.desiredRole }}</p>
            <p class="resume-format">{{ resume.workFormat }}</p>
          </div>
          <div class="resume-contacts">
            <a :href="`tel:${resume.phone.replace(/\s|\(|\)|-/g, '')}`">{{ resume.phone }}</a>
            <a :href="`mailto:${resume.email}`">{{ resume.email }}</a>
            <a :href="resume.portfolioUrl" target="_blank" rel="noopener">{{ resume.portfolioUrl }}</a>
            <a :href="resume.drivePortfolioUrl" target="_blank" rel="noopener">Примеры работ (Google Drive)</a>
            <a :href="resume.telegramUrl" target="_blank" rel="noopener">Telegram</a>
            <a v-if="mode === 'automation'" :href="resume.githubUrl" target="_blank" rel="noopener">GitHub</a>
            <span>{{ resume.city }}</span>
            <span>{{ resume.citizenship }}</span>
          </div>
        </div>

        <div class="highlight-grid" aria-label="Ключевые сильные стороны">
          <article v-for="h in resume.highlights" :key="h.label" class="highlight-card">
            <div class="highlight-value">{{ h.value }}</div>
            <div class="highlight-label">{{ h.label }}</div>
          </article>
        </div>

        <p class="resume-about">{{ resume.about }}</p>
        <p v-if="resume.sideNote" class="resume-side-note">{{ resume.sideNote }}</p>

        <div class="cad-block" aria-label="CAD и портфолио">
          <h2 class="cad-h">CAD · навыки и портфолио</h2>
          <div class="cad-grid">
            <a
              v-for="c in resume.cadSkills"
              :key="c.name"
              class="cad-card"
              :href="c.href"
              target="_blank"
              rel="noopener"
            >
              <strong>{{ c.name }}</strong>
              <span class="cad-level">{{ c.level }}</span>
              <span class="cad-note">{{ c.note }}</span>
            </a>
          </div>
        </div>

        <div class="resume-specs">
          <span v-for="s in resume.specializations" :key="s" class="spec-chip">{{ s }}</span>
        </div>

        <div class="resume-actions no-print">
          <button type="button" class="btn btn-primary" @click="downloadPdf">
            Скачать PDF (текущий профиль)
          </button>
          <a :href="resume.drivePortfolioUrl" class="btn btn-ghost" target="_blank" rel="noopener"
            >Примеры работ</a
          >
          <a :href="resume.portfolioUrl" class="btn btn-ghost" target="_blank" rel="noopener">Портфолио</a>
          <a href="https://vorobjev.pro/#contact" class="btn btn-ghost">Связаться</a>
        </div>
        <p class="print-hint no-print">
          Перед печатью выберите профиль переключателем. В диалоге: «Сохранить как PDF».
        </p>
      </div>
    </section>

    <section class="section links-top-section">
      <div class="container resume-doc">
        <h2>Ссылки</h2>
        <ul class="hh-links">
          <li v-for="l in resume.links" :key="l.href + l.label">
            <span class="hh-link-label">{{ l.label }}</span>
            <a :href="l.href" target="_blank" rel="noopener">{{ l.href }}</a>
          </li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container resume-doc">
        <h2>Опыт работы — {{ resume.experienceYears }}</h2>

        <article v-for="job in resume.jobs" :key="job.company + job.period + mode" class="job-block">
          <div class="job-head">
            <div>
              <h3>
                <a v-if="job.url" :href="job.url" target="_blank" rel="noopener">{{ job.company }}</a>
                <template v-else>{{ job.company }}</template>
              </h3>
              <p class="job-role">{{ job.role }}</p>
            </div>
            <div class="job-period">
              <span>{{ job.period }}</span>
              <span class="muted">{{ job.duration }}</span>
            </div>
          </div>
          <p v-if="job.location || job.industry" class="job-meta">
            <span v-if="job.location">{{ job.location }}</span>
            <span v-if="job.industry"> · {{ job.industry }}</span>
          </p>
          <ul>
            <li v-for="b in job.bullets" :key="b">{{ b }}</li>
          </ul>
          <div v-if="job.achievements?.length" class="job-achievements">
            <p class="ach-label">Результат</p>
            <ul>
              <li v-for="a in job.achievements" :key="a">{{ a }}</li>
            </ul>
            <a
              v-if="job.achievementsCta"
              class="ach-cta"
              :href="job.achievementsCta.href"
              target="_blank"
              rel="noopener"
            >
              {{ job.achievementsCta.label }}
              <span class="link-url"> — {{ job.achievementsCta.href }}</span>
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="section resume-muted">
      <div class="container resume-doc resume-split">
        <div>
          <h2>Образование</h2>
          <article v-for="ed in resume.education" :key="ed.school" class="edu-block">
            <h3>{{ ed.school }}</h3>
            <p class="muted">{{ ed.year }} · {{ ed.degree }}</p>
            <p>{{ ed.faculty }}</p>
          </article>
        </div>
        <div>
          <h2>Языки</h2>
          <ul class="plain-list">
            <li v-for="l in resume.languages" :key="l.name">
              <strong>{{ l.name }}</strong> — {{ l.level }}
            </li>
          </ul>
          <h2 class="skills-h">Навыки</h2>
          <div class="tag-row">
            <span v-for="sk in resume.skills" :key="sk" class="tag">{{ sk }}</span>
          </div>
          <p class="license">{{ resume.license }}</p>
        </div>
      </div>
    </section>

    <section id="examples" class="section">
      <div class="container resume-doc">
        <h2>Примеры работ</h2>
        <p class="section-lead">
          <a :href="resume.drivePortfolioUrl" target="_blank" rel="noopener">Общая папка Google Drive</a>
          — комплекты КД. Отдельные подборки ниже.
        </p>
        <div class="drive-grid">
          <a
            v-for="d in resume.drive"
            :key="d.href"
            class="drive-card"
            :href="d.href"
            target="_blank"
            rel="noopener"
          >
            <span class="drive-title">{{ d.label }}</span>
            <span v-if="d.note" class="drive-note">{{ d.note }}</span>
            <span class="drive-url">{{ shortUrl(d.href) }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resume-page {
  padding-bottom: 3rem;
}

.mode-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
  .mode-switch {
    grid-template-columns: 1fr;
  }
}

.mode-tab {
  text-align: left;
  border: 1px solid rgba(30, 58, 95, 0.22);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.mode-tab strong {
  display: block;
  font-size: 1rem;
  color: #0f2744;
}

.mode-tab small {
  display: block;
  margin-top: 0.2rem;
  color: #5a6b7d;
  font-size: 0.82rem;
  line-height: 1.35;
}

.mode-tab.on {
  border-color: rgba(30, 90, 140, 0.55);
  background: rgba(210, 232, 248, 0.85);
  box-shadow: 0 0 0 1px rgba(30, 90, 140, 0.2);
}

.mode-badge {
  margin: 0 0 1.1rem;
  font-size: 0.86rem;
  color: #3d5166;
}

.mode-badge code {
  font-size: 0.8rem;
  background: rgba(15, 39, 68, 0.06);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.resume-hero {
  padding-top: 1.5rem;
}

.resume-top {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

@media (max-width: 800px) {
  .resume-top {
    grid-template-columns: 1fr;
  }
}

.resume-meta {
  margin: 0 0 0.35rem;
  color: #5a6b7d;
  font-size: 0.9rem;
}

.resume-page h1 {
  margin: 0 0 0.35rem;
  font-size: clamp(1.55rem, 3vw, 2rem);
  line-height: 1.15;
}

.resume-sub,
.resume-format {
  margin: 0.15rem 0;
  color: #5a6b7d;
}

.resume-role {
  margin: 0.45rem 0 0.2rem;
  font-weight: 700;
  font-size: 1.05rem;
  color: #0f2744;
}

.resume-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  font-size: 0.92rem;
}

.resume-contacts a {
  color: #155a8a;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
  margin: 1rem 0 1.1rem;
}

@media (max-width: 900px) {
  .highlight-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.highlight-card {
  border: 1px solid rgba(30, 58, 95, 0.14);
  border-radius: 10px;
  padding: 0.7rem 0.75rem;
  background: rgba(255, 255, 255, 0.65);
}

.highlight-value {
  font-weight: 800;
  font-size: 0.98rem;
  color: #0f2744;
}

.highlight-label {
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: #5a6b7d;
  line-height: 1.3;
}

.resume-about {
  margin: 0 0 0.65rem;
  line-height: 1.55;
  max-width: 72ch;
}

.resume-side-note {
  margin: 0 0 1rem;
  padding: 0.65rem 0.8rem;
  border-left: 3px solid rgba(30, 90, 140, 0.45);
  background: rgba(210, 232, 248, 0.35);
  font-size: 0.92rem;
  line-height: 1.45;
  max-width: 72ch;
}

.cad-block {
  margin: 1rem 0 1.15rem;
}

.cad-h {
  margin: 0 0 0.55rem;
  font-size: 1.05rem;
}

.cad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

@media (max-width: 900px) {
  .cad-grid {
    grid-template-columns: 1fr;
  }
}

.cad-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  border: 1px solid rgba(30, 58, 95, 0.18);
  background: #fff;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.cad-card:hover {
  border-color: rgba(30, 90, 140, 0.5);
  box-shadow: 0 4px 14px rgba(15, 39, 68, 0.08);
}

.cad-card strong {
  color: #0f2744;
  font-size: 1.02rem;
}

.cad-level {
  font-size: 0.86rem;
  color: #3d5166;
  line-height: 1.35;
}

.cad-note {
  font-size: 0.8rem;
  color: #155a8a;
  font-weight: 600;
}

.resume-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.85rem 0 1rem;
}

.spec-chip {
  font-size: 0.78rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  border: 1px solid rgba(30, 58, 95, 0.18);
  background: rgba(255, 255, 255, 0.7);
}

.resume-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.print-hint {
  margin: 0.55rem 0 0;
  font-size: 0.82rem;
  color: #5a6b7d;
}

.hh-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.45rem;
}

.hh-link-label {
  display: block;
  font-weight: 700;
  font-size: 0.88rem;
  color: #0f2744;
}

.job-block {
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(30, 58, 95, 0.12);
}

.job-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.job-role {
  margin: 0.2rem 0 0;
  font-weight: 600;
}

.job-period {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9rem;
}

.job-meta {
  margin: 0.35rem 0 0.55rem;
  color: #5a6b7d;
  font-size: 0.9rem;
}

.job-achievements {
  margin-top: 0.65rem;
  padding: 0.65rem 0.75rem;
  background: rgba(210, 232, 248, 0.28);
  border-radius: 8px;
}

.ach-label {
  margin: 0 0 0.35rem;
  font-weight: 700;
  font-size: 0.85rem;
}

.ach-cta {
  display: inline-block;
  margin-top: 0.4rem;
  font-size: 0.88rem;
}

.link-url {
  color: #5a6b7d;
  font-size: 0.8rem;
  word-break: break-all;
}

.resume-muted {
  background: rgba(15, 39, 68, 0.03);
}

.resume-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 800px) {
  .resume-split {
    grid-template-columns: 1fr;
  }
}

.resume-page h2 {
  margin: 0 0 0.75rem;
}

.edu-block {
  margin-bottom: 1rem;
}

.plain-list {
  padding-left: 1.1rem;
}

.skills-h {
  margin-top: 1.25rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background: rgba(30, 58, 95, 0.08);
}

.license {
  margin-top: 0.85rem;
  color: #5a6b7d;
  font-size: 0.9rem;
}

.section-lead {
  margin: 0 0 0.85rem;
}

.drive-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 700px) {
  .drive-grid {
    grid-template-columns: 1fr;
  }
}

.drive-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.85rem;
  border: 1px solid rgba(30, 58, 95, 0.14);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  background: #fff;
}

.drive-title {
  font-weight: 700;
  color: #0f2744;
}

.drive-note {
  font-size: 0.86rem;
  color: #3d5166;
}

.drive-url {
  font-size: 0.75rem;
  color: #5a6b7d;
  word-break: break-all;
}

.muted {
  color: #5a6b7d;
}

@media print {
  .no-print,
  .no-print-extra .mode-switch,
  .no-print-extra .mode-badge,
  .no-print-extra .resume-actions,
  .no-print-extra .print-hint {
    display: none !important;
  }

  .resume-page {
    padding: 0;
  }

  .resume-hero {
    padding-top: 0;
  }

  .resume-page h1 {
    font-size: 1.45rem;
  }

  .cad-card,
  .drive-card,
  .highlight-card {
    break-inside: avoid;
  }
}
</style>
