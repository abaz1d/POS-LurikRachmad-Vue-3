import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    rawItems: [],
    rawOutlets: [],
  }),
  getters: {
    items: (state) => state.rawItems,
    outlets: (state) => state.rawOutlets
  },
  actions: {
    async readItem() {
      try {
        const { data } = await request.get("users");
        //console.log('rawItems users',data, this.rawItems)
        if (data.success) {
          this.rawItems = data.data.rows
          this.rawOutlets = data.data.outlet
          return this.rawItems
        }
      } catch (error) {
        console.error(error);
      }

    },
    async addItem(
      username,
      role,
      outlet,
      email_user,
      password,
    ) {
      const id_users = Date.now();
      this.rawItems.push({
        id_users,
        username,
        role,
        id_outlet: outlet,
        email_user,
        password,
      });
      try {
        const { data } = await request.post("users/add", {
          id_users,
          username,
          role,
          id_outlet: outlet,
          email_user,
          password,
        });

        console.log("add", data);
        if (data.success) {

          this.rawItems = this.rawItems.map((item) => {
            if (item.id_users === id_users) {
              return data.data.data
            }
            return item;
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    async removeItem(id_users) {
      try {
        this.rawItems = this.rawItems.filter(
          (item) => item.id_users !== id_users
        );
        request
          .get(`users/delete/${id_users}`)
          .then((data) => {
            if (data.success) {
              // alert(`Sukses Hapus Data ${id_users}`)
            }
          })
          .catch((e) => console.error(e));
      } catch (error) {
        console.error(error);
      }
    },
    async updateItem(user) {
      try {
        let item
        let id_users = user.id_users;
        let username = user.username;
        let role = user.role;
        let id_outlet = user.id_outlet;
        let email_user = user.email_user;
        let password = user.password;

        if (password === "") {
          //console.log("password lama: ", password)
          item = {
            username,
            role,
            id_outlet,
            email_user,
          }
        } else {
          //console.log("password baru: ", password)
          item = {
            username,
            role,
            id_outlet,
            email_user,
            password,
          }
        }
        const { data } = await request.post(`users/edit/${id_users}`, item)
       //console.log("data",data)
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_users === id_users) {
              return data.data.data
            }
            return item;
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
