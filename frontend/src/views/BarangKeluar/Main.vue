<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Barang Keluar</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="startMutation()"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Barang Keluar</p>
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
            <p class="mx-auto" v-if="isEdit">
              Edit Barang Keluar {{ no_invoice }}
            </p>
            <p class="mx-auto" v-else>Tambah Barang Keluar</p>
          </h2>

          <div
            class="sm:w-auto flex mt-3 mx-auto sm:mx-0 sm:mr-0 sm:ml-4 items-center sm:items-right"
          >
            <div class="mr-2 m-auto">
              <div
                class="bg-slate-200 rounded-md p-2 font-medium lg:text-base text-sm px-2"
              >
                <p class="text-right text-black">{{ no_invoice }}</p>
              </div>
              <p
                class="text-center bg-primary text-white rounded-md w-24 mx-auto lg:-mt-[52px] -mt-12 lg:mb-8 mb-6"
              >
                NO. SURAT
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
                              >Outlet Tujuan</label
                            >
                            <div class="flex w-full">
                              <TomSelect
                                v-model="outlet_select"
                                class="w-full"
                                required
                              >
                                <option value="kosong" disabled>
                                  &gt;-- Pilih Outlet &lt;--
                                </option>
                                <option
                                  v-for="outlet in BarangKeluar.outlets"
                                  :key="outlet.id_outlet"
                                  :outlet="outlet"
                                  :value="outlet.id_outlet"
                                >
                                  {{ outlet.id_outlet }} -
                                  {{ outlet.nama_outlet }}
                                </option>
                              </TomSelect>
                            </div>
                          </div>

                          <div class="col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Ekpedisi</label
                            >
                            <TomSelect
                              v-model="ekspedisi_select"
                              :options="{
                                create: true,
                                render: data_select,
                              }"
                              class="w-full"
                            >
                              <option
                                value="kosong"
                                data-src="/src/assets/images/ekspedisi/logo-gold.svg"
                                disabled
                              >
                                &gt;-- Pilih Ekspedisi &lt;--
                              </option>
                              <option
                                v-for="ekspedisi in ekspedisis.default"
                                :key="ekspedisi.id_ekspedisi"
                                :ekspedisi="ekspedisi"
                                :value="ekspedisi.alias_ekspedisi"
                                :data-src="ekspedisi.image_ekspedisi"
                              >
                                -- {{ ekspedisi.nama_ekspedisi }}
                              </option>
                            </TomSelect>
                          </div>

                          <div class="col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Nomor Resi</label
                            >
                            <input
                              id="pos-form-1"
                              type="text"
                              class="form-control flex-1"
                              placeholder="Masukan Nomor Resi"
                              required
                              v-model="no_resi"
                              :disabled="outlet_select == 'kosong'"
                            />
                          </div>

                          <div class="col-span-9 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >ID Barang/Item</label
                            >
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
                              <TomSelect v-model="item_select" class="w-full">
                                <option value="kosong" disabled>
                                  &gt;-- Pilih Item &lt;--
                                </option>
                                <option
                                  v-for="varian in BarangKeluar.varians"
                                  :key="varian.id_varian"
                                  :varian="varian"
                                  :value="varian.id_varian"
                                >
                                  {{ varian.id_varian }} -
                                  {{ varian.nama_varian }}
                                </option>
                              </TomSelect>
                            </div>
                            <div class="form-help">
                              * Pilih atau Klik Kamera untuk scan barcode.
                            </div>
                          </div>
                          <div class="col-span-3 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Stok
                              <p
                                class="hidden sm:inline-block -mb-2 form-label"
                              >
                                Tersisa
                              </p>
                            </label>
                            <input
                              v-model="stok"
                              id="pos-form-1"
                              type="number"
                              class="form-control flex-1"
                              placeholder="Masukan Stok Tersisa"
                              readonly
                            />
                          </div>

                          <div class="col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Nama Varian</label
                            >
                            <div
                              class="bg-slate-100 py-2 px-3 border-2 rounded-md"
                            >
                              <p class="text-black">{{ nama_varian_select }}</p>
                            </div>
                          </div>

                          <div class="col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label"
                              >Qty</label
                            >
                            <input
                              id="pos-form-1"
                              type="number"
                              class="form-control flex-1"
                              placeholder="Masukan Qty"
                              required
                              v-model="qty_select"
                              :disabled="qty_select == 0"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="addItem()"
                          class="btn btn-primary w-20 mt-3"
                          :disabled="item_select == 'kosong'"
                        >
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END: Display Item -->
              </div>

              <!-- BEGIN: Detail BarangKeluar -->
              <div class="col-span-12 flex-col-reverse z-0">
                <div class="intro-y box">
                  <div
                    class="flex items-center px-5 py-2 border-b border-slate-200/60 dark:border-darkmode-400"
                  >
                    <h2 class="font-medium text-base mr-auto">
                      Detail Barang Keluar
                    </h2>
                  </div>
                  <div class="px-2">
                    <div class="col-span-12 overflow-auto w-full h-56">
                      <table class="table table-hover mt-2">
                        <thead class="table-light">
                          <tr>
                            <th class="sticky top-0 left-0 w-5 bg-slate-200">
                              #
                            </th>
                            <th
                              class="sticky top-0 whitespace-nowrap bg-slate-200"
                            >
                              ID & Nama Varian
                            </th>
                            <th
                              class="sticky top-0 whitespace-nowrap bg-slate-200"
                            >
                              QTY
                            </th>
                          </tr>
                        </thead>
                        <tbody class="bg-white">
                          <DetailMutasi
                            v-for="detail in BarangKeluar.mutasi"
                            :key="detail.id_barang"
                            :detail="detail"
                            @openModalRemove="openModalRemove"
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END: Detail BarangKeluar -->
            </div>
          </div>
        </ModalBody>
        <ModalFooter class="">
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
            @click="simpanMutasi()"
            class="object-left btn btn-primary w-32"
            :disabled="outlet_select === 'kosong'"
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
            <option value="no_invoice">No Invoice</option>
            <option value="tanggal_mutasi">Tanggal Barang Keluar</option>
            <option value="total_barang_mutasi">Total Barang Keluar</option>
            <option value="status">Status</option>
            <option value="id_outlet_penerima">Outlet Penerima</option>
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
        <div v-if="modal_utama" class="text-xl mt-5">
          Apakah Anda yakin akan menghapus
          <b> {{ itemDel.nama_varian }} </b> sebanyak
          <b> {{ itemDel.qty }}</b> ?
        </div>

        <div v-else class="text-xl mt-5">
          Apakah Anda yakin akan menghapus BarangKeluar
          <b> {{ no_invoice }} </b> ?
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
              ? removeItem(itemDel.id_detail_barang_mutasi)
              : deleteMutasi(no_invoice)
          "
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

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
        <button class="btn btn-primary shadow-md mr-2" @click="onPrintInvoice">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
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
      <div class="bg-white">
        <PrintSuratJalan
          :prints="BarangKeluar.prints"
          :mutasi="data_utama"
          :no_invoice="no_invoice"
          :waktu="waktu"
        />
      </div>
    </ModalBody>
  </Modal>

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

  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import $ from "jquery";
