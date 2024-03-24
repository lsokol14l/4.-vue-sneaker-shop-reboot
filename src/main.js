import "./assets/main.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import Home from "./pages/Home.vue";
import Favorites from "./pages/Favorites.vue";

const app = createApp(App);

//найстройка роутов(start)

const routes = [
  {
    path: `/`,
    name: "Home",
    component: Home,
  },
  {
    path: `/favorites`,
    name: "Favorites",
    component: Favorites,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//найстройка роутов(end)

app.use(autoAnimatePlugin);
app.use(router);
app.mount("#app");
