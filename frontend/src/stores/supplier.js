import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useSupplierStore = defineStore({
  id: "supplier",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      try {
        const data = await request.get("supplier");
        if (data.status >= 200 && data.status < 300) {
          this.rawItems = data.data;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async addItem(
      nama_supplier,
      alamat_supplier,
      telepon_supplier,
      email_supplier
    ) {
      const id_supplier = Date.now();
      this.rawItems.push({
        id_supplier,
        nama_supplier,
        alamat_supplier,
        telepon_supplier,
        email_supplier,
      });
      try {
        const data = await request.post("supplier/add", {
          nama_supplier,
          alamat_supplier,
          telepon_supplier,
          email_supplier,
        });

        this.rawItems = this.rawItems.map((item) => {
          if (item.id_supplier === id_supplier) {
            return data.data;
          }
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async removeItem(id_supplier) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_supplier !== id_supplier
      );
      request
        .get(`supplier/delete/${id_supplier}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res.status;
          }
        })
        .catch((e) => console.error(e));
    },
    async updateItem(supplier) {
      let id_supplier = supplier.id_supplier;
      let nama_supplier = supplier.nama_supplier;
      let alamat_supplier = supplier.alamat_supplier;
      let telepon_supplier = supplier.telepon_supplier;
      let email_supplier = supplier.email_supplier;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_supplier === id_supplier) {
          return supplier;
        }
        return item;
      });
      request
        .post(`supplier/edit/${id_supplier}`, {
          nama_supplier,
          alamat_supplier,
          telepon_supplier,
          email_supplier,
        })
        .catch((e) => console.error(e));
    },
  },
});
