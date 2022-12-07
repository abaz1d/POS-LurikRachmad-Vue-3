<template>
    <tr>
        <!-- <input type="text" v-model="nama"> -->
        <td style="width:25px; height:25px; text-align: center; padding: auto;">
            <div>
                <img :src="getImgUrl(varian.gambar_varian)" v-bind:alt="varian.gambar_varian" style="width: 100%">
            </div>
            <div>
                {{ varian.id_varian }}
            </div>
        </td>

        <td>
            {{ varian.nama_barang }}
        </td>

        <td>
            {{ varian.nama_varian }}
        </td>

        <td>
            {{ varian.stok_varian }}
        </td>

        <td>
            {{ varian.id_satuan }}
        </td>

        <td>
            {{ varian.id_gudang }}
        </td>

        <td>
            {{ varian.harga_beli_varian }}
        </td>
        <td>
            {{ varian.harga_jual_varian }}
        </td>
        <td class="table-report__action w-56">
            <div class="flex justify-center items-center">
                <button class="flex items-center mr-3" type="button" @click="isEdit = true">
                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                </button>
                <button class="flex items-center text-danger" type="button"
                    @click="$emit('openModal', varian.id_varian, varian.nama_varian)">
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
import { useBarangStore } from "../../stores/barang"
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export default {
    name: "varianItem",
    setup(props) {
        const Barang = useBarangStore()
        const { varians } = storeToRefs(Barang)

        return { Barang, varians, watch }
    },
    emits: ["openModal", "cekVarian"],
    watch: {
        varians() {
            // console.log("watch", this.nama_barang, this.varian.nama_barang )
            if (this.nama_barang == this.varian.nama_barang) {
                this.$emit("cekVarian", this.namaBarang)
                // this.varianOpen = false
                // console.log("watch", this.namaBarang)
            }
        }
    },
    props: {
        varian: {
            type: Object,
            required: true,
        },
        nama_barang: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isEdit: false,
            isVarianOpen: false,
            namaBarang: this.nama_barang,
            nama: this.varian.nama_barang,
            publicPath: import.meta.env.VITE_APP_BASE_API
        }
    },
    methods: {
        varianOpen(){
            this.varianOpen = true;
            console.log('varianOpen')
        },
        getImgUrl(gambar_varian) {
            var images = gambar_varian.data.map(b => String.fromCharCode(b)).join('')
            return new URL(`${this.publicPath}gambar/${images}`).href
        }
    },
    //    updated() {
    //         // this.dataNama.push(this.nama_barang)
    //         this.$emit("cekVarian")
    //         console.log("updated")
    //     }
}

</script>