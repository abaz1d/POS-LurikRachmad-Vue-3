<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Produk Global</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="openMainModal()"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Produk</p>
        Baru
      </button>

      <!-- BEGIN: Modal Content -->
      <Modal :show="modal_utama" @hidden="modal_utama = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Tambah Produk</h2>
          <button
            type="button"
            @click="modal_utama = false"
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
            <button class="btn btn-primary" @click="modalBarang = true">
              Tambah Barang
            </button>
            <Modal
              backdrop="static"
              :show="modalBarang"
              @hidden="modalBarang = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Tambah Barang</h2>
                <button
                  type="button"
                  @click="modalBarang = false"
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
                  @submit.prevent="isEdit ? updateBarang() : addBarang()"
                  id="addBarangForm"
                  class="col-span-12"
                >
                  <div class="col-span-12 mb-5">
                    <label v-if="isEdit" for="pos-form-1" class="form-label"
                      >ID Barang</label
                    >
                    <input
                      v-if="isEdit"
                      id="pos-form-1"
                      type="text"
                      class="form-control flex-1"
                      placeholder="Masukan Nama Barang"
                      v-model="inputIdBarang"
                      readonly
                    />
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
                  @click="resetModal()"
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
            <button
              class="btn btn-pending"
              @click="
                modalVarian = true;
                url = '';
              "
            >
              Tambah Varian
            </button>
            <Modal
              backdrop="static"
              size="modal-xl"
              :show="modalVarian"
              @hidden="modalVarian = false"
            >
              <ModalHeader>
                <h2 class="font-medium text-base mr-auto">Tambah Varian</h2>
                <button
                  type="button"
                  @click="resetFormVarian"
                  class="btn btn-outline-danger hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <RefreshCwIcon class="mr-2" />Reset Form
                </button>
              </ModalHeader>
              <ModalBody class="">
                <form
                  @submit.prevent="!isEdit ? addVarian() : updateVarian()"
                  id="addVarianForm"
                >
                  <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3 form-switch mb-0">
                          <label
                            for="inputIdVarian"
                            class="block text-sm font-medium text-gray-700"
                            >ID Varian |
                            <input
                              id="ScanID"
                              class="form-check-input"
                              type="checkbox"
                              v-model="checkedID"
                              :disabled="isEdit"
                          /></label>
                          <div class="input-group">
                            <input
                              type="text"
                              id="inputIdVarian"
                              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              :placeholder="
                                checkedID
                                  ? 'Ketik / Scan ID'
                                  : 'Auto Generate ID'
                              "
                              v-model="inputIdVarian"
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
                              <CameraIcon />
                            </div>
                          </div>
                          <small
                            v-if="!checkedID"
                            class="text-grey-800 text-xs ml-2 mt-0"
                          >
                            {{
                              isEdit
                                ? "* ID Tidak bisa diedit."
                                : "* Untuk manambah ID Manual cek pada checkbox."
                            }}
                          </small>
                          <small v-else class="text-grey-800 text-xs ml-2 mt-0">
                            * Tekan lambang Kamera untuk scan
                            <b>Barcode / ID</b>.</small
                          >
                        </div>

                        <div class="col-span-6 sm:col-span-3 mb-0">
                          <label
                            for="inputNamaVarian"
                            class="block text-sm font-medium text-gray-700 mb-2"
                            >Nama Varian</label
                          >
                          <input
                            id="inputNamaVarian"
                            type="text"
                            class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Masukan Nama Varian"
                            v-model="inputNamaVarian"
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
                              &gt;-- Pilih Barang &lt;--
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
                              &gt;-- Pilih Gudang &lt;--
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

                        <div
                          class="col-span-6 sm:col-span-3 mb-0 grid grid-cols-6 gap-2"
                        >
                          <div :class="isEdit ? 'col-span-3' : 'col-span-6'">
                            <label
                              for="stokGlobal"
                              class="block text-sm font-medium text-gray-700"
                              >Stok Global</label
                            >
                            <input
                              id="stokGlobal"
                              type="text"
                              class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Masukan Stok Varian"
                              v-model="stokGlobal"
                              required
                            />
                          </div>
                          <div v-if="isEdit" class="col-span-3">
                            <label
                              for="stokTerpakai"
                              class="block text-sm font-medium text-gray-700"
                              >Stok Terpakai</label
                            >
                            <input
                              id="stokTerpakai"
                              type="text"
                              class="form-control flex-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Masukan Stok Varian"
                              v-model="stokTerpakai"
                              readonly
                            />
                          </div>
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
                              &gt;-- Pilih Satuan &lt;--
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
                                @click="this.$refs.gambarBaru.click()"
                                v-if="url == null || url == ''"
                                class="mx-auto h-12 w-12 text-gray-400 cursor-pointer"
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
                                  width="100"
                                  height="100"
                                  class="imgUp rounded-md"
                                  alt="Lurik Rachmad"
                                  :src="url"
                                  decoding="async"
                                  loading="lazy"
                                />
                                <Tippy
                                  content="Remove this image?"
                                  @click="url = null"
                                  class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                >
                                  <XIcon class="w-4 h-4" />
                                </Tippy>
                              </div>
                              <div>
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
                                      accept="image/jpeg, image/png"
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
                  @click="resetModal()"
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
      </Modal>
      <a
        href=""
        class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary"
      >
        <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
        <p class="sm:block hidden">Reload Data</p>
      </a>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Field</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="id_barang">ID Barang</option>
            <option value="nama_barang">Nama Barang</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Type</label
          >
          <select
            id="tabulator-html-filter-type"
            v-model="filter.type"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="like" selected>like</option>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="!=">!=</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Value</label
          >
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
            @click="onResetFilter"
          >
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
          @click="onPrint"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <UploadIcon class="w-4 h-4 mr-2" /> Export
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export CSV
              </DropdownItem>
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div
      v-show="isLoading"
      wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-[50vw] z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
    >
      <Loader2Icon
        class="motion-safe:animate-spin stroke-[10px] text-white h-12 w-12 mb-4"
      />
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-white">
        Ini mungkin memakan waktu beberapa detik, tolong jangan tutup halaman
        ini.
      </p>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div
        id="tabulator"
        ref="tableRef"
        class="mt-5 table-report table-report--tabulator"
      ></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div v-if="isVarian" class="text-xl mt-5">
          Apakah Anda yakin akan menghapus Varian
          <b> {{ inputIdVarian }} - {{ inputNamaVarian }} </b>?
        </div>

        <div v-else class="text-xl mt-5">
          Apakah Anda yakin akan menghapus Barang
          <b> {{ inputIdBarang }} - {{ inputNamaBarang }} </b> ?
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="resetModal()"
          class="btn btn-outline-secondary w-24 mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-danger w-24"
          @click="isVarian ? deleteVarian() : deleteBarang(inputIdBarang)"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

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

  <!-- BEGIN: Basic Non Sticky Notification Content -->
  <Notification
    refKey="basicNonStickyNotification"
    :options="{
      duration: 5000,
    }"
    class="flex flex-col sm:flex-row hover:animate-none md:animate-bounce animate-pulse"
  >
    <div class="font-medium">
      Klik 2 kali pada salah satu baris tabel untuk melihat detail transaksi!
    </div>
  </Notification>
  <!-- END: Basic Non Sticky Notification Content -->
  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import $ from "jquery";
