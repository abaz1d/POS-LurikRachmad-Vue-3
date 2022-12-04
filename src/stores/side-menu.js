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
      {
        icon: "SettingsIcon",
        pageName: "side-menu-satuan",
        title: "Satuan",
      },
      {
        icon: "ChevronsUpIcon",
        pageName: "side-menu-barang-keluar",
        title: "Barang Keluar",
      },
    ],
  }),
});
