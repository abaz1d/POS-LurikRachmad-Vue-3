import { defineStore } from "pinia";
import { request } from "../utils/api";

export const usePembelianStore = defineStore({
  id: "barang-keluar",
  state: () => ({
    rawVarians: [],
    rawPembelians: [],
    rawDetails: [],
    rawPrints: [],

    rawPembelianDetail: [],
  }),
  getters: {
    varians: (state) => state.rawVarians,
    pembelians: (state) => state.rawPembelians,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,

    pembelianDetail: (state) => state.rawPembelianDetail,
  },
  actions: {
    async readItem() {
      try {
        this.rawVarians = { loading: true }
        this.rawPembelians = { loading: true }
        this.rawDetails = { loading: true }
        const data = await request.get("pembelian");
        if (data.status >= 200 && data.status < 300) {
          this.rawVarians = data.data.varian;
          this.rawPembelians = data.data.pembelian;
          this.rawDetails = data.data.details;
          // console.log('data', data.data)
          // console.log('rawPembelians', this.rawPembelians)
          // return this.rawPembelians
        }
      } catch (error) {
        console.error(error)
        this.rawVarians = { error }
        this.rawPembelians = { error }
        this.rawDetails = { error }
      }

    },
    async addPembelian(no_invoice, total_harga_global, total_bayar_global, kembalian) {
      const tanggal_pembelian = Date.now();
      const total_harga_beli = total_harga_global
      const total_bayar_beli = total_bayar_global
      // this.rawPembelianDetail.push({ no_invoice, id_varian, qty });
      // console.log('rawPembelianDetail', this.rawPembelianDetail)
      this.rawPembelians.push({ no_invoice, tanggal_pembelian, total_harga_beli, total_bayar_beli, kembalian })
      try {
        const data = await request.post('pembelian/upbeli', { no_invoice, total_harga_beli, total_bayar_beli, kembalian })
        if (data.status >= 200 && data.status < 300) {

          this.rawPembelians = this.rawPembelians.map((item) => {
            if (item.tanggal_pembelian == tanggal_pembelian) {
              console.log('data', no_invoice, item.tanggal_pembelian, tanggal_pembelian, item.tanggal_pembelian === tanggal_pembelian)
              return data.data[0]
            }
            return item;
          });
          // return data.data
        }
        //console.log('data',data.data, this.rawPembelians)
      } catch (e) {
        console.error(e);
      }
    },

    removePembelian(no_invoice) {
      this.rawPembelians = this.rawPembelians.filter(
        (item) => item.no_invoice !== no_invoice
      );
      request
        .get(`pembelian/delete/${no_invoice}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${no_invoice}`)
          }
        })
        .catch((e) => console.error(e));
    },
    async addDetailPembelian(noInvoice, id_varian, qty) {
      const id = Date.now();
      const no_invoice = String(noInvoice)
      // this.rawPembelianDetail.push({ no_invoice, id_varian, qty });
      // console.log('rawPembelianDetail', this.rawPembelianDetail)
      try {
        const data = await request.post('pembelian/additem', { no_invoice, id_varian, qty })
        if (data.status >= 200 && data.status < 300) {
          this.readDetailPembelian(noInvoice)
          return data.data
        }
        //console.log('data',data)
      } catch (e) {
        console.error(e);
      }
    },
    async readDetailPembelian(no_invoice) {
      try {
        const data = await request.get(`/pembelian/details/${no_invoice}`)
        //console.log('data', data.data)
        this.rawPembelianDetail = data.data;
        //console.log('rawPembelianDetail', data.data)
        return data.data;
      } catch (error) {
        console.error(error);
      }
    },

    async removeItem(id_detail_beli, noInvoice) {
      try {
        const data = await request.delete(`pembelian/delitem/${id_detail_beli}`, { data: { no_invoice: noInvoice } })
        if (data.status >= 200 && data.status < 300) {
          // console.log('dalam', data)
          this.rawPembelianDetail = this.rawPembelianDetail.filter(
            (item) => item.id_detail_beli !== id_detail_beli
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
      request.post(`pembelian/edit/${id_varian}`, {
        nama_satuan,
        keterangan_satuan,
      });
    },

    // ---------------------------------------------------------------- Detail ----------------------------------------------------------------
    async readDetail(no_invoice) {
      try {
        const data = await request.get(`pembelian?noInvoice=${no_invoice}`);
        if (data.status >= 200 && data.status < 300) {
          this.rawDetails = data.data.details;
          this.rawPrints = data.data.print.rows;
          //console.log("rows", data.data)
          // console.log('data.data', data.data, 'status', data.data.print.rows)
          // console.log('this.rawVarians', this.rawVarians)
        }
      } catch (error) {
        console.error(error)
      }

    },

    async readDetailItem(id_varian) {
      try {
        const data = await request.get(`/pembelian/barang/${id_varian}`)
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
        const data = await request.post('/pembelian/create')
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
