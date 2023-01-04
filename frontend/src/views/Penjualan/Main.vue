<template>
  <h2 class="intro-y text-lg font-medium mt-10">List Penjualan</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
      <button class="btn btn-primary shadow-md mr-2 mb-3 pr-5" @click="addModal = true; startTransaction()">
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Transaksi</p> Baru
      </button>

      <!-- BEGIN: Modal Content -->
      <Modal size="modal-xl" backdrop="static" :show="addModal" @hidden="addModal = false">
        <ModalHeader class="relative top-0 z-50 rounded-md border-b-2">
          <h2 class="hidden lg:block font-medium text-base mr-auto">Transaksi Baru</h2>
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
                                @click=" isModalScanner = true; renderQrScanner();">
                                <CameraIcon class="w-4 h-4" />
                              </div>
                              <TomSelect v-model="item_select" class="w-full" required>
                                <option value="kosong" disabled>
                                  &gt-- Pilih Items --&lt
                                </option>
                                <option v-for="varian in Penjualan.varians" :key="varian.id_barang" :varian="varian"
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

              <!-- BEGIN: Detail Penjualan -->
              <div class="col-span-12 flex-col-reverse">
                <div class="intro-y box">
                  <div class="flex items-center px-5 py-2 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 class="font-medium text-base mr-auto">Detail Penjualan</h2>
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
                          <tr v-for="detail in Penjualan.penjualanDetail" :key="detail.id_barang" :detail="detail">
                            <td @click="openModalRemove(detail)"
                              class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer hover:bg-slate-500">
                              <TrashIcon class="text-danger w-4 h-4 p-0" />
                            </td>
                            <td>{{ detail.id_varian }} - {{ detail.nama_varian }}</td>
                            <td>{{ detail.qty }}</td>
                            <td>{{ currencyFormatter.format(detail.harga_detail_jual) }}</td>
                            <td>{{ currencyFormatter.format(detail.total_harga_detail_jual) }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ChevronDownIcon class="animate-bounce col-span-12 mt-1 mb-[-20px] block mx-auto" />
                  </div>
                </div>
              </div>
              <!-- END: Detail Penjualan -->
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
          <button type="button" @click="addModal = false" class="btn btn-outline-secondary w-32 mr-1">
            Cancel
          </button>
          <button type="button" @click="addPenjualan()" class="object-left btn btn-primary w-32"
            :disabled="total_bayar_global == 0 || total_bayar_global < total_harga_global">
            Simpan
          </button>
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
        <input type="text" class="form-control w-56 box pr-10" placeholder="Search..." />
        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
      </div>
      <a class="notification xl:hidden mt-0 mb-3">
        <!-- <SearchIcon class="notification__icon dark:text-slate-500" /> -->
        <form action="" class="justify-center shadow-none bg-white box h-10">
          <input type="search"
            class="peer shadow-none cursor-pointer relative z-10 h-10 w-10 box border bg-transparent dark:bg-transparent dark:text-white pl-9 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 search__input form-control border-transparent" />
          <SearchIcon class="absolute inset-y-0 my-auto h-8 w-12 px-3.5 dark:stroke-white" />
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
            <li class="page-item active">
              <!-- <a class="page-link" href="#">2</a> -->
              <input type="number" class="form-control" id="page_number" value="1" />
            </li>
            <li class="page-item">
              <!-- <a class="page-link" href="#">3</a> -->
              <input type="number" class="form-control" id="total_pages" disabled />
            </li>
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
    <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
      <PenjualanList :penjualans="Penjualan.penjualans" />
    </div>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-xl mt-5">Apakah Anda yakin akan menghapus <b> {{ itemDel.nama_varian }} </b> sebanyak <b> {{
    itemDel.qty
}}</b> ?</div>

      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24"
          @click="removeItem(itemDel.id_detail_jual, itemDel.no_invoice)">
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
</template>

<script>
import { usePenjualanStore } from "../../stores/penjualan";
import qrcode from "../../components/qrcode/QrCode.vue";
import { currencyFormatter } from "../../utils/helper";
import PenjualanList from "./PenjualanList.vue";
import moment from "moment";
import { ref } from "vue";
import { watch } from "vue";

const addModal = ref(false);
const deleteConfirmationModal = ref(false);
const isModalScanner = ref(false);

