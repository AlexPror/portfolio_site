<script setup lang="ts">
import { site, techStack } from '@/data/content'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="footer-note">
        {{ site.author }} — разработка ПО для инженерии и производства.
        Проекты для промышленных заказчиков; бренды и данные объектов не публикуются.
      </p>
      <div class="footer-stack" aria-label="Стек технологий">
        <span v-for="t in techStack" :key="t" class="stack-chip">{{ t }}</span>
      </div>
      <div class="footer-social">
        <a
          v-if="site.contact.telegram"
          :href="site.contact.telegram"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          class="footer-icon"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.788.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
            />
          </svg>
        </a>
        <a :href="`mailto:${site.contact.email}`" aria-label="Email" class="footer-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </a>
      </div>
      <p class="footer-copy">© {{ new Date().getFullYear() }} · {{ site.tagline }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1rem 0 0.5rem;
}

.footer-stack .stack-chip {
  padding: 0.3rem 0.65rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.footer-social {
  display: flex;
  gap: 0.75rem;
  margin: 0.75rem 0 0.5rem;
}

.footer-icon {
  color: var(--text-muted);
  display: inline-flex;
  transition: color 0.2s;
}

.footer-icon:hover {
  color: var(--accent);
}
</style>
