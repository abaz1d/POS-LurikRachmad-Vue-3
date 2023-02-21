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

    returJualDetail: (state) => state.rawReturJualDetail,
  },
  actions: {
    async readLaporan() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `${Auth.items.role !== "Super Admin"
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
          `${Auth.items.role !== "Super Admin"
            ? `retur-jual?id_outlet=${String(Auth.items.id_outlet)}`
            : "retur-jual"
          }`
        );
        if (data.success) {
          this.rawPenjualans = data.data.penjualan;
          this.rawReturJuals = data.data.pengembalian;
          this.rawDetails = data.data.details;
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

    removeReturJual(id_retur) {
      this.rawReturJuals = this.rawReturJuals.filter(
        (item) => item.id_retur !== id_retur
      );
      request
        .get(`retur-jual/delete/${id_retur}`)
        .then((res) => {
          if (res.success) {
            return res.success;
          }
        })
        .catch((error) => console.error(error));
    },
    async addDetailReturJual(id_retur, id_varian, qty, keterangan, gambar_bukti) {
      const formData = new FormData();
      formData.append("file", gambar_bukti);
      formData.append("id_retur", id_retur);
      formData.append("id_varian", id_varian);
      formData.append("qty", qty);
      formData.append("keterangan", keterangan);
      const headers = { "Content-Type": "multipart/form-data" };
      try {
        const { data } = await request.post("retur-jual/additem",
          formData,
          headers
        );
        if (data.success) {
          this.readDetailReturJual(id_retur);
          return data.data[0];
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async readVarians(no_invoice) {
      try {
        this.rawVarians = []
        const { data } = await request.get(`/retur-jual/read-varians/${no_invoice}`);
        this.rawVarians = data.data;
        return data.data;
      } catch (error) {
        throw new Error(error)
      }
    },
    async readDetailReturJual(id_retur) {
      try {
        const { data } = await request.get(`/retur-jual/details/${id_retur}`);
        this.rawReturJualDetail = data.data;
        return data.data;
      } catch (error) {
        throw new Error(error)
      }
    },
    async updateDetail(id_detail_retur_jual, id_varian, qty, keterangan) {
      try {
        const { data } = await request.put(
          `retur-jual/upditem/${id_detail_retur_jual}`,
          { qty: qty, id_varian: id_varian, keterangan: keterangan }
        );
        if (data.success) {
          let dataBaru = data.data.detail;
          this.rawReturJualDetail = this.rawReturJualDetail.map((item) => {
            if (item.id_detail_retur_jual === dataBaru.id_detail_retur_jual) {
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
    async removeItem(id_detail_retur_jual, id_retur) {
      try {
        console.log(id_detail_retur_jual, id_retur)
        const { data } = await request.delete(
          `retur-jual/delitem/${id_detail_retur_jual}`,
          { data: { id_retur: id_retur } }
        );
        if (data.success) {
          this.rawReturJualDetail = this.rawReturJualDetail.filter(
            (item) => item.id_detail_retur_jual !== id_detail_retur_jual
          );

        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async readDetail(id_retur) {
      try {
        const { data } = await request.get(`retur-jual?id_retur=${id_retur}`);
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print;
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

    async readDetailItem(id_varian, no_invoice) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `/retur-jual/barang/${id_varian}?no_invoice=${String(
            no_invoice
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
