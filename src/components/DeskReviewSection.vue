<script setup lang="ts">
import { logger } from '@/lib/logger'

function openDemo() {
  logger.info('deskreview section cta')
}
</script>

<template>
  <section id="deskreview" class="section deskreview-section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Продукт</p>
        <h2>DeskReview — согласование PDF и 3D в браузере</h2>
        <p class="section-lead">
          PDF-чертеж и 3D-модель в одной вкладке: замечания, измерения, скриншот-отчёт.
          STEP / STL / IGES / GLB — без CAD у получателя.
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
          <li>Мультимодельная сборка и измерения</li>
          <li>Замечания на PDF и 3D, экспорт отчёта</li>
          <li>STEP через WASM или серверную конвертацию</li>
          <li>Режим «Производство (QR)» для цеха</li>
        </ul>
      </div>
      <RouterLink to="/app" class="btn btn-primary" @click="openDemo">Открыть 3D вьювер →</RouterLink>
    </div>
  </section>
</template>
