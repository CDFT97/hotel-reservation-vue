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
      {
        name: "bookings.create",
        path: "/bookings/create",
        component: () => import("@/pages/Bookings/Create.vue"),
      },
      {
        name: "clients.index",
        path: "/clients",
        component: () => import("@/pages/Clients/Index.vue"),
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
