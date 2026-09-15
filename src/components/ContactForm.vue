<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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
const formEl = ref<HTMLFormElement | null>(null)

watch(
  () => props.initialPlatform,
  (v) => {
    if (v) platform.value = v
  },
)

onMounted(() => {
  const params = new URLSearchParams(location.search)
  if (params.get('sent') === '1') {
    sent.value = true
    logger.info('contact form returned after redirect', { origin: location.origin })
    params.delete('sent')
    const q = params.toString()
    const next = `${location.pathname}${q ? `?${q}` : ''}${location.hash || '#contact'}`
    history.replaceState({}, '', next)
  }
})

function platformLabel(value: string) {
  return platformOptions.find((o) => o.value === value)?.label ?? ''
}

const composedMessage = computed(() => {
  const text = message.value.trim()
  const plat = platformLabel(platform.value)
  return plat && plat !== 'Не выбрано' ? `Платформа: ${plat}\n\n${text}` : text
})

const redirectUrl = computed(() => {
  if (typeof location === 'undefined') return 'https://vorobjev.pro/?sent=1#contact'
  return `${location.origin}${location.pathname}?sent=1#contact`
})

function validate(): boolean {
  error.value = ''
  sent.value = false

  if (name.value.trim().length < 2) {
    error.value = 'Укажите имя.'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    error.value = 'Укажите корректный email.'
    return false
  }
  if (message.value.trim().length < 10) {
    error.value = 'Опишите задачу хотя бы в нескольких предложениях.'
    logger.warn('contact validation failed', { length: message.value.trim().length })
    return false
  }
  return true
}

/** Запасной путь без CORS: FormSubmit ajax */
async function submitViaFormSubmit(fullMessage: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.contact.email)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      message: fullMessage,
      _subject: 'Заявка с сайта CAD · BIM · Production',
    }),
  })
  const raw = await res.text()
  logger.info('contact form response', { status: res.status, raw: raw.slice(0, 200), mode: 'formsubmit' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  sent.value = true
  message.value = ''
  name.value = ''
  email.value = ''
  if (!props.hidePlatformSelect) platform.value = props.initialPlatform || ''
}

async function submit(e: Event) {
  e.preventDefault()
  if (!validate()) return

  const origin = location.origin
  const hasKey = Boolean(site.web3formsKey)
  sending.value = true

  logger.info('contact form submit', {
    length: message.value.trim().length,
    platform: platform.value,
    origin,
    hasKey,
    mode: hasKey ? 'web3forms-native' : 'formsubmit',
  })

  try {
    if (site.web3formsKey && formEl.value) {
      // Обычный HTML POST — без fetch/CORS. Web3Forms вернёт на redirectUrl с ?sent=1.
      logger.info('contact form native post', { redirect: redirectUrl.value })
      formEl.value.submit()
      return
    }

    await submitViaFormSubmit(composedMessage.value)
    logger.info('contact form sent ok', { origin, mode: 'formsubmit' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    const isCors =
      /Failed to fetch|NetworkError|CORS|Load failed/i.test(msg) ||
      (err instanceof TypeError && msg.toLowerCase().includes('fetch'))
    error.value = isCors
      ? 'Не удалось отправить из браузера (сеть/CORS). Напишите в Telegram или на email.'
      : `Не удалось отправить: ${msg}. Напишите в Telegram или на email.`
    logger.error('contact form failed', { msg, origin, hasKey, isCors })
  } finally {
    // native submit уходит со страницы — finally всё равно сработает до unload
    sending.value = false
  }
}
</script>

<template>
  <form
    ref="formEl"
    class="contact-form"
    :class="{ compact }"
    action="https://api.web3forms.com/submit"
    method="POST"
    @submit="submit"
  >
    <input v-if="site.web3formsKey" type="hidden" name="access_key" :value="site.web3formsKey" />
    <input type="hidden" name="subject" value="Заявка с сайта CAD · BIM · Production" />
    <input type="hidden" name="from_name" :value="name.trim()" />
    <input type="hidden" name="replyto" :value="email.trim()" />
    <input type="hidden" name="redirect" :value="redirectUrl" />
    <input type="hidden" name="message" :value="composedMessage" />
    <!-- honeypot -->
    <input type="checkbox" name="botcheck" class="botcheck" tabindex="-1" autocomplete="off" />

    <label :for="`${idPrefix}-name`">Имя</label>
    <input
      :id="`${idPrefix}-name`"
      v-model="name"
      name="name"
      type="text"
      autocomplete="name"
      placeholder="Иван"
    />

    <label :for="`${idPrefix}-email`">Email</label>
    <input
      :id="`${idPrefix}-email`"
      v-model="email"
      name="email"
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

.botcheck {
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
  pointer-events: none;
}

.contact-form input:not(.botcheck),
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

.contact-form label:first-of-type {
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