import { useBarangStore } from "@/stores/barang";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import qrcode from "@/components/qrcode/QrCode.vue";
import { currencyFormatter } from "@/utils/helper";
import moment from "moment";
const modalErrorRef = ref();

const Barang = useBarangStore();

const modal_utama = ref(false);
const modalBarang = ref(false);
const modalVarian = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const isModalScanner = ref(false);
const qrScanner = ref();
const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "id_barang",
  type: "like",
  value: "",
});
var subTable;
const checkedID = ref(false);
const inputIdBarang = ref("");
const inputNamaBarang = ref("");

const inputIdVarian = ref("");
const inputNamaVarian = ref("");
const inputGambarVarian = ref("");
const hargaBeliVarian = ref("");
const hargaJualVarian = ref("");
const kategoriGudangVarian = ref("kosong");
const satuanVarian = ref("kosong");
const kategoriBarangVarian = ref("kosong");
const stokGlobal = ref(0);
const stokTerpakai = ref(0);

const data = ref([]);

const url = ref(null);
const file = ref(null);
const isVarian = ref(false);
const gambar_lama = ref("");
const gambar_lama_preview = ref("");

const publicPath = import.meta.env.VITE_APP_BASE_API;

// Basic non sticky notification
const basicNonStickyNotification = ref();
provide("bind[basicNonStickyNotification]", (el) => {
  // Binding
  basicNonStickyNotification.value = el;
});
const basicNonStickyNotificationToggle = () => {
  // Show notification
  basicNonStickyNotification.value.showToast();
};

