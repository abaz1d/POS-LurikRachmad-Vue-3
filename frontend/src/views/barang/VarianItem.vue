<template>
  <tr>
    <!-- <input type="text" v-model="nama"> -->
    <td style="width:25px; height:25px; text-align: center; padding: auto;">
      <div class="imgUp justify-content-center mb-2" v-if="varian.gambar_varian == null || ''">
        <div class="imagePreview"> Gambar Tidak Ditemukan </div>
      </div>

      <div v-else class="mb-2">
        <img :src="getImgUrl(varian.gambar_varian)" v-bind:alt="varian.gambar_varian" data-action="zoom"
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
  <!-- <button class="btn btn-pending" @click="isEdit = true">Tambah Varian</button> -->
  <Modal size="modal-xl" :show="isEdit" @hidden="isEdit = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Edit Varian {{ varian.nama_varian }}</h2>
    </ModalHeader>
    <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
      <div class="col-span-12">
        <form @submit.prevent="updateVarian" id="editVarianForm" class="grid grid-cols-12 gap-6">

          <div class="col-span-6">
            <div class="grid grid-cols-12 form-label">
              <label for="pos-form-1" class="form-check col-span-2">ID Varian</label>
              <div class="form-check col-span-4">
                <input id="oldID" class="form-check-input" type="radio" value="oldID" v-model="checkedID" />
                <label for="pos-form-1" @click="checkedID = 'oldID'" class="form-check-label">ID Lama</label>
              </div>
              <div class="form-check col-span-4">
                <input id="newID" class="form-check-input" type="radio" value="newID" v-model="checkedID" />
                <label for="pos-form-1" @click="checkedID = 'newID'" class="form-check-label">Edit ID</label>
              </div>
            </div>
            <input v-if="checkedID == 'oldID'" id="pos-form-1" type="text" class="form-control flex-1"
              placeholder="Masukan Nama Varian" v-model="idVarian" readonly />

            <div v-else class="input-group">
              <input type="text" class="form-control min-w-[6rem]" placeholder="Ketik / Scan ID Baru"
                v-model="newIDVarian" />
              <div class="camera input-group-text" @click="isModalScanner = true; renderQrScanner();">
                <component is="CameraIcon" />
              </div>
            </div>

            <small v-if="checkedID == 'oldID'" class="text-grey-800 text-xs ml-2">
              * Untuk mengedit ID Varian pilih Edit ID pada radio di atas
            </small>

            <small v-else class="text-grey-800 text-xs ml-2"> * Tekan lambang Kamera untuk scan <b>Barcode /
                ID</b></small>

          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Nama Varian</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Varian"
              v-model="namaVarian" required />
          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Kategori Barang</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Kategori Barang"
              v-model="kategoriBarangVarian" required />
          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Kategori Gudang</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Kategori Gudang"
              v-model="kategoriGudangVarian" required />
          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Stok Varian</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Stok Varian"
              v-model="stokVarian" required />
          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Satuan Varian</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Satuan Varian"
              v-model="satuanVarian" required />
          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Harga Beli Varian</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Harga Beli Varian"
              v-model="hargaBeliVarian" required />
          </div>
          <div class="col-span-6">
            <label for="pos-form-1" class="form-label">Harga Jual Varian</label>
            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Harga Jual Varian"
              v-model="hargaJualVarian" required />
          </div>
          <div class="col-span-12">
            <label for="pos-form-1" class="form-label">Gambar Varian</label>
            <div class="intro-y box p-5">
              <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                <div
                  class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                  <ChevronDownIcon class="w-4 h-4 mr-2" /> Upload Product
                </div>
                <div class="mt-5">
                  <div class="flex items-center text-slate-500">
                    <span>
                      <LightbulbIcon class="w-5 h-5 text-warning" />
                    </span>
                    <div class="ml-2">
                      <span class="mr-1">Avoid selling counterfeit products / violating Intellectual
                        Property Rights, so that your products are not deleted.</span>
                      <a href="#"
                        class="text-primary font-medium" target="blank">Learn More</a>
                    </div>
                  </div>
                  <div class="form-inline items-start flex-col xl:flex-row mt-10">
                    <div
                      class="w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                      <div class="grid grid-cols-10 gap-5 pl-4 pr-5">
                        <div
                          class="imgUp justify-content-center mb-2 col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in"
                          v-if="varian.gambar_varian == null || ''">

                        </div>
                        <div v-else class="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in">
                          <img v-if="url === null" class="rounded-md" alt="Midone - HTML Admin Template"
                            :src="getImgUrl(varian.gambar_varian)" />
                          <img v-else class="rounded-md" alt="Midone - HTML Admin Template"
                            :src="url" />
                          <Tippy content="Remove this image?" @click="url = null"
                            class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                            <XIcon class="w-4 h-4" />
                          </Tippy>
                        </div>
                      </div>
                      <div class="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative">
                        <ImageIcon class="w-4 h-4 mr-2" />
                        <span class="text-primary mr-1">Upload a file</span> or drag
                        and drop
                        <input id="gambarBaru" @change="previewImage" type="file"
                          class="w-full h-full top-0 left-0 absolute opacity-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </form>
      </div>
    </ModalBody>
    <ModalFooter class="text-right">
      <button type="button" @click="isEdit = false" class="btn btn-outline-secondary w-32 mr-1">
        Cancel
      </button>
      <button type="submit" form="editVarianForm" class="btn btn-primary w-32">Simpan</button>
    </ModalFooter>
  </Modal>

  <Modal size="modal-xl" backdrop="static" :show="isModalScanner" @hidden="isModalScanner = false">
    <ModalHeader>
      <div class="text-center mt-2">
        <h2 class="text-lg font-bold">QR Code Scanner</h2>
      </div>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="mb-5">
          <div class="intro-y justify-center flex mt-5">
            <qrcode v-bind:qrbox="250" v-bind:fps="10" ref="qrScanner" @resultScan="resultScan" />
          </div>
        </div>
        <button type="button" @click="isModalScanner = false; closeQrScanner();" class="btn btn-danger w-24">
          Close
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script>
import qrcode from '../../components/qrcode/QrCode.vue'
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
  components: {
    qrcode
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
      checkedID: 'oldID',
      isEdit: false,
      isVarianOpen: false,
      isModalScanner: false,
      namaBarang: this.nama_barang,

      gambarVarian: this.varian.gambar_varian,
      hargaBeliVarian: this.varian.harga_beli_varian,
      hargaJualVarian: this.varian.harga_jual_varian,
      idBarang: this.varian.id_barang,
      kategoriGudangVarian: this.varian.id_gudang,
      satuanVarian: this.varian.id_satuan,
      idVarian: this.varian.id_varian,
      kategoriBarangVarian: this.varian.nama_barang,
      namaVarian: this.varian.nama_varian,
      stokVarian: this.varian.stok_varian,

      url: null,
      file: null,
      newIDVarian: '',
      publicPath: import.meta.env.VITE_APP_BASE_API
    }
  },
  methods: {
    updateVarian() {
      try {
        this.Barang.updateVar({ 
          id_varian: this.varian.id_varian,
          nama_varian: this.namaVarian,
          kategori_barang: this.kategoriBarangVarian,
          stok_varian: this.stokVarian,
          harga_beli: this.hargaBeliVarian,
          satuan_varian: this.satuanVarian,
          gudang: this.kategoriGudangVarian,

          file: this.file,
          harga_jual: this.hargaJualVarian.$emit

        })
        this.isEdit = false
      } catch (error) {
        alert(`Gagal Update data ${id_barang}`, error)
      }
    },
    varianOpen() {
      this.varianOpen = true;
      console.log('varianOpen')
    },
    getImgUrl(gambar_varian) {
      // console.log('gambar_varian',gambar_varian.data)
      var images = gambar_varian.data.map(b => String.fromCharCode(b)).join('')
      return new URL(`${this.publicPath}gambar/${images}`).href
    },
    previewImage(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
      console.log('image', this.url);

    },
    renderQrScanner() {
      this.$refs.qrScanner.renderQrScanner()
      // console.log("qrScanner", this.$refs)
    },
    closeQrScanner() {
      this.$refs.qrScanner.closeQrScanner()
    },
    resultScan(result) {
      console.log('varian', result)
      this.newIDVarian = result
      this.isModalScanner = false
      this.$refs.qrScanner.closeQrScanner()
    }
  },
  beforeMount(){
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

.camera {
  cursor: pointer;
}

.camera :hover {
  background-color: #c7c8c8;
}
</style>