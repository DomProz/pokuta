import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/Home.vue";
import CreatePost from "./components/post/CreatePost.vue";
import ListPost from "./components/post/ListPost.vue";
import * as VueRouter from 'vue-router'

const routes = [
  { path: "/", component: Home },
  { path: "/post/create", component: CreatePost },
  { path: "/post/list", component: ListPost },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

createApp(App).use(router).mount("#app");
