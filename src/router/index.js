import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CodeTest from "../components/CodeTest.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
