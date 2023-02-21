import { defineStore } from "pinia";
import { request } from "../utils/api";
import { useAuthStore } from "./auth";

export const useReturJualStore = defineStore({
  id: "returjual",
  state: () => ({
    rawPenjualans: [],
    rawReturJuals: [],
    rawDetails: [],
    rawPrints: [],
    rawLaporans: [],
    rawVarians: [],

    rawReturJualDetail: [],
  }),
  getters: {
    penjualans: (state) => state.rawPenjualans,
    returjuals: (state) => state.rawReturJuals,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,
    laporans: (state) => state.rawLaporans,
    varians: (state) => state.rawVarians,

    penjualanDetail: (state) => state.rawReturJualDetail,
  },
  actions: {
    async readLaporan() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `${
            Auth.items.role !== "Super Admin"
              ? `retur-jual/laporan?id_outlet=${String(Auth.items.id_outlet)}`
              : "retur-jual/laporan"
          }`
        );
        if (data.success) {
          this.rawLaporans = data.data;
        }
      } catch (error) {
       throw new Error(error)
      }
    },
    async readItem() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `${
            Auth.items.role !== "Super Admin"
              ? `retur-jual?id_outlet=${String(Auth.items.id_outlet)}`
              : "retur-jual"
          }`
        );
        if (data.success) {
          this.rawPenjualans = data.data.penjualan;
          this.rawReturJuals = data.data.pengembalian;
          this.rawDetails = data.data.details;
          this.rawVarians = data.data.varian;
          return this.rawReturJuals;
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async addReturJual(
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
        this.rawReturJuals.push({
          no_invoice,
          tanggal_penjualan,
          total_harga_jual,
          total_bayar_jual,
          kembalian,
        });
      }
      try {
        const { data } = await request.post("retur-jual/upjual", {
          no_invoice,
          total_harga_jual,
          total_bayar_jual,
          kembalian,
        });
        if (data.success) {
          this.rawReturJuals = this.rawReturJuals.map((item) => {
            if (item.no_invoice == no_invoice) {
              return data.data[0];
            }
            return item;
          });
          return this.rawReturJuals;
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    removeReturJual(no_invoice) {
      this.rawReturJuals = this.rawReturJuals.filter(
        (item) => item.no_invoice !== no_invoice
      );
      request
        .get(`retur-jual/delete/${no_invoice}`)
        .then((res) => {
          if (res.success) {
            return res.success;
          }
        })
        .catch((error) => console.error(error));
    },
    async addDetailReturJual(noInvoice, id_varian, qty) {
      const no_invoice = String(noInvoice);
      try {
        const { data } = await request.post("retur-jual/additem", {
          no_invoice,
          id_varian,
          qty,
        });
        if (data.success) {
          this.readDetailReturJual(noInvoice);
          return data.data[0];
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async readDetailReturJual(no_invoice) {
      try {
        const { data } = await request.get(`/retur-jual/details/${no_invoice}`);
        this.rawReturJualDetail = data.data;
        return data.data;
      } catch (error) {
       throw new Error(error)
      }
    },
    async updateDetail(id_detail_jual, no_invoice, qty) {
      try {
        const { data } = await request.put(
          `retur-jual/upditem/${id_detail_jual}`,
          { qty: qty, no_invoice: no_invoice }
        );
        if (data.success) {
          let dataBaru = data.data.detail;
          this.rawReturJualDetail = this.rawReturJualDetail.map((item) => {
            if (item.id_detail_jual === dataBaru.id_detail_jual) {
              return dataBaru;
            }
            return item;
          });
          return data.data.rows[0];
        }
      } catch (error) {
       throw new Error(error)
      }
    },
    async removeItem(id_detail_jual, noInvoice) {
      try {
        const { data } = await request.delete(
          `retur-jual/delitem/${id_detail_jual}`,
          { data: { no_invoice: noInvoice } }
        );
        if (data.success) {
          this.rawReturJualDetail = this.rawReturJualDetail.filter(
            (item) => item.id_detail_jual !== id_detail_jual
          );
          if (data.data[0].total !== null) {
            return data.data[0].total;
          } else {
            return 0;
          }
        }
      } catch (error) {
       throw new Error(error)
      }
    },
    async readDetail(id_retur) {
      try {
        const { data } = await request.get(`retur-jual?noInvoice=${id_retur}`);
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;

          this.rawDetails.map((detail) => {
            this.rawReturJuals = this.rawReturJuals.map((retur) => {
              if (detail.id_retur === retur.id_retur) {
                return { ...retur, serviceHistory: this.rawDetails };
              }
              return retur;
            });
            return detail;
          });
          return this.rawReturJuals;
        }
      } catch (error) {
       throw new Error(error)
      }
    },

    async readDetailItem(id_varian) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `/retur-jual/barang/${id_varian}?id_outlet=${String(
            Auth.items.id_outlet
          )}`
        );
        return data.data[0];
      } catch (error) {
       throw new Error(error)
      }
    },

    async startTransaction() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.post(
          `/retur-jual/create?id_outlet=${String(Auth.items.id_outlet)}`
        );
        return data.data[0];
      } catch (error) {
       throw new Error(error)
      }
    },
  },
});
