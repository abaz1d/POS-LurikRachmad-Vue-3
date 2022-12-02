import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/side-menu/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import Page1 from "../views/page-1/Main.vue";
import Page2 from "../views/page-2/Main.vue";
import Satuan from "../views/satuan/Main.vue";

const routes = [
  {
    path: "/side-menu",
    component: SideMenu,
    children: [
      {
        path: "page-1",
        name: "side-menu-dashboard",
        component: Page1,
      },
      {
        path: "page-2",
        name: "side-menu-page-2",
        component: Page2,
      },
      {
        path: "satuan",
        name: "side-menu-satuan",
        component: Satuan,
      }
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "page-1",
        name: "simple-menu-dashboard",
        component: Page1,
      },
      {
        path: "page-2",
        name: "simple-menu-page-2",
        component: Page2,
      },
    ],
  },
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-dashboard",
        component: Page1,
      },
      {
        path: "page-2",
        name: "top-menu-page-2",
        component: Page2,
      },
      {
        path: "satuan",
        name: "top-menu-satuan",
        component: Satuan,
      }

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
