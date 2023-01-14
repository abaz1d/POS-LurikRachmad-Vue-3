<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-2">
    <h2 class="text-lg font-medium mr-auto">Laporan Penjualan</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mb-3 mr-2 pr-5">
        <PrinterIcon class="w-4 h-4 mr-2" />
        Cetak <p class="hidden xl:block ml-1">Penjualan</p>
      </button>

      <a href="" class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary">
        <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
        <p class="sm:block hidden">Reload Data</p>
      </a>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box px-5 mt-3">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select id="tabulator-html-filter-field" v-model="filter.field"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="no_invoice">No Invoice</option>
            <option value="tanggal_penjualan">Tanggal Penjualan</option>
            <option value="total_harga_jual">Total Harga Jual</option>
            <option value="total_bayar_jual">Total Bayar Jual</option>
            <option value="kembalian_jual">Kembalian</option>
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
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
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
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableJualRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div v-if="modal_utama" class="text-xl mt-5">Apakah Anda yakin akan menghapus <b> {{ itemDel.nama_varian }} </b>
          sebanyak <b> {{
            itemDel.qty
          }}</b> ?</div>

        <div v-else class="text-xl mt-5">Apakah Anda yakin akan menghapus Penjualan <b> {{ no_invoice }} </b> ?</div>

      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24"
          @click="modal_utama ? removeItem(itemDel.id_detail_jual, itemDel.no_invoice) : deletePenjualan(no_invoice)">
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

  <Modal size="modal-xl" backdrop="static" :show="isModalScanner" @hidden="isModalScanner = false">
    <ModalHeader>
      <div class="text-center mt-2">
        <h2 class="text-lg font-bold">QR Code Scanner</h2>
      </div>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="mb-5">
          <div class="intro-y justify-center flex mt-5">
            <qrcode v-bind:qrbox="250" v-bind:fps="10" ref="qrScanner" @resultScan="resultScan" />
          </div>
        </div>
        <button type="button" @click="
  isModalScanner = false;
closeQrScanner();
        " class="btn btn-danger w-24">
          Close
        </button>
      </div>
    </ModalBody>
  </Modal>

  <!-- BEGIN: Basic Non Sticky Notification Content -->
  <Notification refKey="basicNonStickyNotification" :options="{
    duration: 10000,
  }" class="flex flex-col sm:flex-row hover:animate-none md:animate-bounce animate-pulse ">
    <div class="font-medium">Klik 2 kali pada salah satu baris tabel untuk melihat detail transaksi!</div>
  </Notification>
  <!-- END: Basic Non Sticky Notification Content -->

  <Modal backdrop="static" size="modal-xl" :show="isInvoice" @hidden="isInvoice = false">
    <ModalHeader>
      <h2 class="font-small text-base mr-auto">
        <button class="btn btn-primary shadow-md mr-2">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button> <b>{{ no_invoice }}</b>
      </h2>

      <div @click="resetModal()" class="sm:w-auto flex mr-0 ml-4 items-right cursor-pointer">
        <div class="ml-2 m-auto text-danger">
          <XIcon class="w-8 h-8 mx-auto" />
        </div>
      </div>
    </ModalHeader>
    <ModalBody>
      <PrintInvoice :prints="Penjualan.prints" :no_invoice="no_invoice" :waktu="waktu"
        :total_harga_global="total_harga_global" :total_bayar_global="total_bayar_global" :kembalian="kembalian" />
    </ModalBody>
  </Modal>

</template>

<script setup>
import $ from "jquery";
import { usePenjualanStore } from "../../stores/penjualan";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dom from "@left4code/tw-starter/dist/js/dom";
import qrcode from "../../components/qrcode/QrCode.vue";
import { currencyFormatter } from "../../utils/helper";
import PrintInvoice from "./PrintInvoice.vue";
import moment from "moment";

const Penjualan = usePenjualanStore();

const modal_utama = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const isModalScanner = ref(false);
const qrScanner = ref()
const tableJualRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});
var subTable
const isInvoice = ref(false)
const data_jual = ref([])

const no_invoice = ref("-");
const waktu = ref("");

const item_select = ref("kosong");
const stok = ref(0);
const nama_barang_select = ref("-");
const nama_varian_select = ref("-");
const nama_campur_select = ref("-");

const qty_select = ref(0);

const harga_item_select = ref(0);
const total_harga_select = ref(0);

const total_harga_global = ref(0);
const total_bayar_global = ref(0);
const kembalian = ref(0);

const itemDel = ref("");

