import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { InstallCodemirro } from "codemirror-editor-vue3";
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.esm"
import "bootstrap/js/src/dropdown"
createApp(App).use(InstallCodemirro).use(store).use(router).mount("#app");