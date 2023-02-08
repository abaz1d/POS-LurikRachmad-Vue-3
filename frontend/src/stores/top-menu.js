import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useTopMenuStore = defineStore("topMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "top-menu-dashboard",
        title: "Dashboard",
      },
      {
        icon: "DollarSignIcon",
        pageName: "top-menu-transaksi",
        title: "Transaksi",
        subMenu: [
          {
            icon: "CornerLeftUpIcon",
            pageName: "top-menu-penjualan",
            title: "Penjualan",
          },
          {
            icon: "CornerLeftDownIcon",
            pageName: "top-menu-pembelian",
            title: "Pembelian",
          },
          {
            icon: "RepeatIcon",
            pageName: "top-menu-retur",
            title: "Retur",
          },
          {
            icon: "ChevronsUpIcon",
            pageName: "top-menu-barang-keluar",
            title: "Barang Keluar",
          },
          {
            icon: "ChevronsDownIcon",
            pageName: "top-menu-barang-masuk",
            title: "Barang Masuk",
          },
          {
            icon: "PackageIcon",
            pageName: "top-menu-stok-lokal",
            title: "Stok Lokal",
          },
        ],
      },
      {
        icon: "FileTextIcon",
        pageName: "top-menu-laporan",
        title: "Laporan",
        subMenu: [
          {
            icon: "FileUpIcon",
            pageName: "top-menu-laporan-penjualan",
            title: "Laporan Penjualan",
          },
          {
            icon: "FileDownIcon",
            pageName: "top-menu-laporan-pembelian",
            title: "Laporan Pembelian",
          },
          {
            icon: "FileBoxIcon",
            pageName: "top-menu-laporan-stok",
            title: "Laporan Stok",
          },
        ],
      },
      {
        icon: "SlidersIcon",
        pageName: "top-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "GlobeIcon",
            pageName: "top-menu-barang",
            title: "Barang",
          },
          {
            icon: "ContactIcon",
            pageName: "top-menu-pelanggan",
            title: "Pelanggan",
          },
          {
            icon: "TentIcon",
            pageName: "top-menu-outlet",
            title: "Outlet",
          },
          {
            icon: "TruckIcon",
            pageName: "top-menu-supplier",
            title: "Supplier",
          },
          {
            icon: "UsersIcon",
            pageName: "top-menu-semua-akun",
            title: "Semua Akun",
          },
          {
            icon: "InfoIcon",
            pageName: "top-menu-satuan",
            title: "Satuan",
          },
        ],
      },
      {
        icon: "LayoutIcon",
        pageName: "top-menu-menu-layout",
        title: "Menu Layout",
        subMenu: [
          {
            icon: "CreditCardIcon",
            pageName: "top-menu-dashboard",
            title: "Top Menu",
            ignore: true,
          },
          {
            icon: "ColumnsIcon",
            pageName: "side-menu-dashboard",
            title: "Side Menu",
            ignore: true,
          },
          {
            icon: "SidebarIcon",
            pageName: "simple-menu-dashboard",
            title: "Simple Menu",
            ignore: true,
          },
        ],
      },
    ],
  }),
  getters: {
    items: (state) =>
      state.menu.filter((item) => {
        const Auth = useAuthStore();
        const Role = Auth.items.role;
        const Title = item.title;

        //Jika Role Selain Super Admin Menu Pengaturan Data Tidak Tersedia
        if (Role !== "Super Admin") {
          return Title !== "Pengaturan Data";
        } else {
          return item;
        }
      }),
  },
});
