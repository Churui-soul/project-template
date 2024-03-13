import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// css
import 'virtual:uno.css'

// pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
