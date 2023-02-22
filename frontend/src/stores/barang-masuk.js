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
        const Auth = useAuthStore();
        const { data } = await request.get(
          `mutasi-barang/barang-masuk?id_outlet=${String(Auth.items.id_outlet)}`
        );
        if (data.success) {
          this.rawItems = data.data.barang_masuk;
          this.rawVarians = data.data.varian;
          this.rawOutlets = data.data.outlet;
          this.rawDetails = data.data.details;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readDetail(no_invoice) {
      try {
        const { data } = await request.get(
          `mutasi-barang/barang-masuk?noInvoice=${no_invoice}`
        );
        //console.log("detail",data);
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;

          this.rawDetails.map((detail) => {
            this.rawItems = this.rawItems.map((mutasi) => {
              if (detail.no_invoice === mutasi.no_invoice) {
                return { ...mutasi, serviceHistory: this.rawDetails };
              }
              return mutasi;
            });
            return detail;
          });
          return this.rawItems;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async terimaMutasi(no_invoice, file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("no_invoice", no_invoice);
        formData.append("status", true);
        const headers = { "Content-Type": "multipart/form-data" };

        const { data } = await request.put(
          `mutasi-barang/terima_barang`,
          formData,
          headers
        );
        if (data.success) {
          console.log("terima mutasi", data, no_invoice, file);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateTerima(id_detail_barang_mutasi, qty_terima, keterangan) {
      try {
        const { data } = await request.put(
          `mutasi-barang/upd-terima/${id_detail_barang_mutasi}`,
          { qty_terima: qty_terima, keterangan: keterangan }
        );
        if (data.success) {
          console.log(
            "update terima",
            id_detail_barang_mutasi,
            qty_terima,
            keterangan
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
