import { createRouter, createWebHistory } from "vue-router";
import CodeEditor from "../components/CodeEditor.vue";
import CodeEditorContainer from "../components/CodeEditorContainer.vue"
import QuestionsGroups from "../components/QuestionsGroups.vue"
import HomePage from"../components/HomePage.vue"
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/code",
    name: "CodeEditor",
    component: CodeEditor,
  },
  {
    path: "/c",
    name: "CodeEditorContainer",
    component: CodeEditorContainer,
    props: route => ({ name: route.query.name })
    // use props instead of /c:name
  },
  {
    path: "/q",
    name: "QuestionsGroups",
    component: QuestionsGroups,
    props: route => ({ topic: JSON.parse(decodeURIComponent(route.query.topic))})
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
