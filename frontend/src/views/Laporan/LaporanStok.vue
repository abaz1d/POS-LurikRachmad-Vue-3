<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-5">
    <h2 class="text-lg font-medium mr-auto">Laporan Stok</h2>
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
            <option value="id_varian">ID Varian</option>
            <option value="nama_varian">Nama Varian</option>
            <option value="id_barang">ID Barang</option>
            <option value="nama_barang">Nama Barang</option>
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
          <p class="hidden xl:block ml-1">Penjualan</p>
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
        ref="tableRef"
        class="mt-5 table-report table-report--tabulator"
      ></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import { useBarangStore } from "@/stores/barang";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { ref, reactive, onMounted, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { currencyFormatter } from "@/utils/helper";
import dom from "@left4code/tw-starter/dist/js/dom";
import moment from "moment";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
const Barang = useBarangStore();
const isPrint = ref(false);
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

watch(filter, async () => {
  try {
    onFilter();
  } catch (error) {
    alert("Gagal wtch filter" + error);
  }
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

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: Barang.laporans,
    rowHeight: 150,
    height: "100%",
    groupBy: "nama_barang",
    printFormatter: function () {
      JsBarcode(".barcode").init();
    },
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Barang<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
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
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue();
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
        formatter() {
          const a = dom(`<div class="flex lg:justify-center items-center ml-6">
                <a class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="printer" class="w-4 h-4 mr-1"></i> 
                </a>
              </div>`);
          return a[0];
        },
        cellClick: function (e, cell) {
          isLoading.value = true;
          const id = document.getElementById(`${cell.getData().id_varian}`);
          var scale;
          if (window.innerWidth - 100 > 640) {
            scale = 3;
          } else {
            scale = 9;
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
            isLoading.value = false;
          });
        },
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
            <img width="100" height="100" decoding="async" loading="lazy"
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
              <img class="barcode"  width="100" height="100" decoding="async" loading="lazy"
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
      <div class="font-medium whitespace-nowrap">${
        cell.getData().nama_barang
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
      <div class="font-medium whitespace-nowrap">${
        cell.getData().nama_varian
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
      <div class="font-medium whitespace-nowrap">${
        cell.getData().stok_global
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
      <div class="font-medium whitespace-nowrap">${
        cell.getData().nama_satuan
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
      <div class="font-medium whitespace-nowrap">${currencyFormatter.format(
        cell.getData().harga_beli_varian
      )}</div>
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
      <div class="font-medium whitespace-nowrap">${currencyFormatter.format(
        cell.getData().harga_jual_varian
      )}</div>
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
            <img class="barcode" width="100" height="100" decoding="async" loading="lazy"
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
      },
      {
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
  var images = gambar_varian.data.map((b) => String.fromCharCode(b)).join("");
  return new URL(`${publicPath}gambar/${images}`).href;
};

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
const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};
// Print
const onPrint = async () => {
  JsBarcode(".barcode").init();
  tabulator.value.print();
  isPrint.value = false;
  isLoading.value = false;
};

onMounted(async function () {
  try {
    isLoading.value = true;
    Barang.readLaporan()
      .then(() => {
        initTabulator();
        reInitOnResizeWindow();
        isLoading.value = false;
      })
      .catch((error) => {
        console.error(error);
        modalErrorRef.value.errorDatabaseModal = true;
        isLoading.value = false;
      });
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = true;
  }
});
</script>
<style scoped></style>
