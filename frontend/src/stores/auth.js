import { defineStore } from "pinia";
import { request } from "@/utils/api";
import router from "@/router";

export const useAuthStore = defineStore({
  id: "authorization",
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null

  }),
  getters: {
    items: (state) => state.user,
  },
  actions: {
    async login(email_user, password) {
      try {
        const { data } = await request.post("auth", {
          email_user,
          password
        });

        if (data.success) {
          this.user = data.data;
          // return this.user
          console.log('user', data)
          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(this.user));

          // redirect to previous url or default to home page
          router.push(this.returnUrl || '/');

        }
      } catch (error) {
        console.error(error);
      }

    },

    async logout() {
      const { data } = await request.get("logout")
      if (data.success) {
        this.user = null;
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
  },
});