import * as ekspedisis from "@/assets/json/ekspedisi.json";
import { useBarangKeluarStore } from "@/stores/barang-keluar";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import DetailMutasi from "./DetailMutasi.vue";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import qrcode from "@/components/qrcode/QrCode.vue";
import PrintSuratJalan from "./PrintSuratJalan.vue";
import moment from "moment";
import html2canvas from "html2canvas";

const BarangKeluar = useBarangKeluarStore();

const modal_utama = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const isModalScanner = ref(false);
const qrScanner = ref();
const modalErrorRef = ref();
const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});
var subTable;
const isInvoice = ref(false);
const data_utama = ref([]);

const no_invoice = ref("-");
const waktu = ref("");
const ekspedisi_select = ref("kosong");
const no_resi = ref("");

const item_select = ref("kosong");
const outlet_select = ref("kosong");
const stok = ref(0);
const nama_barang_select = ref("-");
const nama_varian_select = ref("-");
const nama_campur_select = ref("-");

const qty_select = ref(0);

const harga_item_select = ref(0);
const total_harga_select = ref(0);

const total_harga_global = ref(0);
const total_bayar_global = ref(0);
const kembalian = ref(0);

const imageAssets = import.meta.globEager(
  `/src/assets/images/ekspedisi/*.{jpg,jpeg,png,svg}`
);

const itemDel = ref("");
const data_select = {
  option: function (data) {
    return `<div><img width="100" height="100" class="w-auto h-6 inline-block mr-2" decoding="async" loading="lazy" src="${
      imageAssets[data.src].default
    }">${data.text}</div>`;
  },
  item: function (item) {
    return `<div><img width="100" height="100" class="w-auto h-6 inline-block mr-2" decoding="async" loading="lazy" src="${
      imageAssets[item.src].default
    }">${item.text}</div>`;
  },
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

  const canvas = await html2canvas(id);
  var barcodeImgTag = document.createElement("a");
  document.body.appendChild(barcodeImgTag);
  barcodeImgTag.download = `Invoice-${no_invoice.value}.jpg`;
  barcodeImgTag.href = canvas.toDataURL();
  barcodeImgTag.target = "_blank";
  barcodeImgTag.click();
};

const startMutation = async () => {
  const data = await BarangKeluar.startMutation();
  no_invoice.value = data.no_invoice;
  waktu.value = data.tanggal_penjualan;
  modal_utama.value = true;
};
const addItem = () => {
  BarangKeluar.addDetailMutasi(
    no_invoice.value,
    item_select.value,
    qty_select.value
  )
    .then(() => {})
    .catch((e) => {
      alert("addItem" + e);
    });
};

