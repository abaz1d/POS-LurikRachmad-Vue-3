<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Tabulator</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mr-2">Add New Product</button>
      <Dropdown class="ml-auto sm:ml-0">
        <DropdownToggle class="btn px-2 box">
          <span class="w-5 h-5 flex items-center justify-center">
            <PlusIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <FilePlusIcon class="w-4 h-4 mr-2" /> New Category
            </DropdownItem>
            <DropdownItem>
              <UserPlusIcon class="w-4 h-4 mr-2" /> New Group
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </div>
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
            <option value="tanggal_penjualan">Tanggal Penjualan</option>
            <option value="remaining_stock">Remaining Stock</option>
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
          <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16" @click="onFilter">
            Go
          </button>
          <button id="tabulator-html-filter-reset" type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1" @click="onResetFilter">
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> Export
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export CSV
              </DropdownItem>
              <DropdownItem @click="onExportJson">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export JSON
              </DropdownItem>
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
              <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export HTML
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup>
import $ from "jquery";
import { usePenjualanStore } from "../../stores/penjualan";
import { ref, reactive, onMounted, } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dom from "@left4code/tw-starter/dist/js/dom";

const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});
var subTable
var data2 = [];

const Penjualan = usePenjualanStore();

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    // ajaxURL: "https://dummy-data.left4code.com",
    // ajaxFiltering: true,
    // ajaxSorting: true,
    printAsHtml: true,
    printStyled: true,
    data: Penjualan.penjualans,
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    columns: [
      {
        title: "Hide Sub", headerSort: false, cellClick: function (e, row, formatterParams) {
          const id = row.getData().id;
          $(".subTable" + id + "").toggle();
        }
      },
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "INVOICE",
        minWidth: 200,
        responsive: 0,
        field: "no_invoice",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().no_invoice
            }</div>
              </div>`;
        },
      },
      {
        title: "TANGGAL PEJUALAN",
        headerHozAlign: "center",
        minWidth: 200,
        field: "tanggal_penjualan",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().tanggal_penjualan
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL HARGA",
        minWidth: 200,
        headerHozAlign: "center",
        field: "total_harga_jual",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().total_harga_jual
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BAYAR",
        minWidth: 200,
        headerHozAlign: "center",
        field: "total_bayar_jual",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().total_bayar_jual
            }</div>
              </div>`;
        },
      },
      {
        title: "KEMBALIAN",
        headerHozAlign: "center",
        minWidth: 200,
        field: "kembalian_jual",
        hozAlign: "right",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "ACTIONS",
        headerHozAlign: "center",
        minWidth: 200,
        field: "actions",
        responsive: 1,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
                <a onclick="console.log('edit')" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a onclick="console.log('hapus')" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
          dom(a).on("click", function () {
            // On click actions
            //console.log("click", cell.getData().no_invoice)
          });

          return a[0];
        },
      },

      // For print format
      {
        title: "INVOICE",
        field: "no_invoice",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TANGGAL PENJUALAN",
        field: "tanggal_penjualan",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TOTAL HARGA",
        field: "total_harga_jual",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TOTAL BAYAR",
        field: "total_bayar_jual",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "KEMBALIAN",
        field: "kembalian_jual",
        visible: false,
        print: true,
        download: true,
      },
    ],
    rowFormatter: function (row, e) {
      //create and style holder elements
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");
      holderEl.style.display = "none"

      const id = row.getData().no_invoice;

      holderEl.style.boxSizing = "border-box";
      holderEl.style.padding = "10px 10px 10px 10px";
      holderEl.style.borderTop = "1px solid #333";
      holderEl.style.borderBotom = "1px solid #333";
      holderEl.style.background = "#ddd";
      holderEl.setAttribute('class', "subTable" + id + "");


      tableEl.style.border = "1px solid #333";
      tableEl.style.display = "none"
      tableEl.setAttribute('class', "subTable" + id + "");

      holderEl.appendChild(tableEl);

      row.getElement().appendChild(holderEl);

      subTable = new Tabulator(tableEl, {
        layout: "fitColumns",
        data: data2,
        columns: [
          {
            title: "ID",
            headerHozAlign: "center",
            minWidth: 200,
            field: "id_varian",
            hozAlign: "right",
            vertAlign: "middle",
            print: false,
            download: false,
          },
          {
            title: "Nama",
            field: "nama_varian"
          },
          {
            title: "Qty",
            field: "qty"
          },
        ]
      })
    },
  });
  tabulator.value.on("renderComplete", function () {
    //subTable.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",

    });
  });
  tabulator.value.on("rowClick", async function (e, row) {
    //e - the tap event object
    //row - row component
    const id = row.getData().no_invoice;
    try {
      
      await Penjualan.readDetail(id).then(
        (data) => {
          subTable.replaceData(data)
          tabulator.value.redraw();
          data2 = data
          console.log("row1", subTable.getData());
         
        }).catch((e) => console.error(e));
    } catch (error) {
      alert(error);
    }
    $(".subTable" + id + "").toggle();
    console.log("row2", tabulator.value);
  });
};



// tabulator.value = new Tabulator(tableRef.value, {
//   data: Penjualan.penjualans, //link data to table
//   reactiveData: true, //enable data reactivity
//   columns: [], //define table columns
// });

// Redraw table onresize
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
const onPrint = () => {
  tabulator.value.print();
};

// onMounted(() => {
//   initTabulator();
//   reInitOnResizeWindow();
// });

onMounted(() => {
  Penjualan.readItem().then(() => {
    initTabulator();
    reInitOnResizeWindow();
  }).catch((error) => {
  });
});
</script>
<style scoped>

</style>