export default {
  setup() {
    const Penjualan = usePenjualanStore();

    return {
      Penjualan,
      moment,
      currencyFormatter,
      watch
    };
  },
  watch: {
    item_select(e) {
      // console.log("ora", e);
      this.Penjualan.readDetailItem(e).then((data) => {
        // console.log('data.data', data);
        this.nama_barang_select = data.nama_barang,
          this.nama_varian_select = data.nama_varian,
          this.nama_campur_select = `${data.nama_barang} - ${data.nama_varian} | ${data.stok_varian}`,

          this.harga_item_select = data.harga_jual_varian,
          this.stok = data.stok_varian,
          this.qty_select = 1,
          this.total_harga_select = data.harga_jual_varian
      }).catch((e) => console.error(e));
    },
    qty_select(newValue, oldValue) {
      const qty = newValue
      const harga_item_select = this.harga_item_select
      const stok = this.stok
      // console.log('qty', newValue, oldValue, this.harga_item_select, this.stok);
      if (newValue > stok) {
        alert("Stok tersisa hanya " + stok);
        this.qty_select = oldValue;
      } else if (newValue === "") {
        alert("Minimal Qty harus 1");
        this.qty_select = 1;
      } else {
        this.total_harga_select = harga_item_select * qty
      }
    },
    total_bayar_global(newValue, oldValue) {
      const total_bayar_global = newValue
      const total_harga_global = this.total_harga_global
      if (newValue === "") {
        alert("Total Bayar tidak boleh kosong atau minus");
        this.total_bayar_global = oldValue;
      } else {
        this.kembalian = total_bayar_global - total_harga_global
      }
    },
    total_harga_global(newValue, oldValue) {
      const total_bayar_global = this.total_bayar_global
      const total_harga_global = newValue
      if (newValue === "") {
        alert("Total Harga tidak boleh kosong atau minus");
        this.total_harga_global = oldValue;
      } else {
        this.kembalian = total_bayar_global - total_harga_global
      }
    }
  },
  components: {
    PenjualanList,
    qrcode
  },
  data() {
    return {
      addModal,
      deleteConfirmationModal,
      isModalScanner,

      no_invoice: "-",
      waktu: "",

      item_select: "kosong",
      stok: 0,
      nama_barang_select: "-",
      nama_varian_select: "-",
      nama_campur_select: "-",

      qty_select: 0,

      harga_item_select: 0,
      total_harga_select: 0,

      total_harga_global: 0,
      total_bayar_global: 0,
      kembalian: 0,

      itemDel: "",
    };
  },
  methods: {
    startTransaction() {
      // this.Penjualan.startTransaction().then((data) => {
      //   this.no_invoice = data.no_invoice;
      //   this.waktu = data.tanggal_penjualan;
      // })
      // console.log('start transactions');
    },
    addItem() {
      this.Penjualan.addDetailPenjualan(
        this.no_invoice,
        this.item_select,
        this.qty_select
      ).then((data) => {
        //console.log('data.data', this.stok, this.qty_select);
        this.total_harga_global = data.total_harga_jual
        this.stok = this.stok - this.qty_select
        this.nama_campur_select = `${this.nama_barang_select} - ${this.nama_varian_select} | ${this.stok}`
      }).catch((e) => console.error(e));
    },
    openModalRemove(item) {
      //console.log(item)
      this.itemDel = item
      this.deleteConfirmationModal = true
    },
    removeItem(id_detail_jual, no_invoice) {
      this.Penjualan.removeItem(id_detail_jual, no_invoice).then((data) => {
        this.stok = this.stok + parseInt(this.itemDel.qty)
        this.nama_campur_select = `${this.nama_barang_select} - ${this.nama_varian_select} | ${this.stok}`
        this.deleteConfirmationModal = false
        // console.log('data',this.itemDel)
        this.total_harga_global = parseFloat(data)
      }).catch((e) => console.error(e));
    },
    addPenjualan() {
      const no_invoice = this.no_invoice
      const total_harga_global = this.total_harga_global
      const total_bayar_global = this.total_bayar_global
      const kembalian = this.kembalian
      console.log('data', this.Penjualan.penjualanDetail.length);
      if (this.Penjualan.penjualanDetail.length !== 0 && this.total_bayar_global >= this.total_harga_global) {
        this.Penjualan.addPenjualan(no_invoice, total_harga_global, total_bayar_global, kembalian).then((data) => {
          this.addModal = false;
        }).catch((e) => console.error(e));
      } else { alert("Detail Penjualan Tidak Boleh Kosong") }

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
      this.item_select = result;
      //console.log("hasil", this.item_select)
      this.isModalScanner = false;
      this.$refs.qrScanner.closeQrScanner();
    },
  },
  async mounted() {
    try {
      await this.Penjualan.readItem();
    } catch (error) {
      console.error("Error: " + error)
    }
  },
};
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
