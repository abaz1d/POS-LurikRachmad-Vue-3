<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Laporan Pembelian</h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mb-3 mr-2 pr-5">
        <PrinterIcon class="w-4 h-4 mr-2" />
        Cetak <p class="hidden xl:block ml-1">Pembelian</p>
      </button>

      <a href="" class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary">
        <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
        <p class="sm:block hidden">Reload Data</p>
      </a>
    </div> -->
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
        <button v-if="isLoading" id="tabulator-print" class="btn btn-primary w-1/2 sm:w-auto mr-2" disabled>
          <Loader-2Icon class="w-4 h-4 mr-2 animate-spin" />
          <p class="hidden xl:block ml-1">Loading ...</p>
        </button>
        <button v-else id="tabulator-print" class="btn btn-primary w-1/2 sm:w-auto mr-2" @click="isLoading = true">
          <PrinterIcon class="w-4 h-4 mr-2" /> Cetak <p class="hidden xl:block ml-1">Pembelian</p>
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
        <a href="" class="ml-auto sm:ml-2 btn px-2 h-10 box flex items-center text-primary">
          <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
          <p class="sm:block hidden">Reload Data</p>
        </a>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableBeliRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

</template>

<script setup>
import { usePembelianStore } from "@/stores/pembelian";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { currencyFormatter } from "@/utils/helper";
import moment from "moment";

const Pembelian = usePembelianStore();

const isLoading = ref(false);
const tableBeliRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});

watch(isLoading, async (newValue, oldValue) => {
  try {
    if (newValue === true) {
      setTimeout(() => (onPrint()), 50);
    }
  } catch (error) {
    alert("Gagal wtch print" + error)
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
  tabulator.value = new Tabulator(tableBeliRef.value, {
    data: Pembelian.laporans,
    dataLoaderLoading: dataLoaderLoading,
    groupToggleElement: "header",
    groupHeader: function (value, count, data, group) {
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
                  <i data-lucide="calendar-days" class="sm:hidden w-4 h-4 mr-2">:</i> ${moment(data[0].tanggal_pembelian).format("DD MMM YYYY HH:SS")}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="tags" class="sm:hidden w-4 h-4 mr-2">:</i> ${currencyFormatter.format(data[0].total_harga_beli)}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="wallet" class="sm:hidden w-4 h-4 mr-2">:</i> ${currencyFormatter.format(data[0].total_bayar_beli)}
                </div>
              </div>
              <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96 flex items-center"> 
                <div class="flex items-center mr-3">
                  <i data-lucide="coins" class="sm:hidden w-4 h-4 mr-2">:</i> ${currencyFormatter.format(data[0].kembalian_beli)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>`
    },
    groupHeaderPrint: function (value, count, data, group) {
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
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${moment(data[0].tanggal_pembelian).format("DD MMM YYYY HH:SS")}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(data[0].total_harga_beli)}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(data[0].total_bayar_beli)}</div>
              <div class="table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(data[0].kembalian_beli)}</div>
            </div>
          </div>
        </div>
      </span>`
    },
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Pembelian<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(Date.now()).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    groupBy: "no_invoice",
    //height: "50vh",
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      //resizable: true,
      tooltip: function (e, cell, onRendered) {
        //e - mouseover event
        //cell - cell component
        //onRendered - onRendered callback registration function

        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";

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

      // For HTML table
      // {
      //   title: "NO INVOICE",
      //   minWidth: 200,
      //   responsive: 0,
      //   field: "no_invoice",
      //   vertAlign: "middle",
      //   print: false,
      //   download: false,
      //   formatter(cell) {
      //     return `<div>
      //           <div class="font-medium whitespace-nowrap">${cell.getData().no_invoice
      //       }</div>
      //         </div>`;
      //   },
      // },
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
        hozAlign: "center",
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
        hozAlign: "center",
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
    //subTable.redraw();
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
const onPrint = async () => {
  await tabulator.value.getGroups().map((g) => {
    //console.log("g", g.show())
    if (g.show != true) {
      g.show()
      
    }
  });
  //console.log("grup", tabulator.value.getGroups().show())
  // tabulator.value.print();
  isLoading.value = false;
};

onMounted(async function () {
  try {
    const data = await Pembelian.readLaporan()
    initTabulator();
    reInitOnResizeWindow();
  } catch (error) {
    alert("onMounted" + error)
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
