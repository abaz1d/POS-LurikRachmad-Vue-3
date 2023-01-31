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
  }),
  getters: {
    items: (state) => state.rawItems,
    varians: (state) => state.rawVarians,
    outlets: (state) => state.rawOutlets,
    details: (state) => state.rawDetails,
    prints: (state) => state.rawPrints,
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
          // console.log('data', data.data)
          // console.log('rawVarians', this.rawVarians)
         //console.log('masuk', data.data)
          //return this.rawVarians

        }
      } catch (error) {
        console.error(error)
        this.rawVarians = { error }
        this.rawPembelians = { error }
        this.rawDetails = { error }
      }

    },
  }
})