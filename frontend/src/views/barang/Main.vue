<template>
  <h2 class="intro-y text-lg font-medium mt-10">Data Barang</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
    >
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="openAddModal()"
      >
      <PlusIcon class="w-4 h-4 mr-2" /> <p class="hidden xl:block mr-1">Produk</p> Baru
      </button>

      <!-- BEGIN: Modal Content -->
      <Modal :show="addModal" @hidden="addModal = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Tambah Produk</h2>
          <button
            type="button"
            @click="addModal = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12">
          <div class="text-center col-span-6">
            <button class="btn btn-primary" @click="addModalBarang = true">
              Tambah Barang
            </button>
            <Modal
              backdrop="static"
              :show="addModalBarang"
              @hidden="addModalBarang = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Tambah Barang</h2>
                <button
                  type="button"
                  @click="addModalBarang = false"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </ModalHeader>
              <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                <form
                  @submit.prevent="addBarang"
                  id="addBarangForm"
                  class="col-span-12"
                >
                  <div class="col-span-12 mb-5">
                    <label for="pos-form-1" class="form-label"
                      >Nama Barang</label
                    >
                    <input
                      id="pos-form-1"
                      type="text"
                      class="form-control flex-1"
                      placeholder="Masukan Nama Barang"
                      v-model="inputNamaBarang"
                      required
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter class="text-right">
                <button
                  type="button"
                  @click="addModalBarang = false"
                  class="btn btn-outline-secondary w-32 mr-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="addBarangForm"
                  class="btn btn-primary w-32"
                >
                  Simpan
                </button>
              </ModalFooter>
            </Modal>
          </div>
          <div class="text-center col-span-6">
            <button class="btn btn-pending" @click="addModalVarian = true">
              Tambah Varian
            </button>
            <Modal
              backdrop="static"
              size="modal-xl"
              :show="addModalVarian"
              @hidden="addModalVarian = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Tambah Varian</h2>
                <button
                  type="button"
                  @click="resetFormVarian"
                  class="btn btn-outline-danger inline-block hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <RefreshCwIcon class="mr-2" />Reset Form
                </button>
              </ModalHeader>
              <ModalBody class="">
                <form @submit.prevent="addVarian" id="addVarianForm">
                  <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3 form-switch mb-0">
                          <label
                            for="idVarian"
                            class="block text-sm font-medium text-gray-700"
                            >ID Varian |
                            <input
                              id="ScanID"
                              class="form-check-input"
                              type="checkbox"
                              v-model="checkedID"
                          /></label>
                          <div class="input-group">
                            <input
                              type="text"
                              id="idVarian"
                              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              :placeholder="
                                checkedID
                                  ? 'Ketik / Scan ID'
                                  : 'Auto Generate ID'
                              "
                              v-model="ScanIDVarian"
                              :readonly="!checkedID"
                            />
                            <div
                              v-if="checkedID"
                              class="camera inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 mt-1"
                              @click="
                                isModalScanner = true;
                                renderQrScanner();
                              "
                            >
                              <component is="CameraIcon" />
                            </div>
                          </div>
                          <small
                            v-if="!checkedID"
                            class="text-grey-800 text-xs ml-2 mt-0"
                          >
                            * Untuk manambah ID Manual cek pada checkbox.
                          </small>
                          <small v-else class="text-grey-800 text-xs ml-2 mt-0">
                            * Tekan lambang Kamera untuk scan
                            <b>Barcode / ID</b></small
                          >
                        </div>

                        <div class="col-span-6 sm:col-span-3 mb-0">
                          <label
                            for="namaVarian"
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Nama Varian</label
                          >
                          <input
                            id="namaVarian"
                            type="text"
                            class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Masukan Nama Varian"
                            v-model="namaVarian"
                            required
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="kategoriBarang"
                            class="block text-sm font-medium text-gray-700"
                            >Kategori Barang</label
                          >
                          <TomSelect
                            v-model="kategoriBarangVarian"
                            id="kategoriBarang"
                            class="mt-1 w-full"
                            aria-label="Default select example"
                            required
                          >
                            <option value="kosong" disabled>
                              &gt-- Pilih Barang --&lt
                            </option>
                            <option
                              v-for="barang in data.barang"
                              :key="barang.id_barang"
                              :barang="barang"
                              :value="barang.id_barang"
                            >
                              {{ barang.id_barang }} - {{ barang.nama_barang }}
                            </option>
                          </TomSelect>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="kategoriGudang"
                            class="block text-sm font-medium text-gray-700"
                            >Kategori Gudang</label
                          >
                          <TomSelect
                            v-model="kategoriGudangVarian"
                            id="kategoriGudang"
                            class="mt-1 w-full"
                            aria-label="Default select example"
                            required
                          >
                            <option value="kosong" disabled>
                              &gt-- Pilih Gudang --&lt
                            </option>
                            <option
                              v-for="gudang in data.gudang"
                              :key="gudang.id_gudang"
                              :gudang="gudang"
                              :value="gudang.id_gudang"
                            >
                              {{ gudang.id_gudang }} - {{ gudang.nama_gudang }}
                            </option>
                          </TomSelect>
                        </div>

                        <div class="col-span-6 sm:col-span-3 mb-0">
                          <label
                            for="stokVarian"
                            class="block text-sm font-medium text-gray-700"
                            >Stok Varian</label
                          >
                          <input
                            id="stokVarian"
                            type="text"
                            class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Masukan Stok Varian"
                            v-model="stokVarian"
                            required
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="satuanVarian"
                            class="block text-sm font-medium text-gray-700"
                            >Satuan Varian</label
                          >
                          <TomSelect
                            v-model="satuanVarian"
                            id="satuanVarian"
                            class="mt-1 w-full"
                            aria-label="Default select example"
                            required
                          >
                            <option value="kosong" disabled>
                              &gt-- Pilih Satuan --&lt
                            </option>
                            <option
                              v-for="satuan in data.satuan"
                              :key="satuan.id_satuan"
                              :satuan="satuan"
                              :value="satuan.id_satuan"
                            >
                              {{ satuan.id_satuan }} - {{ satuan.nama_satuan }}
                            </option>
                          </TomSelect>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="hargaBeliVarian"
                            class="block text-sm font-medium text-gray-700"
                            >Harga Beli Varian</label
                          >
                          <input
                            id="hargaBeliVarian"
                            type="text"
                            class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Masukan Harga Beli Varian"
                            v-model="hargaBeliVarian"
                            required
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                          <label
                            for="hargaJualVarian"
                            class="block text-sm font-medium text-gray-700"
                            >Harga Jual Varian</label
                          >
                          <input
                            id="hargaJualVarian"
                            type="text"
                            class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Masukan Harga Jual Varian"
                            v-model="hargaJualVarian"
                            required
                          />
                        </div>

                        <div class="col-span-6 sm:col-span-6">
                          <label class="block text-sm font-medium text-gray-700"
                            >Gambar Varian</label
                          >
                          <div
                            class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                          >
                            <div class="space-y-1 text-center">
                              <svg
                                v-if="url == null || ''"
                                class="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>

                              <div
                                v-else
                                class="col-span-5 md:col-span-2 relative image-fit cursor-pointer zoom-in"
                                style="height: 9rem"
                              >
                                <img
                                  class="imgUp rounded-md"
                                  alt="Midone - HTML Admin Template"
                                  :src="url"
                                />
                                <Tippy
                                  content="Remove this image?"
                                  @click="url = null"
                                  class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                >
                                  <XIcon class="w-4 h-4" />
                                </Tippy>
                              </div>
                              <div @click="this.$refs.gambarBaru.click()">
                                <div class="flex text-sm text-gray-600">
                                  <label
                                    for="gambarBaru"
                                    class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="gambarBaru"
                                      ref="gambarBaru"
                                      @change="previewImage"
                                      name="file-upload"
                                      type="file"
                                      class="sr-only"
                                    />
                                  </label>
                                  <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter class="text-right">
                <button
                  type="button"
                  @click="addModalVarian = false"
                  class="btn btn-outline-secondary w-32 mr-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="addVarianForm"
                  class="btn btn-primary w-32"
                >
                  Simpan
                </button>
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
        <DropdownToggle class="btn px-2 box mt-0 mb-3 mr-2">
          <span class="w-5 h-5 flex items-center justify-center">
            <UploadIcon class="w-4 h-4" />
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
      <select class="w-20 form-select box mt-0 mb-3 mr-2 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>25</option>
        <option>100</option>
      </select>
      <div class="search hidden xl:block mt-0 mb-3">
        <input
          type="text"
          class="form-control w-56 box pr-10"
          placeholder="Search..."
        />
        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
      </div>
      <a class="notification xl:hidden mt-0 mb-3">
        <!-- <SearchIcon class="notification__icon dark:text-slate-500" /> -->
        <form action="" class="justify-center shadow-none bg-white box h-10">
          <input
            type="search"
            class="peer shadow-none cursor-pointer relative z-10 h-10 w-10 box border bg-transparent dark:bg-transparent dark:text-white pl-9 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 search__input form-control border-transparent"
          />
          <SearchIcon
            class="absolute inset-y-0 my-auto h-8 w-12 px-3.5 dark:stroke-white"
          />
        </form>
      </a>
      <div class="hidden 2xl:block mx-auto text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <nav class="w-full sm:w-auto sm:mr-auto mr-0 tems-center justify-center">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <SkipBackIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <RewindIcon class="w-4 h-4" />
              </a>
            </li>
            <!-- <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li> -->
            <li class="page-item active">
              <!-- <a class="page-link" href="#">2</a> -->
              <input
                type="number"
                class="form-control"
                id="page_number"
                value="1"
              />
            </li>
            <li class="page-item">
              <!-- <a class="page-link" href="#">3</a> -->
              <input
                type="number"
                class="form-control"
                id="total_pages"
                disabled
              />
            </li>
            <!-- <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li> -->
            <li class="page-item">
              <a class="page-link" href="#">
                <FastForwardIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <SkipForwardIcon class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <!-- <Ba :satuans="Barang.items" /> -->

      <BarangList :barangs="Barang.items" />
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->

    <!-- END: Pagination -->
  </div>

  <Modal
    size="modal-xl"
    backdrop="static"
    :show="isModalScanner"
    @hidden="isModalScanner = false"
  >
    <ModalHeader>
      <div class="text-center mt-2">
        <h2 class="text-lg font-bold">QR Code Scanner</h2>
      </div>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="mb-5">
          <div class="intro-y justify-center flex mt-5">
            <qrcode
              v-bind:qrbox="250"
              v-bind:fps="10"
              ref="qrScanner"
              @resultScan="resultScan"
            />
          </div>
        </div>
        <button
          type="button"
          @click="
            isModalScanner = false;
            closeQrScanner();
          "
          class="btn btn-danger w-24"
        >
          Close
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script>
import qrcode from "../../components/qrcode/QrCode.vue";
import { useBarangStore } from "../../stores/barang";
import BarangList from "./BarangList.vue";
import { ref } from "vue";

