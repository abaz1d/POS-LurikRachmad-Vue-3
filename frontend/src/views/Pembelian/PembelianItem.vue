<template>
  <AccordionItemTable @click="detailShow(pembelian.no_invoice)" class="mt-2 mb-2 min-w-max">
    <AccordionTable
      class="border border-b-0 border-gray-200 rounded-t-xl focus:border-4 focus:border-blue-200 dark:focus:border-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 group/item hover:stroke-sky-500 grid grid-cols-6 gap-2 md:pr-1 min-w-max">

      <div class="col min-w-max text-center mb-2">
        <a href="javascript:void(0)"
          class="underline decoration-dotted m-2">{{ pembelian.no_invoice }}</a>

      </div>

      <div class="col min-w-max text-center">
        {{
            moment(pembelian.tanggal_pembelian).format("DD MMM YYYY HH:SS")
        }}
      </div>
      <div class="col min-w-max text-center">
        {{
            currencyFormatter.format(pembelian.total_harga_beli)
        }}
      </div>
      <div class="col min-w-max text-center">
        {{
            currencyFormatter.format(pembelian.total_bayar_beli)
        }}
      </div>
      <div class="col min-w-max text-center">
       
          {{ currencyFormatter.format(pembelian.kembalian_beli) }}
     
      </div>
      <div class="col min-w-max text-center">
        <div class="flex justify-center items-center">
          <button class="flex items-center mr-3" type="button" @click="$emit('openEditModal', pembelian)">
            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
          </button>
          <button class="flex items-center text-danger" type="button"
            @click="$emit('openDeleteModal', pembelian.no_invoice)">
            <Trash2Icon class="w-4 h-4 mr-1" /> Delete
          </button>
        </div>
      </div>

      <ChevronDownIcon class="animate-bounce col-span-6 mt-[-8px] mb-[-18px] block mx-auto" />
    </AccordionTable>

    <AccordionPanelTable
      class="col-span-3 text-slate-600 dark:text-slate-500 leading-relaxed border-r-4 border-b-4 border-l-4 border-b-0 border-blue-200 dark:border-blue-800 rounded-b-lg pb-2 mb-2 min-w-max">
      <div class="mr-2 ml-2 overflow-auto">
        <h2 class="md:text-center text-left m-2" @click="$emit('openInvoice', pembelian.no_invoice, pembelian.total_harga_beli, pembelian.total_bayar_beli, pembelian.kembalian_beli)">
          Tabel Detail
          <a href="javascript:void(0)" class="text-danger">{{
              pembelian.no_invoice
          }}</a>
          <PrinterIcon class="w-4 h-4 ml-2 inline-block cursor-pointer" />
        </h2>

        <TabelDetailList 
        :details="Pembelian.details"
        />
      </div>
      <!-- </tr> -->
    </AccordionPanelTable>

  </AccordionItemTable>

</template>

<script>
import { usePembelianStore } from "../../stores/pembelian";
import { currencyFormatter } from "../../utils/helper";
import moment from "moment";
import TabelDetailList from "./TabelDetailList.vue";

export default {
  setup() {
    const Pembelian = usePembelianStore();
    return {
      Pembelian,
      currencyFormatter,
      moment,
    };
  },
  components: {
    TabelDetailList,
  },
  emits: ["openDeleteModal", "openInvoice", "openEditModal"],
  props: {
    pembelian: {
      type: Object,
      required: true,
    },
    id_awal: {
      type: String,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    detailShow(no_invoice) {
      try {
        this.Pembelian.readDetail(no_invoice).then(
          () => (this.isVarian = !this.isVarian)
        ) .catch((e) => console.error(e));
      } catch (error) {
        alert(error);
      }
    }
  },
  components: { TabelDetailList },
  async beforeMount() {
    try {
      await this.Pembelian.readDetail(this.id_awal);
    } catch (error) {
      console.log(error);
    }
  
  },
};
</script>
<style scoped>

</style>
