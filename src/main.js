import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { useVuelidate } from '@vuelidate/core';
import './assets/tailwind.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

loadFonts();

const app = createApp(App);

app.use(useVuelidate);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(vuetify);
app.mount('#app');
