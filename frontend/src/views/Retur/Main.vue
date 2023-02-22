<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Retur Penjualan</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="
          modal_utama = true;
          startTransaction();
        "
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Retur</p>
        Baru
      </button>
      <!-- BEGIN: Modal Content -->
      <Modal
        size="modal-xl"
        backdrop="static"
        :show="modal_utama"
        @hidden="modal_utama = false"
      >
        <ModalHeader class="border-b-2">
          <h2 class="hidden lg:block font-medium text-base mr-auto">
            <p class="mx-auto" v-if="isEdit">Edit ReturJual {{ id_retur }}</p>
            <p class="mx-auto" v-else>Tambah ReturJual</p>
          </h2>

          <div
            class="sm:w-auto flex mt-3 mx-auto sm:mx-0 sm:mr-0 sm:ml-4 items-center sm:items-right"
          >
            <div class="mr-2 m-auto">
              <div
                class="bg-slate-200 rounded-md p-2 font-medium lg:text-base text-sm px-2"
              >
                <p class="text-right text-black">{{ id_retur }}</p>
              </div>
              <p
                class="text-center bg-primary text-white rounded-md w-24 mx-auto lg:-mt-[52px] -mt-12 lg:mb-8 mb-6"
              >
                NO ID RETUR
              </p>
            </div>
            <div class="mr-2 m-auto">
              <div
                class="bg-slate-200 rounded-md p-2 font-medium lg:text-base text-sm px-2"
              >
                <p class="text-right text-black">
                  {{ moment(waktu).format("DD MMM YYYY HH:SS") }}
                </p>
              </div>
              <p
                class="text-center bg-primary text-white rounded-md w-24 mx-auto lg:-mt-[52px] -mt-12 lg:mb-8 mb-6"
              >
                WAKTU
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody class="">
          <div class="overflow-auto sm:overflow-hidden mx-0 sm:h-3/4 h-80">
            <div class="grid grid-cols-12 gap-1 -mt-3">
              <div class="col-span-12">
                <!-- BEGIN: Display Item -->
                <div class="intro-y box">
                  <div class="p-2">
                    <div class="flex xl:flex-row flex-col">
                      <div class="flex-1 mt-0">
                        <div class="grid grid-cols-12 gap-x-2 sm:gap-x-3">
                          <div class="col-span-12 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Invoice</label
                            >
                            <div v-if="!isEdit" class="flex w-full">
                              <TomSelect
                                v-model="invoice_select"
                                class="w-full"
                                required
                              >
                                <option value="kosong" disabled>
                                  &gt;-- Pilih Invoice &lt;--
                                </option>
                                <option
                                  v-for="penjualan in ReturJual.penjualans"
                                  :key="penjualan.no_invoice"
                                  :penjualan="penjualan"
                                  :value="penjualan.no_invoice"
                                >
                                  {{ penjualan.no_invoice }} -
                                  {{
                                    moment(penjualan.tanggal_penjualan).format(
                                      "DD MMM YYYY HH:SS"
                                    )
                                  }}
                                </option>
                              </TomSelect>
                            </div>
                            <div
                              v-else
                              class="bg-slate-100 py-2 px-3 border-2 rounded-md"
                            >
                              <p class="text-black">{{ invoice_select }}</p>
                            </div>
                          </div>

                          <div class="sm:col-span-9 col-span-12 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >ID Barang/Item
                              <p class="sm:hidden form-label">& Qty Jual</p>
                            </label>
                            <div class="flex w-full">
                              <div
                                class="z-30 rounded-l w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-300 border text-gray-600 dark:bg-dark-1 dark:border-dark-4 -mr-1 cursor-pointer"
                                @click="
                                  isModalScanner = true;
                                  renderQrScanner();
                                "
                              >
                                <CameraIcon class="w-4 h-4" />
                              </div>
                              <select v-model="item_select" class="w-full">
                                <option value="kosong" disabled>
                                  --&gt; Pilih Items &lt;--
                                </option>
                                <option
                                  v-for="varian in ReturJual.varians"
                                  :key="varian.id_varian"
                                  :varian="varian"
                                  :value="varian.id_varian"
                                >
                                  {{ varian.id_barang }} -
                                  {{ varian.nama_barang }} |
                                  {{ varian.id_varian }} -
                                  {{ varian.nama_varian }}
                                </option>
                              </select>
                            </div>
                            <div class="form-help">
                              * Pilih atau Klik Kamera untuk scan barcode.
                            </div>
                          </div>
                          <div class="hidden sm:block col-span-3 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Qty Jual</label
                            >
                            <input
                              v-model="stok"
                              id="pos-form-1"
                              type="text"
                              class="form-control flex-1"
                              placeholder="Masukan Stok Tersisa"
                              readonly
                            />
                          </div>

                          <div class="hidden sm:block col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Nama Barang</label
                            >
                            <div
                              class="bg-slate-100 py-2 px-3 border-2 rounded-md"
                            >
                              <p class="text-black">{{ nama_barang_select }}</p>
                            </div>
                          </div>
                          <div class="hidden sm:block col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Nama Varian</label
                            >
                            <div
                              class="bg-slate-100 py-2 px-3 border-2 rounded-md"
                            >
                              <p class="text-black">{{ nama_varian_select }}</p>
                            </div>
                          </div>

                          <div class="sm:hidden col-span-12 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Nama Barang & Varian</label
                            >
                            <div
                              class="bg-slate-100 py-2 px-3 border-2 rounded-md"
                            >
                              <p class="text-black">{{ nama_campur_select }}</p>
                            </div>
                          </div>
                          <form
                            @submit.prevent="addItem()"
                            id="returForm"
                            class="grid grid-cols-12 gap-x-2 sm:gap-x-3 col-span-12"
                          >
                            <div class="col-span-12 sm:col-span-2 mb-5">
                              <label for="pos-form-1" class="form-label"
                                >Qty</label
                              >
                              <input
                                id="pos-form-1"
                                type="text"
                                class="form-control flex-1"
                                placeholder="Masukan Qty"
                                required
                                v-model="qty_select"
                                :disabled="item_select == 'kosong'"
                              />
                            </div>
                            <div class="col-span-12 sm:col-span-5 mb-5">
                              <label for="pos-form-1" class="form-label"
                                >Keterangan</label
                              >
                              <div
                                class="bg-slate-100 py-2 px-3 border-2 rounded-md"
                              >
                                <textarea
                                  class="text-black w-full"
                                  name="keterangan"
                                  id="keterangan"
                                  rows="3"
                                  v-model="keterangan_select"
                                  placeholder="Keterangan Barang"
                                  required
                                ></textarea>
                              </div>
                            </div>

                            <div class="col-span-12 sm:col-span-5 mb-5">
                              <label for="pos-form-1" class="form-label"
                                >Gambar Bukti</label
                              >
                              <div
                                class="bg-slate-100 py-2 px-3 border-2 rounded-md"
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
                                    class="col-span-5 md:col-span-2 -mb-6 relative items-center cursor-pointer zoom-in"
                                    style="height: 5rem"
                                  >
                                    <img
                                      width="100"
                                      height="100"
                                      class="imgUp rounded-md mx-auto h-14 w-auto"
                                      alt="Lurik Rachmad"
                                      :src="url"
                                      decoding="async"
                                      loading="lazy"
                                    />
                                    <Tippy
                                      content="Remove this image?"
                                      @click="url = null"
                                      class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-28 top-0 -mr-2 -mt-2"
                                    >
                                      <XIcon class="w-4 h-4" />
                                    </Tippy>
                                  </div>
                                  <div>
                                    <div class="flex text-sm text-gray-600">
                                      <label
                                        for="gambarBaru"
                                        class="relative mx-auto cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                                          required
                                        />
                                        <span>or drag and drop</span>
                                      </label>
                                    </div>
                                    <p class="text-xs text-gray-500 mb-2">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <button
                          type="submit"
                          form="returForm"
                          class="btn btn-primary w-20 mt-3"
                          :disabled="qty_select == 0"
                        >
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END: Display Item -->
              </div>

              <!-- BEGIN: Detail ReturJual -->
              <div class="col-span-12 flex-col-reverse">
                <div class="intro-y box">
                  <div
                    class="flex items-center px-5 py-2 border-b border-slate-200/60 dark:border-darkmode-400"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Detail ReturJual
                    </h2>
                  </div>
                  <div class="px-2">
                    <div class="col-span-12 overflow-auto w-full h-56">
                      <table class="border-collapse w-full">
                        <thead>
                          <tr>
                            <th
                              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                            >
                              #
                            </th>
                            <th
                              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                            >
                              ID & Nama Varian
                            </th>
                            <th
                              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                            >
                              QTY
                            </th>
                            <th
                              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                            >
                              Keterangan
                            </th>
                            <th
                              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                            >
                              Gambar Bukti
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <DetailReturJual
                            v-for="detail in ReturJual.returJualDetail"
                            :key="detail.id_barang"
                            :detail="detail"
                            @openModalRemove="openModalRemove"
                          />
                        </tbody>
                      </table>
                    </div>
                    <ChevronDownIcon
                      class="motion-safe:animate-bounce col-span-12 mt-1 mb-[-10px] block mx-auto"
                    />
                  </div>
                </div>
              </div>
              <!-- END: Detail ReturJual -->
            </div>
          </div>
        </ModalBody>
        <ModalFooter
          class="text-right bottom-0 relative z-50 rounded-md sm:border-t-2 border-t-4 btm sm:btm-"
        >
          <button
            type="button"
            @click="
              modal_utama = false;
              resetModal();
            "
            class="btn btn-outline-secondary w-32 mr-1"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="simpanReturJual()"
            class="object-left btn btn-primary w-32"
            :disabled="invoice_select == 'kosong'"
          >
            Simpan
          </button>
        </ModalFooter>
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
            <option value="id_retur">Id Retur</option>
            <option value="tanggal_pengembalian">Tanggal ReturJual</option>
            <option value="total_barang">Total Harga Jual</option>
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
      class="fixed intro-y top-0 left-0 right-0 bottom-0 w-full h-[50vw] z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
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
    <div v-show="!isLoading" class="overflow-x-auto scrollbar-hidden">
      <div
        id="tabulator"
        ref="tableJualRef"
        class="mt-5 intro-y table-report table-report--tabulator"
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
        <div v-if="modal_utama" class="text-xl mt-5">
          Apakah Anda yakin akan menghapus
          <b> {{ itemDel.nama_varian }} </b> sebanyak
          <b> {{ itemDel.qty }}</b> ?
        </div>

        <div v-else class="text-xl mt-5">
          Apakah Anda yakin akan menghapus ReturJual <b> {{ id_retur }} </b> ?
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-danger w-24"
          @click="
            modal_utama
              ? removeItem(itemDel.id_detail_retur_jual, itemDel.id_retur)
              : deleteReturJual(id_retur)
          "
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

  <Modal
    backdrop="static"
    size="modal-xl"
    :show="isInvoice"
    @hidden="isInvoice = false"
  >
    <ModalHeader>
      <h2 class="font-small text-base mr-auto">
        <button class="btn btn-primary shadow-md mr-2" @click="onPrintInvoice">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <b>{{ id_retur }}</b>
      </h2>

      <div
        @click="resetModal()"
        class="sm:w-auto flex mr-0 ml-4 items-right cursor-pointer"
      >
        <div class="ml-2 m-auto text-danger">
          <XIcon class="w-8 h-8 mx-auto" />
        </div>
      </div>
    </ModalHeader>
    <ModalBody class="bg-white">
      <div class="bg-white" id="modalPrintInvoice">
        <PrintInvoice
          :prints="ReturJual.prints"
          :id_retur="id_retur"
          :waktu="waktu"
        />
      </div>
    </ModalBody>
  </Modal>
  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import $ from "jquery";
