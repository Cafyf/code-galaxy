import { createRouter, createWebHistory } from "vue-router";
import CodeEditor from "../components/CodeEditor.vue";
import CodeEditorContainer from "../components/CodeEditorContainer.vue"
const routes = [
  {
    path: "/",
    name: "CodeEditor",
    component: CodeEditor,
  },
  {
    path: "/c",
    name: "CodeEditorContainer",
    component: CodeEditorContainer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
