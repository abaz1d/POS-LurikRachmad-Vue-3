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
        const data = await request.get("outlet", {
          timeout: 1000
        });
        if (data.status >= 200 && data.status < 300) {
          this.rawItems =
            /*this.rawItems.concat(res.data.rows) res.data.rows*/ data.data;
          //console.log('rawItems', this.rawItems)
          return this.rawItems
        }
      } catch (error) {
        console.error(e);
      }

    },
    async addItem(
      nama_outlet,
      alamat_outlet,
      kontak_outlet,
    ) {
      const id_outlet = Date.now();
      this.rawItems.push({
        id_outlet,
        nama_outlet,
        alamat_outlet,
        kontak_outlet,
      });
      try {
        const data = await request.post("outlet/add", {
          nama_outlet,
          alamat_outlet,
          kontak_outlet,
        });

        this.rawItems = this.rawItems.map((item) => {
          if (item.id_outlet === id_outlet) {
            return data.data;
          }
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async removeItem(id_outlet) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_outlet !== id_outlet
      );
      request
        .get(`outlet/delete/${id_outlet}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_outlet}`)
          }
        })
        .catch((e) => console.error(e));
    },
    async updateItem(outlet) {
      let id_outlet = outlet.id_outlet;
      let nama_outlet = outlet.nama_outlet;
      let alamat_outlet = outlet.alamat_outlet;
      let kontak_outlet = outlet.kontak_outlet;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_outlet === id_outlet) {
          return outlet;
        }
        return item;
      });
      request.post(`outlet/edit/${id_outlet}`, {
        nama_outlet,
        alamat_outlet,
        kontak_outlet,
      }) .catch((e) => console.error(e));
    },
  },
});