const openModalRemove = (item) => {
  console.log(item);
  itemDel.value = item;
  deleteConfirmationModal.value = true;
};

const removeItem = (id_detail_barang_mutasi) => {
  BarangKeluar.removeDetail(id_detail_barang_mutasi)
    .then(() => {
      deleteConfirmationModal.value = false;
    })
    .catch((e) => {
      alert("removeItem" + e);
    });
};

const simpanMutasi = () => {
  const no_invoice_now = no_invoice.value;
  const outlet_penerima = outlet_select.value;
  const tanggal = waktu.value;
  const ekspedisi = ekspedisi_select.value;
  const noResi = no_resi.value;

  if (
    (BarangKeluar.mutasi.length !== 0 && outlet_select.value !== "kosong",
    ekspedisi_select.value !== "kosong")
  ) {
    BarangKeluar.addMutasi(
      no_invoice_now,
      outlet_penerima,
      tanggal,
      ekspedisi,
      noResi
    )
      .then(() => {
        resetModal();
        initTabulator();
      })
      .catch((e) => {
        alert("Simpan Error: " + e);
      });
  } else {
    alert("Simpan Detail BarangKeluar Tidak Boleh Kosong");
  }
};

const deleteMutasi = (no_invoice) => {
  BarangKeluar.removeMutasi(no_invoice);
  initTabulator();
  resetModal();
};
defineExpose({ qrScanner });

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

  data_utama.value = [];
  no_invoice.value = "-";
  waktu.value = "";
  ekspedisi_select.value = "kosong";
  no_resi.value = "";

  item_select.value = "kosong";
  outlet_select.value = "kosong";
  stok.value = 0;
  nama_barang_select.value = "-";
  nama_varian_select.value = "-";
  nama_campur_select.value = "-";

  qty_select.value = 0;

  harga_item_select.value = 0;
  total_harga_select.value = 0;

  total_harga_global.value = 0;
  total_bayar_global.value = 0;
  kembalian.value = 0;

  itemDel.value = "";
  BarangKeluar.rawDetailMutasi = [];
};

watch(item_select, async (e) => {
  try {
    if (e !== "kosong") {
      BarangKeluar.readDetailItem(e)
        .then((data) => {
          console.log("data.data", data);
          (nama_varian_select.value = data.nama_varian),
            (stok.value = data.stok_varian),
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
  let qty = newValue;
  let stok_now = stok.value;
  try {
    if (newValue > stok_now) {
      alert("Stok tersisa hanya " + stok_now);
      qty_select.value = oldValue;
    } else if (newValue === "") {
      alert("Minimal Qty harus 1");
      qty_select.value = 1;
    } else {
      stok.value = stok_now - qty;
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
  tabulator.value = new Tabulator(tableRef.value, {
    data: BarangKeluar.items,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Barang Keluar<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    height: "100%",
    addRowPos: true,
    pagination: "remote",
    paginationSize: 10,
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
                  <i data-lucide="printer" class="w-4 h-4 mr-1"></i> 
                </a>
              </div>`);

          return a[0];
        },
        cellClick: function (e, cell) {
          const mutasi = cell.getData();

          BarangKeluar.readDetail(mutasi.no_invoice)
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
        field: "id_outlet_penerima",
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
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
          dom(a).on("click", "a", function (e) {
            if (e.id === "edit") {
              const mutasi = cell.getData();
              BarangKeluar.readDetailMutasi(mutasi.no_invoice)
                .then(() => {
                  no_invoice.value = mutasi.no_invoice;
                  waktu.value = mutasi.tanggal_mutasi;
                  outlet_select.value =
                    mutasi.id_outlet_penerima == null ||
                    mutasi.id_outlet_penerima === ""
                      ? "kosong"
                      : mutasi.id_outlet_penerima;
                  no_resi.value = mutasi.no_resi;
                  ekspedisi_select.value = mutasi.ekspedisi;

                  isEdit.value = true;
                  modal_utama.value = true;
                })
                .catch((e) => {
                  alert("gagal open edit" + e);
                });
            } else {
              no_invoice.value = cell.getData().no_invoice;
              deleteConfirmationModal.value = true;
            }
          });

          return a[0];
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
    rowFormatter: function (row) {
      //create and style holder elements
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");
      holderEl.style.display = "none";

      const id = row.getData().no_invoice;

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
        layout: "fitColumns",
        data: row.getData().serviceHistory,
        columns: [
          // For HTML table
          {
            title: "ID VARIAN",
            minWidth: 200,
            responsive: 0,
            field: "id_varian",
            hozAlign: "left",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_varian
                }</div>
              </div>`;
            },
          },
          {
            title: "NAMA VARIAN",
            minWidth: 200,
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

          // For print format
          {
            title: "ID VARIAN",
            field: "id_varian",
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
            title: "QTY",
            field: "qty",
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
    const id = row.getData().no_invoice;
    try {
      await BarangKeluar.readDetail(id)
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
  BarangKeluar.readItem()
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
