<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-5">
    <h2 class="text-lg font-medium mr-auto">Laporan Stok</h2>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select id="tabulator-html-filter-field" v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="id_varian">ID Varian</option>
            <option value="nama_varian">Nama Varian</option>
            <option value="id_barang">ID Barang</option>
            <option value="nama_barang">Nama Barang</option>
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
          <PrinterIcon class="w-4 h-4 mr-2" /> Cetak <p class="hidden xl:block ml-1">Penjualan</p>
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
              <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export HTML
              </DropdownItem>
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
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <ModalDatabaseError ref="modalErrorRef" />

</template>

<script setup>
import { useBarangStore } from "@/stores/barang";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { currencyFormatter } from "@/utils/helper";
import dom from "@left4code/tw-starter/dist/js/dom";
import moment from "moment";
import JsBarcode from "jsbarcode"
import html2canvas from 'html2canvas';

const Barang = useBarangStore();

const isLoading = ref(false);
const tableRef = ref();
const tabulator = ref();
const modalErrorRef = ref();
const filter = reactive({
  field: "id_varian",
  type: "like",
  value: "",
});

const publicPath = import.meta.env.VITE_APP_BASE_API;

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



watch(filter, async (newValue, oldValue) => {
  try {
    //console.log("filter: ", newValue)
    onFilter()
  } catch (error) {
    alert("Gagal wtch filter" + error)
  }
})

watch(isLoading, async (newValue, oldValue) => {
  try {
    if (newValue === true) {
      setTimeout(() => (onPrint()), 100);
    }
  } catch (error) {
    alert("Gagal wtch print" + error)
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
    data: Barang.laporans,
    dataLoaderLoading: dataLoaderLoading,
    rowHeight: 150,
    groupToggleElement: "header",
    groupBy: "nama_barang", 
    printFormatter: function (tableHolderElement, tableElement) {
      JsBarcode(".barcode").init();
    },
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Barang<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(Date.now()).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      resizable: true,
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

      // For HTML table
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },
      {
        width: 40,
        print: false,
        tooltip: false,
        download: false,
        hozAlign: "center",
        vertAlign: "middle",
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center ml-6">
                <a class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="printer" class="w-4 h-4 mr-1"></i> 
                </a>
              </div>`);
          dom(a).on("click", function (e) {

          });

          return a[0];
        }, cellClick: function (e, cell) {
          //const id = `#${cell.getData().id_varian}`;
          const id = document.getElementById(`${cell.getData().id_varian}`);
          //console.log("w", window)
          var scale
          if (window.innerWidth - 100 > 640) {
            scale = 3
          } else {
            scale = 9
          }
          html2canvas(id, {
            scale: scale,
            useCORS: true,
          }).then((canvas) => {
            var barcodeImgTag = document.createElement("a");
            document.body.appendChild(barcodeImgTag);
            barcodeImgTag.download = `Barcode-${cell.getData().id_varian}.jpg`;
            barcodeImgTag.href = canvas.toDataURL();
            barcodeImgTag.target = "_blank";
            barcodeImgTag.click();
          });
        }
      },
      {
        title: "GAMBAR & ID",
        minWidth: 100,
        field: "id_varian",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `
        <div class=" text-center p-auto mt-2">
          <div class="mb-2">
            <img
            src="${getImgUrl(cell.getData().gambar_varian)}"
            alt="${cell.getData().gambar_varian}"
            data-action="zoom"
            class="w-20 rounded-md"
            />
          </div>
          <div>
            ${cell.getData().id_varian}
          </div>
        </div>`;
        },
      },
      {
        title: "BARCODE",
        minWidth: 100,
        field: "id_varian",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `
          <div>
              <img class="barcode" 
              data-action="zoom" 
              id='${cell.getData().id_varian}'
              jsbarcode-value='${cell.getData().id_varian}'
              jsbarcode-textmargin="0"
              jsbarcode-fontoptions="bold" />
          </div>`;
        },
      },
      {
        title: "NAMA BARANG",
        minWidth: 100,
        field: "nama_barang",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
      <div class="font-medium whitespace-nowrap">${cell.getData().nama_barang
            }</div>
    </div>`;
        },
      },
      {
        title: "NAMA VARIAN",
        minWidth: 150,
        field: "nama_varian",
        hozAlign: "center",
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
        title: "STOK GLOBAL",
        minWidth: 50,
        field: "stok_global",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
      <div class="font-medium whitespace-nowrap">${cell.getData().stok_global
            }</div>
    </div>`;
        },
      },
      {
        title: "SATUAN",
        minWidth: 50,
        headerHozAlign: "center",
        field: "nama_satuan",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
      <div class="font-medium whitespace-nowrap">${cell.getData().nama_satuan
            }</div>
    </div>`;
        },
      },
      {
        title: "HARGA BELI",
        headerHozAlign: "center",
        minWidth: 150,
        field: "harga_beli_varian",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
      <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().harga_beli_varian)
            }</div>
    </div>`;
        },
      },
      {
        title: "HARGA JUAL",
        minWidth: 150,
        headerHozAlign: "center",
        field: "harga_jual_varian",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
      <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().harga_jual_varian)
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
        formatterPrint(cell) {
          return `
          <div>
            <img class="barcode" 
              data-action="zoom"
              jsbarcode-value='${cell.getData().id_varian}'
              jsbarcode-textmargin="0"
              jsbarcode-fontoptions="bold" />
          </div>`;
        },
      },
      {
        title: "NAMA BARANG",
        field: "nama_barang",
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
        title: "STOK",
        field: "stok_varian",
        visible: false,
        print: true,
        download: true,
      }, {
        title: "SATUAN",
        field: "id_satuan",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "HARGA BELI",
        field: "harga_beli_varian",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "HARGA JUAL",
        field: "harga_jual_varian",
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
    JsBarcode(".barcode").init();
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
    JsBarcode(".barcode").init();
  });
};

const getImgUrl = (gambar_varian) => {
  // console.log('gambar_varian',gambar_varian.data)
  var images = gambar_varian.data
    .map((b) => String.fromCharCode(b))
    .join("");


  return new URL(`${publicPath}gambar/${images}`).href;
}

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "id_varian";
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
  JsBarcode(".barcode").init();
  await tabulator.value.getGroups().map((g) => {
    if (g.show != true) {
      g.show()

    }
  });
  //console.log("grup", tabulator.value.getGroups().show())
  tabulator.value.print();
  isLoading.value = false;
};

onMounted(async function () {
  try {
    Barang.readLaporan().then(() => {
      initTabulator();
      reInitOnResizeWindow();
    }).catch((e) => {
      modalErrorRef.value.errorDatabaseModal = true;
    });
  } catch (error) {
    //alert("onMounted" + error)
    modalErrorRef.value.errorDatabaseModal = true;
  }
});

</script>
<style scoped>

</style>

