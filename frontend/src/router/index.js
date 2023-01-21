import { useAuthStore } from "@/stores/auth";

import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "@/layouts/side-menu/Main.vue";
import SimpleMenu from "@/layouts/simple-menu/Main.vue";
import TopMenu from "@/layouts/top-menu/Main.vue";
import Dashboard from "@/views/Dashboard/Main.vue";
import Page2 from "@/views/page-2/Main.vue";
import Satuan from "@/views/Satuan/Main.vue";
import BarangKeluar from "@/views/BarangKeluar/Main.vue";
import Barang from "@/views/Barang/Main.vue";
import Login from "@/views/Login/Main.vue";
import Register from "@/views/Register/Main.vue";
import ErrorPage from "@/views/ErrorPage/Main.vue";
import Supplier from "@/views/Supplier/Main.vue";
import Outlet from "@/views/Outlet/Main.vue";
import Pelanggan from "@/views/Pelanggan/Main.vue";
import BarangMasuk from "@/views/BarangMasuk/Main.vue";
import Penjualan from "@/views/Penjualan/Main.vue";
import Pembelian from "@/views/Pembelian/Main.vue";
import Retur from "@/views/Retur/Main.vue";
import StokLokal from "@/views/StokLokal/Main.vue";
import LaporanPenjualan from "@/views/Laporan/LaporanPenjualan.vue";
import LaporanPembelian from "@/views/Laporan/LaporanPembelian.vue";
import LaporanStok from "@/views/Laporan/LaporanStok.vue";
import Users from "@/views/Users/Main.vue";

const routes = [
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
        meta: { authorize: ["Super Admin"] },
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
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "supplier",
        name: "top-menu-supplier",
        component: Supplier,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "outlet",
        name: "top-menu-outlet",
        component: Outlet,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "pelanggan",
        name: "top-menu-pelanggan",
        component: Pelanggan,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "barang-masuk",
        name: "top-menu-barang-masuk",
        component: BarangMasuk,
      },
      {
        path: "penjualan",
        name: "top-menu-penjualan",
        component: Penjualan,
      },
      {
        path: "retur",
        name: "top-menu-retur",
        component: Retur,
      },
      {
        path: "stok-lokal",
        name: "top-menu-stok-lokal",
        component: StokLokal,
        meta: { authorize: ["Super Admin", "Admin"] },
      },
      {
        path: "pembelian",
        name: "top-menu-pembelian",
        component: Pembelian,
      },
      {
        path: "laporan-penjualan",
        name: "top-menu-laporan-penjualan",
        component: LaporanPenjualan,
      },
      {
        path: "laporan-pembelian",
        name: "top-menu-laporan-pembelian",
        component: LaporanPembelian
      },
      {
        path: "laporan-stok",
        name: "top-menu-laporan-stok",
        component: LaporanStok
      },
      {
        path: "semua-akun",
        name: "top-menu-semua-akun",
        component: Users,
        meta: { authorize: ["Super Admin"] },
      }
    ],
  },
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
        meta: { authorize: ["Super Admin"] },
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
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "supplier",
        name: "side-menu-supplier",
        component: Supplier,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "outlet",
        name: "side-menu-outlet",
        component: Outlet,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "pelanggan",
        name: "side-menu-pelanggan",
        component: Pelanggan,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "barang-masuk",
        name: "side-menu-barang-masuk",
        component: BarangMasuk,
      },
      {
        path: "penjualan",
        name: "side-menu-penjualan",
        component: Penjualan,
      },
      {
        path: "retur",
        name: "side-menu-retur",
        component: Retur,
      },
      {
        path: "stok-lokal",
        name: "side-menu-stok-lokal",
        component: StokLokal,
        meta: { authorize: ["Super Admin", "Admin"] },
      },
      {
        path: "pembelian",
        name: "side-menu-pembelian",
        component: Pembelian,
      },
      {
        path: "laporan-penjualan",
        name: "side-menu-laporan-penjualan",
        component: LaporanPenjualan,
      },
      {
        path: "laporan-pembelian",
        name: "side-menu-laporan-pembelian",
        component: LaporanPembelian
      },
      {
        path: "laporan-stok",
        name: "side-menu-laporan-stok",
        component: LaporanStok
      },
      {
        path: "semua-akun",
        name: "side-menu-semua-akun",
        component: Users,
        meta: { authorize: ["Super Admin"] },
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
        meta: { authorize: ["Super Admin"] },
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
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "supplier",
        name: "simple-menu-supplier",
        component: Supplier,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "outlet",
        name: "simple-menu-outlet",
        component: Outlet,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "pelanggan",
        name: "simple-menu-pelanggan",
        component: Pelanggan,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "barang-masuk",
        name: "simple-menu-barang-masuk",
        component: BarangMasuk,
      },
      {
        path: "penjualan",
        name: "simple-menu-penjualan",
        component: Penjualan,
      },
      {
        path: "retur",
        name: "simple-menu-retur",
        component: Retur,
      },
      {
        path: "stok-lokal",
        name: "simple-menu-stok-lokal",
        component: StokLokal,
        meta: { authorize: ["Super Admin", "Admin"] },
      },
      {
        path: "pembelian",
        name: "simple-menu-pembelian",
        component: Pembelian,
      },
      {
        path: "laporan-penjualan",
        name: "simple-menu-laporan-penjualan",
        component: LaporanPenjualan,
      },
      {
        path: "laporan-pembelian",
        name: "simple-menu-laporan-pembelian",
        component: LaporanPembelian
      },
      {
        path: "laporan-stok",
        name: "simple-menu-laporan-stok",
        component: LaporanStok
      },
      {
        path: "semua-akun",
        name: "simple-menu-semua-akun",
        component: Users,
        meta: { authorize: ["Super Admin"] },
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {

  const { authorize } = to.meta;

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const currentUser = auth.items
  //console.log("auth required", auth.user)
  if (authorize) {

    if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      //return '/login';
      return next({ path: "/login" });
    }
    if (authorize.length && !authorize.includes(currentUser.role)) {
      //console.log('user beda', to.matched[1].props)
      alert("Role Akun Anda, Tidak Bisa Mengakses Halaman ini !");
      return next({ path: "/" })
    }
  }
  next()
});

export default router;
