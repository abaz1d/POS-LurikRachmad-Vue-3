<template>
  <Alert v-if="alert" class="hover:animate-none md:animate-bounce animate-pulse alert-primary md:mb-2 m-5"><b>
      Klik pada nomor invoice untuk melihat data tabel detail pembelian dan
      mencetak invoice</b>
    <XCircleIcon @click="alert = false"
      class="block absolute stroke-2 stroke-red-500 bg-white rounded-full h-6 w-6 -right-3 -top-3 cursor-pointer" />
  </Alert>

  <div class="block overflow-y-hidden overflow-x-auto mt-2 pt-4 md:min-w-min min-w-max">
    <div class="bg-white dark:bg-slate-200 pt-3 rounded-t-lg dark:text-slate-800">
      <div class="grid grid-cols-6 mb-3 h-15">

        <div class="col text-center"><b>INVOICE</b></div>
        <div class="col text-center"><b>TANGGAL PEJUALAN</b></div>
        <div class="col text-center"><b>TOTAL HARGA</b></div>
        <div class="col text-center"><b>TOTAL BAYAR</b></div>
        <div class="col text-center"><b>TOTAL KEMBALIAN</b></div>
        <div class="col text-center"><b>ACTIONS</b></div>
      </div>
      <hr />
    </div>
    <div class="mt-6">
      <AccordionGroupTable>
        <PenjualanItem v-for="(penjualan, index) in penjualans" :key="penjualan.no_invoice"
          :id_awal="penjualans[0].no_invoice" :penjualan="penjualan" :no="index + 1"
          @openDeleteModal="openDeleteModal" @openInvoice="openInvoice" />
      </AccordionGroupTable>
    </div>
  </div>

  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
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
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24" @click="deletePenjualan(no_invoice)">
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

      <div class="sm:w-auto flex mt-4 sm:mt-0 mr-0 ml-4 items-right">
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
    </ModalHeader>
    <ModalBody>
      <PrintInvoice :prints="Penjualan.prints" :no_invoice="no_invoice" :total_harga_jual="total_harga_jual"
        :total_bayar_jual="total_bayar_jual" :kembalian_jual="kembalian_jual" />
    </ModalBody>
  </Modal>
</template>

<script>
import { usePenjualanStore } from "../../stores/penjualan";
import PenjualanItem from "./PenjualanItem.vue";
import PrintInvoice from "./PrintInvoice.vue";
import { currencyFormatter } from "../../utils/helper";

export default {
  setup() {
    const Penjualan = usePenjualanStore();
    const currencyFormat = currencyFormatter;

    return {
      Penjualan,
      currencyFormat
    };
  },
  props: {
    penjualans: {
      type: Object,
      required: true,
    },
  },
  components: {
    PenjualanItem,
    PrintInvoice
  },
  data() {
    return {
      alert: true,
      deleteConfirmationModal: false,
      isInvoice: false,
      no_invoice: "",
      total_harga_jual: "",
      total_bayar_jual: "",
      kembalian_jual: ""

    };
  },
  methods: {
    openInvoice(no_invoice, total_harga_jual, total_bayar_jual, kembalian_jual) {
      this.no_invoice = no_invoice;
      this.total_harga_jual = total_harga_jual
      this.total_bayar_jual = total_bayar_jual;
      this.kembalian_jual = kembalian_jual
      this.isInvoice = true;
    },
    openDeleteModal(no_invoice) {
      this.no_invoice = no_invoice;
      this.deleteConfirmationModal = true;
    },
    deletePenjualan(no_invoice) {
      this.Penjualan.removePenjualan(no_invoice)
        this.deleteConfirmationModal = false;
     },
  },
  created() {
    setTimeout(() => (this.alert = false), 10000);
  },
  unmounted() {
    setTimeout(() => (this.alert = false), 10000);
  },
};
</script>
