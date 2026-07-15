<script setup lang="ts">
import { computed, ref } from 'vue'
import { services, servicesIntro, pricingTabs, pricingNote, site } from '@/data/content'
import { logger } from '@/lib/logger'

const activeTab = ref(pricingTabs[0]?.id ?? 'revit')

const activePrices = computed(
  () => pricingTabs.find((t) => t.id === activeTab.value)?.items ?? [],
)

function selectTab(id: string) {
  activeTab.value = id
  logger.info('pricing tab', { id })
}

function serviceClick(title: string) {
  logger.info('service interest', { title })
}

function consultClick(where: string) {
  logger.info('consult cta', { where })
}
</script>

<template>
  <section id="services" class="section services-section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Услуги и цены</p>
        <h2>Разработка под ваше ТЗ</h2>
        <p class="section-lead">{{ servicesIntro }}</p>
      </div>

      <div class="service-grid">
        <div
          v-for="s in services"
          :key="s.title"
          class="service-card"
          tabindex="0"
          @click="serviceClick(s.title)"
          @keydown.enter="serviceClick(s.title)"
        >
          <h3>{{ s.title }}</h3>
          <p>{{ s.description }}</p>
        </div>
      </div>

      <div class="pricing-block">
        <h3 class="pricing-heading">Ориентиры по стоимости</h3>
        <div class="price-tabs" role="tablist" aria-label="Платформа">
          <button
            v-for="tab in pricingTabs"
            :key="tab.id"
            type="button"
            role="tab"
            class="price-tab"
            :class="{ active: activeTab === tab.id }"
            :aria-selected="activeTab === tab.id"
            @click="selectTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="pricing-row" role="tabpanel">
          <div v-for="p in activePrices" :key="p.label" class="pricing-card">
            <span class="pricing-label">{{ p.label }}</span>
            <span class="pricing-value">{{ p.value }}</span>
            <span v-if="p.note" class="pricing-note">{{ p.note }}</span>
          </div>
        </div>
        <p class="pricing-footnote">{{ pricingNote }}</p>
      </div>

      <div class="consult-banner">
        <div class="consult-copy">
          <p class="consult-badge">Бесплатно</p>
          <h3>Консультация по задаче</h3>
          <p>
            Разберём процесс и объём бесплатно, помогу с файловой архитектурой проектов.
            После созвона — смета. Комплект автоматизации оцениваем со скидкой к разрозненным этапам.
          </p>
        </div>
        <div class="consult-actions">
          <a
            href="#contact"
            class="btn btn-primary"
            @click="consultClick('contact')"
          >
            Получить бесплатную консультацию
          </a>
          <a
            v-if="site.contact.telegram"
            class="btn btn-ghost"
            :href="site.contact.telegram"
            target="_blank"
            rel="noopener noreferrer"
            @click="consultClick('telegram')"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-block {
  margin-top: 2.5rem;
}

.pricing-heading {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.consult-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.consult-actions .btn {
  width: 100%;
}

@media (min-width: 800px) {
  .consult-actions {
    align-items: stretch;
    min-width: 260px;
  }
}

.price-tabs {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 0.15rem;
}

.price-tabs::-webkit-scrollbar {
  display: none;
}

.price-tab {
  flex: 0 0 auto;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  padding: 0.55rem 1rem;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

@media (min-width: 640px) {
  .price-tabs {
    flex-wrap: wrap;
    overflow: visible;
  }
}


.price-tab:hover {
  color: var(--text);
  border-color: var(--accent-dim);
}

.price-tab.active {
  color: #0a121c;
  background: var(--accent);
  border-color: var(--accent);
}

.pricing-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.pricing-footnote {
  margin: 1rem 0 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.consult-banner {
  margin-top: 2.5rem;
  padding: 1.25rem;
  display: grid;
  gap: 1.25rem;
  align-items: center;
  background: linear-gradient(135deg, rgba(74, 168, 255, 0.12), transparent 60%),
    var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
}

@media (min-width: 800px) {
  .consult-banner {
    padding: 1.5rem 1.75rem;
    grid-template-columns: 1fr auto;
  }
}

.consult-badge {
  display: inline-block;
  margin: 0 0 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.consult-copy h3 {
  margin-bottom: 0.5rem;
}

.consult-copy p:last-child {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
}
</style>
