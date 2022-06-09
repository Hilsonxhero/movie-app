import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/sass/main.scss'
import router from './router'
import store from './store'
import { initInlineSvg } from "@/core/plugins/inline-svg";
import ApiService from "@/core/services/ApiService";
const app = createApp(App)
ApiService.init(app);
initInlineSvg(app)
app.use(router)
app.use(store)
app.mount('#app')