const addModal = ref(false);
const addModalBarang = ref(false);
const addModalVarian = ref(false);
const inputNamaBarang = ref("");
const inputNamaVarian = ref("");
const inputGambarVarian = ref("");

export default {
  setup() {
    const Barang = useBarangStore();

    return { Barang };
  },
  components: {
    BarangList,
    qrcode,
  },
  data() {
    return {
      checkedID: false,
      isVarianOpen: false,
      isModalScanner: false,

      gambarVarian: "",
      hargaBeliVarian: "",
      hargaJualVarian: "",
      idBarang: "",
      kategoriGudangVarian: "kosong",
      satuanVarian: "kosong",
      idVarian: "",
      kategoriBarangVarian: "kosong",
      namaVarian: "",
      stokVarian: "",

      data: "",

      url: null,
      file: null,
      ScanIDVarian: "",
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
    openAddModal() {
      // this.Barang.addVarianGet()
      //   .then((data) => {
      //     this.data = data
      //     this.addModal = true
      //   })
      this.addModal = true;
    },
    addBarang() {
      try {
        // console.log("addSatuan", inputNamaBarang.value)
        this.Barang.addItem(inputNamaBarang.value);
        inputNamaBarang.value = "";
        this.addModalBarang = false;
      } catch (error) {
        alert("Gagal Tambah Data", error);
      }
    },
    addVarian() {
      try {
        if (this.ScanIDVarian === "" || null) {
          this.Barang.addVarian({
            id_varian: this.idVarian,
            nama_varian: this.namaVarian,
            kategori_barang: this.kategoriBarangVarian,
            stok_varian: parseInt(this.stokVarian),
            harga_beli: parseInt(this.hargaBeliVarian),
            satuan_varian: this.satuanVarian,
            gudang: this.kategoriGudangVarian,

            file: this.file,
            harga_jual: parseInt(this.hargaJualVarian),
          });
        } else {
          this.Barang.addVarian({
            id_varian: this.ScanIDVarian,
            nama_varian: this.namaVarian,
            kategori_barang: this.kategoriBarangVarian,
            stok_varian: this.stokVarian,
            harga_beli: this.hargaBeliVarian,
            satuan_varian: this.satuanVarian,
            gudang: this.kategoriGudangVarian,

            file: this.file,
            harga_jual: this.hargaJualVarian,
          });
        }
        this.idVarian = "";
        this.ScanIDVarian = "";
        this.namaVarian = "";
        this.kategoriBarangVarian = "";
        this.stokVarian = "";
        this.hargaBeliVarian = "";
        this.satuanVarian = "";
        this.kategoriGudangVarian = "";
        this.file = null;
        this.url = null;
        this.hargaJualVarian = "";
        this.addModalVarian = false;
      } catch (error) {
        alert("Varian Tambah Data", error);
      }
    },
    resetFormVarian() {
      this.idVarian = "";
      this.ScanIDVarian = "";
      this.namaVarian = "";
      this.kategoriBarangVarian = "";
      this.stokVarian = "";
      this.hargaBeliVarian = "";
      this.satuanVarian = "";
      this.kategoriGudangVarian = "";
      this.file = null;
      this.url = null;
      this.hargaJualVarian = "";
    },
    renderQrScanner() {
      this.$refs.qrScanner.renderQrScanner();
      // console.log("qrScanner", this.$refs)
    },
    closeQrScanner() {
      this.$refs.qrScanner.closeQrScanner();
    },
    resultScan(result) {
      // ntar di concat ma it outlet
      this.ScanIDVarian = result;
      this.isModalScanner = false;
      this.$refs.qrScanner.closeQrScanner();
    },
    previewImage(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
  },
  beforeCreate() {
    this.Barang.readItem();
    this.Barang.addVarianGet().then((data) => {
      this.data = data;
    });
  },
};
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
  border: 2px solid #d0d3d4;
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

.modal .modal-dialog.modal-xl {
  width: 1200px;
}
</style>
