import { defineStore } from "pinia";
import { request } from "../utils/api";
import { useAuthStore } from "./auth";

export const usePenjualanStore = defineStore({
  id: "penjualan",
  state: () => ({
    rawVarians: [],
    rawPenjualans: [],
    rawDetails: [],
    rawPrints: [],
    rawLaporans: [],

    rawPenjualanDetail: [],
  }),
  getters: {
    varians: (state) => state.rawVarians,
    penjualans: (state) => state.rawPenjualans,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,
    laporans: (state) => state.rawLaporans,

    penjualanDetail: (state) => state.rawPenjualanDetail,
  },
  actions: {
    async readLaporan() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `${
            Auth.items.role !== "Super Admin"
              ? `penjualan/laporan?id_outlet=${String(Auth.items.id_outlet)}`
              : "penjualan/laporan"
          }`
        );
        if (data.success) {
          this.rawLaporans = data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readItem() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `${
            Auth.items.role !== "Super Admin"
              ? `penjualan?id_outlet=${String(Auth.items.id_outlet)}`
              : "penjualan"
          }`
        );
        if (data.success) {
          this.rawVarians = data.data.varian;
          this.rawPenjualans = data.data.penjualan;
          this.rawDetails = data.data.details;
          return this.rawPenjualans;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addPenjualan(
      no_invoice,
      waktu,
      total_harga_global,
      total_bayar_global,
      kembalian,
      isEdit
    ) {
      const tanggal_penjualan = waktu;
      const total_harga_jual = total_harga_global;
      const total_bayar_jual = total_bayar_global;
      if (!isEdit) {
        this.rawPenjualans.push({
          no_invoice,
          tanggal_penjualan,
          total_harga_jual,
          total_bayar_jual,
          kembalian,
        });
      }
      try {
        const { data } = await request.post("penjualan/upjual", {
          no_invoice,
          total_harga_jual,
          total_bayar_jual,
          kembalian,
        });
        if (data.success) {
          this.rawPenjualans = this.rawPenjualans.map((item) => {
            if (item.no_invoice == no_invoice) {
              return data.data[0];
            }
            return item;
          });
          return this.rawPenjualans;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    removePenjualan(no_invoice) {
      this.rawPenjualans = this.rawPenjualans.filter(
        (item) => item.no_invoice !== no_invoice
      );
      request
        .get(`penjualan/delete/${no_invoice}`)
        .then((res) => {
          if (res.success) {
            return res.success;
          }
        })
        .catch((error) => console.error(error));
    },
    async addDetailPenjualan(noInvoice, id_varian, qty) {
      const no_invoice = String(noInvoice);
      try {
        const { data } = await request.post("penjualan/additem", {
          no_invoice,
          id_varian,
          qty,
        });
        if (data.success) {
          this.readDetailPenjualan(noInvoice);
          return data.data[0];
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readDetailPenjualan(no_invoice) {
      try {
        const { data } = await request.get(`/penjualan/details/${no_invoice}`);
        this.rawPenjualanDetail = data.data;
        return data.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateDetail(id_detail_jual, no_invoice, qty) {
      try {
        const { data } = await request.put(
          `penjualan/upditem/${id_detail_jual}`,
          { qty: qty, no_invoice: no_invoice }
        );
        if (data.success) {
          let dataBaru = data.data.detail;
          this.rawPenjualanDetail = this.rawPenjualanDetail.map((item) => {
            if (item.id_detail_jual === dataBaru.id_detail_jual) {
              return dataBaru;
            }
            return item;
          });
          return data.data.rows[0];
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeItem(id_detail_jual, noInvoice) {
      try {
        const { data } = await request.delete(
          `penjualan/delitem/${id_detail_jual}`,
          { data: { no_invoice: noInvoice } }
        );
        if (data.success) {
          this.rawPenjualanDetail = this.rawPenjualanDetail.filter(
            (item) => item.id_detail_jual !== id_detail_jual
          );
          if (data.data[0].total !== null) {
            return data.data[0].total;
          } else {
            return 0;
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readDetail(no_invoice) {
      try {
        const { data } = await request.get(`penjualan?noInvoice=${no_invoice}`);
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;

          this.rawDetails.map((detail) => {
            this.rawPenjualans = this.rawPenjualans.map((penjualan) => {
              if (detail.no_invoice === penjualan.no_invoice) {
                return { ...penjualan, serviceHistory: this.rawDetails };
              }
              return penjualan;
            });
            return detail;
          });
          return this.rawPenjualans;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async readDetailItem(id_varian) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `/penjualan/barang/${id_varian}?id_outlet=${String(
            Auth.items.id_outlet
          )}`
        );
        return data.data[0];
      } catch (error) {
        throw new Error(error);
      }
    },

    async startTransaction() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.post(
          `/penjualan/create?id_outlet=${String(Auth.items.id_outlet)}`
        );
        return data.data[0];
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
