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
        const Auth = useAuthStore();
        const { data } = await request.get(
          `mutasi-barang/barang-keluar?id_outlet=${String(
            Auth.items.id_outlet
          )}`
        );
        if (data.success) {
          this.rawItems = data.data.barang_keluar;
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
          `mutasi-barang/barang-keluar?noInvoice=${no_invoice}`
        );
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
    async addMutasi(no_invoice, outlet_penerima, tanggal, ekspedisi, no_resi) {
      const tanggal_mutasi = tanggal === "" ? Date.now() : tanggal;
      try {
        const { data } = await request.post("mutasi-barang/upmutasi", {
          no_invoice,
          outlet_penerima,
          ekspedisi,
          no_resi,
        });
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.tanggal_mutasi == tanggal_mutasi) {
              return data.data.rows[0];
            }
            return item;
          });
          return this.rawItems;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async startMutation() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.post(
          `mutasi-barang/create?id_outlet=${String(Auth.items.id_outlet)}`
        );
        if (data.success) {
          this.rawItems.push(data.data.rows);
          return data.data.rows;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readDetailItem(id_varian) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `mutasi-barang/barang/${id_varian}?id_outlet=${String(
            Auth.items.id_outlet
          )}`
        );
        if (data.success) {
          return data.data.rows;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeMutasi(no_invoice) {
      try {
        this.rawItems = this.rawItems.filter(
          (item) => item.no_invoice !== no_invoice
        );
        const { data } = await request.delete(
          `mutasi-barang/delete/${no_invoice}`
        );
        if (data.success) {
          // alert(`Sukses Hapus Data ${id_barang}`)
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    //----------------------------------------------------------------  Detail
    async readDetailMutasi(no_invoice) {
      try {
        const { data } = await request.get(
          `mutasi-barang/details/${no_invoice}`
        );
        if (data.success) {
          this.rawDetailMutasi = data.data.rows;
          return data.data.rows;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addDetailMutasi(noInvoice, id_varian, qty) {
      const no_invoice = String(noInvoice);
      try {
        const { data } = await request.post("mutasi-barang/additem", {
          no_invoice,
          id_varian,
          qty,
        });
        if (data.success) {
          this.readDetailMutasi(noInvoice);
          return data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateDetail(id_detail_barang_mutasi, qty) {
      try {
        const { data } = await request.put(
          `mutasi-barang/upditem/${id_detail_barang_mutasi}`,
          { qty: qty }
        );
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeDetail(id_detail_barang_mutasi) {
      try {
        this.rawDetailMutasi = this.rawDetailMutasi.filter(
          (item) => item.id_detail_barang_mutasi !== id_detail_barang_mutasi
        );
        const { data } = await request.delete(
          `mutasi-barang/delitem/${id_detail_barang_mutasi}`
        );
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
