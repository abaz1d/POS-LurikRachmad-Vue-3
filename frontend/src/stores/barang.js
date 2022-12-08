import { defineStore } from "pinia";
import { request } from "../utils/api";

export const useBarangStore = defineStore({
    id: "barang",
    state: () => ({
        rawItems: [],
        rawvarians: []
    }),
    getters: {
        items: (state) => state.rawItems,
        varians: (state) => state.rawvarians
    },
    actions: {
        async readItem() {
            const data = await request.get('barang')
            if (data.status >= 200 && data.status < 300) {
                this.rawItems = data.data.barang;

                // console.log('rawItems', this.rawItems)
                // console.log('rawvarians', this.rawvarians)
                // return this.rawItems
            }
        },
        async readVarian(id_barang) {
            const data = await request.get(`barang?id_barang=${id_barang}`)
            if (data.status >= 200 && data.status < 300) {
                this.rawvarians = data.data.varian;
                // console.log('data.data', data.data)
                // console.log('this.rawvarians', this.rawvarians)
            }
        },
        async addItem(nama_barang) {
            const id_barang = Date.now()
            this.rawItems.push({ id_barang, nama_barang });
            try {
                const data = await request.post('barang/addbarang', { nama_barang })

                this.rawItems = this.rawItems.map((item) => {
                    if (item.id_barang === id_barang) {
                        return data.data
                    }
                    return item
                })
            } catch (e) {
                console.error(e)
            }
        },
        removeItem(id_barang) {
            this.rawItems = this.rawItems.filter((item) => item.id_barang !== id_barang);
            request.get(`barang/deletebar/${id_barang}`)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        // alert(`Sukses Hapus Data ${id_barang}`)
                    }
                })
                .catch(e => console.error(e))
        },
        updateItem(barang) {
            let id_barang = barang.id_barang
            let nama_barang = barang.nama_barang
            this.rawItems = this.rawItems.map((item) => {
                if (item.id_barang === id_barang) {
                    return barang
                }
                return item
            })
            request.post(`barang/editbar/${id_barang}`, { nama_barang })
        },
        updateVarian(varian) {
            const formData = new FormData();
            formData.append('file', varian.file,);
            const headers = { 'Content-Type': 'multipart/form-data' };

            this.varians = this.varians.map(item => {
                if (item.id_varian == varian.id_varian) {
                    return varian
                }
                return item
            })
            request.post(`barang/editvar/${varian.id_varian}`, formData, {
                headers,
                nama_varian: varian.nama_varian,
                kategori_barang: varian.kategori_barang,
                stok_varian: varian.stok_varian,
                harga_beli: varian.harga_beli,
                satuan_varian: varian.satuan_varian,
                gudang: varian.gudang,
                
                harga_jual: varian.harga_jual,
            })
        },
    }
})