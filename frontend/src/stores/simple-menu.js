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
        icon: "HomeIcon",
        pageName: "simple-menu-page-2",
        title: "Page 2",
      },
      // {
      //   icon: "InfoIcon",
      //   pageName: "simple-menu-satuan",
      //   title: "Satuan",
      // },
      {
        icon: "ChevronsUpIcon",
        pageName: "simple-menu-barang-keluar",
        title: "Barang Keluar",
      },
      {
        icon: "BoxIcon",
        pageName: "simple-menu-barang",
        title: "Barang",
      },
      // {
      //   icon: "TruckIcon",
      //   pageName: "simple-menu-supplier",
      //   title: "Supplier",
      // },
      {
        icon: "SettingsIcon",
        pageName: "simple-menu-pengaturan",
        title: "Pengaturan",
        subMenu: [
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
        ]
      },
    ],
  }),
});
