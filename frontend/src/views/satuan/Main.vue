<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Tabulator</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mb-3 mr-2 pr-5" @click="addModal = true">
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Satuan</p> Baru
      </button>

      <!-- BEGIN: Modal Content -->
      <Modal :show="addModal" @hidden="addModal = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Tambah Satuan</h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <form @submit.prevent="addSatuan" id="addSatuanForm" class="col-span-12">
            <div class="col-span-12 mb-5">
              <label for="pos-form-1" class="form-label">Nama Satuan</label>
              <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Satuan"
                v-model="inputNamaSatuan" required />
            </div>
            <div class="col-span-12">
              <label for="pos-form-5" class="form-label">Keterangan Satuan</label>
              <textarea id="pos-form-5" class="form-control" placeholder="Masukan Keterangan Satuan"
                v-model="inputKeteranganSatuan" required />
              <small class="text-grey-800 text-xs">Contoh : Digunakan untuk mewakili satuan stok ketersediaan
                barang dalam bentuk benda padat</small>
            </div>
          </form>
        </ModalBody>
        <ModalFooter class="text-right">
          <button type="button" @click="addModal = false" class="btn btn-outline-secondary w-32 mr-1">
            Cancel
          </button>
          <button type="submit" form="addSatuanForm" class="btn btn-primary w-32">
            Simpan
          </button>
        </ModalFooter>
      </Modal>
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
            <option value="id_satuan">ID Satuan</option>
            <option value="nama_satuan">Nama Satuan</option>
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
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>

  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
        <div class="text-slate-500 mt-2">
          Anda yakin ingin menghapus data <b>{{ nama_satuan }}</b> ? <br />Data
          yang telah dihapus tidak bisa kembali.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="deleteConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Batal
        </button>
        <button type="button" class="btn btn-danger w-24" @click="
  (e) => {
    e.preventDefault();
    deleteSatuan(id_satuan);
  }
        ">
          Hapus
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: HTML Table Data -->
</template>

<script>
import { useSatuanStore } from "../../stores/satuan";
import SatuanList from "./SatuanList.vue";
import { ref, reactive } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import dom from "@left4code/tw-starter/dist/js/dom";

// const Satuan = useSatuanStore();
const addModal = ref(false);
const inputNamaSatuan = ref("");
const inputKeteranganSatuan = ref("");
// const tableRef = ref("");
const tabulator = ref();
const filter = reactive({
  field: "id_satuan",
  type: "like",
  value: "",
});

export default {
  setup() {
    const Satuan = useSatuanStore();
    return { Satuan };
  },
  components: {
    SatuanList,
  },
  data() {
    return {
      deleteConfirmationModal: false,
      id_satuan: "",
      nama_satuan: "",

      addModal,
      inputNamaSatuan,
      inputKeteranganSatuan,
      //tableRef,
      tabulator,
      filter
    };
  },
  methods: {
    addSatuan() {
      try {
        // console.log("addSatuan", inputNamaSatuan.value, inputKeteranganSatuan.value)
        this.Satuan.addItem(inputNamaSatuan.value, inputKeteranganSatuan.value).then(() => {
          this.addModal = false;
          this.initTabulator();
        })
        inputNamaSatuan.value = "";
        inputKeteranganSatuan.value = "";

      } catch (error) {
        alert("Gagal Tambah Data", error);
      }
    },

    openModal(id_satuan, nama_satuan) {
      // console.log(id_satuan, nama_satuan, 'emit')
      this.nama_satuan = nama_satuan;
      this.id_satuan = id_satuan;
      this.deleteConfirmationModal = true;
    },
    deleteSatuan(id_satuan) {
      try {
        this.Satuan.removeItem(id_satuan);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Satuan ${id_satuan}`, error);
      }
    },

    initTabulator() {
      this.tabulator = new Tabulator(this.$refs.tableRef, {
        // ajaxURL: "https://dummy-data.left4code.com",
        // ajaxFiltering: true,
        // ajaxSorting: true,
        printAsHtml: true,
        printStyled: true,
        data: this.Satuan.items,
        pagination: "remote",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "No matching records found",
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
            title: "ID SATUAN",
            // minWidth: 200,
            maxWidth: 200,
            responsive: 0,
            field: "id_satuan",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().id_satuan
                }</div>
              </div>`;
            },
          },
          {
            title: "NAMA SATUAN",
            headerHozAlign: "center",
            minWidth: 200,
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
            title: "KETERANGAN SATUAN",
            minWidth: 250,
            headerHozAlign: "center",
            field: "keterangan_satuan",
            hozAlign: "right",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false, cellDblClick: function (e, cell) {
              cell.edit(true);
            },
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().keterangan_satuan
                }</div>
              </div>`;
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
                // On click actions
                if (e.id === "edit") {
                  alert("edit" + cell.getData().id_satuan);
                } else {
                  alert("delete" + cell.getData().id_satuan);
                }
              });
              return a[0]

            },
          },

          // For print format
          {
            title: "ID SATUAN",
            field: "id_satuan",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "NAMA SATUAN",
            field: "nama_satuan",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "KETERANGAN SATUAN",
            field: "keterangan_satuan",
            visible: false,
            print: true,
            download: true,
          },
        ],
      });
      this.tabulator.on("renderComplete", function () {
        //subTable.redraw();
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",

        });
      });
      this.tabulator.on("cellEdited", function (cell) {
        //cell - cell component
        console.log("aku cengar cengir", cell.getData())
      });
    },
    reInitOnResizeWindow() {
      window.addEventListener("resize", () => {
        this.tabulator.redraw();
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      });
    },
    onFilter() {
      this.tabulator.setFilter(this.filter.field, this.filter.type, this.filter.value);
    },

    onResetFilter() {
      this.filter.field = "id_satuan";
      this.filter.type = "like";
      this.filter.value = "";
      this.onFilter();
    },

    // Export
    onExportCsv() {
      this.tabulator.download("csv", "data.csv");
    },

    onExportJson() {
      this.tabulator.download("json", "data.json");
    },

    onExportXlsx() {
      const win = window;
      win.XLSX = xlsx;
      this.tabulator.download("xlsx", "data.xlsx", {
        sheetName: "Data Satuan",
      });
    },

    onExportHtml() {
      this.tabulator.download("html", "data.html", {
        style: true,
      });
    },

    // Print
    onPrint() {
      this.tabulator.print();
    },

  },
  beforeCreate() {
    this.Satuan.readItem().then(() => {
      this.initTabulator();
      this.reInitOnResizeWindow();
    }).catch((error) => {
      alert(error)
    });
    // this.satuans = this.Satuan.items
  },
  // mounted() {
  //   this.initTabulator();
  //   this.reInitOnResizeWindow();
  // }
};
</script>
