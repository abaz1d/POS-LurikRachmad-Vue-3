<template>
  <Alert
    v-if="alert"
    class="hover:animate-none md:animate-bounce animate-pulse alert-primary md:mb-2 m-5"
    ><b>
      Klik pada nomor invoice untuk melihat data tabel detail pembelian dan
      mencetak invoice</b
    >
    <XCircleIcon
      @click="alert = false"
      class="block absolute stroke-2 stroke-red-500 bg-white rounded-full h-6 w-6 -right-3 -top-3 cursor-pointer"
  /></Alert>
  <table class="table table-report table-hover mt-2">
    <thead>
      <tr>
        <th class="whitespace-nowrap">
          <input class="form-check-input" type="checkbox" />
        </th>
        <th class="whitespace-nowrap">INVOICE</th>
        <th class="whitespace-nowrap">TANGGAL KELUAR</th>
        <th class="text-center whitespace-nowrap">TOTAL HARGA</th>
        <th class="whitespace-nowrap">TOTAL BAYAR</th>
        <th class="text-right whitespace-nowrap">
          <div class="pr-16">TOTAL KEMBALIAN</div>
        </th>
        <th class="text-center whitespace-nowrap">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <BarangKeluarItem
        v-for="(barangKeluar, index) in barangKeluars"
        :key="barangKeluar.no_invoice"
        :barangKeluar="barangKeluar"
        :no="index + 1"
        @openDeleteModal="openDeleteModal"
        @openInvoice="openInvoice"
      />
    </tbody>
  </table>
  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete <b>{{ no_invoice }} </b> ? <br />This
          process cannot be undone.
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
          @click="deleteBarangKeluar()"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>

  <Modal size="modal-xl" :show="isInvoice" @hidden="isInvoice = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">
        Transaksi No Invoice <b>{{ no_invoice }}</b>
      </h2>

      <div class="sm:w-auto flex mt-4 sm:mt-0 mr-0 ml-2 items-right">
        <Dropdown class="mr-2 rounded border border-slate-500">
          <DropdownToggle class="btn px-2 box">
            <span class="w-5 h-5 flex items-center justify-center">
              <ShareIcon class="w-4 h-4" />
            </span>
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownContent class="flex items-center justify-center">
                <FileIcon class="w-4 h-4 mr-2" /> Export Word
              </DropdownContent>
              <DropdownContent class="flex items-center justify-center">
                <FileIcon class="w-4 h-4 mr-2" /> Export PDF
              </DropdownContent>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        <button class="btn btn-primary shadow-md mr-2">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
      </div>

      <!-- <button type="button" @click="isInvoice = false"
				class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
				<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"></path>
				</svg>
				<span class="sr-only">Close modal</span>
			</button> -->
    </ModalHeader>
    <ModalBody>
      <div class="intro-y box overflow-hidden mt-2">
        <div
          class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
        >
          <div class="font-semibold text-primary text-3xl">
            INVOICE <br />
            <div class="text-xl dark:text-secondary text-dark font-medium">
              {{ no_invoice }}
            </div>
          </div>
          <div class="mt-20 lg:mt-0 lg:ml-auto lg:text-right">
            <div class="text-xl text-primary font-medium">Left4code</div>
            <div class="mt-1">left4code@gmail.com</div>
            <div class="mt-1">8023 Amerige Street Harriman, NY 10926.</div>
          </div>
        </div>
        <div
          class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left"
        >
          <div>
            <div class="text-base text-slate-500">Client Details</div>
            <div class="text-lg font-medium text-primary mt-2">
              Arnold Schwarzenegger
            </div>
            <div class="mt-1">arnodlschwarzenegger@gmail.com</div>
            <div class="mt-1">260 W. Storm Street New York, NY 10025.</div>
          </div>
          <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-right">
            <div class="text-base text-slate-500">Receipt</div>
            <div class="text-lg text-primary font-medium mt-2">#1923195</div>
            <div class="mt-1">Jan 02, 2021</div>
          </div>
        </div>
        <div class="px-5 sm:px-16 py-10 sm:py-20">
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th
                    class="border-b-2 dark:border-darkmode-400 whitespace-nowrap"
                  >
                    DESCRIPTION
                  </th>
                  <th
                    class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
                  >
                    QTY
                  </th>
                  <th
                    class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
                  >
                    PRICE
                  </th>
                  <th
                    class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap"
                  >
                    SUBTOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border-b dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                      Midone HTML Admin Template
                    </div>
                    <div
                      class="text-slate-500 text-sm mt-0.5 whitespace-nowrap"
                    >
                      Regular License
                    </div>
                  </td>
                  <td class="text-right border-b dark:border-darkmode-400 w-32">
                    2
                  </td>
                  <td class="text-right border-b dark:border-darkmode-400 w-32">
                    $25
                  </td>
                  <td
                    class="text-right border-b dark:border-darkmode-400 w-32 font-medium"
                  >
                    $50
                  </td>
                </tr>
                <tr>
                  <td class="border-b dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                      Vuejs Admin Template
                    </div>
                    <div
                      class="text-slate-500 text-sm mt-0.5 whitespace-nowrap"
                    >
                      Regular License
                    </div>
                  </td>
                  <td class="text-right border-b dark:border-darkmode-400 w-32">
                    1
                  </td>
                  <td class="text-right border-b dark:border-darkmode-400 w-32">
                    $25
                  </td>
                  <td
                    class="text-right border-b dark:border-darkmode-400 w-32 font-medium"
                  >
                    $25
                  </td>
                </tr>
                <tr>
                  <td class="border-b dark:border-darkmode-400">
                    <div class="font-medium whitespace-nowrap">
                      React Admin Template
                    </div>
                    <div
                      class="text-slate-500 text-sm mt-0.5 whitespace-nowrap"
                    >
                      Regular License
                    </div>
                  </td>
                  <td class="text-right border-b dark:border-darkmode-400 w-32">
                    1
                  </td>
                  <td class="text-right border-b dark:border-darkmode-400 w-32">
                    $25
                  </td>
                  <td
                    class="text-right border-b dark:border-darkmode-400 w-32 font-medium"
                  >
                    $25
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="font-medium whitespace-nowrap">
                      Laravel Admin Template
                    </div>
                    <div
                      class="text-slate-500 text-sm mt-0.5 whitespace-nowrap"
                    >
                      Regular License
                    </div>
                  </td>
                  <td class="text-right w-32">3</td>
                  <td class="text-right w-32">$25</td>
                  <td class="text-right w-32 font-medium">$75</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row"
        >
          <div class="text-center sm:text-left mt-10 sm:mt-0">
            <div class="text-base text-slate-500">Bank Transfer</div>
            <div class="text-lg text-primary font-medium mt-2">Elon Musk</div>
            <div class="mt-1">Bank Account : 098347234832</div>
            <div class="mt-1">Code : LFT133243</div>
          </div>
          <div class="text-center sm:text-right sm:ml-auto">
            <div class="text-base text-slate-500">Total Amount</div>
            <div class="text-xl text-primary font-medium mt-2">$20.600.00</div>
            <div class="mt-1">Taxes included</div>
          </div>
        </div>
      </div>
    </ModalBody>
    <!-- <ModalFooter class="text-right">
			<button type="button" @click="isInvoice = false" class="btn btn-outline-secondary w-32 mr-1">
				Cancel
			</button>
			<button @click="isInvoice = false /*,updateVarian($event)*/" class="btn btn-primary w-32">Simpan</button>
		</ModalFooter> -->
  </Modal>
</template>

<script>
import { useBarangKeluarStore } from "../../stores/barang-keluar";
import BarangKeluarItem from "./BarangKeluarItem.vue";

export default {
  setup() {
    const BarangKeluar = useBarangKeluarStore();
    return {
      BarangKeluar,
    };
  },
  props: {
    barangKeluars: {
      type: Object,
      required: true,
    },
  },
  components: {
    BarangKeluarItem,
  },
  data() {
    return {
      alert: true,
      deleteConfirmationModal: false,
      isInvoice: false,
      no_invoice: "",
    };
  },
  methods: {
    openInvoice(no_invoice) {
      this.no_invoice = no_invoice;
      this.isInvoice = true;
    },
    openDeleteModal(no_invoice) {
      this.no_invoice = no_invoice;
      this.deleteConfirmationModal = true;
    },
    deleteBarangKeluar() {},
  },
  created() {
    setTimeout(() => (this.alert = false), 10000);
  },
  unmounted() {
    setTimeout(() => (this.alert = false), 10000);
  },
};
</script>
