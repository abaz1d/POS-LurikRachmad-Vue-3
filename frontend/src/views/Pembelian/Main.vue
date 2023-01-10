<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Pembelian</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mb-3 mr-2 pr-5" @click="modal_utama = true; startTransaction()">
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Pembelian</p> Baru
      </button>
      <!-- BEGIN: Modal Content -->
      <Modal size="modal-xl" backdrop="static" :show="modal_utama" @hidden="modal_utama = false">
        <ModalHeader class="relative top-0 z-50 rounded-md border-b-2">
          <h2 class="font-medium text-base mr-auto">
            <p class="mx-auto" v-if="isEdit">Edit Pembelian {{ no_invoice }}</p>
            <p class="mx-auto" v-else>Tambah Pembelian</p>
          </h2>
          <div class="lg:-mr-48 mx-auto mt-2">
            <div class="bg-slate-200 rounded-md p-2 font-medium lg:text-base text-sm px-2">
              <p class="text-right text-black">{{ no_invoice }}</p>
            </div>
            <p class="text-center bg-primary text-white rounded-md w-24 mx-auto lg:-mt-[52px] -mt-12 lg:mb-8 mb-6">NO
              INVOICE</p>
          </div>

          <div class="lg:mr-0 mx-auto mt-2">
            <div class="bg-slate-200 rounded-md p-2 font-medium lg:text-base text-sm px-2">
              <p class="text-right text-black">{{ moment(waktu).format("DD MMM YYYY HH:SS") }}</p>
            </div>
            <p class="text-center bg-primary text-white rounded-md w-24 mx-auto lg:-mt-[52px] -mt-12 lg:mb-8 mb-6">WAKTU
            </p>
          </div>

        </ModalHeader>
        <ModalBody class="">
          <div class="overflow-auto sm:overflow-hidden mx-0 sm:h-3/4 h-80">
            <div class="grid grid-cols-12 gap-1 -mt-3">

              <div class="col-span-12 lg:col-span-8">
                <!-- BEGIN: Display Item -->
                <div class="intro-y box">
                  <div class="p-2">
                    <div class="flex flex-col-reverse xl:flex-row flex-col">
                      <div class="flex-1 mt-0">
                        <div class="grid grid-cols-12 gap-x-2 sm:gap-x-3">
                          <div class="sm:col-span-9 col-span-12 mb-5">
                            <label for="pos-form-1" class="form-label">ID Barang/Item <p class="sm:hidden form-label">&
                                Stok</p></label>
                            <div class="flex w-full">
                              <div
                                class="z-30 rounded-l w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-300 border text-gray-600 dark:bg-dark-1 dark:border-dark-4 -mr-1 cursor-pointer"
                                @click="isModalScanner = true; renderQrScanner();">
                                <CameraIcon class="w-4 h-4" />
                              </div>
                              <TomSelect v-model="item_select" class="w-full" required>
                                <option value="kosong" disabled>
                                  &gt-- Pilih Items --&lt
                                </option>
                                <option v-for="varian in Pembelian.varians" :key="varian.id_varian" :varian="varian"
                                  :value="varian.id_varian">
                                  {{ varian.id_barang }} - {{ varian.nama_barang }} | {{ varian.id_varian }} - {{
                                    varian.nama_varian
                                  }}
                                </option>
                              </TomSelect>
                            </div>
                            <div class="form-help">
                              * Pilih atau Klik Kamera untuk scan barcode.
                            </div>
                          </div>
                          <div class="hidden sm:block col-span-3 mb-5">
                            <label for="pos-form-1" class="form-label">Stok Tersisa</label>
                            <input v-model="stok" id="pos-form-1" type="text" class="form-control flex-1"
                              placeholder="Masukan Stok Tersisa" readonly />
                          </div>

                          <div class="hidden sm:block col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label">Nama Barang</label>
                            <!-- <input id="pos-form-1" type="text" class="form-control flex-1"
                              placeholder="Masukan Nama Barang" readonly /> -->
                            <div class="bg-slate-100 py-2 px-3 border-2 rounded-md">
                              <p class="text-black">{{ nama_barang_select }}</p>
                            </div>
                          </div>
                          <div class="hidden sm:block col-span-6 mb-5">
                            <label for="pos-form-1" class="form-label">Nama Varian</label>
                            <!-- <input id="pos-form-1" type="text" class="form-control flex-1"
                              placeholder="Masukan Nama Varian" readonly /> -->
                            <div class="bg-slate-100 py-2 px-3 border-2 rounded-md">
                              <p class="text-black">{{ nama_varian_select }}</p>
                            </div>
                          </div>

                          <div class="sm:hidden col-span-12 mb-5">
                            <label for="pos-form-1" class="form-label">Nama Barang & Varian</label>
                            <!-- <input id="pos-form-1" type="text" class="form-control flex-1"
                              placeholder="Masukan Nama Barang & Varian" readonly /> -->
                            <div class="bg-slate-100 py-2 px-3 border-2 rounded-md">
                              <p class="text-black">{{ nama_campur_select }}</p>
                            </div>
                          </div>

                          <div class="col-span-5 sm:col-span-4 mb-5">
                            <label for="pos-form-1" class="form-label">Harga Item</label>
                            <!-- <input id="pos-form-1" type="text" class="form-control flex-1"
                              placeholder="Masukan Harga Item" readonly v-model="harga_item_select" /> -->
                            <div class="bg-slate-100 py-2 px-3 border-2 rounded-md">
                              <p class="text-black">{{ currencyFormatter.format(harga_item_select) }}</p>
                            </div>
                          </div>
                          <XIcon class="sm:hidden m-auto col-span-2" />
                          <div class="col-span-5 sm:col-span-4 mb-5">
                            <label for="pos-form-1" class="form-label">Qty</label>
                            <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Qty"
                              required v-model="qty_select" :disabled="qty_select == 0" />
                          </div>
                          <div class="col-span-12 sm:col-span-4 mb-5">
                            <label for="pos-form-1" class="form-label">Total Harga</label>
                            <!-- <input id="pos-form-1" type="text" class="form-control flex-1"
                              placeholder="Masukan Total Harga" readonly /> -->
                            <div class="bg-slate-100 py-2 px-3 border-2 rounded-md">
                              <p class="text-black">{{ currencyFormatter.format(total_harga_select) }}</p>
                            </div>
                          </div>

                        </div>
                        <button type="button" @click="addItem()" class="btn btn-primary w-20 mt-3"
                          :disabled="qty_select == 0">
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END: Display Item -->
              </div>

              <!-- BEGIN: Display Total Harga -->
              <div class="lg:block hidden col-span-4">
                <div class="intro-y box">

                  <div class="box flex p-2 ">
                    <input type="text" class="form-control py-3 px-4 w-full bg-slate-100 border-slate-200/60 pr-10"
                      placeholder="Use coupon code..." />
                    <button class="btn btn-primary ml-2">Apply</button>
                  </div>
                  <div class="box p-2 mt-2">
                    <div class="flex">
                      <div class="mr-auto font-medium text-base">Total Harga</div>
                    </div>
                    <div class="bg-slate-200 rounded-md p-2">
                      <div class="font-medium text-xl">
                        <p class="text-right text-black">{{ currencyFormatter.format(total_harga_global) }}</p>
                      </div>
                    </div>

                    <div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                      <div class="mr-auto font-medium text-base">Total Bayar</div>
                    </div>
                    <div class="input-group bg-slate-200 rounded-md border-2 border-slate-200/60 mr-0">
                      <div class="input-group-text my-auto text-xl">
                        <p class="text-black">Rp.</p>
                      </div>
                      <input v-model="total_bayar_global" type="number"
                        class="form-control flex-1 font-medium text-xl text-right" placeholder="Nominal Uang"
                        required />
                    </div>

                    <div class="flex mt-1 pt-4">
                      <div class="mr-auto font-medium text-base">Kembalian</div>
                    </div>
                    <div class="bg-slate-200 rounded-md p-2">
                      <div class="font-medium text-xl">
                        <p class="text-right text-black">{{ currencyFormatter.format(kembalian) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END: Display Total Harga -->

              <!-- BEGIN: Detail Pembelian -->
              <div class="col-span-12 flex-col-reverse">
                <div class="intro-y box">
                  <div class="flex items-center px-5 py-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Detail Pembelian</h2>
                  </div>
                  <div class="px-2">
                    <div class="col-span-12 overflow-auto w-full h-56">
                      <table class="table table-hover mt-2">
                        <thead class="table-light">
                          <tr>
                            <th class="sticky top-0 left-0 w-5 bg-slate-200">#</th>
                            <th class="sticky top-0 whitespace-nowrap bg-slate-200">ID & Nama Varian</th>
                            <th class="sticky top-0 whitespace-nowrap bg-slate-200">QTY</th>
                            <th class="sticky top-0 whitespace-nowrap bg-slate-200">Harga Satuan</th>
                            <th class="sticky top-0 whitespace-nowrap bg-slate-200">Total Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="detail in Pembelian.pembelianDetail" :key="detail.id_barang" :detail="detail">
                            <td @click="openModalRemove(detail)"
                              class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer hover:bg-slate-500">
                              <TrashIcon class="text-danger w-4 h-4 p-0" />
                            </td>
                            <td>{{ detail.id_varian }} - {{ detail.nama_varian }}</td>
                            <td>{{ detail.qty }}</td>
                            <td>{{ currencyFormatter.format(detail.harga_detail_beli) }}</td>
                            <td>{{ currencyFormatter.format(detail.total_harga_detail_beli) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ChevronDownIcon class="animate-bounce col-span-12 mt-1 mb-[-20px] block mx-auto" />
                  </div>
                </div>
              </div>
              <!-- END: Detail Pembelian -->
            </div>
          </div>
        </ModalBody>
        <ModalFooter class="text-right bottom-0 relative z-50 rounded-md sm:border-t-2 border-t-4 btm sm:btm-">
          <AccordionGroup class="block lg:hidden mb-5">
            <AccordionItem>
              <Accordion>
                <p class="text-center">Total Harga, Bayar & Kembalian</p>
                <small>
                  <p class="text-center text-sm">&gt Klik untuk buka/ tutup &lt</p>
                </small>
                <div class="grid grid-cols-12 mt-2">
                  <div class="col-span-4 text-sm border-x-2 border-t-2">
                    <p class="text-center">Total Harga</p>
                  </div>
                  <div class="col-span-4 text-sm border-x-2 border-t-2">
                    <p class="text-center">Total Bayar</p>
                  </div>
                  <div class="col-span-4 text-sm border-x-2 border-t-2">
                    <p class="text-center">Kembalian</p>
                  </div>

                  <div class="col-span-4 text-sm border-2">
                    <p class="text-right mr-1">{{ currencyFormatter.format(total_harga_global) }}</p>
                  </div>
                  <div class="col-span-4 text-sm border-2">
                    <p class="text-right mr-1">{{ currencyFormatter.format(total_bayar_global) }}</p>
                  </div>
                  <div class="col-span-4 text-sm border-2">
                    <p class="text-right mr-1">{{ currencyFormatter.format(kembalian) }}</p>
                  </div>
                </div>
              </Accordion>
              <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
                <ChevronDownIcon class="animate-bounce block mx-auto" />
                <div class="flex lg:block flex-col-reverse">
                  <div class="intro-y box">

                    <div class="box flex p-2">
                      <input type="text" class="form-control py-3 px-4 w-full bg-slate-100 border-slate-200/60 pr-10"
                        placeholder="Use coupon code..." />
                      <button class="btn btn-primary ml-2">Apply</button>
                    </div>
                    <div class="box p-2 mt-2">
                      <div class="flex">
                        <div class="mr-auto font-medium text-base">Total Harga</div>
                      </div>
                      <div class="bg-slate-200 rounded-md p-2">
                        <div class="font-medium text-xl">
                          <p class="text-right text-black">{{ currencyFormatter.format(total_harga_global) }}</p>
                        </div>
                      </div>

                      <div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                        <div class="mr-auto font-medium text-base">Total Bayar</div>
                      </div>
                      <div class="input-group bg-slate-200 rounded-md border-2 border-slate-200/60 mr-0">
                        <div class="input-group-text my-auto text-xl">
                          <p class="text-black">Rp.</p>
                        </div>
                        <input v-model="total_bayar_global" type="number"
                          class="form-control flex-1 font-medium text-xl text-right" placeholder="Nominal Uang"
                          required />
                      </div>

                      <div class="flex mt-1 pt-4">
                        <div class="mr-auto font-medium text-base">Kembalian</div>
                      </div>
                      <div class="bg-slate-200 rounded-md p-2">
                        <div class="font-medium text-xl">
                          <p class="text-right text-black">{{ currencyFormatter.format(kembalian) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </AccordionGroup>
          <!-- <div class="object-right mr-1 my-3">
            <input id="horizontal-form-3" class="form-check-input" type="checkbox" value="" />
            <label class="form-check-label" for="horizontal-form-3">Data Telah Benar</label>
          </div> -->
          <button type="button" @click="modal_utama = false; resetModal()" class="btn btn-outline-secondary w-32 mr-1">
            Cancel
          </button>
          <button type="button" @click="simpanPembelian()" class="object-left btn btn-primary w-32"
            :disabled="total_bayar_global == 0 || total_bayar_global < total_harga_global">
            Simpan
          </button>
        </ModalFooter>
      </Modal>
      <a href="" class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary">
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
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select id="tabulator-html-filter-field" v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="no_invoice">No Invoice</option>
            <option value="tanggal_pembelian">Tanggal Pembelian</option>
            <option value="total_harga_beli">Total Harga Beli</option>
            <option value="total_bayar_beli">Total Bayar Beli</option>
            <option value="kembalian_beli">Kembalian</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
          <select id="tabulator-html-filter-type" v-model="filter.type"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
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
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
          <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0" placeholder="Search..." />
        </div>
        <div class="mt-2 xl:mt-0">
          <!-- <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16" @click="onFilter">
            Go
          </button> -->
          <button id="tabulator-html-filter-reset" type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1" @click="onResetFilter">
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
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
              <!-- <DropdownItem @click="onExportJson">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export JSON
              </DropdownItem> -->
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
              <!-- <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export HTML
              </DropdownItem> -->
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div v-if="modal_utama" class="text-xl mt-5">Apakah Anda yakin akan menghapus <b> {{ itemDel.nama_varian }} </b>
          sebanyak <b> {{
            itemDel.qty
          }}</b> ?</div>

        <div v-else class="text-xl mt-5">Apakah Anda yakin akan menghapus Pembelian <b> {{ no_invoice }} </b> ?</div>

      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24"
          @click="modal_utama ? removeItem(itemDel.id_detail_beli, itemDel.no_invoice) : deletePembelian(no_invoice)">
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

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
        <button type="button" @click="
  isModalScanner = false;
closeQrScanner();
        " class="btn btn-danger w-24">
          Close
        </button>
      </div>
    </ModalBody>
  </Modal>

  <!-- BEGIN: Basic Non Sticky Notification Content -->
  <Notification refKey="basicNonStickyNotification" :options="{
    duration: 10000,
  }" class="flex flex-col sm:flex-row hover:animate-none md:animate-bounce animate-pulse ">
    <div class="font-medium">Klik 2 kali pada salah satu baris tabel untuk melihat detail transaksi!</div>
  </Notification>
  <!-- END: Basic Non Sticky Notification Content -->
</template>

<script setup>
import $ from "jquery";
import { usePembelianStore } from "../../stores/pembelian";
import { ref, provide, reactive, onMounted, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dom from "@left4code/tw-starter/dist/js/dom";
import qrcode from "../../components/qrcode/QrCode.vue";
import { currencyFormatter } from "../../utils/helper";
import moment from "moment";

const Pembelian = usePembelianStore();

const modal_utama = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const isModalScanner = ref(false);
const qrScanner = ref()
const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});
var subTable
const index_select = ref(0)
const data_utama = ref([])

const no_invoice = ref("-");
const waktu = ref("");

const item_select = ref("kosong");
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

const itemDel = ref("");

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
  Pembelian.startTransaction().then((data) => {
    no_invoice.value = data.no_invoice;
    waktu.value = data.tanggal_pembelian;
  })
  console.log('start transactions');
};

const addItem = () => {
  Pembelian.addDetailPembelian(
    no_invoice.value,
    item_select.value,
    qty_select.value
  ).then((data) => {
    //console.log('data.data', stok, qty_select);
    total_harga_global.value = data.total_harga_beli
    stok.value = stok.value - qty_select.value
    nama_campur_select.value = `${nama_barang_select.value} - ${nama_varian_select.value} | ${stok.value}`
  }).catch((e) => {
    alert("addItem" + e)
  });
}

const openModalRemove = (item) => {
  //console.log(item)
  itemDel.value = item
  deleteConfirmationModal.value = true
}

const removeItem = (id_detail_beli, no_invoice) => {
  Pembelian.removeItem(id_detail_beli, no_invoice).then((data) => {
    stok.value = stok.value + parseInt(itemDel.value.qty)
    nama_campur_select.value = `${nama_barang_select.value} - ${nama_varian_select.value} | ${stok.value}`
    deleteConfirmationModal.value = false
    // console.log('data', itemDel)
    total_harga_global.value = parseFloat(data)
  }).catch((e) => {
    alert("removeItem" + e)
  });
}

const simpanPembelian = () => {
  const no_invoice_now = no_invoice.value
  const total_harga_global_now = total_harga_global.value
  const total_bayar_global_now = total_bayar_global.value
  const kembalian_now = kembalian.value

  // tabulator.value.updateData([{
  //   // id: index_select.value,
  //   no_invoice_now,
  //   tanggal_pembelian: Date.now(),
  //   total_harga_beli: currencyFormatter.format(total_harga_global.value),
  //   total_bayar_beli: currencyFormatter.format(total_bayar_global.value),
  //   kembalian_now
  // }]);
  console.log('data', Pembelian.pembelianDetail.length);
  if (Pembelian.pembelianDetail.length !== 0 && total_bayar_global.value >= total_harga_global.value) {
    Pembelian.addPembelian(no_invoice_now, total_harga_global_now, total_bayar_global_now, kembalian_now).then((data) => {
      isEdit.value = false;
      modal_utama.value = false;
      // tabulator.value.clearData()
      // tabulator.value.setData(data);
      initTabulator()


    }).catch((e) => {
      alert("Simpan Error: " + e)
    });
  } else { alert("Simpan Detail Pembelian Tidak Boleh Kosong") }
}

const deletePembelian = (no_invoice) => {

  Pembelian.removePembelian(no_invoice)
  initTabulator();
  deleteConfirmationModal.value = false;
}
defineExpose({ qrScanner })

const renderQrScanner = () => {
  //qrScanner.renderQrScanner();
  qrScanner.value.renderQrScanner();
}

const closeQrScanner = () => {
  qrScanner.value.closeQrScanner();
}

const resultScan = (result) => {
  // ntar di concat ma it outlet
  item_select.value = result;
  //console.log("hasil", item_select)
  isModalScanner.value = false;
  qrScanner.value.closeQrScanner();
}

const resetModal = () => {
  modal_utama.value = false;
  deleteConfirmationModal.value = false;
  isEdit.value = false;
  isModalScanner.value = false;

  no_invoice.value = "-"
  waktu.value = ""

  item_select.value = "kosong"
  stok.value = 0
  nama_barang_select.value = "-"
  nama_varian_select.value = "-"
  nama_campur_select.value = "-"

  qty_select.value = 0

  harga_item_select.value = 0
  total_harga_select.value = 0

  total_harga_global.value = 0
  total_bayar_global.value = 0
  kembalian.value = 0

  itemDel.value = ""
}

watch(item_select, async (e) => {
  try {
    // console.log("item_select" , e)
    Pembelian.readDetailItem(e).then((data) => {
      // console.log('data.data', data);
      nama_barang_select.value = data.nama_barang,
        nama_varian_select.value = data.nama_varian,
        nama_campur_select.value = `${data.nama_barang} - ${data.nama_varian} | ${data.stok_varian}`,

        harga_item_select.value = data.harga_beli_varian,
        stok.value = data.stok_varian,
        qty_select.value = 1,
        total_harga_select.value = data.harga_beli_varian
    }).catch((e) => {
      throw e
    });
  } catch (error) {
    alert("Gagal pilih barang" + error)
  }
})

watch(qty_select, async (newValue, oldValue) => {
  const qty = newValue
  const harga_item_select_now = harga_item_select.value
  const stok_now = stok.value
  try {
    if (newValue > stok_now) {
      alert("Stok tersisa hanya " + stok_now);
      qty_select.value = oldValue;
    } else if (newValue === "") {
      alert("Minimal Qty harus 1");
      qty_select.value = 1;
    } else {
      total_harga_select.value = harga_item_select_now * qty
    }
  } catch (error) {
    alert("Gagal wtch qty" + error)
  }
})

watch(total_bayar_global, async (newValue, oldValue) => {
  const total_bayar_global_now = newValue
  const total_harga_global_now = total_harga_global.value
  try {
    if (newValue === "" || newValue < 0) {
      alert("Total Bayar tidak boleh kosong atau minus");
      total_bayar_global.value = oldValue;
    } else {
      kembalian.value = total_bayar_global_now - total_harga_global_now
    }
  } catch (error) {
    alert("Gagal wtch total_bayar_globl" + error)
  }
})

watch(total_harga_global, async (newValue, oldValue) => {
  const total_bayar_global_now = total_bayar_global.value
  const total_harga_global_now = newValue
  try {

    if (newValue === "" || newValue < 0) {
      alert("Total Harga tidak boleh kosong atau minus");
      total_harga_global.value = oldValue;
    } else {
      kembalian.value = total_bayar_global_now - total_harga_global_now
    }
  } catch (error) {
    alert("Gagal wtch total_harga_globl" + error)
  }
})

watch(filter, async (newValue, oldValue) => {
  try {
    //console.log("filter: ", newValue)
    onFilter()
  } catch (error) {
    alert("Gagal wtch filter" + error)
  }
})

const template = document.createElement('template');
template.innerHTML = '<div style="display:inline-block;" class="d-flex flex-row">' +
  '<div>Loading... </div>' +
  '<div class="ml-2 activity-sm" data-role="activity" data-type="atom" data-style="dark"></div>' +
  '</div>';
const dataLoaderLoading = template.content.firstChild;

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: Pembelian.pembelians,
    dataLoaderLoading: dataLoaderLoading,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Pembelian<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(Date.now()).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    //height: "50vh",
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
        width: 40,
        print: false,
        download: false,
        align: "center",
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="printer" class="w-4 h-4 mr-1"></i> 
                </a>
              </div>`);
          dom(a).on("click", function (e) {
            
          });

          return a[0];
        }, cellClick: function (e, cell) {
          alert("Print");

          // //filter table to just this row
          // table.Filter(function (data) {
          //   return data.id == cell.getData().id;
          // });

          // //print the table
          // table.print();

          // //clear the filter
          // table.clearFilter();
        }
      },
      {
        title: "INVOICE",
        minWidth: 200,
        responsive: 0,
        field: "no_invoice",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().no_invoice
            }</div>
              </div>`;
        },
      },
      {
        title: "TANGGAL PEMBELIAN",
        headerHozAlign: "center",
        minWidth: 200,
        field: "tanggal_pembelian",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(cell.getData().tanggal_pembelian).format("DD MMM YYYY HH:SS")
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL HARGA",
        minWidth: 200,
        headerHozAlign: "center",
        field: "total_harga_beli",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().total_harga_beli)
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BAYAR",
        minWidth: 200,
        headerHozAlign: "center",
        field: "total_bayar_beli",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().total_bayar_beli)
            }</div>
              </div>`;
        },
      },
      {
        title: "KEMBALIAN",
        headerHozAlign: "center",
        minWidth: 200,
        field: "kembalian_beli",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().kembalian_beli)
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
              //alert("edit " + cell.getData());
              const pembelian = cell.getData()
              //console.log("openEditModal", cell.getRow());
              index_select.value = cell._cell.row.getPosition()

              no_invoice.value = pembelian.no_invoice;
              waktu.value = pembelian.tanggal_pembelian;
              total_harga_global.value = parseFloat(pembelian.total_harga_beli);
              total_bayar_global.value = parseFloat(pembelian.total_bayar_beli);
              kembalian.value = parseFloat(pembelian.kembalian_beli);
              Pembelian.readDetailPembelian(pembelian.no_invoice).then((data) => {
                isEdit.value = true;
                modal_utama.value = true;

              }).catch((e) => {
                alert("gagal open edit" + e);
              });
            } else {
              //alert("delete" + JSON.stringify(cell.getData().no_invoice));
              //const no_invoice_del = JSON.stringify(cell.getData().no_invoice)
              no_invoice.value = cell.getData().no_invoice;
              deleteConfirmationModal.value = true;
            }
          });

          return a[0];
        },
      },

      // For print format
      {
        title: "INVOICE",
        field: "no_invoice",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TANGGAL PEMBELIAN",
        field: "tanggal_pembelian",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(cell.getData().tanggal_pembelian).format("DD MMM YYYY HH:SS")
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL HARGA",
        field: "total_harga_beli",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().total_harga_beli)
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BAYAR",
        field: "total_bayar_beli",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().total_bayar_beli)
            }</div>
              </div>`;
        },
      },
      {
        title: "KEMBALIAN",
        field: "kembalian_beli",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().kembalian_beli)
            }</div>
              </div>`;
        },
      },
    ],
    rowFormatter: function (row) {
      //create and style holder elements
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");
      holderEl.style.display = "none"

      const id = row.getData().no_invoice;

      holderEl.style.boxSizing = "border-box";
      holderEl.style.padding = "10px 30px 10px 10px";
      holderEl.style.borderTop = "1px solid #333";
      holderEl.style.borderBotom = "1px solid #333";
      holderEl.setAttribute('class', "subTable" + id + "");


      tableEl.style.border = "1px solid #333";
      tableEl.style.display = "none"
      tableEl.setAttribute('class', "subTable" + id + "");

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
            title: "NAMA VARIAN",
            minWidth: 200,
            responsive: 0,
            field: "nama_varian",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().nama_varian
                }</div>
              </div>`;
            },
          },
          {
            title: "HARGA ITEM",
            headerHozAlign: "center",
            minWidth: 200,
            field: "harga_detail_beli",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().harga_detail_beli)
                }</div>
              </div>`;
            },
          },
          {
            title: "QTY",
            minWidth: 200,
            headerHozAlign: "center",
            field: "qty",
            hozAlign: "right",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().qty
                }</div>
              </div>`;
            },
          },
          {
            title: "TOTAL HARGA",
            minWidth: 200,
            headerHozAlign: "center",
            field: "total_harga_detail_beli",
            hozAlign: "right",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().total_harga_detail_beli)
                }</div>
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
            title: "HARGA ITEM",
            field: "harga_detail_beli",
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
            title: "TOTAL HARGA",
            field: "total_harga_detail_beli",
            visible: false,
            print: true,
            download: true,
          },
        ],
      })
    },
  });
  tabulator.value.on("renderComplete", function () {
    //subTable.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",

    });
  });
  tabulator.value.on("rowDblClick", async function (e, row) {
    const id = row.getData().no_invoice;
    try {

      await Pembelian.readDetail(id).then(
        (data) => {
          tabulator.value.replaceData(data)
          //console.log("rowClick", data);
        }).catch((e) => {
          throw e;
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

const onExportJson = () => {
  tabulator.value.download("json", "data.json");
};

const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};

const onExportHtml = () => {
  tabulator.value.download("html", "data.html", {
    style: true,
  });
};

// Print
const onPrint = () => {
  tabulator.value.print();
};

onMounted(() => {
  Pembelian.readItem().then((data) => {
    initTabulator();
    reInitOnResizeWindow();
    basicNonStickyNotificationToggle();
  }).catch((error) => {
    alert("onMounted" + error)
  });
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
