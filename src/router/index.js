import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    component: () => import("../pages/master/Dashboard.vue"),
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("@/pages/Home.vue"),
      },
    ],
  },
];
const router = Router();
export default router;
function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes,
  });
  return router;
}