const openMainModal = () => {
  Barang.addVarianGet().then((varian) => {
    data.value = varian;
  });
  modal_utama.value = true;
};

const addBarang = () => {
  try {
    Barang.addItem(inputNamaBarang.value).then(() => {
      initTabulator();
      resetModal();
    });
  } catch (error) {
    alert("Gagal Tambah Data", error);
  }
};
const updateBarang = () => {
  try {
    Barang.updateItem({
      id_barang: inputIdBarang.value,
      nama_barang: inputNamaBarang.value,
    }).then(() => {
      initTabulator();
      resetModal();
    });
  } catch (error) {
    alert(`Gagal Update data ${inputIdBarang.value}`, error);
  }
};

const deleteBarang = () => {
  try {
    Barang.removeItem(inputIdBarang.value).then(() => {
      initTabulator();
      resetModal();
    });
  } catch (error) {
    alert(`Gagal Delete Barang ${inputIdBarang.value}`, error);
  }
};

const addVarian = () => {
  try {
    if (inputIdVarian.value === "" || inputIdVarian.value === null) {
      Barang.addVarian({
        id_varian: "",
        nama_varian: inputNamaVarian.value,
        kategori_barang: kategoriBarangVarian.value,
        stok_varian: parseInt(stokGlobal.value),
        harga_beli: parseInt(hargaBeliVarian.value),
        satuan_varian: satuanVarian.value,
        gudang: kategoriGudangVarian.value,

        file: file.value,
        harga_jual: parseInt(hargaJualVarian.value),
      });
    } else {
      Barang.addVarian({
        id_varian: inputIdVarian.value,
        nama_varian: inputNamaVarian.value,
        kategori_barang: kategoriBarangVarian.value,
        stok_varian: stokGlobal.value,
        harga_beli: hargaBeliVarian.value,
        satuan_varian: satuanVarian.value,
        gudang: kategoriGudangVarian.value,

        file: file.value,
        harga_jual: hargaJualVarian.value,
      });
    }
    initTabulator();
    resetModal();
  } catch (error) {
    alert("Varian Tambah Data", error);
  }
};

const updateVarian = () => {
  try {
    Barang.updateVarian({
      id_varian: inputIdVarian.value,
      nama_varian: inputNamaVarian.value,
      kategori_barang: kategoriBarangVarian.value,
      stok_varian: parseInt(stokGlobal.value),
      harga_beli: parseInt(hargaBeliVarian.value),
      harga_jual: parseInt(hargaJualVarian.value),
      satuan_varian: satuanVarian.value,
      gudang: kategoriGudangVarian.value,

      gambarLama: gambar_lama.value,
      file_baru: file.value,
    }).then(() => {
      initTabulator();
      resetModal();
    });
  } catch (error) {
    alert("Varian Edit Data" + error);
  }
};

const deleteVarian = () => {
  Barang.removeVarian(inputIdVarian.value, gambar_lama.value)
    .then(() => {
      initTabulator();
      resetModal();
    })
    .catch((e) => {
      alert("removeVarian" + JSON.stringify(e));
    });
};

const previewImage = (e) => {
  file.value = e.target.files[0];
  url.value = URL.createObjectURL(file.value);
};
const renderQrScanner = () => {
  qrScanner.value.renderQrScanner();
};

const closeQrScanner = () => {
  qrScanner.value.closeQrScanner();
};

const resultScan = (result) => {
  // ntar di concat ma id outlet
  inputIdVarian.value = result;
  console.log("hasil", inputIdVarian);
  isModalScanner.value = false;
  qrScanner.value.closeQrScanner();
};

const resetModal = () => {
  modal_utama.value = false;
  modalBarang.value = false;
  modalVarian.value = false;
  deleteConfirmationModal.value = false;
  isEdit.value = false;
  isModalScanner.value = false;
  checkedID.value = false;
  inputIdBarang.value = "";
  inputNamaBarang.value = "";
  inputIdVarian.value = "";
  inputNamaVarian.value = "";
  inputGambarVarian.value = "";
  hargaBeliVarian.value = "";
  hargaJualVarian.value = "";
  kategoriGudangVarian.value = "kosong";
  satuanVarian.value = "kosong";
  kategoriBarangVarian.value = "kosong";
  stokGlobal.value = 0;
  stokTerpakai.value = 0;
  url.value = null;
  file.value = null;
  isVarian.value = false;
  gambar_lama.value = "";
  gambar_lama_preview.value = "";
};

