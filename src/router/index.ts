import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "create",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/edit",
    name: "edit",
    component: () => import("../views/Edit.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;