import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home.vue";
import CreatePost from "./components/post/CreatePost.vue";
import ListPost from "./components/post/ListPost.vue";
import * as VueRouter from 'vue-router'
import RegisterUser from "./components/user/RegisterUser.vue";
import store from './store.ts'
import LoginUser from "./components/user/LoginUser.vue";
import { useStore } from "vuex";
import AuthError from "./components/AuthError.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/post/create", component: CreatePost, meta: { requiresAuth: true } },
  { path: "/post/list", component: ListPost },
  { path: "/user/register", component: RegisterUser },
  { path: "/user/login", component: LoginUser },
  { path: "/user/error", component: AuthError },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    const auth = useStore();

    if (auth.state.isAuthenticated) {
      next();
    } else {
      next("/user/login");
    }
  } else {
    next();
  }
});

createApp(App).use(router).use(store).mount("#app");
