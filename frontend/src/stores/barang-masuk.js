import { defineStore } from "pinia";
import { request } from "../utils/api";
import { useAuthStore } from "./auth";

export const useBarangMasukStore = defineStore({
  id: "barang-masuk",
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
        const { data } = await request.get(`mutasi-barang/barang-masuk?id_outlet=${String(Auth.items.id_outlet)}`);
        if (data.success) {
          this.rawItems = data.data.barang_masuk;
          this.rawVarians = data.data.varian;
          this.rawOutlets = data.data.outlet;
          this.rawDetails = data.data.details;
        }
      } catch (error) {
        console.error(error)
        this.rawVarians = { error }
        this.rawPembelians = { error }
        this.rawDetails = { error }
      }

    },
    async readDetail(no_invoice) {
      try {
        const { data } = await request.get(`mutasi-barang/barang-masuk?noInvoice=${no_invoice}`);
        console.log("data", data.data)
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;

          this.rawDetails.map((detail) => {
            this.rawItems = this.rawItems.map((mutasi) => {
              if (detail.no_invoice === mutasi.no_invoice) {
                return { ...mutasi, serviceHistory: this.rawDetails }
              }
              return mutasi
            })
            return detail
          })
          return this.rawItems
        }
      } catch (error) {
        console.error(error)
      }

    },
    async addMutasi(no_invoice, outlet_penerima, tanggal, ekspedisi, no_resi) {
      const Auth = useAuthStore()
      const tanggal_mutasi = tanggal === '' ? Date.now() : tanggal;
      try {
        const { data } = await request.post('mutasi-barang/upmutasi', { no_invoice, outlet_penerima, ekspedisi, no_resi })
        if (data.success) {

          this.rawItems = this.rawItems.map((item) => {
            if (item.tanggal_mutasi == tanggal_mutasi) {
              return data.data.rows[0]
            }
            return item;
          });
          return this.rawItems
        }
      } catch (e) {
        console.error(e);
      }
    },
    async startMutation() {
      try {
        const Auth = useAuthStore()
        const { data } = await request.post(`mutasi-barang/create?id_outlet=${String(Auth.items.id_outlet)}`)
        if (data.success) {
          this.rawItems.push(data.data.rows);
          //console.log(`mutasi`, this.rawItems)
          return data.data.rows;
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
      } catch (error) {
        console.error(error)
      }

    },
    async removeMutasi(no_invoice) {
      this.rawItems = this.rawItems.filter(
        (item) => item.no_invoice !== no_invoice
      );
      const { data } = await request.delete(`mutasi-barang/delete/${no_invoice}`)
        if (data.success) {
          // alert(`Sukses Hapus Data ${id_barang}`)
        };
    },
    //----------------------------------------------------------------  Detail
    async readDetailMutasi(no_invoice) {
      try {
        const { data } = await request.get(`mutasi-barang/details/${no_invoice}`)
        if (data.success) {
          this.rawDetailMutasi = data.data.rows;
          return data.data.rows;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async addDetailMutasi(noInvoice, id_varian, qty) {
      const id = Date.now();
      const no_invoice = String(noInvoice)
      try {
        const { data } = await request.post('mutasi-barang/additem', { no_invoice, id_varian, qty })
        if (data.success) {
          this.readDetailMutasi(noInvoice)
          return data.data
        }
      } catch (e) {
        console.error(e);
      }
    },
    async updateDetail(id_detail_barang_mutasi, qty) {
      try {
        const { data } = await request.put(`mutasi-barang/upditem/${id_detail_barang_mutasi}`, { qty: qty })
        if (data.success) {
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
        if (data.success) {

        }
      } catch (error) {
        console.error(error)
      }

    },
  }
})