import { defineStore } from "pinia";
import { request } from "../utils/api";

export const usePenjualanStore = defineStore({
  id: "barang-keluar",
  state: () => ({
    rawVarians: [],
    rawPenjualans: [],
    rawDetails: [],
    rawPrints: [],
  }),
  getters: {
    varians: (state) => state.rawVarians,
    penjualans: (state) => state.rawPenjualans,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints
  },
  actions: {
    async readItem() {
      const data = await request.get("penjualan");
      if (data.status >= 200 && data.status < 300) {
        this.rawVarians = data.data.varian;
        this.rawPenjualans = data.data.penjualan;
        this.rawDetails = data.data.detailsj;
        //console.log('data', data.data.varian)
        // console.log('rawPenjualans', this.rawPenjualans)
        // return this.rawPenjualans
      }
    },
    async addItem() {
      const id_satuan = Date.now();
      this.rawPenjualans.push({ id_satuan });
      try {
        const data = await request.post("penjualan/create");

        this.rawPenjualans = this.rawPenjualans.map((item) => {
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
      this.rawPenjualans = this.rawPenjualans.filter(
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
      this.rawPenjualans = this.rawPenjualans.map((item) => {
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

    // ---------------------------------------------------------------- Detail ----------------------------------------------------------------
    async readDetail(no_invoice) {
      const data = await request.get(`penjualan?noInvoice=${no_invoice}`);
      if (data.status >= 200 && data.status < 300) {
        this.rawDetails = data.data.detailsj;
        this.rawPrints = data.data.print.rows;
        // console.log('data.data', data.data, 'status', data.data.print.rows)
        // console.log('this.rawVarians', this.rawVarians)
      }
    },

    async readDetailItem(id_varian) {
      const data = await request.get(`/penjualan/barang/${id_varian}`)
      // .then((data) => {
      //   // console.log('data.data', data.data);
      //   return data.data
      // })
      // console.log('data.data', data.data);
      return data.data
    }

  },
});
