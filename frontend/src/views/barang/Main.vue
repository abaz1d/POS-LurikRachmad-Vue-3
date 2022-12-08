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
                      <label for="pos-form-1" class="form-label">Nama Varian</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Varian"
                        v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-6">
                      <label for="pos-form-1" class="form-label">Kategori Barang</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Kategori Barang" v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-2">
                      <label for="pos-form-1" class="form-label">Stok Varian</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Stok Varian"
                        v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-5">
                      <label for="pos-form-1" class="form-label">Satuan Varian</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Satuan Varian"
                        v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-5">
                      <label for="pos-form-1" class="form-label">Kategori Gudang</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Kategori Gudang" v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-6">
                      <label for="pos-form-1" class="form-label">Harga Beli Varian</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Harga Beli Varian" v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-6">
                      <label for="pos-form-1" class="form-label">Harga Jual Varian</label>
                      <input id="pos-form-1" type="text" class="form-control flex-1"
                        placeholder="Masukan Harga Jual Varian" v-model="inputNamaVarian" required />
                    </div>
                    <div class="col-span-12">
                      <label for="pos-form-1" class="form-label">Gambar Varian</label>
                      <Dropzone  :options="{
                        url: 'https://httpbin.org/post',
                        thumbnailWidth: 150,
                        maxFilesize: 3,
                        maxFiles: 1,
                        headers: { 'My-Awesome-Header': 'header value' },
                      }" class="dropzone">
                        <div class="text-lg font-medium">
                          Drop files here or click to upload.
                        </div>
                        <div class="text-gray-600">
                          Silahkan upload 1 gambar sebagai foto varian
                        </div>
                      </Dropzone>
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
</template>

<script>
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
    BarangList
  },
  data() {
    return {
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

    }
  },
  mounted() {
    this.Barang.readItem()
  }
}
</script>
