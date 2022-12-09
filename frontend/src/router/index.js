import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/side-menu/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
import TopMenu from "../layouts/top-menu/Main.vue";
import Dashboard from "../views/dashboard/Main.vue";
import Page2 from "../views/page-2/Main.vue";
import Satuan from "../views/satuan/Main.vue";
import BarangKeluar from "../views/BarangKeluar/Main.vue"
import Barang from "../views/barang/Main.vue"

const routes = [
  {
    path: "/side-menu",
    component: SideMenu,
    children: [
      {
        path: "dashboard",
        name: "side-menu-dashboard",
        component: Dashboard,
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
      },
      {
        path: "barang-keluar",
        name: "side-menu-barang-keluar",
        component: BarangKeluar,
      },
      {
        path: "barang",
        name: "side-menu-barang",
        component: Barang,
      }
    ],
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "dashboard",
        name: "simple-menu-dashboard",
        component: Dashboard,
      },
      {
        path: "page-2",
        name: "simple-menu-page-2",
        component: Page2,
      },
      {
        path: "satuan",
        name: "simple-menu-satuan",
        component: Satuan,
      },
      {
        path: "barang-keluar",
        name: "simple-menu-barang-keluar",
        component: BarangKeluar,
      },
      {
        path: "barang",
        name: "simple-menu-barang",
        component: Barang,
      }
    ],
  },
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-dashboard",
        component: Dashboard,
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
      },
      {
        path: "barang-keluar",
        name: "top-menu-barang-keluar",
        component: BarangKeluar,
      },
      {
        path: "barang",
        name: "top-menu-barang",
        component: Barang,
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