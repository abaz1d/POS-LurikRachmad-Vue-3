<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Outlet</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="modal_utama = true"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Outlet</p>
        Baru
      </button>
      <!-- BEGIN: Modal Content -->
      <Modal
        backdrop="static"
        :show="modal_utama"
        @hidden="modal_utama = false"
      >
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">
            <p class="mx-auto" v-if="isEdit">Edit Outlet {{ id_outlet }}</p>
            <p class="mx-auto" v-else>Tambah Outlet</p>
          </h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <form
            @submit.prevent="isEdit ? updateOutlet() : addOutlet()"
            id="outletForm"
            class="col-span-12"
          >
            <div class="col-span-12 mb-5">
              <label for="pos-form-1" class="form-label mb-1"
                >Nama Outlet</label
              >
              <input
                id="pos-form-1"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan Nama Outlet"
                v-model="nama_outlet"
                required
              />
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-5" class="form-label mb-1"
                >Alamat Outlet</label
              >
              <textarea
                id="pos-form-5"
                class="form-control"
                placeholder="Masukan Alamat Outlet"
                v-model="alamat_outlet"
                required
              />
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-1" class="form-label mb-1"
                >Telepon Outlet</label
              >
              <input
                id="pos-form-1"
                type="number"
                class="form-control flex-1"
                placeholder="Masukan Telepon Outlet"
                v-model="kontak_outlet"
                required
              />
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-1" class="form-label mb-1"
                >Email Outlet</label
              >
              <input
                id="pos-form-1"
                type="email"
                class="form-control flex-1"
                placeholder="Masukan Email Outlet"
                v-model="email_outlet"
                required
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter class="text-right">
          <button
            type="button"
            @click="
              modal_utama = false;
              id_outlet = '';
              nama_outlet = '';
              alamat_outlet = '';
              kontak_outlet = '';
              isEdit = false;
            "
            class="btn btn-outline-secondary w-32 mr-1"
          >
            Cancel
          </button>
          <button type="submit" form="outletForm" class="btn btn-primary w-32">
            Simpan
          </button>
        </ModalFooter>
      </Modal>
      <a
        href=""
        class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary"
      >
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
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Field</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="id_outlet">ID Outlet</option>
            <option value="nama_outlet">Nama Outlet</option>
            <option value="alamat_outlet">Alamat Outlet</option>
            <option value="kontak_outlet">Telepon Outlet</option>
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
            id="tabulator-html-filter-go"
            type="button"
            class="btn btn-primary w-full sm:w-16"
            @click="onFilter"
          >
            Go
          </button>
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
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
          @click="onPrint"
        >
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
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
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

  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
        <div class="text-slate-500 mt-2">
          Anda yakin ingin menghapus data <b>{{ nama_outlet }}</b> ? <br />Data
          yang telah dihapus tidak bisa kembali.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Batal
        </button>
        <button
          type="button"
          class="btn btn-danger w-24"
          @click="
            (e) => {
              e.preventDefault();
              deleteOutlet(id_outlet);
            }
          "
        >
          Hapus
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: HTML Table Data -->
  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script>
