<script setup lang="ts">
import { resume } from '@/data/resume'

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
            <a :href="resume.portfolioUrl" target="_blank" rel="noopener">{{ resume.portfolioUrl }}</a>
            <a href="#examples">Примеры работ (чертежи)</a>
            <a
              :href="resume.drive[0]?.href"
              target="_blank"
              rel="noopener"
            >
              Google Drive — примеры КД
            </a>
            <a :href="resume.telegramUrl" target="_blank" rel="noopener">Telegram</a>
            <a :href="resume.githubUrl" target="_blank" rel="noopener">GitHub</a>
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

        <div class="resume-specs">
          <span v-for="s in resume.specializations" :key="s" class="spec-chip">{{ s }}</span>
        </div>

        <div class="resume-actions no-print">
          <button type="button" class="btn btn-primary" @click="downloadPdf">
            Скачать резюме PDF
          </button>
          <a href="#examples" class="btn btn-ghost">Примеры работ</a>
          <a :href="resume.portfolioUrl" class="btn btn-ghost" target="_blank" rel="noopener">Портфолио</a>
          <a href="https://vorobjev.pro/#contact" class="btn btn-ghost">Связаться</a>
        </div>
        <p class="print-hint no-print">
          В диалоге печати: «Сохранить как PDF». Ссылки в PDF кликабельны (портфолио, кейсы, Drive).
        </p>
      </div>
    </section>

    <!-- HH-style links block early for recruiters / PDF -->
    <section class="section links-top-section">
      <div class="container resume-doc">
        <h2>Ссылки</h2>
        <ul class="hh-links">
          <li v-for="l in resume.links" :key="l.href">
            <span class="hh-link-label">{{ l.label }}</span>
            <a :href="l.href" target="_blank" rel="noopener">{{ l.href }}</a>
          </li>
        </ul>
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
  --accent: #5b8def;
}

.resume-hero {
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.resume-doc {
  /* тот же .container, что у хедера и футера — без узкой колонки */
  width: 100%;
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
  font-size: 0.85rem;
  color: var(--text-muted);
}

.resume-page h1 {
  margin: 0 0 0.35rem;
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  line-height: 1.2;
}

.resume-sub,
.resume-format {
  margin: 0.2rem 0;
  color: var(--text-muted);
  font-size: 0.98rem;
}

.resume-role {
  margin: 0.5rem 0 0.25rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--accent);
}

.resume-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 0.95rem;
}

.resume-contacts a {
  color: var(--accent);
  word-break: break-all;
}

.highlight-grid {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
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
}

.highlight-value {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--accent);
  line-height: 1.25;
}

.highlight-label {
  margin-top: 0.25rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.35;
}

.resume-about {
  margin: 1.35rem 0 1rem;
  color: var(--text-muted);
  line-height: 1.55;
  font-size: 1.02rem;
}

.resume-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.spec-chip {
  padding: 0.28rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.resume-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.35rem;
}

.print-hint {
  margin: 0.65rem 0 0;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.hh-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.hh-links li {
  display: grid;
  gap: 0.15rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border);
}

@media (min-width: 640px) {
  .hh-links li {
    grid-template-columns: 11rem 1fr;
    align-items: baseline;
    gap: 1rem;
  }
}

.hh-link-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.hh-links a {
  color: var(--accent);
  font-size: 0.92rem;
  word-break: break-all;
}

.job-block {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border);
}

.job-block:last-child {
  border-bottom: none;
}

.job-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
}

.job-block h3 {
  margin: 0;
  font-size: 1.1rem;
}

.job-role {
  margin: 0.25rem 0 0;
  font-weight: 600;
  color: var(--accent);
}

.job-period {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-size: 0.92rem;
  gap: 0.15rem;
}

.job-meta {
  margin: 0.45rem 0 0.65rem;
  color: var(--text-muted);
  font-size: 0.92rem;
}

.job-block ul {
  margin: 0.5rem 0 0;
  padding-left: 1.15rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.job-achievements {
  margin-top: 0.85rem;
  padding: 0.85rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.ach-label {
  margin: 0 0 0.35rem;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}

.job-achievements ul {
  margin: 0;
}

.ach-cta {
  display: inline-block;
  margin-top: 0.55rem;
  color: var(--accent);
  font-size: 0.92rem;
}

.link-url {
  font-size: 0.85rem;
  opacity: 0.85;
  word-break: break-all;
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

.resume-page h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}

.edu-block {
  margin-bottom: 1.15rem;
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

.skills-h {
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

.drive-url {
  font-size: 0.78rem;
  color: var(--text-muted);
  word-break: break-all;
  margin-top: 0.15rem;
}

@media print {
  @page {
    size: A4;
    margin: 12mm 14mm;
  }

  .no-print {
    display: none !important;
  }

  .resume-page {
    color: #111 !important;
    background: #fff !important;
    font-size: 10.5pt;
    line-height: 1.4;
  }

  .section {
    padding-top: 0.65rem !important;
    padding-bottom: 0.65rem !important;
  }

  .resume-hero,
  .resume-muted,
  .highlight-card,
  .resume-contacts,
  .job-achievements,
  .drive-card,
  .links-top-section {
    background: #fff !important;
    border-color: #c8c8c8 !important;
  }

  .resume-hero {
    background: #fff !important;
    border-bottom: 1px solid #bbb !important;
    padding-top: 0 !important;
  }

  .resume-page h1 {
    font-size: 18pt !important;
    color: #111 !important;
  }

  .resume-page h2 {
    font-size: 12pt !important;
    color: #111 !important;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.25rem;
    margin-top: 0.75rem;
  }

  .resume-role,
  .job-role,
  .highlight-value,
  .drive-title,
  .ach-label,
  .hh-link-label {
    color: #0b5cab !important;
  }

  .resume-about,
  .muted,
  .job-block ul,
  .drive-note,
  .resume-sub,
  .resume-format,
  .job-meta,
  .license,
  .plain-list,
  .drive-url {
    color: #333 !important;
  }

  a {
    color: #0b5cab !important;
    text-decoration: underline !important;
  }

  .spec-chip,
  .tag {
    border-color: #bbb !important;
    color: #333 !important;
    background: #f5f5f5 !important;
  }

  .job-block {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .drive-card {
    break-inside: avoid;
  }

  .link-url {
    display: inline;
  }

  .highlight-grid {
    margin-top: 0.85rem;
  }
}
</style>
