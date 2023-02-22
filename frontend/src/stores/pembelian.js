import { defineStore } from "pinia";
import { request } from "../utils/api";

export const usePembelianStore = defineStore({
  id: "pembelian",
  state: () => ({
    rawVarians: [],
    rawSuppliers: [],
    rawPembelians: [],
    rawDetails: [],
    rawPrints: [],
    rawLaporans: [],
    rawPembelianDetail: [],
  }),
  getters: {
    varians: (state) => state.rawVarians,
    suppliers: (state) => state.rawSuppliers,
    pembelians: (state) => state.rawPembelians,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,
    laporans: (state) => state.rawLaporans,

    pembelianDetail: (state) => state.rawPembelianDetail,
  },
  actions: {
    async readLaporan() {
      try {
        const { data } = await request.get("pembelian/laporan");
        if (data.success) {
          this.rawLaporans = data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readItem() {
      try {
        const { data } = await request.get("pembelian");
        if (data.success) {
          this.rawVarians = data.data.varian;
          this.rawSuppliers = data.data.supplier;
          this.rawPembelians = data.data.pembelian;
          this.rawDetails = data.data.details;
          return this.rawPembelians;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addPembelian(
      no_invoice,
      waktu,
      total_harga_global,
      total_bayar_global,
      kembalian,
      supplier,
      isEdit
    ) {
      const tanggal_pembelian = waktu;
      const total_harga_beli = total_harga_global;
      const total_bayar_beli = total_bayar_global;
      if (!isEdit) {
        this.rawPembelians.push({
          no_invoice,
          tanggal_pembelian,
          total_harga_beli,
          total_bayar_beli,
          kembalian,
        });
      }
      try {
        const { data } = await request.post("pembelian/upbeli", {
          no_invoice,
          total_harga_beli,
          total_bayar_beli,
          supplier,
          kembalian,
        });
        if (data.success) {
          this.rawPembelians = this.rawPembelians.map((item) => {
            if (item.no_invoice == no_invoice) {
              return data.data[0];
            }
            return item;
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    removePembelian(no_invoice) {
      this.rawPembelians = this.rawPembelians.filter(
        (item) => item.no_invoice !== no_invoice
      );
      request
        .get(`pembelian/delete/${no_invoice}`)
        .then((res) => {
          if (res.success) {
            return res.success;
          }
        })
        .catch((error) => console.error(error));
    },
    async addDetailPembelian(noInvoice, id_varian, qty) {
      const no_invoice = String(noInvoice);
      try {
        const { data } = await request.post("pembelian/additem", {
          no_invoice,
          id_varian,
          qty,
        });
        if (data.success) {
          this.readDetailPembelian(noInvoice);
          return data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readDetailPembelian(no_invoice) {
      try {
        const { data } = await request.get(`/pembelian/details/${no_invoice}`);
        this.rawPembelianDetail = data.data;
        return data.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateDetail(id_detail_beli, no_invoice, qty) {
      try {
        const { data } = await request.put(
          `pembelian/upditem/${id_detail_beli}`,
          { qty: qty, no_invoice: no_invoice }
        );
        if (data.success) {
          let dataBaru = data.data.detail;
          this.rawPembelianDetail = this.rawPembelianDetail.map((item) => {
            if (item.id_detail_beli === dataBaru.id_detail_beli) {
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
    async removeItem(id_detail_beli, noInvoice) {
      try {
        const { data } = await request.delete(
          `pembelian/delitem/${id_detail_beli}`,
          { data: { no_invoice: noInvoice } }
        );
        if (data.success) {
          this.rawPembelianDetail = this.rawPembelianDetail.filter(
            (item) => item.id_detail_beli !== id_detail_beli
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
    updateItem(pembelian) {
      let id_varian = pembelian.id_varian;
      let nama_satuan = pembelian.nama_satuan;
      let keterangan_satuan = pembelian.keterangan_satuan;
      this.rawPembelians = this.rawPembelians.map((item) => {
        if (item.id_varian === id_varian) {
          return pembelian;
        }
        return item;
      });
      request
        .post(`pembelian/edit/${id_varian}`, {
          nama_satuan,
          keterangan_satuan,
        })
        .catch((error) => console.error(error));
    },
    async readDetail(no_invoice) {
      try {
        const { data } = await request.get(`pembelian?noInvoice=${no_invoice}`);
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;

          this.rawDetails.map((detail) => {
            this.rawPembelians = this.rawPembelians.map((pembelian) => {
              if (detail.no_invoice === pembelian.no_invoice) {
                return { ...pembelian, serviceHistory: this.rawDetails };
              }
              return pembelian;
            });
            return detail;
          });
          return this.rawPembelians;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async readDetailItem(id_varian) {
      try {
        const { data } = await request.get(`/pembelian/barang/${id_varian}`);
        if (data.success) {
          return data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async startTransaction() {
      try {
        const { data } = await request.post("/pembelian/create");
        if (data.success) {
          return data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