import { useReturJualStore } from "@/stores/retur-jual";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { useAuthStore } from "@/stores/auth";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import qrcode from "@/components/qrcode/QrCode.vue";
import PrintInvoice from "./PrintInvoice.vue";
import DetailReturJual from "./DetailReturJual.vue";
import moment from "moment";
import html2canvas from "html2canvas";
const modalErrorRef = ref();
const publicPath = import.meta.env.VITE_APP_BASE_API;
const ReturJual = useReturJualStore();
const Auth = useAuthStore();
const modal_utama = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const isModalScanner = ref(false);
const qrScanner = ref();
const tableJualRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "id_retur",
  type: "like",
  value: "",
});
var subTable;
const isInvoice = ref(false);
const id_retur = ref("-");
const waktu = ref("");
const invoice_select = ref("kosong");
const item_select = ref("kosong");
const stok = ref(0);
const nama_barang_select = ref("-");
const nama_varian_select = ref("-");
const nama_campur_select = ref("-");
const qty_select = ref(0);
const keterangan_select = ref("");
const url = ref("");
const file = ref("");
const gambar_lama_preview = ref("");

const itemDel = ref("");
const auth = ref();
const previewImage = (e) => {
  file.value = e.target.files[0];
  url.value = URL.createObjectURL(file.value);
};

