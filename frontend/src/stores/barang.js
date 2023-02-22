import { defineStore } from "pinia";
import { request } from "../utils/api";
import { useAuthStore } from "./auth";

export const useBarangStore = defineStore({
  id: "barang",
  state: () => ({
    rawItems: [],
    rawVarians: [],
    rawDatas: [],
    rawLaporans: [],
  }),
  getters: {
    items: (state) => state.rawItems,
    varians: (state) => state.rawVarians,
    datas: (state) => state.rawDatas,

    laporans: (state) => state.rawLaporans,
  },
  actions: {
    async readLaporan() {
      try {
        const { data } = await request.get("barang/laporan");
        if (data.success) {
          this.rawLaporans = data.data.rows;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readItem() {
      try {
        const { data } = await request.get("barang");
        if (data.success) {
          this.rawItems = data.data.barang;
          this.rawVarians = data.data.varian;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async addItem(nama_barang) {
      const id_barang = Date.now();
      this.rawItems.push({ id_barang, nama_barang });
      try {
        const { data } = await request.post("barang/addbarang", {
          nama_barang,
        });
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_barang === id_barang) {
              this.readVarian(data.data.data.id_barang);
              return data.data.data;
            }
            return item;
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async removeItem(id_barang) {
      try {
        this.rawItems = this.rawItems.filter(
          (item) => item.id_barang !== id_barang
        );
        const { data } = await request.delete(`barang/deletebar/${id_barang}`);
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateItem(barang) {
      try {
        let id_barang = barang.id_barang;
        let nama_barang = barang.nama_barang;
        this.rawItems = this.rawItems.map((item) => {
          if (item.id_barang === id_barang) {
            return barang;
          }
          return item;
        });
        const { data } = await request.post(`barang/editbar/${id_barang}`, {
          nama_barang,
        });
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async readVarian(id_barang) {
      try {
        const { data } = await request.get(`barang?id_barang=${id_barang}`);
        if (data.success) {
          this.rawVarians = data.data.varian;

          this.rawVarians.map((varian) => {
            this.rawItems = this.rawItems.map((barang) => {
              if (varian.id_barang === barang.id_barang) {
                return { ...barang, serviceHistory: this.rawVarians };
              }
              return barang;
            });
            return varian;
          });
          return this.rawItems;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async addVarianGet() {
      try {
        const { data } = await request.get("barang/addvarian");
        if (data.success) {
          this.rawDatas = data.data;
          return data.data;
        } else {
          console.log("error", data.status);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async addVarian(varian) {
      console.log("addVarian", varian.file);
      const id_varian = Date.now();
      const formData = new FormData();
      formData.append("file", varian.file);
      formData.append("nama_varian", varian.nama_varian);
      formData.append("kategori_barang", varian.kategori_barang);
      formData.append("stok_varian", varian.stok_varian);
      formData.append("harga_beli", varian.harga_beli);
      formData.append("satuan_varian", varian.satuan_varian);
      formData.append("gudang", varian.gudang);
      formData.append("harga_jual", varian.harga_jual);

      const headers = { "Content-Type": "multipart/form-data" };

      if (varian.id_varian === "" || varian.id_varian === null) {
        console.log("id kosong");
        this.rawVarians.push({
          id_varian: id_varian,
          nama_varian: varian.nama_varian,
          kategori_barang: varian.kategori_barang,
          stok_varian: varian.stok_varian,
          harga_beli: varian.harga_beli,
          satuan_varian: varian.satuan_varian,
          gudang: varian.gudang,
          harga_jual: varian.harga_jual,
        });
        try {
          const data = await request.post(
            "barang/addvarian",
            formData,
            headers
          );

          this.rawVarians = this.rawVarians.map((item) => {
            if (item.id_varian === id_varian) {
              return data.data;
            }
            return item;
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        formData.append("id_varian", varian.id_varian);
        this.rawVarians.push({
          id_varian: varian.id_varian,
          nama_varian: varian.nama_varian,
          kategori_barang: varian.kategori_barang,
          stok_varian: varian.stok_varian,
          harga_beli: varian.harga_beli,
          satuan_varian: varian.satuan_varian,
          gudang: varian.gudang,
          harga_jual: varian.harga_jual,
        });
        try {
          const data = await request.post(
            "barang/addvarian",
            formData,
            headers
          );
          this.rawVarians = this.rawVarians.map((item) => {
            if (item.id_varian === varian.id_varian) {
              return data.data;
            }
            return item;
          });
        } catch (error) {
          console.error(error);
        }
      }
    },

    async updateVarianGet(id_varian) {
      try {
        const { data } = await request.get(`barang/editvar/${id_varian}`);
        if (data.success) {
          return data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateVarian(varian) {
      const file = varian.file_baru;
      const gambar_lama = varian.gambarLama;
      const formData = new FormData();

      formData.append("id_varian", varian.id_varian);
      formData.append("nama_varian", varian.nama_varian);
      formData.append("kategori_barang", varian.kategori_barang);
      formData.append("stok_varian", varian.stok_varian);
      formData.append("harga_beli", varian.harga_beli);
      formData.append("satuan_varian", varian.satuan_varian);
      formData.append("gudang", varian.gudang);
      formData.append("harga_jual", varian.harga_jual);

      formData.append(
        "gambar_lama",
        gambar_lama.data.map((b) => String.fromCharCode(b)).join("")
      );
      const headers = { "Content-Type": "multipart/form-data" };
      try {
        if (file === "" || file === null) {
          const { data } = await request.post(
            `barang/editvar/${varian.id_varian}`,
            formData,
            headers,
            { timeout: 3 }
          );
          if (data.success) {
            this.rawVarians = this.rawVarians.map((item) => {
              if (item.id_varian === varian.id_varian) {
                return data.data.data;
              }
              return item;
            });
          }
        } else {
          console.log("file_baru");
          formData.append("file", file);
          const { data } = await request.post(
            `barang/editvar/${varian.id_varian}`,
            formData,
            headers
          );
          if (data.success) {
            this.rawVarians = this.rawVarians.map((item) => {
              if (item.id_varian === varian.id_varian) {
                return data.data.data;
              }
              return item;
            });
          }
        }
      } catch (error) {
        console.error("error edit varian", error);
      }
    },

    async removeVarian(id_varian, gambar_lama) {
      console.log("id_varian removed", id_varian, gambar_lama);
      try {
        this.rawVarians = this.rawVarians.filter(
          (item) => item.id_varian !== id_varian
        );
        gambar_lama = gambar_lama.data
          .map((b) => String.fromCharCode(b))
          .join("");
        const { data } = await request.delete(`barang/deletevar/${id_varian}`, {
          data: { gambar_lama },
        });
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        console.error("error delete varian", error);
      }
    },
    async addSubvarianGet() {
      try {
        const { data } = await request.get("barang/addsubvarian");
        if (data.success) {
          this.rawDatas = data.data.varian;
          return data.data.varian;
        } else {
          console.log("error", data.status);
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async addSubvarian(varian) {
      const Auth = useAuthStore();
      const formData = new FormData();
      formData.append("id_varian", varian.id_varian);
      formData.append("id_outlet", String(Auth.items.id_outlet));
      formData.append("stok_varian", varian.stok_varian);

      const headers = { "Content-Type": "multipart/form-data" };
      try {
        this.rawVarians.push({
          id_varian: varian.id_varian,
          nama_varian: varian.nama_varian,
          nama_barang: varian.nama_barang,
          stok_varian: varian.stok_varian,
          nama_satuan: varian.nama_satuan,
          nama_outlet: varian.nama_outlet,
          harga_beli_varian: varian.harga_beli,
          harga_jual_varian: varian.harga_jual,
        });
        const { data } = await request.post(
          "barang/addsubvarian",
          formData,
          headers
        );
        if (data.success) {
          this.rawVarians = this.rawVarians.map((item) => {
            if (item.id_varian === varian.id_varian) {
              return data.data.data;
            }
            return item;
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async readVarianOutlet(id_barang) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `barang?id_barang=${id_barang}&id_outlet=${String(
            Auth.items.id_outlet
          )}`
        );

        if (data.success) {
          this.rawVarians = data.data.varian;

          this.rawVarians.map((varian) => {
            this.rawItems = this.rawItems.map((barang) => {
              if (varian.id_barang === barang.id_barang) {
                return { ...barang, serviceHistory: this.rawVarians };
              }
              return barang;
            });
            return varian;
          });
          return this.rawItems;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateSubvarianGet(id_varian) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(
          `barang/editsubvar/${id_varian}?id_outlet=${String(
            Auth.items.id_outlet
          )}`
        );
        if (data.success) {
          return data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    async updateSubvarian(varian) {
      const Auth = useAuthStore();
      const formData = new FormData();

      formData.append("id_sub_varian", varian.id_sub_varian);
      formData.append("id_varian", varian.id_varian);
      formData.append("id_outlet", String(Auth.items.id_outlet));
      formData.append("stok_varian", varian.stok_varian);

      const headers = { "Content-Type": "multipart/form-data" };
      try {
        const { data } = await request.post(
          `barang/editsubvar/${varian.id_sub_varian}`,
          formData,
          headers
        );
        if (data.success) {
          this.rawVarians = this.rawVarians.map((item) => {
            if (item.id_varian === varian.id_varian) {
              return data.data.data;
            }
            return item;
          });
        }
      } catch (error) {
        console.error("error edit varian", error);
      }
    },

    async removeSubvarian(varian) {
      try {
        this.rawVarians = this.rawVarians.filter(
          (item) => item.id_varian !== varian.id_varian
        );
        const { data } = await request.delete(
          `barang/deletesubvar/${varian.id_sub_varian}`
        );
        if (data.success) {
          return data.success;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
