import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useDashboardStore = defineStore({
  id: "dashboard-store",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      try {
        const data = await request.get("utama");
        if (data.status >= 200 && data.status < 300) {
          this.rawItems =  data.data;
          console.log("dashboard-store", this.rawItems)
        }
      } catch (error) {
        console.error(e);
      }

    },
  },
});
