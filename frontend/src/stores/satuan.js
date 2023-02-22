import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useSatuanStore = defineStore({
  id: "satuan",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      try {
        const { data } = await request.get("satuan");
        if (data.success) {
          this.rawItems = data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addItem(nama_satuan, keterangan_satuan) {
      const id_satuan = Date.now();
      this.rawItems.push({ id_satuan, nama_satuan, keterangan_satuan });
      try {
        const { data } = await request.post("satuan/add", {
          nama_satuan,
          keterangan_satuan,
        });
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_satuan === id_satuan) {
              return data.data;
            }
            return item;
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeItem(id_satuan) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_satuan !== id_satuan
      );
      request
        .delete(`satuan/delete/${id_satuan}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res.status;
          }
        })
        .catch((error) => console.error(error));
    },
    async updateItem(satuan) {
      let id_satuan = satuan.id_satuan;
      let nama_satuan = satuan.nama_satuan;
      let keterangan_satuan = satuan.keterangan_satuan;
      console.log("id_satuan", satuan.id_satuan);
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_satuan === id_satuan) {
          return satuan;
        }
        return item;
      });
      request
        .post(`satuan/edit/${id_satuan}`, {
          nama_satuan,
          keterangan_satuan,
        })
        .catch((error) => console.error(error));
    },
  },
});
