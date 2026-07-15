import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installGlobalErrorHandlers } from './lib/logger'
import './assets/main.css'

installGlobalErrorHandlers()

createApp(App).use(router).mount('#app')