const getImgUrl = (gambar_varian) => {
  if (gambar_varian) {
    var images = gambar_varian.data.map((b) => String.fromCharCode(b)).join("");
    gambar_lama_preview.value = new URL(
      `${publicPath}gambar_bukti/retur_jual/${images}`
    ).href;
    if (isEdit.value) {
      url.value = gambar_lama_preview.value;
    }
    return gambar_lama_preview.value;
  } else {
    return `${new URL(window.location.origin)}` + " 404.png";
  }
};

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

const startTransaction = () => {
  ReturJual.startTransaction().then((data) => {
    id_retur.value = data.id_retur;
    waktu.value = data.tanggal_pengembalian;
  });
};

const addItem = () => {
  ReturJual.addDetailReturJual(
    id_retur.value,
    item_select.value,
    qty_select.value,
    keterangan_select.value,
    file.value
  )
    .then(() => {
      (nama_barang_select.value = "-"),
        (nama_varian_select.value = "-"),
        (nama_campur_select.value = "-"),
        (qty_select.value = 0);
      file.value = "";
      url.value = null;
      keterangan_select.value = "";
      stok.value = +stok.value - +qty_select.value;
    })
    .catch((e) => {
      alert("addItem" + e);
    });
};

const onPrintInvoice = () => {
  const id = document.getElementById(`modalPrintInvoice`);
  isLoading.value = true;
  html2canvas(id, {
    useCORS: true,
  }).then((canvas) => {
    var barcodeImgTag = document.createElement("a");
    document.body.appendChild(barcodeImgTag);
    barcodeImgTag.download = `Invoice-${id_retur.value}.jpg`;
    barcodeImgTag.href = canvas.toDataURL();
    barcodeImgTag.target = "_blank";
    barcodeImgTag.click();
    isLoading.value = false;
  });
};

