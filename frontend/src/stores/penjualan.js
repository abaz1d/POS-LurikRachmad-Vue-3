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
        const { data } = await request.get(`${Auth.items.role !== "Super Admin" ? `penjualan/laporan?id_outlet=${String(Auth.items.id_outlet)}`: "penjualan/laporan"}`);
        //console.log('laporan', data)
        if (data.success) {
        
          this.rawLaporans = data.data
          // console.log('rawPenjualans', this.rawPenjualans)
          //console.log('jual')
          //return this.rawPenjualans
        }
      } catch (error) {
        console.error(error)
      }

    },
    async readItem() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(`${Auth.items.role !== "Super Admin" ? `penjualan?id_outlet=${String(Auth.items.id_outlet)}`: "penjualan"}`);
        if (data.success) {
          this.rawVarians = data.data.varian;
          this.rawPenjualans = data.data.penjualan;
          this.rawDetails = data.data.details;
          //console.log('data', data.data.varian)
          // console.log('rawPenjualans', this.rawPenjualans)
          //console.log('jual')
          return this.rawPenjualans
        }
      } catch (error) {
        console.error(error)
        this.rawVarians = { error }
        this.rawPenjualans = { error }
        this.rawDetails = { error }
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
        const { data } = await request.post('penjualan/upjual', { no_invoice, total_harga_jual, total_bayar_jual, kembalian })
        if (data.success) {

          this.rawPenjualans = this.rawPenjualans.map((item) => {
            if (item.tanggal_penjualan == tanggal_penjualan) {
              console.log('data', no_invoice, item.tanggal_penjualan, tanggal_penjualan, item.tanggal_penjualan === tanggal_penjualan)
              return data.data[0]
            }
            return item;
          });
          return this.rawPenjualans
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
        const { data } = await request.post('penjualan/additem', { no_invoice, id_varian, qty })
        if (data.success) {
          this.readDetailPenjualan(noInvoice)
          return data.data[0]
        }
        //console.log('data',data)
      } catch (e) {
        console.error(e);
      }
    },
    async readDetailPenjualan(no_invoice) {
      try {
        const { data } = await request.get(`/penjualan/details/${no_invoice}`)
        //console.log('data', data.data)
        this.rawPenjualanDetail = data.data;
        //console.log('rawPenjualanDetail', this.rawPenjualanDetail, this.rawDetails)
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateDetail(id_detail_jual, qty) {
      try {
        const { data } = await request.put(`penjualan/upditem/${id_detail_jual}`, { qty: qty })
        if (data.success) {
          let dataBaru = data.data[0]
          this.rawPenjualanDetail = this.rawPenjualanDetail.map((item) => {
            if (item.id_detail_jual === dataBaru.id_detail_jual ) {
              return dataBaru
            }
            return item;
          })
          console.log("data", this.rawPenjualanDetail)
        }
      } catch (error) {
        console.error(error);
      }
    },
    async removeItem(id_detail_jual, noInvoice) {
      try {
        const { data } = await request.delete(`penjualan/delitem/${id_detail_jual}`, { data: { no_invoice: noInvoice } })
        if (data.success) {
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

    // ---------------------------------------------------------------- Detail ----------------------------------------------------------------
    async readDetail(no_invoice) {
      try {
        const { data } = await request.get(`penjualan?noInvoice=${no_invoice}`);
        if (data.success) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;

          this.rawDetails.map((detail) => {
            this.rawPenjualans = this.rawPenjualans.map((penjualan) => {
              if (detail.no_invoice === penjualan.no_invoice) {
                return { ...penjualan, serviceHistory: this.rawDetails }
              }
              return penjualan
            })
            return detail
          })
          // console.log('data.data', data.data, 'status', data.data.print.rows)
          // console.log('this.rawVarians', this.rawVarians)
          return this.rawPenjualans
        }
      } catch (error) {
        console.error(error)
      }

    },

    async readDetailItem(id_varian) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(`/penjualan/barang/${id_varian}?id_outlet=${String(Auth.items.id_outlet)}`)
        // .then((data) => {
        //   // console.log('data.data', data.data);
        //   return data.data
        // })
        console.log('data.data', data.data);
        //if (data.success) {
        return data.data[0]
        // }
      } catch (error) {
        console.error(error)
      }

    },

    async startTransaction() {
      try {
        const Auth = useAuthStore();
        const { data } = await request.post(`/penjualan/create?id_outlet=${String(Auth.items.id_outlet)}`)
        //if (data.success) {
        // console.log('data.data', data.data);
        return data.data[0]
        // }
      } catch (error) {
        console.error(error)
      }

    }

  },
});
