import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:server",
      name: "gallery",
      props: true,
      component: () => import("../views/ServerGallery.vue"),
    },
    {
      path: "/:server/:artwork",
      name: "artwork",
      props: true,
      component: () => import("../views/ArtworkView.vue"),
    },
  ],
});

export default router;
