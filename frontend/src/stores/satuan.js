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
        const data = await request.get("satuan");
        if (data.status >= 200 && data.status < 300) {
          this.rawItems =
          /*this.rawItems.concat(res.data.rows) res.data.rows*/ data.data;
          //console.log('rawItems', this.rawItems)
          // return this.rawItems
        }
      } catch (error) {
        console.error(e);
      }

    },
    async addItem(nama_satuan, keterangan_satuan) {
      const id_satuan = Date.now();
      this.rawItems.push({ id_satuan, nama_satuan, keterangan_satuan });
      try {
        const data = await request.post("satuan/add", {
          nama_satuan,
          keterangan_satuan,
        });

        this.rawItems = this.rawItems.map((item) => {
          if (item.id_satuan === id_satuan) {
            return data.data;
          }
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    },
    removeItem(id_satuan) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_satuan !== id_satuan
      );
      request
        .get(`satuan/delete/${id_satuan}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_satuan}`)
          }
        })
        .catch((e) => console.error(e));
    },
    updateItem(satuan) {
      let id_satuan = satuan.id_satuan;
      let nama_satuan = satuan.nama_satuan;
      let keterangan_satuan = satuan.keterangan_satuan;
      console.log("id_satuan", satuan.id_satuan)
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_satuan === id_satuan) {
          return satuan;
        }
        return item;
      });
      request.post(`satuan/edit/${id_satuan}`, {
        nama_satuan,
        keterangan_satuan,
      });
    },
  },
});
