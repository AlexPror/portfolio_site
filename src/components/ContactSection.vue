<script setup lang="ts">
import { ref } from 'vue'
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  sent.value = false

  const text = message.value.trim()
  const fromName = name.value.trim()
  const fromEmail = email.value.trim()

  if (fromName.length < 2) {
    error.value = 'Укажите имя.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)) {
    error.value = 'Укажите корректный email.'
    return
  }
  if (text.length < 10) {
    error.value = 'Опишите задачу хотя бы в нескольких предложениях.'
    logger.warn('contact validation failed', { length: text.length })
    return
  }

  sending.value = true
  logger.info('contact form submit', { length: text.length })

  try {
    if (site.web3formsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: 'Запрос с сайта CAD · BIM · Production',
          name: fromName,
          email: fromEmail,
          message: text,
        }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Ошибка отправки')
      }
    } else {
      // Без ключа: FormSubmit.co → письмо на site.contact.email (первый раз — подтверждение на почте)
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.contact.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fromName,
          email: fromEmail,
          message: text,
          _subject: 'Запрос с сайта CAD · BIM · Production',
        }),
      })
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
    }

    sent.value = true
    message.value = ''
    name.value = ''
    email.value = ''
    logger.info('contact form sent ok')
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    error.value =
      'Не удалось отправить. Напишите в Telegram или на email — или проверьте настройки формы в README.'
    logger.error('contact form failed', { msg })
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container contact-grid">
      <div>
        <div class="section-head">
          <p class="eyebrow">Контакт</p>
          <h2>Оставить заявку</h2>
          <p class="section-lead">
            Платформа (Revit / КОМПАС / web), формат данных, срок. При необходимости
            подпишем соглашение о неразглашении.
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
      <form class="contact-form" @submit.prevent="submit">
        <label for="contact-name">Имя</label>
        <input id="contact-name" v-model="name" type="text" autocomplete="name" placeholder="Иван" />

        <label for="contact-email">Email</label>
        <input
          id="contact-email"
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="you@company.ru"
        />

        <label for="msg">Сообщение</label>
        <textarea
          id="msg"
          v-model="message"
          rows="5"
          placeholder="Нужен add-in Revit для… / автоматизация spec в КОМПАС…"
        />
        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="sent" class="form-ok">Сообщение отправлено. Отвечу на указанный email.</p>
        <button type="submit" class="btn btn-primary" :disabled="sending">
          {{ sending ? 'Отправка…' : 'Отправить' }}
        </button>
      </form>
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

.contact-form input {
  padding: 0.7rem 0.85rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 1.05rem;
  margin-bottom: 0.35rem;
}

.contact-form input:focus {
  outline: none;
  border-color: var(--accent);
}

.contact-form button:disabled {
  opacity: 0.6;
  cursor: wait;
}
</style>
