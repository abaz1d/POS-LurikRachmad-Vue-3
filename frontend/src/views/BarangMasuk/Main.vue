<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Barang Masuk</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
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
            <option value="no_invoice">No Invoice</option>
            <option value="tanggal_mutasi">Tanggal Barang Masuk</option>
            <option value="total_barang_mutasi">Total Barang Masuk</option>
            <option value="status">Status</option>
            <option value="id_outlet_pengirim">Outlet Pengirim</option>
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
      <h2 class="font-medium text-base mr-auto">
        <button
          class="btn btn-primary shadow-md mr-2"
          @click="onPrintInvoice"
          v-if="!isEdit"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <p v-else>Form Cek Barang Masuk</p>
        <b>{{ no_invoice }}</b>
      </h2>

      <div
        @click="resetModal()"
        class="sm:w-auto flex mt-4 sm:mt-0 mr-0 ml-4 items-right cursor-pointer"
      >
        <div class="ml-2 m-auto text-danger">
          <XIcon class="w-8 h-8 mx-auto" />
        </div>
      </div>
    </ModalHeader>
    <ModalBody class="">
      <div
        class="bg-white"
        :prints="BarangMasuk.prints"
        :mutasi="data_utama"
        :isEdit="isEdit"
      >
        <div
          class="intro-y bg-white box overflow-hidden mt-2 z-50 absolute top-0"
          style="background-color: white"
          id="modalPrintInvoice"
        >
          <div class="min-w-max bg-white">
            <div class="grid sm:grid-cols-3 bg-white">
              <div class="col mx-auto sm:ml-40">
                <img
                  width="100"
                  height="100"
                  alt="Lurik Rachmad HTML"
                  class="w-24"
                  src="@/assets/images/logo-gold.svg"
                />
              </div>
              <div class="col-span-2 hidden sm:block mr-40">
                <div class="grid justify-items-center items-center bg-white">
                  <div
                    class="font-philosopher bg-white text-4xl text-[#CDA562] font-black"
                  >
                    <b> Lurik Rachmad </b>
                  </div>
                  <div class="bg-white mt-1 text-black">
                    Jalan Pedan – Cawas Rt 002 Rw 001 Desa/Kelurahan Beji,
                    <br />
                    Kecamatan Pedan,Kabupaten Klaten, Jawa Tengah 57468
                  </div>
                  <div class="bg-white mt-1 text-black">
                    <MailIcon class="inline-block w-4 m-auto bg-white" />
                    <p class="inline-block underline">
                      : lurikrachmad@gmail.com,
                    </p>
                    <PhoneIcon class="inline-block ml-1 w-4 m-auto bg-white" />
                    <p class="inline-block underline">: +62 815-4899-3484</p>
                  </div>
                </div>
              </div>
            </div>
            <hr
              class="mx-8 border-2 my-2 text-black fill-black stroke-black border-black"
            />
            <p class="text-center text-lg font-bold underline text-black">
              SURAT JALAN
            </p>
          </div>
          <div
            class="flex bg-white flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-10 lg:pb-10 text-center sm:text-left"
          >
            <div
              class="font-semibold bg-white text-primary text-left text-base"
            >
              Nomor : {{ data_utama.no_invoice }} <br />
              <div class="text-black text-left font-medium text-base">
                Tanggal :
                {{
                  moment(data_utama.tanggal_mutasi).format("DD MMM YYYY HH:SS")
                }}
              </div>
            </div>
            <div class="bg-white mt-10 lg:mt-0 lg:ml-auto lg:text-right">
              <div
                class="bg-white mt-1 text-black text-left text-base font-medium"
              >
                Penerima : {{ data_utama.id_outlet_penerima }} -
                {{ data_utama.penerima }}
              </div>
              <div
                class="bg-white mt-1 text-black text-left text-base font-medium"
              >
                Ekpedisi : {{ data_utama.ekspedisi }} - {{ data_utama.no_resi }}
              </div>
            </div>
          </div>
          <div class="px-5 bg-white sm:px-10 py-10 sm:py-10">
            <div class="container">
              <table
                class="w-full flex flex-row flex-no-wrap bg-white rounded-lg overflow-hidden p-2"
                id="suratJalan"
              >
                <thead class="text-black">
                  <tr
                    v-for="(print, index) in BarangMasuk.prints"
                    :no="index + 1"
                    :key="index"
                    :print="print"
                    class="bg-sky-100 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                  >
                    <th class="p-3 text-left sm:text-center">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        v-model="check_semua"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white dark:border-gray-600"
                      />
                    </th>
                    <th class="p-3 text-left sm:text-center">ITEM</th>
                    <th class="p-3 text-left sm:text-center">QTY KIRIM</th>
                    <th class="py-4 sm:p-3 text-left sm:text-center">
                      QTY TERIMA
                    </th>
                    <th class="py-4 sm:p-3 text-left sm:text-center">
                      KETERANGAN
                    </th>
                  </tr>
                </thead>
                <tbody class="flex-1 sm:flex-none mb-2">
                  <DetailSuratJalan
                    ref="suratJalanViewDetail"
                    v-for="(print, index) in BarangMasuk.prints"
                    :isEdit="isEdit"
                    :print="print"
                    :key="index"
                  />
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row bg-white"
          >
            <div class="text-center sm:text-left mt-10 sm:mt-0 bg-white">
              <div class="text-center">
                <div class="text-base text-slate-500">Tanda Terima,</div>
                <div class="">
                  {{ data_utama.id_outlet_penerima }} -
                  {{ data_utama.penerima }}
                </div>

                <div class="mt-20">(..............................)</div>
              </div>
            </div>
            <div class="text-center sm:text-right sm:ml-auto bg-white">
              <div class="text-center">
                <div class="text-base text-slate-500">Hormat Pengirim,</div>
                <div class="">
                  {{ data_utama.id_outlet_pengirim }} -
                  {{ data_utama.pengirim }}
                </div>

                <div class="mt-20">(..............................)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-6 mb-5" v-if="isEdit">
        <small>NB :</small> <br />
        <small> - Ceklis untuk mengonfirmasi barang telah diterima</small>
        <br />
        <small> - Isi Keterangan/ Sesuaikan QTY TERIMA Jika di Perlukan</small>
        <br />
        <small> - Foto Bukti Pengiriman Wajib Diisi</small>
        <hr
          class="mborder-2 my-2 text-black fill-black stroke-black border-black"
        />
        <label class="block text-sm font-medium text-gray-700"
          >Foto Bukti Pengiriman</label
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
                    accept="image/jpeg, image/png"
                    class="sr-only"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </ModalBody>
    <ModalFooter class="text-right" v-if="isEdit">
      <button
        type="button"
        @click="resetModal()"
        class="btn btn-outline-secondary w-32 mr-1"
      >
        Cancel
      </button>
      <button
        type="submit"
        @click="simpanConfirmationModal = true"
        class="btn btn-primary w-36"
      >
        Terima & Simpan
      </button>
    </ModalFooter>
  </Modal>

  <!-- BEGIN: simpan Confirmation Modal -->
  <Modal
    :show="simpanConfirmationModal"
    @hidden="simpanConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <PackageCheckIcon class="w-16 h-16 mx-auto mt-3 text-success" />
        <div class="mt-5 text-xl">
          Apakah Anda Yakin Menyimpan <br />
          <b>{{ no_invoice }}</b> ?
        </div>
        <div class="mt-2 text-slate-500">
          Pastikan Data yang anda kirim telah sesuai <br />
          dengan barang yang anda terima <br />
          <b>Proses ini tidak dapat diulangi.</b>
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="simpanConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="simpanTerima()"
          class="btn btn-primary w-24"
        >
          Simpan
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: simpan Confirmation Modal -->

  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import $ from "jquery";
