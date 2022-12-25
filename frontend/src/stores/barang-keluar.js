import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useBarangKeluarStore = defineStore({
  id: "barang-keluar",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      const data = await request.get("penjualan");
      if (data.status >= 200 && data.status < 300) {
        this.rawItems = data.data.penjualan;
        // console.log('data', data.data)
        // console.log('rawItems', this.rawItems)
        // return this.rawItems
      }
    },
    async addItem() {
      const id_satuan = Date.now();
      this.rawItems.push({ id_satuan });
      try {
        const data = await request.post("penjualan/create");

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
        .get(`penjualan/delete/${id_satuan}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_satuan}`)
          }
        })
        .catch((e) => console.error(e));
    },
    updateItem(penjualan) {
      let id_satuan = penjualan.id_satuan;
      let nama_satuan = penjualan.nama_satuan;
      let keterangan_satuan = penjualan.keterangan_satuan;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_satuan === id_satuan) {
          return penjualan;
        }
        return item;
      });
      request.post(`penjualan/edit/${id_satuan}`, {
        nama_satuan,
        keterangan_satuan,
      });
    },
  },
});