var nestedData = [
  {
    id: 1, make: "Ford", model: "focus", reg: "P232 NJP", color: "white", serviceHistory: [
      { date: "01/02/2016", engineer: "Steve Boberson", actions: "Changed oli filter" },
      { date: "07/02/2017", engineer: "Martin Stevenson", actions: "Break light broken" },
    ]
  },
  {
    id: 1, make: "BMW", model: "m3", reg: "W342 SEF", color: "red", serviceHistory: [
      { date: "22/05/2017", engineer: "Jimmy Brown", actions: "Aligned wheels" },
      { date: "11/02/2018", engineer: "Lotty Ferberson", actions: "Changed Oil" },
      { date: "04/04/2018", engineer: "Franco Martinez", actions: "Fixed Tracking" },
    ]
  },
]

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

const startTransaction = () => {
  Penjualan.startTransaction().then((data) => {
    no_invoice.value = data.no_invoice;
    waktu.value = data.tanggal_penjualan;
  })
  console.log('start transactions');
};

const addItem = () => {
  Penjualan.addDetailPenjualan(
    no_invoice.value,
    item_select.value,
    qty_select.value
  ).then((data) => {
    //console.log('data.data', stok, qty_select);
    total_harga_global.value = data.total_harga_jual
    stok.value = stok.value - qty_select.value
    nama_campur_select.value = `${nama_barang_select.value} - ${nama_varian_select.value} | ${stok.value}`
  }).catch((e) => {
    alert("addItem" + e)
  });
}

const openModalRemove = (item) => {
  //console.log(item)
  itemDel.value = item
  deleteConfirmationModal.value = true
}

const removeItem = (id_detail_jual, no_invoice) => {
  Penjualan.removeItem(id_detail_jual, no_invoice).then((data) => {
    stok.value = stok.value + parseInt(itemDel.value.qty)
    nama_campur_select.value = `${nama_barang_select.value} - ${nama_varian_select.value} | ${stok.value}`
    deleteConfirmationModal.value = false
    // console.log('data', itemDel)
    total_harga_global.value = parseFloat(data)
  }).catch((e) => {
    alert("removeItem" + e)
  });
}

const simpanPenjualan = () => {
  const no_invoice_now = no_invoice.value
  const total_harga_global_now = total_harga_global.value
  const total_bayar_global_now = total_bayar_global.value
  const kembalian_now = kembalian.value

  // tabulator.value.updateData([{
  //   // id: index_select.value,
  //   no_invoice_now,
  //   tanggal_penjualan: Date.now(),
  //   total_harga_jual: currencyFormatter.format(total_harga_global.value),
  //   total_bayar_jual: currencyFormatter.format(total_bayar_global.value),
  //   kembalian_now
  // }]);
  console.log('data', Penjualan.penjualanDetail.length);
  if (Penjualan.penjualanDetail.length !== 0 && total_bayar_global.value >= total_harga_global.value) {
    Penjualan.addPenjualan(no_invoice_now, total_harga_global_now, total_bayar_global_now, kembalian_now).then((data) => {
      isEdit.value = false;
      modal_utama.value = false;
      // tabulator.value.clearData()
      // tabulator.value.setData(data);
      initTabulator()


    }).catch((e) => {
      alert("Simpan Error: " + e)
    });
  } else { alert("Simpan Detail Penjualan Tidak Boleh Kosong") }
}

const deletePenjualan = (no_invoice) => {

  Penjualan.removePenjualan(no_invoice)
  initTabulator();
  deleteConfirmationModal.value = false;
}
//defineExpose({ qrScanner })

const renderQrScanner = () => {
  //qrScanner.renderQrScanner();
  qrScanner.value.renderQrScanner();
}

const closeQrScanner = () => {
  qrScanner.value.closeQrScanner();
}

const resultScan = (result) => {
  // ntar di concat ma it outlet
  item_select.value = result;
  console.log("hasil", item_select)
  isModalScanner.value = false;
  qrScanner.value.closeQrScanner();
}

const resetModal = () => {
  modal_utama.value = false;
  deleteConfirmationModal.value = false;
  isEdit.value = false;
  isModalScanner.value = false;
  isInvoice.value = false;

  no_invoice.value = "-"
  waktu.value = ""

  item_select.value = "kosong"
  stok.value = 0
  nama_barang_select.value = "-"
  nama_varian_select.value = "-"
  nama_campur_select.value = "-"

  qty_select.value = 0

  harga_item_select.value = 0
  total_harga_select.value = 0

  total_harga_global.value = 0
  total_bayar_global.value = 0
  kembalian.value = 0

  itemDel.value = ""
}