import { useOutletStore } from "@/stores/outlet";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { ref, reactive } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import moment from "moment";
const modal_utama = ref(false);
const id_outlet = ref("");
const nama_outlet = ref("");
const alamat_outlet = ref("");
const kontak_outlet = ref();
const email_outlet = ref("");
const isLoading = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const tabulator = ref();
const filter = reactive({
  field: "id_outlet",
  type: "like",
  value: "",
});
export default {
  setup() {
    const Outlet = useOutletStore();
    return { Outlet, moment };
  },
  components: {
    ModalDatabaseError,
  },
  data() {
    return {
      deleteConfirmationModal,
      id_outlet,
      nama_outlet,
      modal_utama,
      alamat_outlet,
      kontak_outlet,
      email_outlet,
      isLoading,
      tabulator,
      filter,
      isEdit,
    };
  },
  methods: {
    addOutlet() {
      try {
        this.Outlet.addItem(
          nama_outlet.value,
          alamat_outlet.value,
          kontak_outlet.value,
          email_outlet.value
        ).then(() => {
          this.modal_utama = false;
          this.initTabulator();
        });
        nama_outlet.value = "";
        alamat_outlet.value = "";
        kontak_outlet.value = "";
        email_outlet.value = "";
      } catch (error) {
        alert("Gagal Tambah Data" + error);
      }
    },
    updateOutlet() {
      try {
        this.Outlet.updateItem({
          id_outlet: this.id_outlet,
          nama_outlet: this.nama_outlet,
          alamat_outlet: this.alamat_outlet,
          kontak_outlet: this.kontak_outlet,
          email_outlet: this.email_outlet,
        }).then(() => {
          this.initTabulator();
          this.isEdit = false;
          this.modal_utama = false;
          this.id_outlet = "";
          this.nama_outlet = "";
          this.alamat_outlet = "";
          this.kontak_outlet = "";
          this.email_outlet = "";
        });
      } catch (error) {
        alert(`Gagal Update data ${id_outlet.value}` + error);
      }
    },
    deleteOutlet(id_outlet) {
      try {
        this.Outlet.removeItem(id_outlet).then(() => {
          this.initTabulator();
          this.deleteConfirmationModal = false;
          this.id_outlet = "";
          this.nama_outlet = "";
        });
      } catch (error) {
        alert(`Gagal Delete Outlet ${id_outlet}` + error);
      }
    },

    initTabulator() {
      this.tabulator = new Tabulator(this.$refs.tableRef, {
        printAsHtml: true,
        printStyled: true,
        height: "100%",
        printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Outlet<h1>`,
        printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
          Date.now()
        ).format("DD MMM YYYY HH:SS")}<h2>`,
        data: this.Outlet.items,
        pagination: "remote",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40, 50],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "Tida ada Data di temukan",
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
            title: "ID OUTLET",
            minWidth: 150,
            responsive: 0,
            field: "id_outlet",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_outlet
                }</div>
              </div>`;
            },
          },
          {
            title: "NAMA OUTLET",
            headerHozAlign: "center",
            minWidth: 200,
            field: "nama_outlet",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "input",
            editable: false,
            cellDblClick: function (e, cell) {
              cell.edit(true);
            },
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().nama_outlet
                }</div>
              </div>`;
            },
          },
          {
            title: "ALAMAT",
            minWidth: 300,
            headerHozAlign: "center",
            field: "alamat_outlet",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false,
            cellDblClick: function (e, cell) {
              cell.edit(true);
            },
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-normal">${
                  cell.getData().alamat_outlet
                }</div>
              </div>`;
            },
          },
          {
            title: "TELEPON",
            headerHozAlign: "center",
            minWidth: 200,
            field: "kontak_outlet",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "input",
            editable: false,
            cellDblClick: function (e, cell) {
              cell.edit(true);
            },
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().kontak_outlet
                }</div>
              </div>`;
            },
          },
          {
            title: "EMAIL",
            headerHozAlign: "center",
            minWidth: 200,
            field: "email_outlet",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "input",
            editable: false,
            cellDblClick: function (e, cell) {
              cell.edit(true);
            },
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().email_outlet
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
                if (e.id === "edit") {
                  id_outlet.value = cell.getData().id_outlet;
                  nama_outlet.value = cell.getData().nama_outlet;
                  alamat_outlet.value = cell.getData().alamat_outlet;
                  kontak_outlet.value = cell.getData().kontak_outlet;
                  email_outlet.value = cell.getData().email_outlet;
                  isEdit.value = true;
                  modal_utama.value = true;
                } else {
                  id_outlet.value = cell.getData().id_outlet;
                  nama_outlet.value = cell.getData().nama_outlet;
                  deleteConfirmationModal.value = true;
                }
              });
              return a[0];
            },
          },

          // For print format
          {
            title: "ID OUTLET",
            field: "id_outlet",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "NAMA OUTLET",
            field: "nama_outlet",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "ALAMAT",
            field: "alamat_outlet",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "TELEPON",
            field: "kontak_outlet",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "EMAIL",
            field: "email_outlet",
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
        id_outlet.value = cell.getData().id_outlet;
        nama_outlet.value = cell.getData().nama_outlet;
        alamat_outlet.value = cell.getData().alamat_outlet;
        kontak_outlet.value = cell.getData().kontak_outlet;
        email_outlet.value = cell.getData().email_outlet;
        isEdit.value = true;
        modal_utama.value = true;
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
      this.tabulator.setFilter(
        this.filter.field,
        this.filter.type,
        this.filter.value
      );
    },

    onResetFilter() {
      this.filter.field = "id_outlet";
      this.filter.type = "like";
      this.filter.value = "";
      this.onFilter();
    },

    // Export
    onExportCsv() {
      this.tabulator.download("csv", "data.csv");
    },
    onExportXlsx() {
      const win = window;
      win.XLSX = xlsx;
      this.tabulator.download("xlsx", "data.xlsx", {
        sheetName: "Data Outlet",
      });
    },
    // Print
    onPrint() {
      this.tabulator.print();
    },
  },
  beforeCreate() {
    isLoading.value = true;
    this.Outlet.readItem()
      .then(() => {
        this.initTabulator();
        this.reInitOnResizeWindow();
        this.$refs.modalErrorRef.errorDatabaseModal = false;
        isLoading.value = false;
      })
      .catch((error) => {
        console.error(error);
        this.$refs.modalErrorRef.errorDatabaseModal = true;
        isLoading.value = false;
      });
  },
};
</script>
