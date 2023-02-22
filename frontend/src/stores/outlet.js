import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useOutletStore = defineStore({
  id: "outlet",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      try {
        const { data } = await request.get("outlet");
        if (data.success) {
          this.rawItems = data.data;
          return this.rawItems;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addItem(nama_outlet, alamat_outlet, kontak_outlet, email_outlet) {
      const id_outlet = Date.now();
      this.rawItems.push({
        id_outlet,
        nama_outlet,
        alamat_outlet,
        kontak_outlet,
        email_outlet,
      });
      try {
        const { data } = await request.post("outlet/add", {
          nama_outlet,
          alamat_outlet,
          kontak_outlet,
          email_outlet,
        });
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_outlet === id_outlet) {
              return data.data;
            }
            return item;
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeItem(id_outlet) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_outlet !== id_outlet
      );
      request
        .get(`outlet/delete/${id_outlet}`)
        .then((res) => {
          if (res.success) {
            return res.success;
          }
        })
        .catch((error) => console.error(error));
    },
    async updateItem(outlet) {
      let id_outlet = outlet.id_outlet;
      let nama_outlet = outlet.nama_outlet;
      let alamat_outlet = outlet.alamat_outlet;
      let kontak_outlet = outlet.kontak_outlet;
      let email_outlet = outlet.email_outlet;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_outlet === id_outlet) {
          return outlet;
        }
        return item;
      });
      request
        .post(`outlet/edit/${id_outlet}`, {
          nama_outlet,
          alamat_outlet,
          kontak_outlet,
          email_outlet,
        })
        .catch((error) => console.error(error));
    },
  },
});
