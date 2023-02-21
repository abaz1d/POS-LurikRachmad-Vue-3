<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Laporan Pembelian</h2>
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
            <option value="tanggal_pembelian">Tanggal Pembelian</option>
            <option value="total_harga_beli">Total Harga Beli</option>
            <option value="total_bayar_beli">Total Bayar Beli</option>
            <option value="kembalian_beli">Kembalian</option>
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
          v-if="isPrint"
          id="tabulator-print"
          class="btn btn-primary w-1/2 sm:w-auto mr-2"
          disabled
        >
          <Loader-2Icon class="w-4 h-4 mr-2 animate-spin" />
          <p class="hidden xl:block ml-1">Loading ...</p>
        </button>
        <button
          v-else
          id="tabulator-print"
          class="btn btn-primary w-1/2 sm:w-auto mr-2"
          @click="isPrint = true"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Cetak
          <p class="hidden xl:block ml-1">Pembelian</p>
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
        <a
          href=""
          class="ml-auto sm:ml-2 btn px-2 h-10 box flex items-center text-primary"
        >
          <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
          <p class="sm:block hidden">Reload Data</p>
        </a>
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
        ref="tableBeliRef"
        class="mt-5 table-report table-report--tabulator"
      ></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import { usePembelianStore } from "@/stores/pembelian";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { ref, reactive, onMounted, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { currencyFormatter } from "@/utils/helper";
import moment from "moment";
const Pembelian = usePembelianStore();
const modalErrorRef = ref();
const isLoading = ref(false);
const isPrint = ref(false);
const tableBeliRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});

watch(isPrint, async (newValue) => {
  try {
    if (newValue === true) {
      isLoading.value = true;
      setTimeout(() => onPrint(), 50);
    }
  } catch (error) {
    alert("Gagal wtch print" + error);
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
  tabulator.value = new Tabulator(tableBeliRef.value, {
    data: Pembelian.laporans,
    height: "100%",
    groupHeader: function (value, count, data) {
      return `
      <span class='text-center w-screen overflow-hidden whitespace-nowrap mt-2'>
        <div class="table w-full">
          <div class="hidden sm:table-header-group table-header-group">
            <div class="table-row">
              <div class="table-cell text-left">No Invoice</div>
              <div class="table-cell text-left">Tanggal Pembelian</div>
              <div class="table-cell text-left">Total Harga</div>
              <div class="table-cell text-left">Total Bayar</div>
              <div class="table-cell text-left">Kembalian</div>
            </div>
          </div>
          <div class="table-row-group">
            <div class="table-row overflow-hidden">
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="ticket" class="sm:hidden w-4 h-4 mr-2">:</i> ${value}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="calendar-days" class="sm:hidden w-4 h-4 mr-2">:</i> ${moment(
                    data[0].tanggal_pembelian
                  ).format("DD MMM YYYY HH:SS")}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="tags" class="sm:hidden w-4 h-4 mr-2">:</i> ${currencyFormatter.format(
                    data[0].total_harga_beli
                  )}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="wallet" class="sm:hidden w-4 h-4 mr-2">:</i> ${currencyFormatter.format(
                    data[0].total_bayar_beli
                  )}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="coins" class="sm:hidden w-4 h-4 mr-2">:</i> ${currencyFormatter.format(
                    data[0].kembalian_beli
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>`;
    },
    groupHeaderPrint: function (value, data) {
      return `
      <span class='text-center w-screen overflow-hidden whitespace-nowrap'>
        <div class="table w-full">
          <div class="table-header-group">
            <div class="table-row">
              <div class="table-cell text-left">No Invoice</div>
              <div class="table-cell text-left">Tanggal Pembelian</div>
              <div class="table-cell text-left">Total Harga</div>
              <div class="table-cell text-left">Total Bayar</div>
              <div class="table-cell text-left">Kembalian</div>
            </div>
          </div>
          <div class="table-row-group">
            <div class="table-row overflow-hidden">
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${value}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${moment(
                data[0].tanggal_pembelian
              ).format("DD MMM YYYY HH:SS")}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(
                data[0].total_harga_beli
              )}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(
                data[0].total_bayar_beli
              )}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(
                data[0].kembalian_beli
              )}</div>
            </div>
          </div>
        </div>
      </span>`;
    },
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Pembelian<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    groupBy: "no_invoice",
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
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
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_varian
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
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(
                  cell.getData().harga_detail_beli
                )}</div>
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
        title: "TOTAL HARGA",
        minWidth: 200,
        headerHozAlign: "center",
        field: "total_harga_detail_beli",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${currencyFormatter.format(
                  cell.getData().total_harga_detail_beli
                )}</div>
              </div>`;
        },
      },

      // For print format
      {
        title: "NAMA VARIAN",
        field: "nama_varian",
        minWidth: 1200,
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
  });
  tabulator.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

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
const onPrint = async () => {
  isLoading.value = false;
  tabulator.value.print();
  isPrint.value = false;
};

onMounted(async function () {
  try {
    isLoading.value = true;
    await Pembelian.readLaporan();
    initTabulator();
    reInitOnResizeWindow();
    modalErrorRef.value.errorDatabaseModal = false;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = true;
  }
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
