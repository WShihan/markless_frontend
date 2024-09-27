import { createApp } from 'vue';
import App from './App.vue';
import { registerElement } from '@/element';

const app = createApp(App);
registerElement(app);
app.mount('#app');
