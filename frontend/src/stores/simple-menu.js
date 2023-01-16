import { defineStore } from "pinia";

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "simple-menu-dashboard",
        title: "Dashboard",
      },
      {
        icon: "DollarSignIcon",
        pageName: "simple-menu-transaksi",
        title: "Transaksi",
        subMenu: [
          {
            icon: "CornerLeftUpIcon",
            pageName: "simple-menu-penjualan",
            title: "Penjualan",
          },
          {
            icon: "CornerLeftDownIcon",
            pageName: "simple-menu-pembelian",
            title: "Pembelian",
          },
          {
            icon: "RepeatIcon",
            pageName: "simple-menu-retur",
            title: "Retur",
          },
          {
            icon: "ChevronsUpIcon",
            pageName: "simple-menu-barang-keluar",
            title: "Barang Keluar",
          },
          {
            icon: "ChevronsDownIcon",
            pageName: "simple-menu-barang-masuk",
            title: "Barang Masuk",
          },
          {
            icon: "PackageIcon",
            pageName: "simple-menu-stok-lokal",
            title: "Stok Lokal",
          },
        ]
      },
      {
        icon: "FileTextIcon",
        pageName: "simple-menu-laporan",
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
        ]
      },
      {
        icon: "SlidersIcon",
        pageName: "simple-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "GlobeIcon",
            pageName: "simple-menu-barang",
            title: "Barang",
          },
          {
            icon: "TentIcon",
            pageName: "simple-menu-outlet",
            title: "Outlet",
          },
          {
            icon: "UsersIcon",
            pageName: "simple-menu-pelanggan",
            title: "Pelanggan",
          },
          {
            icon: "TruckIcon",
            pageName: "simple-menu-supplier",
            title: "Supplier",
          },
          {
            icon: "InfoIcon",
            pageName: "simple-menu-satuan",
            title: "Satuan",
          },
        ],
      },
      {
        icon: "LayoutIcon",
        pageName: "simple-menu-menu-layout",
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
});
