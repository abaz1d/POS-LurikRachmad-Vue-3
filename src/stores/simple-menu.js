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
      {
        icon: "SettingsIcon",
        pageName: "top-menu-satuan",
        title: "Satuan",
      }
    ],
  }),
});
