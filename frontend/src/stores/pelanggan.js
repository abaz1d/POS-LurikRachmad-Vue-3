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
        const data = await request.get("pelanggan", {
          timeout: 1000
        });
        if (data.status >= 200 && data.status < 300) {
          this.rawItems = data.data;
          //console.log('rawItems', this.rawItems)
          // return this.rawItems
        }
      } catch (e) {
        console.error(e);
      }

    },
    async addItem(
      nama_pelanggan,
      alamat_pelanggan,
      kontak_pelanggan,
    ) {
      const id_pelanggan = Date.now();
      this.rawItems.push({
        id_pelanggan,
        nama_pelanggan,
        alamat_pelanggan,
        kontak_pelanggan,
      });
      try {
        const data = await request.post("pelanggan/add", {
          nama_pelanggan,
          alamat_pelanggan,
          kontak_pelanggan,
        });

        this.rawItems = this.rawItems.map((item) => {
          if (item.id_pelanggan === id_pelanggan) {
            return data.data;
          }
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async removeItem(id_pelanggan) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_pelanggan !== id_pelanggan
      );
      request
        .get(`pelanggan/delete/${id_pelanggan}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_pelanggan}`)
          }
        })
        .catch((e) => console.error(e));
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
      request.post(`pelanggan/edit/${id_pelanggan}`, {
        nama_pelanggan,
        alamat_pelanggan,
        kontak_pelanggan,
      }) .catch((e) => console.error(e));
    },
  },
});
