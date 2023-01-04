import { defineStore } from "pinia";

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
        pageName: "side-menu-laporan",
        title: "Laporan",
        // subMenu: [
        //   {
        //     icon: "HomeIcon",
        //     pageName: "side-menu-page-2",
        //     title: "Page 2",
        //     subMenu: [
        //       {
        //         icon: "HomeIcon",
        //         pageName: "side-menu-page-2",
        //         title: "Page 2",
                
        //       },
        //     ]
        //   },
        // ]
      },
      {
        icon: "SlidersIcon",
        pageName: "side-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "PackageIcon",
            pageName: "side-menu-barang",
            title: "Barang",
          },
          {
            icon: "UsersIcon",
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
});
