import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "side-menu-dashboard",
        title: "Dashboard",
      },
      {
        icon: "DollarSignIcon",
        pageName: "side-menu-transaksi",
        title: "Transaksi",
        subMenu: [
          {
            icon: "CornerLeftUpIcon",
            pageName: "side-menu-penjualan",
            title: "Penjualan",
          },
          {
            icon: "CornerLeftDownIcon",
            pageName: "side-menu-pembelian",
            title: "Pembelian",
          },
          {
            icon: "RepeatIcon",
            pageName: "side-menu-retur",
            title: "Retur",
          },
          {
            icon: "ChevronsUpIcon",
            pageName: "side-menu-barang-keluar",
            title: "Barang Keluar",
          },
          {
            icon: "ChevronsDownIcon",
            pageName: "side-menu-barang-masuk",
            title: "Barang Masuk",
          },
          {
            icon: "PackageIcon",
            pageName: "side-menu-stok-lokal",
            title: "Stok Lokal",
          },
        ],
      },
      {
        icon: "FileTextIcon",
        pageName: "side-menu-laporan",
        title: "Laporan",
        subMenu: [
          {
            icon: "FileUpIcon",
            pageName: "side-menu-laporan-penjualan",
            title: "Laporan Penjualan",
          },
          {
            icon: "FileDownIcon",
            pageName: "side-menu-laporan-pembelian",
            title: "Laporan Pembelian",
          },
          {
            icon: "FileBoxIcon",
            pageName: "side-menu-laporan-stok",
            title: "Laporan Stok",
          },
        ],
      },
      {
        icon: "SlidersIcon",
        pageName: "side-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "GlobeIcon",
            pageName: "side-menu-barang",
            title: "Barang",
          },
          {
            icon: "ContactIcon",
            pageName: "side-menu-pelanggan",
            title: "Pelanggan",
          },
          {
            icon: "TentIcon",
            pageName: "side-menu-outlet",
            title: "Outlet",
          },
          {
            icon: "TruckIcon",
            pageName: "side-menu-supplier",
            title: "Supplier",
          },
          {
            icon: "UsersIcon",
            pageName: "side-menu-semua-akun",
            title: "Semua Akun",
          },
          {
            icon: "InfoIcon",
            pageName: "side-menu-satuan",
            title: "Satuan",
          },
        ],
      },
      {
        icon: "LayoutIcon",
        pageName: "side-menu-menu-layout",
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
