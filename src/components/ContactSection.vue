<script setup lang="ts">
import { site } from '@/data/content'
import ContactForm from '@/components/ContactForm.vue'

defineProps<{
  initialPlatform?: string
  hidePlatformSelect?: boolean
  heading?: string
  lead?: string
  idPrefix?: string
}>()
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container contact-grid">
      <div>
        <div class="section-head">
          <p class="eyebrow">Контакт</p>
          <h2>{{ heading || 'Напишите о задаче' }}</h2>
          <p class="section-lead">
            <slot name="lead">
              {{
                lead ||
                'Напишите своими словами: в какой программе работаете, что сейчас делается вручную, какой результат нужен и к какому сроку. Разбор задачи — бесплатно.'
              }}
            </slot>
          </p>
        </div>
        <div class="social-row">
          <a
            v-if="site.contact.telegram"
            class="social-btn"
            :href="site.contact.telegram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.788.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
              />
            </svg>
            <span>Telegram</span>
          </a>
          <a class="social-btn" :href="`mailto:${site.contact.email}`" aria-label="Email">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span>Email</span>
          </a>
        </div>
        <p class="contact-email">
          <a :href="`mailto:${site.contact.email}`">{{ site.contact.email }}</a>
        </p>
      </div>
      <ContactForm
        :initial-platform="initialPlatform"
        :hide-platform-select="hidePlatformSelect"
        :id-prefix="idPrefix || 'contact'"
      />
    </div>
  </section>
</template>

<style scoped>
.social-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  min-height: 44px;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  background: var(--bg-card);
  font-size: 0.95rem;
  transition: border-color 0.2s, color 0.2s;
}

@media (max-width: 479px) {
  .social-btn {
    flex: 1 1 auto;
  }
}

.social-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
