import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem() {
      try {
        const { data } = await request.get("users", {
          timeout: 1000
        });
        if (data.success) {
          this.rawItems = data.data;
          console.log('rawItems', this.rawItems)
          return this.rawItems
        }
      } catch (error) {
        console.error(e);
      }

    },
    async addItem(
      nama_user,
      alamat_user,
      kontak_user,
    ) {
      const id_users = Date.now();
      this.rawItems.push({
        id_users,
        nama_user,
        alamat_user,
        kontak_user,
      });
      try {
        const data = await request.post("user/add", {
          nama_user,
          alamat_user,
          kontak_user,
        });

        this.rawItems = this.rawItems.map((item) => {
          if (item.id_users === id_users) {
            return data.data;
          }
          return item;
        });
      } catch (e) {
        console.error(e);
      }
    },
    async removeItem(id_users) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_users !== id_users
      );
      request
        .get(`user/delete/${id_users}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_users}`)
          }
        })
        .catch((e) => console.error(e));
    },
    async updateItem(user) {
      let id_users = user.id_users;
      let nama_user = user.nama_user;
      let alamat_user = user.alamat_user;
      let kontak_user = user.kontak_user;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_users === id_users) {
          return user;
        }
        return item;
      });
      request.post(`user/edit/${id_users}`, {
        nama_user,
        alamat_user,
        kontak_user,
      }).catch((e) => console.error(e));
    },
  },
});
