<template>
  <h2 class="intro-y text-lg font-medium mt-10">List Penjualan</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
      <button class="btn btn-primary shadow-md mr-2 mb-3 pr-5" @click="addModal = true">
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Transaksi</p> Baru
      </button>

      <!-- BEGIN: Modal Content -->
      <Modal size="modal-xl" backdrop="static" :show="addModal" @hidden="addModal = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Tambah Satuan</h2>
        </ModalHeader>
        <ModalBody>
          <!-- <form @submit.prevent="addSatuan" id="addSatuanForm" class="col-span-8 intro-y grid grid-cols-12 gap-2">
            <div class="col-span-9 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>
            <div class="col-span-3 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>

            <div class="col-span-6 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>
            <div class="col-span-6 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>

            <div class="col-span-4 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>
            <div class="col-span-4 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>
            <div class="col-span-4 mb-2">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                required />
            </div>
          </form>
          <div class="col-span-4">
      
            <div class="box flex p-5 mt-5">
              <input type="text" class="form-control py-3 px-4 w-full bg-slate-100 border-slate-200/60 pr-10"
                placeholder="Use coupon code..." />
              <button class="btn btn-primary ml-2">Apply</button>
            </div>
            <div class="box p-5 mt-5">
              <div class="flex">
                <div class="mr-auto">Subtotal</div>
                <div class="font-medium">$250</div>
              </div>
              <div class="flex mt-4">
                <div class="mr-auto">Discount</div>
                <div class="font-medium text-danger">-$20</div>
              </div>
              <div class="flex mt-4">
                <div class="mr-auto">Tax</div>
                <div class="font-medium">15%</div>
              </div>
              <div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                <div class="mr-auto font-medium text-base">Total Charge</div>
                <div class="font-medium text-base">$220</div>
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <table class="table mt-5">
              <thead class="table-light">
                <tr>
                  <th class="whitespace-nowrap">#</th>
                  <th class="whitespace-nowrap">First Name</th>
                  <th class="whitespace-nowrap">Last Name</th>
                  <th class="whitespace-nowrap">Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Angelina</td>
                  <td>Jolie</td>
                  <td>@angelinajolie</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Brad</td>
                  <td>Pitt</td>
                  <td>@bradpitt</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Charlie</td>
                  <td>Hunnam</td>
                  <td>@charliehunnam</td>
                </tr>
              </tbody>
            </table>
          </div> -->

          <div class="grid grid-cols-12 gap-2">

            <div class="col-span-12 lg:col-span-8 2xl:col-span-9">
              <!-- BEGIN: Display Item -->
              <div class="intro-y box">
                <div class="p-5">
                  <div class="flex flex-col-reverse xl:flex-row flex-col">
                    <div class="flex-1 mt-0">
                      <div class="grid grid-cols-12 gap-x-3 sm:gap-y-2">
                        <div class="col-span-9 mb-5">
                          <label for="pos-form-1" class="form-label">ID Barang/Item</label>
                          <div class="flex w-full">
                            <div
                              class="z-30 rounded-l w-10 flex items-center justify-center bg-gray-100 hover:bg-gray-300 border text-gray-600 dark:bg-dark-1 dark:border-dark-4 -mr-1 cursor-pointer">
                              <CameraIcon class="w-4 h-4" />
                            </div>
                            <TomSelect v-model="select" class="w-full">
                              <option value="1">Leonardo DiCaprio</option>
                              <option value="2">Johnny Deep</option>
                              <option value="3">Robert Downey, Jr</option>
                              <option value="4">Samuel L. Jackson</option>
                              <option value="5">Morgan Freeman</option>
                            </TomSelect>
                          </div>
                          <div class="form-help">
                            * Pilih atau Klik Kamera untuk scan barcode.
                          </div>
                        </div>
                        <div class="col-span-3 mb-5">
                          <label for="pos-form-1" class="form-label">Stok Tersisa</label>
                          <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Stok Tersisa" readonly />
                        </div>

                        <div class="col-span-6 mb-5">
                          <label for="pos-form-1" class="form-label">Nama Barang</label>
                          <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Nama Barang" readonly />
                        </div>
                        <div class="col-span-6 mb-5">
                          <label for="pos-form-1" class="form-label">Nama Varian</label>
                          <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Nama Varian" readonly />
                        </div>

                        <div class="col-span-4 mb-5">
                          <label for="pos-form-1" class="form-label">Harga Item</label>
                          <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Harga Item" readonly />
                        </div>
                        <div class="col-span-4 mb-5">
                          <label for="pos-form-1" class="form-label">Qty</label>
                          <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Qty"
                            required />
                        </div>
                        <div class="col-span-4 mb-5">
                          <label for="pos-form-1" class="form-label">Total Harga</label>
                          <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Total Harga" readonly />
                        </div>
                      </div>
                      <button type="button" class="btn btn-primary w-20 mt-3 sm:mt-5">
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END: Display Item -->
            </div>

            <!-- BEGIN: Display Total Harga -->
            <div class="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
              <div class="intro-y box">

                <div class="box flex p-5">
                  <input type="text" class="form-control py-3 px-4 w-full bg-slate-100 border-slate-200/60 pr-10"
                    placeholder="Use coupon code..." />
                  <button class="btn btn-primary ml-2">Apply</button>
                </div>
                <div class="box p-5 mt-2">
                  <!-- <div class="flex">
                    <div class="mr-auto">Subtotal</div>
                    <div class="font-medium">$250</div>
                  </div>
                  <div class="flex mt-4">
                    <div class="mr-auto">Diskon</div>
                    <div class="font-medium text-danger">-$20</div>
                  </div>
                  <div class="flex mt-4">
                    <div class="mr-auto">Pajak</div>
                    <div class="font-medium">15%</div>
                  </div> -->
                  <div class="flex">
                    <div class="mr-auto font-medium text-base">Total Harga</div>
                  </div>
                  <div class="bg-slate-200 rounded-md p-2">
                    <div class="font-medium text-xl"><p class="text-right text-black">Rp.22.000</p> </div>
                  </div>

                  <div class="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
                    <div class="mr-auto font-medium text-base">Total Bayar</div>
                  </div>
                  <div class="input-group bg-slate-200 rounded-md border-2 border-slate-200/60 mr-0">
                    <!-- <div class="font-medium text-xl"><p class="text-right">$220</p> </div> -->
                    <div class="input-group-text my-auto text-xl"><p class="text-black">Rp.</p></div>
                    <input type="number" class="form-control flex-1 font-medium text-xl text-right"
                      placeholder="Nominal Uang" required />
                  </div>

                  <div class="flex mt-1 pt-4">
                    <div class="mr-auto font-medium text-base">Kembalian</div>
                  </div>
                  <div class="bg-slate-200 rounded-md p-2">
                    <div class="font-medium text-xl"><p class="text-right text-black">Rp.22.0000</p> </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Display Total Harga -->

            <!-- BEGIN: Detail Information -->
            <div class="col-span-12 flex-col-reverse">
              <div class="intro-y box">
                <div class="flex items-center px-5 py-2 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 class="font-medium text-base mr-auto">Detail Penjualan</h2>
                </div>
                <div class="px-5 py-2">
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
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer hover:bg-slate-500">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Angelina</td>
                          <td>Jolie</td>
                          <td>@angelinajolie</td>
                          <td>@angelinajolie</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Brad</td>
                          <td>Pitt</td>
                          <td>@angelinajolie</td>
                          <td>@bradpitt</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Charlie</td>
                          <td>Hunnam</td>
                          <td>@angelinajolie</td>
                          <td>@charliehunnam</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Angelina</td>
                          <td>Jolie</td>
                          <td>@angelinajolie</td>
                          <td>@angelinajolie</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Brad</td>
                          <td>Pitt</td>
                          <td>@angelinajolie</td>
                          <td>@bradpitt</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Charlie</td>
                          <td>Hunnam</td>
                          <td>@angelinajolie</td>
                          <td>@charliehunnam</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Angelina</td>
                          <td>Jolie</td>
                          <td>@angelinajolie</td>
                          <td>@angelinajolie</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Brad</td>
                          <td>Pitt</td>
                          <td>@angelinajolie</td>
                          <td>@bradpitt</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Charlie</td>
                          <td>Hunnam</td>
                          <td>@angelinajolie</td>
                          <td>@charliehunnam</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Angelina</td>
                          <td>Jolie</td>
                          <td>@angelinajolie</td>
                          <td>@angelinajolie</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Brad</td>
                          <td>Pitt</td>
                          <td>@angelinajolie</td>
                          <td>@bradpitt</td>
                        </tr>
                        <tr>
                          <td class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer">
                            <TrashIcon class="text-danger w-4 h-4 p-0" />
                          </td>
                          <td>Charlie</td>
                          <td>Hunnam</td>
                          <td>@angelinajolie</td>
                          <td>@charliehunnam</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <ChevronDownIcon class="animate-bounce col-span-12 mt-1 mb-[-20px] block mx-auto" />
                </div>
              </div>
            </div>
            <!-- END: Detail Information -->
          </div>
        </ModalBody>
        <ModalFooter class="text-right">
          <button type="button" @click="addModal = false" class="btn btn-outline-secondary w-32 mr-1">
            Cancel
          </button>
          <button type="submit" form="addSatuanForm" class="btn btn-primary w-32">
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
            <!-- <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li> -->
            <li class="page-item active">
              <!-- <a class="page-link" href="#">2</a> -->
              <input type="number" class="form-control" id="page_number" value="1" />
            </li>
            <li class="page-item">
              <!-- <a class="page-link" href="#">3</a> -->
              <input type="number" class="form-control" id="total_pages" disabled />
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
    <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
      <PenjualanList :penjualans="Penjualan.items" />
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->

    <!-- END: Pagination -->
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->

  <!-- END: Delete Confirmation Modal -->
</template>

<script>
import { usePenjualanStore } from "../../stores/penjualan";
import PenjualanList from "./PenjualanList.vue";
import { ref } from "vue";

const addModal = ref(false);

// const deleteRecords = async () => {
//     try {

//     } catch (error) { }
export default {
  setup() {
    const Penjualan = usePenjualanStore();
    return { Penjualan };
  },
  components: {
    PenjualanList,
  },
  data() {
    return {
      addModal,
    };
  },
  methods: {},
  mounted() {
    this.Penjualan.readItem();
  },
};
</script>

<style scoped>
table thead th:first-child {
  position: sticky;
  left: 0;
  z-index: 2;
}
</style>
