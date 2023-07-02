import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHashHistory } from "vue-router";
import SideMenu from "@/layouts/side-menu/Main.vue";
import SimpleMenu from "@/layouts/simple-menu/Main.vue";
import TopMenu from "@/layouts/top-menu/Main.vue";
import Dashboard from "@/views/dashboard/Main.vue";
import Satuan from "@/views/satuan/Main.vue";
import BarangKeluar from "@/views/BarangKeluar/Main.vue";
import Barang from "@/views/barang/Main.vue";
import Login from "@/views/login/Main.vue";
import ErrorPage from "@/views/ErrorPage/Main.vue";
import Supplier from "@/views/supplier/Main.vue";
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
import FAQ from "@/views/FAQ/Main.vue";
import SKKP from "@/views/SKKP/Main.vue";

const routes = [
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/",
        name: "top-menu-dashboard",
        component: Dashboard,
        meta: { authorize: [] },
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
        meta: { authorize: [] },
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
        meta: { authorize: [] },
      },
      {
        path: "penjualan",
        name: "top-menu-penjualan",
        component: Penjualan,
        meta: { authorize: [] },
      },
      {
        path: "retur",
        name: "top-menu-retur",
        component: Retur,
        meta: { authorize: [] },
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
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "laporan-penjualan",
        name: "top-menu-laporan-penjualan",
        component: LaporanPenjualan,
        meta: { authorize: [] },
      },
      {
        path: "laporan-pembelian",
        name: "top-menu-laporan-pembelian",
        component: LaporanPembelian,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "laporan-stok",
        name: "top-menu-laporan-stok",
        component: LaporanStok,
        meta: { authorize: [] },
      },
      {
        path: "semua-akun",
        name: "top-menu-semua-akun",
        component: Users,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "bantuan",
        name: "top-menu-bantuan",
        component: FAQ,
        meta: { authorize: [] },
      },
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
        meta: { authorize: [] },
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
        meta: { authorize: [] },
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
        meta: { authorize: [] },
      },
      {
        path: "penjualan",
        name: "side-menu-penjualan",
        component: Penjualan,
        meta: { authorize: [] },
      },
      {
        path: "retur",
        name: "side-menu-retur",
        component: Retur,
        meta: { authorize: [] },
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
        meta: { authorize: [] },
      },
      {
        path: "laporan-penjualan",
        name: "side-menu-laporan-penjualan",
        component: LaporanPenjualan,
        meta: { authorize: [] },
      },
      {
        path: "laporan-pembelian",
        name: "side-menu-laporan-pembelian",
        component: LaporanPembelian,
        meta: { authorize: [] },
      },
      {
        path: "laporan-stok",
        name: "side-menu-laporan-stok",
        component: LaporanStok,
        meta: { authorize: [] },
      },
      {
        path: "semua-akun",
        name: "side-menu-semua-akun",
        component: Users,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "bantuan",
        name: "side-menu-bantuan",
        component: FAQ,
        meta: { authorize: [] },
      },
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
        meta: { authorize: [] },
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
        meta: { authorize: [] },
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
        meta: { authorize: [] },
      },
      {
        path: "penjualan",
        name: "simple-menu-penjualan",
        component: Penjualan,
        meta: { authorize: [] },
      },
      {
        path: "retur",
        name: "simple-menu-retur",
        component: Retur,
        meta: { authorize: [] },
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
        meta: { authorize: [] },
      },
      {
        path: "laporan-penjualan",
        name: "simple-menu-laporan-penjualan",
        component: LaporanPenjualan,
        meta: { authorize: [] },
      },
      {
        path: "laporan-pembelian",
        name: "simple-menu-laporan-pembelian",
        component: LaporanPembelian,
        meta: { authorize: [] },
      },
      {
        path: "laporan-stok",
        name: "simple-menu-laporan-stok",
        component: LaporanStok,
        meta: { authorize: [] },
      },
      {
        path: "semua-akun",
        name: "simple-menu-semua-akun",
        component: Users,
        meta: { authorize: ["Super Admin"] },
      },
      {
        path: "bantuan",
        name: "simple-menu-bantuan",
        component: FAQ,
        meta: { authorize: [] },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/syarat&ketentuan",
    name: "term-page",
    component: SKKP,
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
  // history: createWebHistory(),
  history: createWebHashHistory("/abadan-land-arrangement/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const currentUser = auth.items;
  if (authorize) {
    if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return next({ path: "/login" });
    }
    if (authorize.length && !authorize.includes(currentUser.role)) {
      alert("Role Akun Anda, Tidak Bisa Mengakses Halaman ini !");
      return next({ path: "/" });
    }
  }
  next();
});

export default router;
