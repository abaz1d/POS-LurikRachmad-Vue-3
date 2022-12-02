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
        icon: "HomeIcon",
        pageName: "top-menu-page-2",
        title: "Page 2",
      },
      {
        icon: "SettingsIcon",
        pageName: "top-menu-satuan",
        title: "Satuan",
      }
    ],
  }),
});
