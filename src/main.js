import './style.css'

import App from './App.vue'

import { createApp } from 'vue'

import router from './modules/router'

createApp(App).use(router).mount('#app');

