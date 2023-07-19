import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import indexRouter from "@/router";

const app = createApp(App)

app.use(indexRouter)
app.use(createPinia())
app.mount('#app')

