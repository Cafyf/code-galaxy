import { createRouter, createWebHistory } from "vue-router";
import CodeEditor from "../components/code-editor/CodeEditor.vue";
import CodeEditorContainer from "../components/code-editor-container/CodeEditorContainer.vue"
import QuestionsGroups from "../components/questions-group/QuestionsGroups.vue"
import HomePage from"../components/home/HomePage.vue"
import ProgressQuestions from"../components/progress/progress-questions-detail/ProgressQuestions.vue"
import SubmissionDetails from"../components/progress/submission-details/SubmissionDetails.vue"
import SessionCard from"../components/user-session/session-card/SessionCard.vue"
import SessionActives from"../components/user-session/session-actives/SessionActives.vue"
import LoginPage from "../components/auth/login/LoginPage.vue"
import SignupPage  from "../components/auth/signup/SignupPage.vue"
import HeaderSection from "../components/header/HeaderSection.vue"
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
    component: SessionCard,
    meta: { requiresAuth: true }
  },
  {
    path: "/session",
    name: "sessionActives",
    component: SessionActives,
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
    component: ProgressQuestions,
    meta: { requiresAuth: true }
  },
  {
    path: "/submission",
    name: "submissionDetails",
    component: SubmissionDetails,
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
