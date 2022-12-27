<template>
  <AccordionItemTable @click="varianShow(barang.id_barang)" class="mt-2 mb-2 min-w-max">
    <AccordionTable
      class="border border-b-0 border-gray-200 rounded-t-xl focus:border-4 focus:border-blue-200 dark:focus:border-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 group/item hover:stroke-sky-500 grid grid-cols-7 gap-4 pr-5 md:pr-1 min-w-max">
      <div class="col min-w-min">
        <input class="form-check-input" type="checkbox" />
      </div>

      <div class="col min-w-max items-center">
        <a href="javascript:void(0)"
          class="underline decoration-dotted">{{ barangKeluar.no_invoice }}</a>

      </div>

      <div class="col min-w-max">
        <a href="" class="font-medium">{{
            dateFormat(barangKeluar.tanggal_penjualan).format("DD MMM YYYY HH:SS")
        }}</a>
      </div>
      <div class="col min-w-max text-center">
        <a href="" class="font-medium">{{
            currencyFormat.format(barangKeluar.total_harga_jual)
        }}</a>
      </div>
      <div class="col min-w-max">
        <a href="" class="font-medium">{{
            currencyFormat.format(barangKeluar.total_bayar_jual)
        }}</a>
      </div>
      <div class="col min-w-max text-right">
        <div class="pr-16">
          {{ currencyFormat.format(barangKeluar.kembalian_jual) }}
        </div>
      </div>

      <div class="col min-w-max" v-if="isEdit">
        <div class="flex justify-center items-center">
          <button class="flex items-center mr-3 text-primary" type="button" @click="">
            <SaveIcon class="w-4 h-4 mr-1" /> Save
          </button>
          <button class="flex items-center text-danger" type="button" @click="isEdit = false">
            <XIcon class="w-4 h-4 mr-1" /> Batal
          </button>
        </div>
      </div>
      <div class="col w-56" v-else>
        <div class="flex justify-center items-center">
          <button class="flex items-center mr-3" type="button" @click="isEdit = true">
            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
          </button>
          <button class="flex items-center text-danger" type="button"
            @click="$emit('openDeleteModal', barangKeluar.no_invoice)">
            <Trash2Icon class="w-4 h-4 mr-1" /> Delete
          </button>
        </div>
      </div>

      <ChevronDownIcon class="animate-bounce col-span-7 block mt-2 mx-auto"
        style="margin-top: -15px; margin-bottom: -20px" />
    </AccordionTable>

    <AccordionPanelTable
      class="col-span-3 text-slate-600 dark:text-slate-500 leading-relaxed border-r-4 border-b-4 border-l-4 border-b-0 border-blue-200 dark:border-blue-800 rounded-b-lg pb-2 mb-2 min-w-max">
      <div class="mr-2 ml-2 overflow-auto">
        <h2 class="md:text-left text-center m-2" @click="$emit('openInvoice', barangKeluar.no_invoice)">
          Tabel Detail
          <a href="javascript:void(0)" class="text-danger">{{
              barangKeluar.no_invoice
          }}</a>
          <PrinterIcon class="w-4 h-4 ml-2 inline-block cursor-pointer" />
        </h2>
        <!-- <VarianList :varians="Barang.varians" :nama_barang="barang.nama_barang" @cekVarian="cekVarian" ref="VarList" /> -->
        <TabelDetailList />
      </div>
      <!-- </tr> -->
    </AccordionPanelTable>

  </AccordionItemTable>

</template>

<script>
import { useBarangKeluarStore } from "../../stores/barang-keluar";
import { currencyFormatter } from "../../utils/helper";
import moment from "moment";
import TabelDetailList from "./TabelDetailList.vue";

export default {
  setup() {
    const barangKeluar = useBarangKeluarStore();
    const currencyFormat = currencyFormatter;
    const dateFormat = moment;
    return {
      barangKeluar,
      currencyFormat,
      dateFormat,
    };
  },
  components: {
    TabelDetailList,
  },
  emits: ["openDeleteModal", "openInvoice"],
  props: {
    barangKeluar: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    deleteBarangKeluar() { },
    updateBarangKeluar() { },
  },
  components: { TabelDetailList },
};
</script>
<style scoped>

</style>