const openModalRemove = (item) => {
  itemDel.value = item;
  deleteConfirmationModal.value = true;
};

const removeItem = (id_detail_retur_jual, id_retur) => {
  ReturJual.removeItem(id_detail_retur_jual, id_retur)
    .then(() => {
      deleteConfirmationModal.value = false;
    })
    .catch((e) => {
      alert("removeItem" + e);
    });
};

const simpanReturJual = () => {
  if (
    ReturJual.rawReturJualDetail.length !== 0 &&
    invoice_select.value !== "kosong"
  ) {
    ReturJual.addReturJual(
      id_retur.value,
      waktu.value,
      invoice_select.value,
      isEdit.value
    )
      .then(() => {
        resetModal();
        isEdit.value = false;
        modal_utama.value = false;
        initTabulator();
      })
      .catch((e) => {
        alert("Simpan Error: " + e);
      });
  } else {
    alert("Simpan Detail ReturJual Tidak Boleh Kosong");
  }
};

const deleteReturJual = (id_retur) => {
  ReturJual.removeReturJual(id_retur);
  initTabulator();
  deleteConfirmationModal.value = false;
};

const renderQrScanner = () => {
  qrScanner.value.renderQrScanner();
};

const closeQrScanner = () => {
  qrScanner.value.closeQrScanner();
};

