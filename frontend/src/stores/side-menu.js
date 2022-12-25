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
        icon: "HomeIcon",
        pageName: "side-menu-page-2",
        title: "Page 2",
      },
      // {
      //   icon: "InfoIcon",
      //   pageName: "side-menu-satuan",
      //   title: "Satuan",
      // },
      {
        icon: "ChevronsUpIcon",
        pageName: "side-menu-barang-keluar",
        title: "Barang Keluar",
      },
      {
        icon: "BoxIcon",
        pageName: "side-menu-barang",
        title: "Barang",
      },
      // {
      //   icon: "TruckIcon",
      //   pageName: "side-menu-supplier",
      //   title: "Supplier",
      // },
      {
        icon: "SettingsIcon",
        pageName: "side-menu-pengaturan",
        title: "Pengaturan",
        subMenu: [
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
    ],
  }),
});
