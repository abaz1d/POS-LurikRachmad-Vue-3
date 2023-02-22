import { defineStore } from "pinia";
import { request } from "../utils/api";
import { useAuthStore } from "./auth";

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
        const Auth = useAuthStore();
        const { data } = await request.get(
          `${
            Auth.items.role !== "Super Admin"
              ? `utama?id_outlet=${String(Auth.items.id_outlet)}`
              : "utama"
          }`
        );
        if (data.success) {
          this.rawItems = data.data;
          return Auth.items;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getNotepad(id) {
      try {
        const { data } = await request.get(`users/editnotepad/${id}`);
        if (data.success) {
          return data.data.notepad;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateNotepad(id, notepad) {
      try {
        const { data } = await request.post(`users/editnotepad/${id}`, {
          notepad,
        });
        if (data.success) {
          return data.data.notepad;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
