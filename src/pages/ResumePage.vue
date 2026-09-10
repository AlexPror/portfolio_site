<script setup lang="ts">
import { resume } from '@/data/resume'
import { site } from '@/data/content'

function downloadPdf() {
  window.print()
}
</script>

<template>
  <div class="resume-page">
    <section class="section resume-hero no-print-extra">
      <div class="container resume-doc">
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
            <span>{{ resume.city }}</span>
            <span>{{ resume.citizenship }}</span>
            <a v-if="site.contact.telegram" :href="site.contact.telegram" target="_blank" rel="noopener">
              Telegram
            </a>
          </div>
        </div>

        <div class="highlight-grid" aria-label="Ключевые сильные стороны">
          <article v-for="h in resume.highlights" :key="h.label" class="highlight-card">
            <div class="highlight-value">{{ h.value }}</div>
            <div class="highlight-label">{{ h.label }}</div>
          </article>
        </div>

        <p class="resume-about">{{ resume.about }}</p>

        <div class="resume-specs">
          <span v-for="s in resume.specializations" :key="s" class="spec-chip">{{ s }}</span>
        </div>

        <div class="resume-actions no-print">
          <button type="button" class="btn btn-primary" @click="downloadPdf">
            Скачать резюме PDF
          </button>
          <RouterLink to="/#contact" class="btn btn-ghost">Связаться</RouterLink>
          <RouterLink to="/" class="btn btn-ghost">Портфолио услуг</RouterLink>
        </div>
        <p class="print-hint no-print">В диалоге печати выберите «Сохранить как PDF».</p>
      </div>
    </section>

    <section class="section">
      <div class="container resume-doc">
        <h2>Опыт работы — {{ resume.experienceYears }}</h2>

        <article v-for="job in resume.jobs" :key="job.company + job.period" class="job-block">
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
            >
              {{ job.achievementsCta.label }}
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
          </a>
        </div>

        <h2 class="links-h">Ссылки</h2>
        <ul class="plain-list links-list">
          <li v-for="l in resume.links" :key="l.href">
            <RouterLink v-if="l.href.startsWith('/')" :to="l.href">{{ l.label }}</RouterLink>
            <a v-else :href="l.href" target="_blank" rel="noopener">{{ l.label }}</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.resume-page {
  --accent: #5b8def;
}

.resume-hero {
  background: linear-gradient(180deg, #1a2230 0%, var(--bg) 100%);
  border-bottom: 1px solid var(--border);
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.resume-doc {
  max-width: 860px;
  margin-inline: auto;
}

.resume-top {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 720px) {
  .resume-top {
    grid-template-columns: 1.4fr 1fr;
    align-items: start;
  }
}

.resume-meta {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.resume-page h1 {
  font-size: clamp(1.55rem, 3.5vw, 2rem);
  margin: 0 0 0.35rem;
  line-height: 1.25;
}

.resume-sub,
.resume-format {
  margin: 0.15rem 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.resume-role {
  margin: 0.65rem 0 0.25rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--accent);
}

.resume-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
}

.highlight-grid {
  display: grid;
  gap: 0.65rem;
  margin: 1.5rem 0 1rem;
  grid-template-columns: 1fr 1fr;
}

@media (min-width: 640px) {
  .highlight-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.highlight-card {
  padding: 0.85rem 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  text-align: center;
}

.highlight-value {
  font-weight: 700;
  color: var(--accent);
  font-size: 1.05rem;
}

.highlight-label {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.3;
}

.resume-about {
  margin: 0 0 1rem;
  color: var(--text-muted);
  font-size: 1.02rem;
}

.resume-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.25rem;
}

.spec-chip {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.resume-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.print-hint {
  margin: 0.65rem 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.resume-page h2 {
  font-size: 1.25rem;
  margin: 0 0 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.job-block {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.job-block:last-child {
  border-bottom: none;
}

.job-head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

@media (min-width: 640px) {
  .job-head {
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
}

.job-block h3 {
  margin: 0;
  font-size: 1.1rem;
}

.job-role {
  margin: 0.25rem 0 0;
  font-weight: 500;
  color: var(--accent);
}

.job-period {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.9rem;
  color: var(--text-muted);
}

@media (min-width: 640px) {
  .job-period {
    align-items: flex-end;
    text-align: right;
  }
}

.job-meta {
  margin: 0 0 0.65rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.job-block ul {
  margin: 0.5rem 0 0;
  padding-left: 1.15rem;
  color: var(--text-muted);
}

.job-achievements {
  margin-top: 0.85rem;
  padding: 0.75rem 1rem;
  background: rgba(91, 141, 239, 0.08);
  border-radius: 8px;
  border: 1px solid var(--border);
}

.ach-label {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
}

.ach-cta {
  display: inline-block;
  margin-top: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
}

.resume-muted {
  background: var(--bg-elevated);
  border-block: 1px solid var(--border);
}

.resume-split {
  display: grid;
  gap: 2rem;
}

@media (min-width: 720px) {
  .resume-split {
    grid-template-columns: 1fr 1fr;
  }
}

.edu-block {
  margin-bottom: 1.25rem;
}

.edu-block h3 {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
}

.muted {
  color: var(--text-muted);
}

.plain-list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text-muted);
}

.skills-h,
.links-h {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.15rem;
}

.license {
  margin-top: 1rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.drive-grid {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .drive-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.drive-card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  text-align: left;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s;
}

.drive-card:hover {
  border-color: var(--accent);
  color: inherit;
}

.drive-title {
  font-weight: 600;
  color: var(--accent);
  font-size: 0.98rem;
}

.drive-note {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.links-list a {
  font-size: 1rem;
}

@media print {
  .no-print {
    display: none !important;
  }

  .resume-page {
    color: #111 !important;
    background: #fff !important;
  }

  .resume-hero,
  .resume-muted,
  .highlight-card,
  .resume-contacts,
  .job-achievements,
  .drive-card {
    background: #fff !important;
    border-color: #ccc !important;
  }

  .resume-role,
  .job-role,
  .highlight-value,
  .drive-title,
  .ach-label {
    color: #1a4a8a !important;
  }

  .resume-about,
  .muted,
  .job-block ul,
  .drive-note {
    color: #333 !important;
  }

  a {
    color: #1a4a8a !important;
  }
}
</style>