watch(stokGlobal, async (newValue, oldValue) => {
  if (newValue < stokTerpakai.value) {
    alert("Stok Global Tidak Boleh Lebih Kecil Dari Stok Terpakai");
    stokGlobal.value = oldValue;
  }
});

watch(filter, async () => {
  try {
    onFilter();
  } catch (error) {
    alert("Gagal wtch filter" + error);
  }
});

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: Barang.items,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Barang<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    addRowPos: true,
    height: "60vh",
    height: "100%",
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      resizable: true,
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue();
        return el;
      },
    },
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "ID BARANG",
        minWidth: 200,
        responsive: 0,
        field: "id_barang",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_barang
                }</div>
              </div>`;
        },
      },
      {
        title: "NAMA BARANG",
        minWidth: 200,
        responsive: 0,
        field: "nama_barang",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_barang
                }</div>
              </div>`;
        },
      },
      {
        title: "ACTIONS",
        headerHozAlign: "center",
        minWidth: 200,
        field: "actions",
        responsive: 1,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
          dom(a).on("click", "a", function (e) {
            if (e.id === "edit") {
              const barang = cell.getData();
              inputIdBarang.value = barang.id_barang;
              inputNamaBarang.value = barang.nama_barang;
              isEdit.value = true;
              modalBarang.value = true;
            } else {
              inputIdBarang.value = cell.getData().id_barang;
              inputNamaBarang.value = cell.getData().nama_barang;
              deleteConfirmationModal.value = true;
            }
          });

          return a[0];
        },
      },

      // For print format
      {
        title: "ID BARANG",
        field: "id_barang",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "NAMA BARANG",
        field: "nama_barang",
        visible: false,
        print: true,
        download: true,
      },
    ],
    rowFormatter: function (row) {
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");
      holderEl.style.display = "none";

      const id = row.getData().id_barang;

      holderEl.style.boxSizing = "border-box";
      holderEl.style.padding = "10px 30px 10px 10px";
      holderEl.style.borderTop = "1px solid #333";
      holderEl.style.borderBotom = "1px solid #333";
      holderEl.setAttribute("class", "subTable" + id + "");

      tableEl.style.border = "1px solid #333";
      tableEl.style.display = "none";
      tableEl.setAttribute("class", "subTable" + id + "");

      holderEl.appendChild(tableEl);

      row.getElement().appendChild(holderEl);

      subTable = new Tabulator(tableEl, {
        printAsHtml: true,
        printStyled: true,
        rowHeight: "25px",
        responsiveLayout: "collapse",
        layout: "fitColumns",
        data: row.getData().serviceHistory,
        columns: [
          // For HTML table
          {
            formatter: "responsiveCollapse",
            width: 40,
            minWidth: 30,
            hozAlign: "center",
            resizable: false,
            headerSort: false,
          },
          {
            title: "GAMBAR & ID",
            minWidth: 100,
            responsive: 0,
            field: "id_varian",
            hozAlign: "left",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div class=" text-center p-auto">
                <div class="mb-2">
        <img decoding="async" loading="lazy"
          src="${getImgUrl(cell.getData().gambar_varian)}"
          alt="${cell.getData().gambar_varian}"
          data-action="zoom"
          class="w-20 rounded-md"
          width="100" height="100"
        />
      </div>
      <div>
        ${cell.getData().id_varian}
      </div>
              </div>`;
            },
          },
          {
            title: "NAMA BARANG",
            minWidth: 100,
            responsive: 0,
            field: "nama_barang",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_barang
                }</div>
              </div>`;
            },
          },
          {
            title: "NAMA VARIAN",
            minWidth: 150,
            responsive: 0,
            field: "nama_varian",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_varian
                }</div>
              </div>`;
            },
          },
          {
            title: "STOK GLOBAL",
            minWidth: 50,
            responsive: 0,
            field: "stok_global",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().stok_global
                }</div>
              </div>`;
            },
          },
          {
            title: "SATUAN",
            minWidth: 50,
            headerHozAlign: "center",
            field: "nama_satuan",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_satuan
                }</div>
              </div>`;
            },
          },
          {
            title: "HARGA BELI",
            headerHozAlign: "center",
            minWidth: 150,
            field: "harga_beli_varian",
            hozAlign: "right",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(
                  cell.getData().harga_beli_varian
                )}</div>
              </div>`;
            },
          },
          {
            title: "HARGA JUAL",
            minWidth: 150,
            headerHozAlign: "center",
            field: "harga_jual_varian",
            hozAlign: "right",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(
                  cell.getData().harga_jual_varian
                )}</div>
              </div>`;
            },
          },
          {
            title: "ACTIONS",
            headerHozAlign: "center",
            minWidth: 200,
            field: "actions",
            responsive: 1,
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              const a = dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
              dom(a).on("click", "a", function (e) {
                if (e.id === "edit") {
                  const varian = cell.getData();
                  url.value = getImgUrl(varian.gambar_varian);
                  Barang.updateVarianGet(varian.id_varian)
                    .then((detail) => {
                      console.log("detail", detail);
                      data.value = detail;
                      gambar_lama.value = detail.item.gambar_varian;
                      file.value = "";
                      inputIdVarian.value = detail.item.id_varian;
                      inputNamaVarian.value = detail.item.nama_varian;
                      kategoriBarangVarian.value = detail.item.id_barang;
                      satuanVarian.value = detail.item.id_satuan;
                      kategoriGudangVarian.value = detail.item.id_gudang;
                      stokGlobal.value = detail.item.stok_global;
                      stokTerpakai.value = detail.item.stok_terpakai;
                      hargaBeliVarian.value = detail.item.harga_beli_varian;
                      hargaJualVarian.value = detail.item.harga_jual_varian;
                      isEdit.value = true;
                      modalVarian.value = true;
                    })
                    .catch((e) => {
                      alert("Error edit Get " + e);
                    });
                } else {
                  const varian = cell.getData();
                  inputIdVarian.value = varian.id_varian;
                  inputNamaVarian.value = varian.nama_varian;
                  gambar_lama.value = varian.gambar_varian;
                  isVarian.value = true;
                  deleteConfirmationModal.value = true;
                }
              });

              return a[0];
            },
          },

          // For print format
          {
            title: "ID VARIAN",
            field: "id_varian",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "NAMA BARANG",
            field: "nama_barang",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "NAMA VARIAN",
            field: "nama_varian",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "STOK GLOBAL",
            field: "stok_global",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "SATUAN",
            field: "nama_satuan",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "HARGA BELI",
            field: "harga_beli_varian",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "HARGA JUAL",
            field: "harga_jual_varian",
            visible: false,
            print: true,
            download: true,
          },
        ],
      });
      subTable.on("renderComplete", function () {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      });
    },
  });
  tabulator.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
  tabulator.value.on("rowDblClick", async function (e, row) {
    const id = row.getData().id_barang;
    try {
      await Barang.readVarian(id)
        .then((data) => {
          tabulator.value.replaceData(data);
        })
        .catch((error) => {
          throw new Error(error);
        });
      $(".subTable" + id + "").toggle();
    } catch (error) {
      alert("2click" + error);
    }
  });

  tabulator.value.on("rowClick", function (e, row) {
    const id = row.getData().id_barang;
    $(".subTable" + id + "").hide();
  });
};

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

const getImgUrl = (gambar_varian) => {
  if (gambar_varian) {
    var images = gambar_varian.data.map((b) => String.fromCharCode(b)).join("");
    gambar_lama_preview.value = new URL(`${publicPath}gambar/${images}`).href;
    if (isEdit.value) {
      url.value = gambar_lama_preview.value;
    }
    return gambar_lama_preview.value;
  } else {
    return `${new URL(window.location.origin)}` + " 404.png";
  }
};

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "id_barang";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};
const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};

// Print
const onPrint = () => {
  tabulator.value.print();
};

onMounted(async function () {
  try {
    isLoading.value = true;
    Barang.readItem()
      .then(() => {
        Barang.addVarianGet()
          .then((varian) => {
            data.value = varian;
            initTabulator();
            reInitOnResizeWindow();
            basicNonStickyNotificationToggle();
            modalErrorRef.value.errorDatabaseModal = false;
            isLoading.value = false;
          })
          .catch((error) => {
            console.error(error);
            isLoading.value = false;
            modalErrorRef.value.errorDatabaseModal = true;
          });
      })
      .catch((error) => {
        console.error(error);
        isLoading.value = false;
        modalErrorRef.value.errorDatabaseModal = true;
      });
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = true;
  }
});
onBeforeUnmount(() => {
  basicNonStickyNotification.value.hideToast();
  isLoading.value = false;
});
</script>
<style scoped>
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
