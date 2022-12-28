import { defineStore } from "pinia";

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
            pageName: "top-menu-return",
            title: "Return",
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
            icon: "GlobeIcon",
            pageName: "top-menu-stok-global",
            title: "Stok Global",
          },
        ]
      },
      {
        icon: "FileTextIcon",
        pageName: "top-menu-laporan",
        title: "Laporan",
        subMenu: [
          {
            icon: "HomeIcon",
            pageName: "top-menu-page-2",
            title: "Page 2",
            subMenu: [
              {
                icon: "HomeIcon",
                pageName: "top-menu-page-2",
                title: "Page 2",
              },
            ]
          },
        ]
      },
      {
        icon: "SlidersIcon",
        pageName: "top-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "PackageIcon",
            pageName: "top-menu-barang",
            title: "Barang",
          },
          {
            icon: "UsersIcon",
            pageName: "top-menu-pelanggan",
            title: "Pelanggan",
          },
          {
            icon: "HomeIcon",
            pageName: "top-menu-outlet",
            title: "Outlet",
          },
          {
            icon: "TruckIcon",
            pageName: "top-menu-supplier",
            title: "Supplier",
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
});
