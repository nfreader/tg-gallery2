import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

app.config.globalProperties.validServers = [
  "bagil",
  "campbell",
  "sybil",
  "sybil2",
  "terry",
];

app.directive("decodeHtml", (el, binding) => {
  const doc = new DOMParser().parseFromString(binding.value, "text/html");
  el.innerText = doc.documentElement.textContent;
});