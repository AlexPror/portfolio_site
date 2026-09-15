<script setup lang="ts">
import { ref, watch } from 'vue'
import { site, platformOptions } from '@/data/content'
import { logger } from '@/lib/logger'

const props = withDefaults(
  defineProps<{
    initialPlatform?: string
    hidePlatformSelect?: boolean
    idPrefix?: string
    compact?: boolean
  }>(),
  {
    initialPlatform: '',
    hidePlatformSelect: false,
    idPrefix: 'contact',
    compact: false,
  },
)

const name = ref('')
const email = ref('')
const platform = ref(props.initialPlatform)
const message = ref('')
const sending = ref(false)
const sent = ref(false)
const error = ref('')

watch(
  () => props.initialPlatform,
  (v) => {
    if (v) platform.value = v
  },
)

function platformLabel(value: string) {
  return platformOptions.find((o) => o.value === value)?.label ?? ''
}

async function submit() {
  error.value = ''
  sent.value = false

  const text = message.value.trim()
  const fromName = name.value.trim()
  const fromEmail = email.value.trim()
  const plat = platformLabel(platform.value)

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
  logger.info('contact form submit', { length: text.length, platform: platform.value })

  const fullMessage = plat && plat !== 'Не выбрано' ? `Платформа: ${plat}\n\n${text}` : text

  try {
    if (site.web3formsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: 'Заявка с сайта CAD · BIM · Production',
          name: fromName,
          email: fromEmail,
          message: fullMessage,
        }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Ошибка отправки')
      }
    } else {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.contact.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fromName,
          email: fromEmail,
          message: fullMessage,
          _subject: 'Заявка с сайта CAD · BIM · Production',
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
    if (!props.hidePlatformSelect) platform.value = props.initialPlatform || ''
    logger.info('contact form sent ok')
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    error.value = 'Не удалось отправить. Напишите в Telegram или на email.'
    logger.error('contact form failed', { msg })
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form class="contact-form" :class="{ compact }" @submit.prevent="submit">
    <label :for="`${idPrefix}-name`">Имя</label>
    <input :id="`${idPrefix}-name`" v-model="name" type="text" autocomplete="name" placeholder="Иван" />

    <label :for="`${idPrefix}-email`">Email</label>
    <input
      :id="`${idPrefix}-email`"
      v-model="email"
      type="email"
      autocomplete="email"
      placeholder="you@company.ru"
    />

    <template v-if="!hidePlatformSelect">
      <label :for="`${idPrefix}-platform`">Платформа</label>
      <select :id="`${idPrefix}-platform`" v-model="platform" class="contact-select">
        <option v-for="opt in platformOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </template>

    <label :for="`${idPrefix}-msg`">Задача</label>
    <p class="field-hint">Можно списком — чем конкретнее, тем быстрее ответим со сметой.</p>
    <textarea
      :id="`${idPrefix}-msg`"
      v-model="message"
      :rows="compact ? 5 : 6"
      placeholder="1) Что сейчас вручную и сколько занимает&#10;2) Какой результат нужен&#10;3) Версия программы&#10;4) Желаемый срок"
    />
    <p v-if="error" class="form-error">{{ error }}</p>
    <p v-if="sent" class="form-ok">Заявка отправлена. Отвечу на указанный email.</p>
    <button type="submit" class="btn btn-primary" :disabled="sending">
      {{ sending ? 'Отправка…' : 'Отправить' }}
    </button>
  </form>
</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
}

.contact-form input,
.contact-select,
.contact-form textarea {
  padding: 0.85rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-btn);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  margin-bottom: 0.35rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.contact-form textarea {
  resize: vertical;
  min-height: 8rem;
}

.contact-select {
  width: 100%;
  cursor: pointer;
}

.contact-form input:focus,
.contact-select:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-glow);
}

.contact-form button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.contact-form label {
  margin-top: 0.35rem;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.contact-form label:first-child {
  margin-top: 0;
}

.field-hint {
  margin: 0 0 0.45rem;
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--text-muted);
  opacity: 0.9;
}
</style>