import { useBarangMasukStore } from "@/stores/barang-masuk";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import DetailSuratJalan from "./DetailSuratJalan.vue";
import moment from "moment";
import html2canvas from "html2canvas";

const BarangMasuk = useBarangMasukStore();
const isLoading = ref(false);
const isEdit = ref(false);
const modalErrorRef = ref();
const tableRef = ref();
const suratJalanViewDetail = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});
const isInvoice = ref(false);
const data_utama = ref([]);
const check_semua = ref(false);
const simpanConfirmationModal = ref(false);

const no_invoice = ref("-");
const waktu = ref("");

const url = ref("");
const file = ref("");
const publicPath = import.meta.env.VITE_APP_BASE_API;

const previewImage = (e) => {
  file.value = e.target.files[0];
  url.value = URL.createObjectURL(file.value);
};

const getImgUrl = (gambar_bukti) => {
  if (gambar_bukti) {
    var images = gambar_bukti.data.map((b) => String.fromCharCode(b)).join("");
    return new URL(`${publicPath}gambar_bukti/${images}`).href;
  } else {
    return `${new URL(window.location.origin)}` + " 404.png";
  }
};

const simpanTerima = async () => {
  if (file.value != "") {
    await BarangMasuk.terimaMutasi(no_invoice.value, file.value);
    for (let index = 0; index < suratJalanViewDetail.value.length; index++) {
      const element = suratJalanViewDetail.value[index];
      element.updateTerima(true);
    }
    resetModal();
  } else {
    alert("Tolong sertakan foto bukti barang telah diterima");
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

const onPrintInvoice = async () => {
  const id = document.querySelector("#modalPrintInvoice");

  console.log("onPrintInvoice", id, tabulator.value);
  const canvas = await html2canvas(id);
  var barcodeImgTag = document.createElement("a");
  document.body.appendChild(barcodeImgTag);
  barcodeImgTag.download = `Invoice-${no_invoice.value}.jpg`;
  barcodeImgTag.href = canvas.toDataURL();
  barcodeImgTag.target = "_blank";
  barcodeImgTag.click();
};

const resetModal = () => {
  isEdit.value = false;
  isInvoice.value = false;
  check_semua.value = false;
  simpanConfirmationModal.value = false;

  data_utama.value = [];
  no_invoice.value = "-";
  waktu.value = "";

  url.value = "";
  file.value = "";
};

watch(check_semua, async (e) => {
  for (let index = 0; index < suratJalanViewDetail.value.length; index++) {
    const element = suratJalanViewDetail.value[index];
    element.updateTerima(e);
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
    data: BarangMasuk.items,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Barang Masuk<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    addRowPos: true,
    printStyled: true,
    pagination: "remote",
    paginationSize: 10,
    height: "100%",
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    columnDefaults: {
      resizable: true,
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
        width: 20,
        print: false,
        download: false,
        tooltip: false,
        hozAlign: "center",
        vertAlign: "middle",
        formatter() {
          const a = dom(`<div class="flex lg:justify-center items-center ml-6">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="printer" class="w-4 h-4"></i> 
                </a>
              </div>`);
          dom(a).on("click", function () {});

          return a[0];
        },
        cellClick: function (e, cell) {
          const mutasi = cell.getData();
          BarangMasuk.readDetail(mutasi.no_invoice)
            .then(() => {
              no_invoice.value = mutasi.no_invoice;
              data_utama.value = mutasi;
              isInvoice.value = true;
            })
            .catch((e) => {
              alert("gagal open invoice" + e);
            });
        },
      },
      {
        title: "NO. SURAT",
        minWidth: 200,
        responsive: 0,
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
        title: "TANGGAL",
        headerHozAlign: "center",
        minWidth: 150,
        field: "tanggal_mutasi",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(
                  cell.getData().tanggal_mutasi
                ).format("DD MMM YYYY HH:SS")}</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BARANG",
        minWidth: 100,
        headerHozAlign: "center",
        field: "total_barang_mutasi",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "OUTLET PENGIRIM & PENERIMA",
        headerHozAlign: "center",
        minWidth: 300,
        field: "id_outlet_pengirim",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`
            <div class="flex justify-center items-center">
                <a class="flex items-center text-primary whitespace-nowrap mr-5"
                  href="javascript:;"
                >
                  <i data-lucide="package-minus" class="w-4 h-4 mr-1"></i>${
                    cell.getData().pengirim
                  }
                </a>
                <i data-lucide="arrow-right" class="w-4 h-4 m-2 -ml-3"></i>
                <a class="flex items-center text-primary whitespace-nowrap"
                  href="javascript:;"
                >
                  <i data-lucide="package-plus" class="w-4 h-4 mr-1"></i>${
                    cell.getData().penerima
                  }
                </a>
              </div>

              `);

          return a[0];
        },
      },
      {
        title: "EKSPEDISI & INVOICE",
        minWidth: 200,
        headerHozAlign: "center",
        field: "status",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div>
          <div class="flex items-center lg:justify-center mb-1">
            ${cell.getData().ekspedisi}
          </div>
          <kbd class="select-all px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">${
            cell.getData().no_resi
          }</kbd>
          <i data-lucide="copy" class="cursor-pointer hover:bg-white inline-block w-4 h-4 ml-1"></i>
        </div>`);
          dom(a).on("click", function () {
            navigator.clipboard.writeText(`${cell.getData().no_resi}`);
          });
          return a[0];
        },
      },
      {
        title: "STATUS",
        minWidth: 100,
        headerHozAlign: "center",
        field: "status",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`
          <div class="flex items-center lg:justify-center ${
            cell.getData().status ? "text-success" : "text-pending"
          }">
            <i data-lucide="truck" class="w-4 h-4 mr-2"></i> ${
              cell.getData().status ? "Diterima" : "Dalam Pengiriman"
            }
          </div>`);
          return a[0];
        },
      },
      {
        title: "ACTIONS",
        headerHozAlign: "center",
        minWidth: 150,
        responsive: 1,
        field: "actions",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
                  <img
                  width="100" height="100" decoding="async" loading="lazy"
                  id="gambar${cell.getData().no_invoice}"
                  src="${getImgUrl(cell.getData().gambar_bukti)}"
                  alt="${cell.getData().gambar_bukti}"
                  data-action="zoom"
                  class="w-10 h-10 rounded-md mr-2" >Lihat Bukti</img>
              </div>`);

          const b = dom(`<div class="flex lg:justify-center items-center">
                <button class="btn btn-rounded btn-pending-soft flex items-center">
                  <i data-lucide="package" class="w-4 h-4 mr-1"></i> Terima Barang
                </button>
              </div>`);

          dom(b).on("click", function () {
            const mutasi = cell.getData();
            data_utama.value = mutasi;

            BarangMasuk.readDetail(mutasi.no_invoice)
              .then(() => {
                no_invoice.value = mutasi.no_invoice;
                isEdit.value = true;
                isInvoice.value = true;
              })
              .catch((e) => {
                alert("gagal open invoice" + e);
              });
          });

          return cell.getData().status ? a[0] : b[0];
        },
      },

      // For print format
      {
        title: "NO. SURAT",
        field: "no_invoice",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TANGGAL",
        field: "tanggal_mutasi",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(
                  cell.getData().tanggal_mutasi
                ).format("DD MMM YYYY HH:SS")}</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BARANG",
        field: "total_barang_mutasi",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "OUTLET PENGIRIM",
        field: "id_outlet_pengirim",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "OUTLET PENERIMA",
        field: "id_outlet_penerima",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "EKSPEDISI & INVOICE",
        minWidth: 250,
        headerHozAlign: "center",
        field: "status",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          const a = dom(`<div>
          <div class="flex items-center lg:justify-center">
            JNE
          </div>
          ${cell.getData().no_invoice}
        </div>`);
          dom(a).on("click", function () {
            navigator.clipboard.writeText(`${cell.getData().no_invoice}`);
          });
          return a[0];
        },
      },
      {
        title: "STATUS",
        field: "status",
        visible: false,
        print: true,
        download: true,
        formatterPrint(cell) {
          return `${cell.getData().status ? "Diterima" : "Dalam Pengiriman"}`;
        },
      },
    ],
  });
  tabulator.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
  tabulator.value.on("rowDblClick", async function (e, row) {
    const id = row.getData().no_invoice;
    try {
      await BarangMasuk.readDetail(id)
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
    const id = row.getData().no_invoice;
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
  filter.field = "no_invoice";
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

onMounted(() => {
  isLoading.value = true;
  BarangMasuk.readItem()
    .then(() => {
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
});

onBeforeUnmount(() => {
  basicNonStickyNotification.value.hideToast();
  isLoading.value = false;
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

.imgUp {
  margin-bottom: 5px;
}

@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td {
  border-bottom: 1px solid black;
}

th {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
