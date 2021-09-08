import { createApp } from "vue";
import { store, key } from "./tools/store";
import { router } from "./tools/router";
import App from "./components/App.vue";

createApp(App).use(store, key).use(router).mount("#app");