watch(item_select, async (e) => {
  try {
    // console.log("item_select" , e)
    Penjualan.readDetailItem(e).then((data) => {
      // console.log('data.data', data);
      nama_barang_select.value = data.nama_barang,
        nama_varian_select.value = data.nama_varian,
        nama_campur_select.value = `${data.nama_barang} - ${data.nama_varian} | ${data.stok_varian}`,

        harga_item_select.value = data.harga_jual_varian,
        stok.value = data.stok_varian,
        qty_select.value = 1,
        total_harga_select.value = data.harga_jual_varian
    }).catch((e) => {
      throw e
    });
  } catch (error) {
    alert("Gagal pilih barang" + error)
  }
})

watch(qty_select, async (newValue, oldValue) => {
  const qty = newValue
  const harga_item_select_now = harga_item_select.value
  const stok_now = stok.value
  try {
    if (newValue > stok_now) {
      alert("Stok tersisa hanya " + stok_now);
      qty_select.value = oldValue;
    } else if (newValue === "") {
      alert("Minimal Qty harus 1");
      qty_select.value = 1;
    } else {
      total_harga_select.value = harga_item_select_now * qty
    }
  } catch (error) {
    alert("Gagal wtch qty" + error)
  }
})

watch(total_bayar_global, async (newValue, oldValue) => {
  const total_bayar_global_now = newValue
  const total_harga_global_now = total_harga_global.value
  try {
    if (newValue === "" || newValue < 0) {
      alert("Total Bayar tidak boleh kosong atau minus");
      total_bayar_global.value = oldValue;
    } else {
      kembalian.value = total_bayar_global_now - total_harga_global_now
    }
  } catch (error) {
    alert("Gagal wtch total_bayar_globl" + error)
  }
})

