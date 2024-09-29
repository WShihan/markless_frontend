import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from "@/store/pinia.js";
import router from "./router.js";
import { registerElement } from '@/element';
import directive from '@/directives'

import "nprogress/nprogress.css";

// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;


const app = createApp(App);
registerElement(app);
app.use(directive)
app.use(pinia)
app.use(router);
app.mount('#app');
