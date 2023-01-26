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
        //console.log('data.l', data.data)
        if (data.success) {
          //console.log('laporan', data.data)
          this.rawLaporans = data.data.rows
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
        const { data } = await request.get("barang");
        //console.log('data.data', data)
        if (data.success) {
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
      const Auth = useAuthStore();
      try {
        const { data } = await request.get(`barang?id_barang=${id_barang}`);
        if (data.success) {
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

          //console.log('data.data', this.rawVarians)
          // console.log('this.rawVarians', this.rawVarians)
          return this.rawItems
        }
      } catch (error) {
        console.error(error);
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
        console.log('data.data', data)
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
        console.error("error edit varian", error);
      }
    },

    async removeVarian(varian) {
      this.rawVarians = this.rawVarians.filter(
        (item) => item.id_varian !== varian.id_varian
      );
      request.get(`barang/deletevar/${varian.id_varian}`).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          // alert(`Sukses Hapus Data ${id_barang}`)
        }
      });
    },

    //----------------------------------------------------------------Sub Varian --------------------------------
    async addSubvarianGet() {
      try {
        const { data } = await request.get("barang/addsubvarian");
        //console.log("data", data.data.varian);
        if (data.success) {
          this.rawDatas = data.data.varian;
          return data.data.varian;
        } else {
          console.log("error", data.status);
        }
      } catch (error) {
        console.error(error);
      }

    },

    async readVarianOutlet(id_barang) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(`barang?id_barang=${id_barang}&id_outlet=${String(Auth.items.id_outlet)}`);
        //console.log('data.data', data)
        if (data.success) {
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

          // console.log('data.data', request, Auth.items.id_outlet)
          //console.log('this.rawVarians', this.rawVarians)
          return this.rawItems
        }
      } catch (error) {
        console.error(error);
      }

    },

    async updateSubvarianGet(id_varian) {
      try {
        const Auth = useAuthStore();
        const { data } = await request.get(`barang/editsubvar/${id_varian}?id_outlet=${String(Auth.items.id_outlet)}`);
        console.log('data.data', data.data)
        if (data.success) {
          return data.data;
        }
      } catch (error) {
        console.error(error);
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
          headers,
          { timeout: 3 }
        );
        //console.log('data.data', data.data.data)
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
      //console.log('data.data', varian);
      this.rawVarians = this.rawVarians.filter(
        (item) => item.id_varian !== varian.id_varian
      );
      request.delete(`barang/deletesubvar/${varian.id_sub_varian}`).then((res) => {
        if (data.success) {
          // alert(`Sukses Hapus Data ${id_barang}`)
        }
      });
    },

  },
});
