import { defineStore } from "pinia";
import { request } from "../utils/api";
import qs from 'qs';

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
      try {
        const data = await request.get("penjualan");
        if (data.status >= 200 && data.status < 300) {
          this.rawVarians = data.data.varian;
          this.rawPenjualans = data.data.penjualan;
          this.rawDetails = data.data.detailsj;
          //console.log('data', data.data.varian)
          // console.log('rawPenjualans', this.rawPenjualans)
          // return this.rawPenjualans
        }
      } catch (error) {
        console.error(error)
      }

    },
    async addPenjualan(no_invoice, total_harga_global, total_bayar_global, kembalian) {
      const tanggal_penjualan = Date.now();
      const total_harga_jual = total_harga_global
      const total_bayar_jual = total_bayar_global
      // this.rawPenjualanDetail.push({ no_invoice, id_varian, qty });
      // console.log('rawPenjualanDetail', this.rawPenjualanDetail)
      this.rawPenjualans.push({ no_invoice, tanggal_penjualan, total_harga_jual, total_bayar_jual, kembalian })
      try {
        const data = await request.post('penjualan/upjual', { no_invoice, total_harga_jual, total_bayar_jual, kembalian })
        if (data.status >= 200 && data.status < 300) {

          this.rawPenjualans = this.rawPenjualans.map((item) => {
            if (item.tanggal_penjualan == tanggal_penjualan) {
              console.log('data', no_invoice, item.tanggal_penjualan, tanggal_penjualan, item.tanggal_penjualan === tanggal_penjualan)
              return data.data[0]
            }
            return item;
          });
          // return data.data
        }
        //console.log('data',data.data, this.rawPenjualans)
      } catch (e) {
        console.error(e);
      }
    },

    removePenjualan(no_invoice) {
      this.rawPenjualans = this.rawPenjualans.filter(
        (item) => item.no_invoice !== no_invoice
      );
      request
        .get(`penjualan/delete/${no_invoice}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${no_invoice}`)
          }
        })
        .catch((e) => console.error(e));
    },
    async addDetailPenjualan(noInvoice, id_varian, qty) {
      const id = Date.now();
      const no_invoice = String(noInvoice)
      // this.rawPenjualanDetail.push({ no_invoice, id_varian, qty });
      // console.log('rawPenjualanDetail', this.rawPenjualanDetail)
      try {
        const data = await request.post('penjualan/additem', { no_invoice, id_varian, qty })
        if (data.status >= 200 && data.status < 300) {
          this.readDetailPenjualan(noInvoice)
          return data.data
        }
        //console.log('data',data)
      } catch (e) {
        console.error(e);
      }
    },
    async readDetailPenjualan(no_invoice) {
      try {
        const data = await request.get(`/penjualan/details/${no_invoice}`)
        //console.log('data', data.data)
        this.rawPenjualanDetail = data.data;
        //console.log('rawPenjualanDetail', this.rawPenjualanDetail, this.rawDetails)
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async removeItem(id_detail_jual, noInvoice) {
      try {
        const data = await request.delete(`penjualan/delitem/${id_detail_jual}`, { data: { no_invoice: noInvoice } })
        if (data.status >= 200 && data.status < 300) {
          // console.log('dalam', data)
          this.rawPenjualanDetail = this.rawPenjualanDetail.filter(
            (item) => item.id_detail_jual !== id_detail_jual
          );
          if (data.data[0].total !== null) {
            return data.data[0].total
          } else {
            return 0
          }
        }
      } catch (error) {
        console.error(error)
      }

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
      try {
        const data = await request.get(`penjualan?noInvoice=${no_invoice}`);
        if (data.status >= 200 && data.status < 300) {
          this.rawDetails = data.data.detailsj;
          this.rawPrints = data.data.print.rows;
          // console.log('data.data', data.data, 'status', data.data.print.rows)
          // console.log('this.rawVarians', this.rawVarians)
        }
      } catch (error) {
        console.error(error)
      }

    },

    async readDetailItem(id_varian) {
      try {
        const data = await request.get(`/penjualan/barang/${id_varian}`)
        // .then((data) => {
        //   // console.log('data.data', data.data);
        //   return data.data
        // })
        // console.log('data.data', data.data);
        //if (data.status >= 200 && data.status < 300) {
        return data.data
        // }
      } catch (error) {
        console.error(error)
      }

    },

    async startTransaction() {
      try {
        const data = await request.post('/penjualan/create')
        //if (data.status >= 200 && data.status < 300) {
        // console.log('data.data', data.data);
        return data.data
        // }
      } catch (error) {
        console.error(error)
      }

    }

  },
});
