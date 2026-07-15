<script setup lang="ts">
import { site } from '@/data/content'
import { logger } from '@/lib/logger'

function openDemo() {
  logger.info('deskreview section cta', { url: site.deskReviewUrl })
}
</script>

<template>
  <section id="deskreview" class="section deskreview-section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Своя разработка</p>
        <h2>DeskReview 1.0 — PDF и 3D в браузере</h2>
        <p class="section-lead">
          Чертёж и модель без установки CAD: вкладки 2D / 3D / Рядом, замечания со статусами,
          измерения и сечения. Файлы остаются у вас в браузере — без регистрации и облака.
        </p>
      </div>
      <div class="deskreview-panel">
        <div class="panel-mock">
          <div class="mock-toolbar">
            <span />
            <span />
            <span />
          </div>
          <div class="mock-split">
            <div class="mock-pane mock-pdf">
              <span class="mock-label">PDF</span>
            </div>
            <div class="mock-pane mock-3d">
              <span class="mock-label">3D</span>
              <div class="mock-orbit" />
            </div>
          </div>
        </div>
        <ul class="feature-list">
          <li>PDF-ревью: пометки, статусы замечаний, sidecar / flattened export</li>
          <li>3D: дерево сборки, измерения, сечения, анимация</li>
          <li>Режим «Рядом» — PDF и модель на одном экране</li>
          <li>STEP / STL / IGES / GLB · скриншот-отчёт в PDF</li>
        </ul>
      </div>
      <a
        class="btn btn-primary"
        :href="site.deskReviewUrl"
        target="_blank"
        rel="noopener"
        @click="openDemo"
      >
        Открыть DeskReview →
      </a>
    </div>
  </section>
</template>