const resultScan = (result) => {
  item_select.value = result;
  isModalScanner.value = false;
  qrScanner.value.closeQrScanner();
};

const resetModal = () => {
  modal_utama.value = false;
  deleteConfirmationModal.value = false;
  isEdit.value = false;
  isModalScanner.value = false;
  isInvoice.value = false;
  id_retur.value = "-";
  waktu.value = "";
  invoice_select.value = "kosong";
  item_select.value = "kosong";
  stok.value = 0;
  nama_barang_select.value = "-";
  nama_varian_select.value = "-";
  nama_campur_select.value = "-";
  qty_select.value = 0;
  keterangan_select.value = "";
  // total_harga_global.value = 0;
  // total_bayar_global.value = 0;
  // kembalian.value = 0;
  itemDel.value = "";
  url.value = "";
  file.value = "";
  gambar_lama_preview.value = "";
  ReturJual.rawReturJualDetail = [];
};

watch(invoice_select, async (e) => {
  try {
    if (e !== "kosong") {
      ReturJual.readVarians(e)
        .then(() => {
          item_select.value = "kosong";
          (nama_barang_select.value = "-"),
            (nama_varian_select.value = "-"),
            (nama_campur_select.value = "-"),
            (stok.value = 0),
            (qty_select.value = 0);
          file.value = "";
          keterangan_select.value = "";
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    alert("Gagal pilih barang" + error);
  }
});

watch(item_select, async (e) => {
  try {
    if (e !== "kosong" && invoice_select.value !== "kosong") {
      ReturJual.readDetailItem(e, invoice_select.value)
        .then((data) => {
          (nama_barang_select.value = data.nama_barang),
            (nama_varian_select.value = data.nama_varian),
            (nama_campur_select.value = `${data.nama_barang} - ${data.nama_varian} | ${data.stok_varian}`),
            (stok.value = data.qty),
            (qty_select.value = 1);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    alert("Gagal pilih barang" + error);
  }
});

watch(qty_select, async (newValue, oldValue) => {
  const stok_now = stok.value;
  try {
    if (newValue > stok_now) {
      alert("Stok tersisa hanya " + stok_now);
      qty_select.value = oldValue;
    } else if (newValue === "") {
      alert("Minimal Qty harus 1");
      qty_select.value = 1;
    } 
  } catch (error) {
    alert("Gagal wtch qty" + error);
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
  tabulator.value = new Tabulator(tableJualRef.value, {
    data: ReturJual.returjuals,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel ReturJual<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    height: "100%",
    addRowPos: true,
    printStyled: true,
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
        width: 40,
        print: false,
        tooltip: false,
        download: false,
        hozAlign: "center",
        vertAlign: "middle",
        formatter() {
          const a = dom(`<div class="flex lg:justify-center items-center ml-6">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="printer" class="w-4 h-4 mr-1"></i> 
                </a>
              </div>`);
          return a[0];
        },
        cellClick: function (e, cell) {
          const retur = cell.getData();

          ReturJual.readDetail(retur.id_retur)
            .then(() => {
              id_retur.value = retur.id_retur;
              waktu.value = retur.tanggal_pengembalian;
              isInvoice.value = true;
            })
            .catch((e) => {
              alert("gagal open invoice" + e);
            });
        },
      },
      {
        title: "ID RETUR",
        minWidth: 200,
        responsive: 0,
        field: "id_retur",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_retur
                }</div>
              </div>`;
        },
      },
      {
        title: "TANGGAL PENGEMBALIAN",
        headerHozAlign: "center",
        minWidth: 200,
        field: "tanggal_pengembalian",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(
                  cell.getData().tanggal_pengembalian
                ).format("DD MMM YYYY HH:SS")}</div>
              </div>`;
        },
      },
      {
        title: "INVOICE",
        headerHozAlign: "center",
        minWidth: 200,
        field: "no_invoice",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().no_invoice
                }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BARANG",
        minWidth: 50,
        headerHozAlign: "center",
        field: "total_barang",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().total_barang
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
          const a =
            auth.value.role === "Operator"
              ? dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3 text-primary" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
              </div>`)
              : dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-4 text-primary" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
          dom(a).on("click", "a", function (e) {
            if (e.id === "edit") {
              const retur = cell.getData();
              ReturJual.readDetailReturJual(retur.id_retur)
                .then(() => {
                  id_retur.value = retur.id_retur;
                  waktu.value = retur.tanggal_pengembalian;
                  invoice_select.value = retur.no_invoice;
                  isEdit.value = true;
                  modal_utama.value = true;
                })
                .catch((e) => {
                  alert("gagal open invoice" + e);
                });
            } else {
              id_retur.value = cell.getData().id_retur;
              deleteConfirmationModal.value = true;
            }
          });

          return a[0];
        },
      },

      // For print format
      {
        title: "ID RETUR",
        field: "id_retur",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TANGGAL PENGEMBALIAN",
        field: "tanggal_pengembalian",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(
                  cell.getData().tanggal_pengembalian
                ).format("DD MMM YYYY HH:SS")}</div>
              </div>`;
        },
      },
      {
        title: "INVOICE",
        field: "no_invoice",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TOTAL BARANG",
        field: "total_barang",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${parseFloat(
                  cell.getData().total_barang
                )}</div>
              </div>`;
        },
      },
    ],
    rowFormatter: function (row) {
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");
      holderEl.style.display = "none";
      const id = row.getData().id_retur;
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
        height: "100%",
        printStyled: true,
        layout: "fitColumns",
        data: row.getData().serviceHistory,
        columns: [
          // For HTML table
          {
            title: "VARIAN",
            minWidth: 200,
            responsive: 0,
            field: "nama_varian",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_varian
                } - ${cell.getData().nama_varian}</div>
              </div>`;
            },
          },
          {
            title: "QTY",
            minWidth: 200,
            headerHozAlign: "center",
            field: "qty",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().qty
                }</div>
              </div>`;
            },
          },
          {
            title: "KETERANGAN",
            headerHozAlign: "center",
            minWidth: 200,
            field: "keterangan",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
          },
          {
            title: "GAMBAR BUKTI",
            minWidth: 200,
            headerHozAlign: "center",
            field: "gambar_bukti",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div class=" text-center p-auto">
                <div class="mb-2">
                  <img decoding="async" loading="lazy"
                    src="${getImgUrl(cell.getData().gambar_bukti)}"
                    alt="${cell.getData().gambar_bukti}"
                    data-action="zoom"
                    class="w-20 rounded-md"
                    width="100" height="100"
                  />
                </div>
              </div>`;
            },
          },

          // For print format
          {
            title: "NAMA VARIAN",
            field: "nama_varian",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "QTY",
            field: "qty",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "KETERANGAN",
            field: "keterangan",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "GAMBAR BUKTI",
            field: "gambar_bukti",
            visible: false,
            print: true,
            download: true,
          },
        ],
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
    const id = row.getData().id_retur;
    try {
      await ReturJual.readDetail(id)
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
    const id = row.getData().id_retur;
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

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "id_retur";
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
    auth.value = Auth.items;
    isLoading.value = true;
    await ReturJual.readItem();
    initTabulator();
    reInitOnResizeWindow();
    basicNonStickyNotificationToggle();
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = false;
  } catch (error) {
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = true;
  }
});
onBeforeUnmount(() => {
  isLoading.value = false;
  basicNonStickyNotification.value.hideToast();
});
</script>
<style scoped>
table thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 2;
}

@media (max-width: 1024px) {
  .btm {
    -webkit-box-shadow: 0px -4px 3px rgba(205, 205, 205, 0.75);
    -moz-box-shadow: 0px -4px 3px rgba(185, 185, 185, 0.75);
    box-shadow: 0px -4px 3px rgba(175, 175, 175, 0.75);
  }
}
</style>
