import './assets/main.css'
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Vue3Toastify  from 'vue3-toastify';
const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify,{
    autoClose: 3000,
})

app.mount('#app')
