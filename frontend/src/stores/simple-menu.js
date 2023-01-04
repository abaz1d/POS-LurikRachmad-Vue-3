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
            icon: "GlobeIcon",
            pageName: "top-menu-stok-global",
            title: "Stok Global",
          },
        ]
      },
      {
        icon: "FileTextIcon",
        pageName: "simple-menu-laporan",
        title: "Laporan",
        // subMenu: [
        //   {
        //     icon: "HomeIcon",
        //     pageName: "simple-menu-page-2",
        //     title: "Page 2",
        //     subMenu: [
        //       {
        //         icon: "HomeIcon",
        //         pageName: "simple-menu-page-2",
        //         title: "Page 2",
        //       },
        //     ]
        //   },
        // ]
      },
      {
        icon: "SlidersIcon",
        pageName: "simple-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "PackageIcon",
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
