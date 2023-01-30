<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Barang Masuk</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <a href="" class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary">
        <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
        <p class="sm:block hidden">Reload Data</p>
      </a>
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
            <option value="tanggal_barang_masuk">Tanggal Barang Masuk</option>
            <option value="total_barang_masuk">Total Barang Masuk</option>
            <option value="status">Status</option>
            <option value="id_outlet_penerima">Outlet Penerima</option>
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
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
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
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div v-if="modal_utama" class="text-xl mt-5">Apakah Anda yakin akan menghapus <b> {{ itemDel.nama_varian }} </b>
          sebanyak <b> {{
            itemDel.qty
          }}</b> ?</div>

        <div v-else class="text-xl mt-5">Apakah Anda yakin akan menghapus BarangMasuk <b> {{ no_invoice }} </b> ?</div>

      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24"
          @click="modal_utama ? removeItem(itemDel.id_detail_beli, itemDel.no_invoice) : deletePembelian(no_invoice)">
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

  <!-- BEGIN: Basic Non Sticky Notification Content -->
  <Notification refKey="basicNonStickyNotification" :options="{
    duration: 10000,
  }" class="flex flex-col sm:flex-row hover:animate-none md:animate-bounce animate-pulse ">
    <div class="font-medium">Klik 2 kali pada salah satu baris tabel untuk melihat detail transaksi!</div>
  </Notification>
  <!-- END: Basic Non Sticky Notification Content -->

  <Modal backdrop="static" size="modal-xl" :show="isInvoice" @hidden="isInvoice = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">
        <button class="btn btn-primary shadow-md mr-2" @click="onPrintInvoice">
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <b>{{ no_invoice }}</b>
      </h2>

      <div @click="resetModal()" class="sm:w-auto flex mt-4 sm:mt-0 mr-0 ml-4 items-right cursor-pointer">
        <div class="ml-2 m-auto text-danger">
          <XIcon class="w-8 h-8 mx-auto" />
        </div>
      </div>
    </ModalHeader>
    <ModalBody class="bg-white">
      <div class="bg-white" id="modalPrintInvoice">
        <PrintInvoice :prints="BarangMasuk.prints" :no_invoice="no_invoice" :waktu="waktu"
          :total_harga_global="total_harga_global" :total_bayar_global="total_bayar_global" :kembalian="kembalian" />
      </div>
    </ModalBody>
  </Modal>

  <ModalDatabaseError ref="modalErrorRef" />

</template>

<script setup>
import $ from "jquery";
import { useBarangMasukStore } from "@/stores/barang-masuk";
import { ref, provide, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dom from "@left4code/tw-starter/dist/js/dom";
import qrcode from "@/components/qrcode/QrCode.vue";
import { currencyFormatter } from "@/utils/helper";
import PrintInvoice from "./PrintInvoice.vue";
import moment from "moment";
import html2canvas from 'html2canvas';

const BarangMasuk = useBarangMasukStore();

const modal_utama = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const isModalScanner = ref(false);
const qrScanner = ref();
const modalErrorRef = ref();
const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "no_invoice",
  type: "like",
  value: "",
});
var subTable
const isInvoice = ref(false)
const data_utama = ref([])

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

const onPrintInvoice = (e) => {
  const id = document.getElementById(`modalPrintInvoice`);

  html2canvas(id, {
    // scale: 2,
    useCORS: true,
  }).then((canvas) => {
    var barcodeImgTag = document.createElement("a");
    document.body.appendChild(barcodeImgTag);
    barcodeImgTag.download = `Invoice-${no_invoice.value}.jpg`;
    barcodeImgTag.href = canvas.toDataURL();
    barcodeImgTag.target = "_blank";
    barcodeImgTag.click();
  });
};



const openModalRemove = (item) => {
  //console.log(item)
  itemDel.value = item
  deleteConfirmationModal.value = true
}

const removeItem = (id_detail_beli, no_invoice) => {
  BarangMasuk.removeItem(id_detail_beli, no_invoice).then((data) => {
    stok.value = stok.value + parseInt(itemDel.value.qty)
    nama_campur_select.value = `${nama_barang_select.value} - ${nama_varian_select.value} | ${stok.value}`
    deleteConfirmationModal.value = false
    // console.log('data', itemDel)
    total_harga_global.value = parseFloat(data)
  }).catch((e) => {
    alert("removeItem" + e)
  });
}

