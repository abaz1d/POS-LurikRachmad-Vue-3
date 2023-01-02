import { defineStore } from "pinia";
import { request } from "../utils/api";

export const usePenjualanStore = defineStore({
  id: "barang-keluar",
  state: () => ({
    rawVarians: [],
    rawPenjualans: [],
    rawDetails: [],
    rawPrints: [],

    rawPenjualanDetail: [],
  }),
  getters: {
    varians: (state) => state.rawVarians,
    penjualans: (state) => state.rawPenjualans,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,

    penjualanDetail: (state) => state.rawPenjualanDetail,
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
    async addDetailPenjualan(noInvoice, id_varian, qty) {
      const id = Date.now();
      const no_invoice = String(noInvoice)
      // this.rawPenjualanDetail.push({ no_invoice, id_varian, qty });
      // console.log('rawPenjualanDetail', this.rawPenjualanDetail)
      try {
        const data = await request.post('penjualan/additem', { no_invoice, id_varian, qty })
        console.log('data',data)
     
      } catch (e) {
        console.error(e);
      }
    },
    removeItem(id_varian) {
      this.rawPenjualans = this.rawPenjualans.filter(
        (item) => item.id_varian !== id_varian
      );
      request
        .get(`penjualan/delete/${id_varian}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_varian}`)
          }
        })
        .catch((e) => console.error(e));
    },
    updateItem(penjualan) {
      let id_varian = penjualan.id_varian;
      let nama_satuan = penjualan.nama_satuan;
      let keterangan_satuan = penjualan.keterangan_satuan;
      this.rawPenjualans = this.rawPenjualans.map((item) => {
        if (item.id_varian === id_varian) {
          return penjualan;
        }
        return item;
      });
      request.post(`penjualan/edit/${id_varian}`, {
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
      //if (data.status >= 200 && data.status < 300) {
      return data.data
      // }
    },

    async startTransaction() {
      const data = await request.post('/penjualan/create')
      //if (data.status >= 200 && data.status < 300) {
      // console.log('data.data', data.data);
      return data.data
      // }
    }

  },
});
