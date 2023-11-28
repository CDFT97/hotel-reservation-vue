import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import css
import './assets/css/app.css'

// import router
import router from './router'

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_API
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueSweetalert2);
app.mount('#app')
