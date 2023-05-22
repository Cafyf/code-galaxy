import { createRouter, createWebHistory } from "vue-router";
import CodeEditor from "../components/CodeEditor.vue";
import CodeEditorContainer from "../components/CodeEditorContainer.vue"
import QuestionsGroups from "../components/QuestionsGroups.vue"
import HomePage from"../components/HomePage.vue"
import progressQuestions from"../components/progressors/progressQuestions.vue"
import submissionDetails from"../components/progressors/submissionDetails.vue"
import sessionCard from"../components/cards/sessionCard.vue"
import sessionActives from"../components/cards/sessionActives.vue"
import LoginPage from "../components/users/LoginPage.vue"
import SignupPage  from "../components/users/SignupPage.vue"
import HeaderSection from "../components/HeaderSection.vue"
const routes = [
  {
    path: "/h",
    name: "HeaderSection",
    component: HeaderSection
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/signIn",
    name: "SignupPage",
    component: SignupPage
  },
  {
    path: "/card",
    name: "sessionCard",
    component: sessionCard,
    meta: { requiresAuth: true }
  },
  {
    path: "/session",
    name: "sessionActives",
    component: sessionActives,
    meta: { requiresAuth: true }
  },
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/code",
    name: "CodeEditor",
    component: CodeEditor,
    meta: { requiresAuth: true }
  },
  {
    path: "/progress",
    name: "progress",
    component: progressQuestions,
    meta: { requiresAuth: true }
  },
  {
    path: "/submission",
    name: "submissionDetails",
    component: submissionDetails,
    meta: { requiresAuth: true }
  },
  {
    path: "/c",
    name: "CodeEditorContainer",
    component: CodeEditorContainer,
    props: route => ({ name: route.query.name, option: route.query.option }),
    meta: { requiresAuth: true }
    // use props instead of /c:name
  },
  {
    path: "/q",
    name: "QuestionsGroups",
    component: QuestionsGroups,
    props: route => ({ topic: JSON.parse(decodeURIComponent(route.query.topic))}),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const isAuthenticated = checkIfUserIsAuthenticated(); // Implement your own logic to check if the user is authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect the user to the login page or any other appropriate page
    next('/login');
  } else {
    next();
  }
});

function checkIfUserIsAuthenticated(){
  const user = localStorage.getItem("user-info");
  if(!user){
    return false;
  } else return true;
}

export default router;
