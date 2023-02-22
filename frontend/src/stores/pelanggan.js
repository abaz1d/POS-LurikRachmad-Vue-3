import { defineStore } from "pinia";
import { request } from "../utils/api";

export const usePelangganStore = defineStore({
  id: "pelanggan",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      try {
        const { data } = await request.get("pelanggan");
        if (data.success) {
          this.rawItems = data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addItem(nama_pelanggan, alamat_pelanggan, kontak_pelanggan) {
      const id_pelanggan = Date.now();
      this.rawItems.push({
        id_pelanggan,
        nama_pelanggan,
        alamat_pelanggan,
        kontak_pelanggan,
      });
      try {
        const { data } = await request.post("pelanggan/add", {
          nama_pelanggan,
          alamat_pelanggan,
          kontak_pelanggan,
        });
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_pelanggan === id_pelanggan) {
              return data.data;
            }
            return item;
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeItem(id_pelanggan) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_pelanggan !== id_pelanggan
      );
      request
        .delete(`pelanggan/delete/${id_pelanggan}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res.status;
          }
        })
        .catch((error) => console.error(error));
    },
    async updateItem(pelanggan) {
      let id_pelanggan = pelanggan.id_pelanggan;
      let nama_pelanggan = pelanggan.nama_pelanggan;
      let alamat_pelanggan = pelanggan.alamat_pelanggan;
      let kontak_pelanggan = pelanggan.kontak_pelanggan;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_pelanggan === id_pelanggan) {
          return pelanggan;
        }
        return item;
      });
      request
        .post(`pelanggan/edit/${id_pelanggan}`, {
          nama_pelanggan,
          alamat_pelanggan,
          kontak_pelanggan,
        })
        .catch((error) => console.error(error));
    },
  },
});