watch(total_harga_global, async (newValue, oldValue) => {
  const total_bayar_global_now = total_bayar_global.value
  const total_harga_global_now = newValue
  try {

    if (newValue === "" || newValue < 0) {
      alert("Total Harga tidak boleh kosong atau minus");
      total_harga_global.value = oldValue;
    } else {
      kembalian.value = total_bayar_global_now - total_harga_global_now
    }
  } catch (error) {
    alert("Gagal wtch total_harga_globl" + error)
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

// const initTabulator = () => {
//   tabulator.value = new Tabulator(tableJualRef.value, {
//     data: Penjualan.laporans,
//     dataLoaderLoading: dataLoaderLoading,
//     groupHeader: function (value, count, data, group) {
//       return `
//       <span class='text-center w-screen inline-block overflow-hidden whitespace-nowrap'>
//         <div class="table w-full">
//           <div class="table-row-group">
//             <div class="table-row overflow-hidden">
//               <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96">${value}</div>
//               <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96">${moment(data[0].tanggal_penjualan).format("DD MMM YYYY HH:SS")}</div>
//               <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(data[0].total_harga_jual)}</div>
//               <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(data[0].total_bayar_jual)}</div>
//               <div class="sm:table-cell mx-2 my-0 overflow-hidden w-96">${currencyFormatter.format(data[0].kembalian_jual)}</div>
//             </div>
//           </div>
//         </div>
//       </span>`
//     },
//     printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Penjualan<h1>`,
//     printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(Date.now()).format("DD MMM YYYY HH:SS")}<h2>`,
//     printAsHtml: true,
//     printStyled: true,
//     groupBy: "no_invoice",
//     //height: "50vh",
//     pagination: "remote",
//     paginationSize: 10,
//     paginationSizeSelector: [10, 20, 30, 40, 50, 100],
//     layout: "fitColumns",
//     responsiveLayout: "collapse",
//     placeholder: "Tida ada Data di temukan",
//     columnDefaults: {
//       //resizable: true,
//       tooltip: function (e, cell, onRendered) {
//         //e - mouseover event
//         //cell - cell component
//         //onRendered - onRendered callback registration function

//         var el = document.createElement("div");
//         el.style.backgroundColor = "white smoke";
//         el.innerText = cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";

//         return el;
//       },
//     },
//     columns: [
//       {
//         formatter: "responsiveCollapse",
//         width: 40,
//         minWidth: 30,
//         hozAlign: "center",
//         resizable: false,
//         headerSort: false,
//       },

//       // For HTML table
//       {
//         title: "NAMA VARIAN",
//         minWidth: 200,
//         responsive: 0,
//         field: "nama_varian",
//         vertAlign: "middle",
//         print: false,
//         download: false,
//         formatter(cell) {
//           return `<div>
//                 <div class="font-medium whitespace-nowrap">${cell.getData().nama_varian
//             }</div>
//               </div>`;
//         },
//       },
//       {
//         title: "HARGA ITEM",
//         headerHozAlign: "center",
//         minWidth: 200,
//         field: "harga_detail_jual",
//         hozAlign: "right",
//         vertAlign: "middle",
//         print: false,
//         download: false,
//         formatter(cell) {
//           return `<div>
//                 <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().harga_detail_jual)
//             }</div>
//               </div>`;
//         },
//       },
//       {
//         title: "QTY",
//         minWidth: 200,
//         headerHozAlign: "center",
//         field: "qty",
//         hozAlign: "center",
//         vertAlign: "middle",
//         print: false,
//         download: false,
//         formatter(cell) {
//           return `<div>
//                 <div class="font-medium whitespace-nowrap">${cell.getData().qty
//             }</div>
//               </div>`;
//         },
//       },
//       {
//         title: "TOTAL HARGA",
//         minWidth: 200,
//         headerHozAlign: "center",
//         field: "total_harga_detail_jual",
//         hozAlign: "right",
//         vertAlign: "middle",
//         print: false,
//         download: false,
//         formatter(cell) {
//           return `<div>
//                 <div class="font-medium whitespace-nowrap">${currencyFormatter.format(cell.getData().total_harga_detail_jual)
//             }</div>
//               </div>`;
//         },
//       },

//       // For print format
//       {
//         title: "NAMA VARIAN",
//         field: "nama_varian",
//          minWidth: 1200,
//         visible: false,
//         print: true,
//         download: true,
//       },
//       {
//         title: "HARGA ITEM",
//         field: "harga_detail_jual",
//         visible: false,
//         print: true,
//         download: true,
//       },
//       {
//         title: "QTY",
//         field: "qty",
//         visible: false,
//         print: true,
//         download: true,
//       },
//       {
//         title: "TOTAL HARGA",
//         field: "total_harga_detail_jual",
//         visible: false,
//         print: true,
//         download: true,
//       },
//     ],
//   });
//   tabulator.value.on("renderComplete", function () {
//     //subTable.redraw();
//     createIcons({
//       icons,
//       "stroke-width": 1.5,
//       nameAttr: "data-lucide",

//     });
//   });
// };

// Redraw table onresize

//define table
const initTabulator = () => {
  tabulator.value = new Tabulator(tableJualRef.value, {
    height: "311px",
    layout: "fitColumns",
    printConfig: {
      columnHeaders: true, //do not include column headers in printed table
      columnGroups: true, //do not include column groups in column headers for printed table
      rowGroups: true, //do not include row groups in printed table
      columnCalcs: true, //do not include column calcs in printed table
      dataTree: true, //do not include data tree in printed table
      formatCells: true, //show raw cell values without formatter
    },
    printFormatter:function(tableHolderElement, tableElement){
        //tableHolderElement - The element that holds the header, footer and table elements
        //tableElement - The table
        console.log("",tableHolderElement, tableElement)
    },
    columnDefaults: {
      resizable: true,
    },
    data: nestedData,
    columns: [
      { title: "Make", field: "make" },
      { title: "Model", field: "model" },
      { title: "Registration", field: "reg" },
      { title: "Color", field: "color" },
    ],
    rowFormatter: async function (row) {
      //create and style holder elements
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");

      holderEl.style.boxSizing = "border-box";
      holderEl.style.padding = "10px 30px 10px 10px";
      holderEl.style.borderTop = "1px solid #333";
      holderEl.style.borderBotom = "1px solid #333";


      tableEl.style.border = "1px solid #333";

      holderEl.appendChild(tableEl);

      row.getElement().appendChild(holderEl);

      subTable = new Tabulator(tableEl, {
        layout: "fitColumns",
        printConfig: {
          columnHeaders: true, //do not include column headers in printed table
          columnGroups: true, //do not include column groups in column headers for printed table
          rowGroups: true, //do not include row groups in printed table
          columnCalcs: true, //do not include column calcs in printed table
          dataTree: true, //do not include data tree in printed table
          formatCells: true, //show raw cell values without formatter
        },
        data: row.getData().serviceHistory,
        columns: [
          {
            title: "Date", field: "date", sorter: "date",  print: true,
            download: true
          },
          {
            title: "Engineer", field: "engineer"  ,print: true,
            download: true
          },
          {
            title: "Action", field: "actions",  print: true,
            download: true
          },
        ]
      })
    },
  });
}

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
  //subTable.print();
  console.log("tabulator", tabulator.value);
};

onMounted(async function () {
  try {
    const data = await Penjualan.readLaporan()
    // Penjualan.readLaporan()
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
