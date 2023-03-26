import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { InstallCodemirro } from "codemirror-editor-vue3";
//import CodeTest from "../src/components/CodeTest.vue";

createApp(App).use(InstallCodemirro).use(store).use(router).mount("#app");