const simpanPembelian = () => {
  const no_invoice_now = no_invoice.value
  const total_harga_global_now = total_harga_global.value
  const total_bayar_global_now = total_bayar_global.value
  const kembalian_now = kembalian.value

  // tabulator.value.updateData([{
  //   // id: index_select.value,
  //   no_invoice_now,
  //   tanggal_pembelian: Date.now(),
  //   total_harga_beli: currencyFormatter.format(total_harga_global.value),
  //   total_bayar_beli: currencyFormatter.format(total_bayar_global.value),
  //   kembalian_now
  // }]);
  console.log('data', BarangMasuk.pembelianDetail.length);
  if (BarangMasuk.pembelianDetail.length !== 0 && total_bayar_global.value >= total_harga_global.value) {
    BarangMasuk.addPembelian(no_invoice_now, total_harga_global_now, total_bayar_global_now, kembalian_now).then((data) => {
      isEdit.value = false;
      modal_utama.value = false;
      // tabulator.value.clearData()
      // tabulator.value.setData(data);
      initTabulator()


    }).catch((e) => {
      alert("Simpan Error: " + e)
    });
  } else { alert("Simpan Detail BarangMasuk Tidak Boleh Kosong") }
}

const deletePembelian = (no_invoice) => {

  BarangMasuk.removePembelian(no_invoice)
  initTabulator();
  deleteConfirmationModal.value = false;
}
defineExpose({ qrScanner })

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
  //console.log("hasil", item_select)
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
    BarangMasuk.readDetailItem(e).then((data) => {
      // console.log('data.data', data);
      nama_barang_select.value = data.nama_barang,
        nama_varian_select.value = data.nama_varian,
        nama_campur_select.value = `${data.nama_barang} - ${data.nama_varian} | ${data.stok_varian}`,

        harga_item_select.value = data.harga_beli_varian,
        stok.value = data.stok_varian,
        qty_select.value = 1,
        total_harga_select.value = data.harga_beli_varian
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

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: BarangMasuk.items,
    dataLoaderLoading: dataLoaderLoading,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel BarangMasuk<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(Date.now()).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    //height: "50vh",
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    columnDefaults: {
      resizable: true,
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
      {
        width: 40,
        print: false,
        download: false,
        tooltip: false,
        hozAlign: "center",
        vertAlign: "middle",
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center ml-6">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="printer" class="w-4 h-4 mr-1"></i> 
                </a>
              </div>`);
          dom(a).on("click", function (e) {

          });

          return a[0];
        }, cellClick: function (e, cell) {
          //console.log("openInvoiceModal", BarangMasuk);
          // alert("Print");
          const pembelian = cell.getData()

          BarangMasuk.readDetail(pembelian.no_invoice).then((data) => {
            no_invoice.value = pembelian.no_invoice;
            waktu.value = pembelian.tanggal_pembelian;
            total_harga_global.value = parseFloat(pembelian.total_harga_beli);
            total_bayar_global.value = parseFloat(pembelian.total_bayar_beli);
            kembalian.value = parseFloat(pembelian.kembalian_beli);

            isInvoice.value = true;
          }).catch((e) => {
            alert("gagal open invoice" + e);
          });

          // //filter table to just this row
          // table.Filter(function (data) {
          //   return data.id == cell.getData().id;
          // });

          // //print the table
          // table.print();

          // //clear the filter
          // table.clearFilter();
        }
      },
      {
        title: "INVOICE",
        minWidth: 200,
        responsive: 0,
        field: "no_invoice",
        vertAlign: "middle",
        hozAlign: "center",
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
        title: "TANGGAL MASUK",
        headerHozAlign: "center",
        minWidth: 200,
        field: "tanggal_barang_masuk",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(cell.getData().tanggal_barang_masuk).format("DD MMM YYYY HH:SS")
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BARANG MASUK",
        minWidth: 200,
        headerHozAlign: "center",
        field: "total_barang_masuk",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "OUTLET PENGIRIM & PENERIMA",
        headerHozAlign: "center",
        minWidth: 200,
        field: "id_outlet_penerima",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`
            <div class="flex justify-center items-center">
                <a class="flex items-center text-primary whitespace-nowrap mr-5"
                  href="javascript:;"
                >
                  <i data-lucide="package-minus" class="w-4 h-4 mr-1"></i>${cell.getData().pengirim}
                </a>
                <i data-lucide="arrow-right" class="w-4 h-4 m-2 -ml-3"></i>
                <a class="flex items-center text-primary whitespace-nowrap"
                  href="javascript:;"
                >
                  <i data-lucide="package-plus" class="w-4 h-4 mr-1"></i>${cell.getData().penerima}
                </a>
              </div>

              `);

          return a[0];
        },
      },
      {
        title: "STATUS",
        minWidth: 200,
        headerHozAlign: "center",
        field: "status",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="flex items-center lg:justify-center ${cell.getData().status ? "text-success" : "text-pending"
            }">
                <i data-lucide="truck" class="w-4 h-4 mr-2"></i> ${cell.getData().status ? "Diterima" : "Dalam Pengiriman"}
              </div>`;
          //           return `
          // <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          //   <option value="false" selected ><div><i data-lucide="truck" class="w-4 h-4 mr-2"></i> Dalam Pengiriman</div></option>
          //   <option value="true"><i data-lucide="truck" class="w-4 h-4 mr-2"></i> Diterima</option>
          // </select>
          // `
        },
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
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
          dom(a).on("click", "a", function (e) {
            if (e.id === "edit") {
              //alert("edit " + cell.getData());
              const pembelian = cell.getData()
              //console.log("openEditModal", cell.getRow());
              //index_select.value = cell._cell.row.getPosition()

              BarangMasuk.readDetailPembelian(pembelian.no_invoice).then((data) => {
                no_invoice.value = pembelian.no_invoice;
                waktu.value = pembelian.tanggal_pembelian;
                total_harga_global.value = parseFloat(pembelian.total_harga_beli);
                total_bayar_global.value = parseFloat(pembelian.total_bayar_beli);
                kembalian.value = parseFloat(pembelian.kembalian_beli);

                isEdit.value = true;
                modal_utama.value = true;
              }).catch((e) => {
                alert("gagal open edit" + e);
              });
            } else {
              //alert("delete" + JSON.stringify(cell.getData().no_invoice));
              //const no_invoice_del = JSON.stringify(cell.getData().no_invoice)
              no_invoice.value = cell.getData().no_invoice;
              deleteConfirmationModal.value = true;
            }
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
        title: "TANGGAL MASUK",
        field: "tanggal_pembelian",
        visible: false,
        print: true,
        download: true,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${moment(cell.getData().tanggal_pembelian).format("DD MMM YYYY HH:SS")
            }</div>
              </div>`;
        },
      },
      {
        title: "TOTAL BARANG MASUK",
        field: "total_barang_masuk",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "OUTLET PENGIRIM",
        field: "id_outlet_pengirim",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "OUTLET PENERIMA",
        field: "id_outlet_penerima",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "STATUS",
        field: "status",
        visible: false,
        print: true,
        download: true,
        formatterPrint(cell) {
          return cell.getValue().status ? "Active" : "Inactive";
        },
      },
    ],
    rowFormatter: function (row) {
      //create and style holder elements
      var holderEl = document.createElement("div");
      var tableEl = document.createElement("div");
      holderEl.style.display = "none"

      const id = row.getData().no_invoice;

      holderEl.style.boxSizing = "border-box";
      holderEl.style.padding = "10px 30px 10px 10px";
      holderEl.style.borderTop = "1px solid #333";
      holderEl.style.borderBotom = "1px solid #333";
      holderEl.setAttribute('class', "subTable" + id + "");


      tableEl.style.border = "1px solid #333";
      tableEl.style.display = "none"
      tableEl.setAttribute('class', "subTable" + id + "");

      holderEl.appendChild(tableEl);

      row.getElement().appendChild(holderEl);

      subTable = new Tabulator(tableEl, {
        printAsHtml: true,
        printStyled: true,
        layout: "fitColumns",
        data: row.getData().serviceHistory,
        columns: [

          // For HTML table
          {
            title: "NAMA VARIAN",
            minWidth: 200,
            responsive: 0,
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
            title: "HARGA ITEM",
            headerHozAlign: "center",
            minWidth: 200,
            field: "harga_detail_beli",
            hozAlign: "right",
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
            hozAlign: "right",
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
  tabulator.value.on("rowDblClick", async function (e, row) {
    const id = row.getData().no_invoice;
    try {

      await BarangMasuk.readDetail(id).then(
        (data) => {
          tabulator.value.replaceData(data)
          //console.log("rowClick", data);
        }).catch((e) => {
          throw e;
        });
      $(".subTable" + id + "").toggle();
    } catch (error) {
      alert("2click" + error);
    }

  });
  tabulator.value.on("rowClick", function (e, row) {
    const id = row.getData().no_invoice;
    $(".subTable" + id + "").hide();
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

onMounted(() => {
  BarangMasuk.readItem().then((data) => {
    initTabulator();
    reInitOnResizeWindow();
    basicNonStickyNotificationToggle();
    modalErrorRef.value.errorDatabaseModal = false;
  }).catch((error) => {
    alert("onMounted" + error)
    //modalErrorRef.value.errorDatabaseModal = true;
  });
});

onBeforeUnmount(() => {
  basicNonStickyNotification.value.hideToast()
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
