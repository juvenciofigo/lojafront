import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { useVuelidate } from "@vuelidate/core";
import "./assets/tailwind.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createHead } from "@unhead/vue";

loadFonts();

const app = createApp(App);
const head = createHead()

app.use(useVuelidate);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(vuetify);
app.use(head);
app.mount("#app");
