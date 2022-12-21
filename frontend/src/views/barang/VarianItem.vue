<template>
  <tr>
    <!-- <input type="text" v-model="nama"> -->
    <td style="width:25px; height:25px; text-align: center; padding: auto;">
      <div class="imgUp justify-content-center mb-2" v-if="varian.gambar_varian == null || ''">
        <div class="imagePreview"> Gambar Tidak Ditemukan </div>
      </div>

      <div v-else class="mb-2">
        <img :src="getImgUrl(varian.gambar_varian)" :alt="varian.gambar_varian" data-action="zoom"
          class="w-full rounded-md">
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
      {{ currencyFormat.format(varian.harga_beli_varian) }}
    </td>
    <td>
      {{ currencyFormat.format(varian.harga_jual_varian) }}
    </td>
    <td class="table-report__action w-56">
      <div class="flex justify-center items-center">
        <button class="flex items-center mr-3" type="button" @click="$emit('openModalEdit', {
          id_varian: varian.id_varian,
          gambar_lama_preview: gambar_lama,
        })">
          <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
        </button>

        <button class="flex items-center text-danger" type="button"
          @click="$emit('openModalDel', varian.id_varian, varian.nama_varian, gambar_lama)">
          <Trash2Icon class="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </td>
  </tr>


</template>

<script>
import { useBarangStore } from "../../stores/barang"
import { currencyFormatter } from "../../utils/helper"
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export default {
  name: "varianItem",
  setup(props) {
    const Barang = useBarangStore()
    const { varians } = storeToRefs(Barang)
    const currencyFormat = currencyFormatter

    return { Barang, varians, watch, currencyFormat }
  },
  emits: ["openModalDel", "openModalEdit", "cekVarian"],
  components: {
    // qrcode
  },
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
      isVarianOpen: false,
      namaBarang: this.nama_barang,

      // gambarVarian: this.varian.gambar_varian,
      // hargaBeliVarian: this.varian.harga_beli_varian,
      // hargaJualVarian: this.varian.harga_jual_varian,
      // idBarang: this.varian.id_barang,
      // kategoriGudangVarian: this.varian.id_gudang,
      // satuanVarian: this.varian.id_satuan,
      // idVarian: this.varian.id_varian,
      // kategoriBarangVarian: this.varian.id_barang,
      // namaVarian: this.varian.nama_varian,
      // stokVarian: this.varian.stok_varian,
      gambar_lama: '',
      file: '',
      publicPath: import.meta.env.VITE_APP_BASE_API
    }
  },
  methods: {
    varianOpen() {
      this.varianOpen = true;
    },
    getImgUrl(gambar_varian) {
      // console.log('gambar_varian',gambar_varian.data)
      var images = gambar_varian.data.map(b => String.fromCharCode(b)).join('')
      this.gambar_lama = new URL(`${this.publicPath}gambar/${images}`).href
      return  this.gambar_lama
    },
  },
  beforeMount() {
    // this.getImgUrl(this.varian.gambar_varian)
  }
  //    updated() {
  //         // this.dataNama.push(this.nama_barang)
  //         this.$emit("cekVarian")
  //         console.log("updated")
  //     }
}

</script>

<style scoped>
.imagePreview {
  width: 100px;
  height: 100px;
  margin: auto;
  text-align: center;
  padding: 18px 15px 15px 15px;
  background-position: center center;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  border: 2px solid #D0d3d4;
  border-radius: 5px 5px 5px 5px;
}

.imgUp {
  margin-bottom: 5px;
}

#gambarBaru {
  background-color: #b7b7b7;
}
</style>