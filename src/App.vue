<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main">К содержанию</a>
    <SiteHeader />
    <main id="main">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
