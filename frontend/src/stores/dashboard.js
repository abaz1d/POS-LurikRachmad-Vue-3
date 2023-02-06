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
        const { data } = await request.get(`${Auth.items.role !== "Super Admin" ? `utama?id_outlet=${String(Auth.items.id_outlet)}`: "utama"}`);
        if (data.success) {
          this.rawItems = data.data;
          //console.log("dashboard-store", Auth.items)

          //console.log("dashboard-store", notepad, id)
          return Auth.items
        }
      } catch (error) {
        console.error(error);
      }

    },
    async getNotepad(id) {
      // console.log("notepad", id, notepad)
      try {
        const { data } = await request.get(`users/editnotepad/${id}`);
        //console.log("dashboard-store get", data.data.notepad, id)
        if (data.success) {
          return data.data.notepad

        }
      } catch (error) {
        console.error(error)
      }
    },
    async updateNotepad(id, notepad) {
      // console.log("notepad", id, notepad)
      try {
        const { data } = await request.post(`users/editnotepad/${id}`, { notepad });
        //console.log("ss", data)
        if (data.success) {

          return data.data.notepad
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
});
