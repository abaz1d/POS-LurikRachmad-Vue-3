<template>
  <h2 class="intro-y text-lg font-medium mt-10">Data List Layout</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
      <button class="btn btn-primary shadow-md mr-2" @click="addModal = true">Add New Product</button>

      <!-- BEGIN: Modal Content -->
      <Modal :show="addModal" @hidden="addModal = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Tambah Produk</h2>
          <button type="button" @click="addModal = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12">
          <div class="text-center col-span-6">
            <button class="btn btn-primary" @click="addModalBarang = true">Tambah
              Barang</button>
            <Modal :show="addModalBarang" @hidden="addModalBarang = false">
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Tambah Barang</h2>
              </ModalHeader>
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                <form @submit.prevent="addBarang" id="addBarangForm" class="col-span-12">
                  <div class="col-span-12 mb-5">
                    <label for="pos-form-1" class="form-label">Nama Barang</label>
                    <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Barang"
                      v-model="inputNamaBarang" required />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter class="text-right">
                <button type="button" @click="addModalBarang = false" class="btn btn-outline-secondary w-32 mr-1">
                  Cancel
                </button>
                <button type="submit" form="addBarangForm" class="btn btn-primary w-32">Simpan</button>
              </ModalFooter>
            </Modal>
          </div>
          <div class="text-center col-span-6">
            <button class="btn btn-pending" @click="addModalVarian = true">Tambah Varian</button>
            <Modal size="modal-xl" :show="addModalVarian" @hidden="addModalVarian = false">
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Tambah Varian</h2>
              </ModalHeader>
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12">
                  <form @submit.prevent="addVarian" id="addVarianForm" class="grid grid-cols-12 gap-6">

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
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Kategori Barang" v-model="kategoriBarangVarian" required />
                    </div>
                    <div class="col-span-6">
                      <label for="pos-form-1" class="form-label">Kategori Gudang</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Kategori Gudang" v-model="kategoriGudangVarian" required />
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
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Harga Beli Varian" v-model="hargaBeliVarian" required />
                    </div>
                    <div class="col-span-6">
                      <label for="pos-form-1" class="form-label">Harga Jual Varian</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Harga Jual Varian" v-model="hargaJualVarian" required />
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
                                <a href="#" class="text-primary font-medium" target="blank">Learn More</a>
                              </div>
                            </div>
                            <div class="form-inline items-start flex-col xl:flex-row mt-10">
                              <div
                                class="w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                                <div class="grid grid-cols-10 gap-5 pl-4 pr-5">
                                  <div
                                    class="imgUp justify-content-center mb-2 col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in">

                                  </div>
                                  <div class="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in">
                                    <img v-if="url === null" class="rounded-md" alt="Midone - HTML Admin Template"
                                       />
                                    <img v-else class="rounded-md" alt="Midone - HTML Admin Template" :src="url" />
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
                                  <input id="gambarBaru" @change="" type="file"
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
                <button type="button" @click="addModalVarian = false" class="btn btn-outline-secondary w-32 mr-1">
                  Cancel
                </button>
                <button type="submit" form="addVarianForm" class="btn btn-primary w-32">Simpan</button>
              </ModalFooter>
            </Modal>
          </div>
        </ModalBody>
        <ModalFooter class="text-right">
          <!-- <button type="button" @click="addModal = false" class="btn btn-outline-secondary w-32 mr-1">
            Cancel
          </button>
          <button type="submit" form="addSatuanForm" class="btn btn-primary w-32">Simpan</button> -->
        </ModalFooter>
      </Modal>
      <Dropdown>
        <DropdownToggle class="btn px-2 box">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <PrinterIcon class="w-4 h-4 mr-2" /> Print
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <div class="hidden md:block mx-auto text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-56 relative text-slate-500">
          <input type="text" class="form-control w-56 box pr-10" placeholder="Search..." />
          <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
        </div>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <!-- <Ba :satuans="Barang.items" /> -->
      <BarangList :barangs="Barang.items" />
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <nav class="w-full sm:w-auto sm:mr-auto">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">1</a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">...</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
      </nav>
      <select class="w-20 form-select box mt-3 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>35</option>
        <option>50</option>
      </select>
    </div>
    <!-- END: Pagination -->
  </div>

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
import BarangList from "./BarangList.vue"
import { ref } from "vue";

const addModal = ref(false);
const addModalBarang = ref(false);
const addModalVarian = ref(false);
const inputNamaBarang = ref('')
const inputNamaVarian = ref('')
const inputGambarVarian = ref('')

export default {
  setup() {
    const Barang = useBarangStore();

    return { Barang }
  },
  components: {
    BarangList,
    qrcode,
  },
  data() {
    return {
      checkedID: 'oldID',
      isVarianOpen: false,
      isModalScanner: false,

      gambarVarian: '',
      hargaBeliVarian: '',
      hargaJualVarian: '',
      idBarang: '',
      kategoriGudangVarian: '',
      satuanVarian: '',
      idVarian: '',
      kategoriBarangVarian: '',
      namaVarian: '',
      stokVarian: '',

      url: null,
      file: null,
      newIDVarian: '',
      publicPath: import.meta.env.VITE_APP_BASE_API,

      addModal,
      addModalBarang,
      addModalVarian,
      inputNamaBarang,
      inputNamaVarian,
      inputGambarVarian,
    };
  },
  methods: {
    showValue() {
      console.log("showValue", this.inputNamaVarian.value)
    },
    addBarang() {
      try {
        // console.log("addSatuan", inputNamaBarang.value)
        this.Barang.addItem(inputNamaBarang.value)
        inputNamaBarang.value = ''
        this.addModalBarang = false

      } catch (error) {
        alert('Gagal Tambah Data', error)
      }

    },
    renderQrScanner() {
      console.log("openQrScanner")
      this.$refs.qrScanner.renderQrScanner()
      // console.log("qrScanner", this.$refs)
    },
    closeQrScanner() {
      console.log("closeQrScanner")
      this.$refs.qrScanner.closeQrScanner()
    },
    resultScan(result) {
      console.log('varian', result)
      this.newIDVarian = result
      this.isModalScanner = false
      this.$refs.qrScanner.closeQrScanner()
    }
  },
  mounted() {
    this.Barang.readItem()
  }
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
