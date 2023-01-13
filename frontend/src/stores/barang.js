import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useBarangStore = defineStore({
  id: "barang",
  state: () => ({
    rawItems: [],
    rawVarians: [],
    rawDatas: [],
  }),
  getters: {
    items: (state) => state.rawItems,
    varians: (state) => state.rawVarians,
    datas: (state) => state.rawDatas,
  },
  actions: {
    async readItem() {
      try {
        const data = await request.get("barang");

        if (data.status >= 200 && data.status < 300) {
          this.rawItems = data.data.barang;
          this.rawVarians = data.data.varian;
        }
      } catch (error) {
        console.error(error);
      }

    },

    async addItem(nama_barang) {
      const id_barang = Date.now();
      this.rawItems.push({ id_barang, nama_barang });
      try {
        const data = await request.post("barang/addbarang", { nama_barang });

        this.rawItems = this.rawItems.map((item) => {
          if (item.id_barang === id_barang) {
            this.readVarian(data.data.id_barang);
            return data.data;
          }

          return item;
        });
      } catch (error) {
        console.error(error);
      }
    },

    async removeItem(id_barang) {
      this.rawItems = this.rawItems.filter(
        (item) => item.id_barang !== id_barang
      );
      request
        .get(`barang/deletebar/${id_barang}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            // alert(`Sukses Hapus Data ${id_barang}`)
          }
        })
        .catch((e) => console.error(e));
    },

    async updateItem(barang) {
      let id_barang = barang.id_barang;
      let nama_barang = barang.nama_barang;
      this.rawItems = this.rawItems.map((item) => {
        if (item.id_barang === id_barang) {
          return barang;
        }
        return item;
      });
      request.post(`barang/editbar/${id_barang}`, { nama_barang }).catch((e) => console.error(e));
    },

    //---------------------------------------------------------------- Varian ----------------

    async readVarian(id_barang) {
      try {
        const data = await request.get(`barang?id_barang=${id_barang}`);
        if (data.status >= 200 && data.status < 300) {
          this.rawVarians = data.data.varian;

          this.rawVarians.map((varian) => {
            this.rawItems = this.rawItems.map((barang) => {
              if (varian.id_barang === barang.id_barang) {
                return { ...barang, serviceHistory: this.rawVarians }
              }
              return barang
            })
            return varian
          })

          // console.log('data.data', data.data)
          // console.log('this.rawVarians', this.rawVarians)
          return this.rawItems
        }
      } catch (error) {
        console.error(error);
      }

    },

    async addVarianGet() {
      try {
        const data = await request.get("barang/addvarian");
        if (data.status >= 200 && data.status < 300) {
          this.rawDatas = data.data;
          return data.data;
        } else {
          console.log("error", data.status);
        }
      } catch (error) {
        console.error(error);
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

      if (varian.id_varian === "" || null) {
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
        } catch (e) {
          console.error(e);
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
          //console.log("data", data);
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
      // console.log('addVarian',
      //     this.rawVarians
      // )
    },

    async updateVarianGet(id_varian) {
      try {
        const data = await request.get(`barang/editvar/${id_varian}`);
        if (data.status >= 200 && data.status < 300) {
          return data.data;
        } else {
          console.log("error", data.status);
        }
      } catch (error) {
        console.error(error);
      }

    },

    async updateVarian(varian) {
      const file = varian.file_baru
      const gambar_lama = varian.gambarLama
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

      //const headers = { "Content-Type": "application/x-www-form-urlencoded" };
      const headers = { "Content-Type": "multipart/form-data" };
      //console.log("varian update ", varian)
      try {
        if (file === "" || null) {
          const data = await request.post(
            `barang/editvar/${varian.id_varian}`,
            formData,
            headers,
            { timeout: 3 }
          );
          if (data.status >= 200 && data.status < 300) {
            this.rawVarians = this.rawVarians.map((item) => {
              if (item.id_varian === varian.id_varian) {
                return data.data;
              }
              return item;
            });
          }
        } else {
          console.log("file_baru")
          formData.append("file", file);
          const data = await request.post(
            `barang/editvar/${varian.id_varian}`,
            formData,
            headers,
            { timeout: 3 }
          );
          if (data.status >= 200 && data.status < 300) {
            this.rawVarians = this.rawVarians.map((item) => {
              if (item.id_varian === varian.id_varian) {
                return data.data;
              }
              return item;
            });
          }
        }
      } catch (error) {
        console.error("error edit varian",error);
      }
    },

    removeVarian(varian) {
      this.rawVarians = this.rawVarians.filter(
        (item) => item.id_varian !== varian.id_varian
      );
      request.get(`barang/deletevar/${varian.id_varian}`).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          // alert(`Sukses Hapus Data ${id_barang}`)
        }
      });
    },
  },
});
