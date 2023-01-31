import { defineStore } from "pinia";
import { request } from "../utils/api";
import { useAuthStore } from "./auth";

export const useBarangKeluarStore = defineStore({
  id: "barang-keluar",
  state: () => ({
    rawItems: [],
    rawVarians: [],
    rawOutlets: [],
    rawDetails: [],
    rawPrints: [],

    rawDetailMutasi: [],
  }),
  getters: {
    items: (state) => state.rawItems,
    varians: (state) => state.rawVarians,
    outlets: (state) => state.rawOutlets,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,
    mutasi: (state) => state.rawDetailMutasi,
  },
  actions: {
    async readItem() {
      try {
        const Auth = useAuthStore()
        const { data } = await request.get(`mutasi-barang/barang-keluar?id_outlet=${String(Auth.items.id_outlet)}`);
        if (data.success) {
          this.rawItems = data.data.barang_keluar;
          this.rawVarians = data.data.varian;
          this.rawOutlets = data.data.outlet;
          this.rawDetails = data.data.details;
          // console.log('data', data.data)
          // console.log('rawVarians', this.rawVarians)
          //console.log('keluar', data.data)
          //return this.rawVarians

        }
      } catch (error) {
        console.error(error)
        this.rawVarians = { error }
        this.rawPembelians = { error }
        this.rawDetails = { error }
      }

    },
    async startMutation() {
      try {
        const Auth = useAuthStore()
        const { data } = await request.post(`mutasi-barang/create?id_outlet=${String(Auth.items.id_outlet)}`)
        console.log('inv', data)
        if (data.success) {
          return data.data.rows
        }
      } catch (error) {
        console.error(error)
      }
    },
    async readDetailItem(id_varian) {
      try {
        const Auth = useAuthStore()
        const { data } = await request.get(`mutasi-barang/barang/${id_varian}?id_outlet=${String(Auth.items.id_outlet)}`)
        if (data.success) {
          return data.data.rows
        }
        // .then((data) => {
        //   // console.log('data.data', data.data);
        //   return data.data
        // })
        console.log('data.data', data.data.rows);
        //if (data.status >= 200 && data.status < 300) {

        // }
      } catch (error) {
        console.error(error)
      }

    },
    //----------------------------------------------------------------  Detail
    async readDetailMutasi(no_invoice) {
      try {
        const { data } = await request.get(`mutasi-barang/details/${no_invoice}`)
        console.log('data', data.data)
        if (data.success) {
          this.rawDetailMutasi = data.data.rows;
          //console.log('rawMutasiDetail', this.rawMutasiDetail, this.rawDetails)
          return data.data.rows;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async addDetailMutasi(noInvoice, id_varian, qty) {
      const id = Date.now();
      const no_invoice = String(noInvoice)
      this.rawDetailMutasi.push({ id, no_invoice, id_varian, qty });
      console.log('rawDetailMutasi', this.rawDetailMutasi)
      // try {
      //   const { data } = await request.post('mutasi-barang/additem', { no_invoice, id_varian, qty })
      //   if (data.status >= 200 && data.status < 300) {
      //     this.readDetailMutasi(noInvoice)
      //     return data.data
      //   }
      //   //console.log('data',data)
      // } catch (e) {
      //   console.error(e);
      // }
    },
    async updateDetail(id_detail_barang_mutasi, qty) {
      //console.log("id", id_detail_barang_mutasi, qty);
      try {
        //const data = await request.delete(`penjualan/delitem/${id_detail_barang_mutasi}`, { data: { no_invoice: noInvoice } })
        const { data } = await request.put(`mutasi-barang/upditem/${id_detail_barang_mutasi}`, { qty: qty })
        if (data.success) {
          //console.log(data)
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removeDetail(id_detail_barang_mutasi) {
      try {
        this.rawDetailMutasi = this.rawDetailMutasi.filter(
          (item) => item.id_detail_barang_mutasi !== id_detail_barang_mutasi
        );
        const { data } = await request.delete(`mutasi-barang/delitem/${id_detail_barang_mutasi}`)
        console.log(data)
        if (data.success) {

        }
      } catch (error) {
        console.error(error)
      }

    },
  }
})