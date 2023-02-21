<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Semua Akun</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="modal_utama = true"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">User</p>
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
            <p class="mx-auto" v-if="isEdit">Edit User {{ id_users }}</p>
            <p class="mx-auto" v-else>Tambah User</p>
          </h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <form
            @submit.prevent="isEdit ? updateUser() : addUser()"
            id="userForm"
            class="col-span-12"
          >
            <div class="col-span-12 mb-5" v-if="isEdit">
              <label for="pos-form-1" class="form-label mb-1">ID User</label>
              <input
                id="pos-form-1"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan ID User"
                v-model="id_users"
                readonly
              />
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-2" class="form-label mb-1">Username</label>
              <input
                id="pos-form-2"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan Username"
                v-model="username"
                required
              />
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-3" class="form-label mb-1">Role</label>
              <TomSelect v-model="role" class="w-full" required>
                <option value="role" disabled>&gt;-- Pilih Role &lt;--</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Operator">Operator</option>
              </TomSelect>
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-4" class="form-label mb-1">Outlet</label>
              <TomSelect v-model="outlet" class="w-full" required>
                <option value="id_outlet" disabled>
                  &gt;-- Pilih Outlet &lt;--
                </option>
                <option
                  v-for="outlet in User.outlets"
                  :key="outlet.id_outlet"
                  :outlet="outlet"
                  :value="outlet.id_outlet"
                >
                  {{ outlet.id_outlet }} - {{ outlet.nama_outlet }}
                </option>
              </TomSelect>
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-5" class="form-label mb-1">Email</label>
              <input
                id="pos-form-5"
                class="form-control"
                type="email"
                placeholder="Masukan Email"
                v-model="email_user"
                required
              />
            </div>
            <div class="col-span-12 form-switch mb-5">
              <label for="pos-form-6" class="form-label mb-1">Password</label>
              <input
                v-if="isEdit"
                class="form-check-input m-2"
                type="checkbox"
                v-model="passEdit"
              />
              <br />
              <label
                v-if="passEdit"
                for="pos-form-6"
                class="text-xs form-label mx-2 mt-1 mb-0.5"
                >Password Lama</label
              >
              <input
                id="pos-form-6"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan Password"
                v-model="password"
                :readonly="isEdit"
              />
              <label
                v-if="passEdit"
                for="pos-form-6"
                class="text-xs form-label mx-2 mt-2 mb-0.5"
                >Password Baru</label
              >
              <input
                v-if="passEdit"
                id="pos-form-6"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan Password Baru"
                v-model="password_baru"
                :required="passEdit"
              />
              <div v-if="isEdit" class="form-help">
                * Password saat ini telah di HASH/Bcrypt, untuk menggaanti
                password baru silahkan ceklis pada checkbox, Setelah di simpan
                kata sandi baru akan ter HASH/Bcrypt juga.
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter class="text-right">
          <button
            type="button"
            @click="resetModal"
            class="btn btn-outline-secondary w-32 mr-1"
          >
            Cancel
          </button>
          <button type="submit" form="userForm" class="btn btn-primary w-32">
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
            <option value="id_users">ID User</option>
            <option value="username">Username</option>
            <option value="role">Role</option>
            <option value="nama_outlet">Outlet</option>
            <option value="email_user">Email</option>
            <option value="password">Password</option>
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
          Anda yakin ingin menghapus data <b>{{ username }}</b> ? <br />Data
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
              deleteUser(id_users);
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
import { useUserStore } from "@/stores/user";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { ref, reactive } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import moment from "moment";
const modal_utama = ref(false);
const isLoading = ref(false);
const id_users = ref("");
const username = ref("");
const role = ref("role");
const outlet = ref("id_outlet");
const email_user = ref("");
const password = ref("");
const password_baru = ref("");
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const passEdit = ref(false);
const tabulator = ref();
const filter = reactive({
  field: "id_users",
  type: "like",
  value: "",
});
export default {
  setup() {
    const User = useUserStore();
    return { User, moment };
  },
  components: {
    ModalDatabaseError,
  },
  data() {
    return {
      modal_utama,
      deleteConfirmationModal,
      id_users,
      username,
      role,
      outlet,
      email_user,
      password,
      password_baru,
      isLoading,
      tabulator,
      filter,
      isEdit,
      passEdit,
    };
  },
  methods: {
    resetModal() {
      modal_utama.value = false;
      deleteConfirmationModal.value = false;
      isEdit.value = false;
      passEdit.value = false;
      id_users.value = "";
      username.value = "";
      role.value = "role";
      outlet.value = "id_outlet";
      email_user.value = "";
      password.value = "";
      password_baru.value = "";
    },
    addUser() {
      try {
        this.User.addItem(
          username.value,
          role.value,
          outlet.value,
          email_user.value,
          password.value
        ).then(() => {
          this.resetModal();
          this.initTabulator();
        });
      } catch (error) {
        alert("Gagal Tambah Data" + error);
      }
    },
    updateUser() {
      try {
        let finalPassword;
        if (this.passEdit) {
          if (this.password_baru != "") {
            finalPassword = password_baru.value;
          } else {
            alert("Password Baru tidak boleh kosong");
          }
        } else {
          finalPassword = "";
        }
        this.User.updateItem({
          id_users: this.id_users,
          username: this.username,
          role: this.role,
          id_outlet: this.outlet,
          email_user: this.email_user,
          password: finalPassword,
        }).then(() => {
          this.initTabulator();
          this.resetModal();
        });
      } catch (error) {
        alert(`Gagal Update data ${id_users.value}` + error);
      }
    },
    deleteUser(id_users) {
      try {
        this.User.removeItem(id_users).then(() => {
          this.initTabulator();
          this.resetModal();
        });
      } catch (error) {
        alert(`Gagal Delete User ${id_users}` + error);
      }
    },

    initTabulator() {
      this.tabulator = new Tabulator(this.$refs.tableRef, {
        printAsHtml: true,
        printStyled: true,
        height: "100%",
        printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel User<h1>`,
        printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
          Date.now()
        ).format("DD MMM YYYY HH:SS")}<h2>`,
        data: this.User.items,
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
            title: "ID USER",
            // minWidth: 200,
            minWidth: 80,
            responsive: 1,
            field: "id_users",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_users
                }</div>
              </div>`;
            },
          },
          {
            title: "USERNAME",
            headerHozAlign: "center",
            minWidth: 200,
            field: "username",
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
                  cell.getData().username
                }</div>
              </div>`;
            },
          },
          {
            title: "ROLE",
            minWidth: 100,
            headerHozAlign: "center",
            field: "role",
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
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().role
                }</div>
              </div>`;
            },
          },
          {
            title: "OUTLET",
            minWidth: 200,
            headerHozAlign: "center",
            field: "id_outlet",
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
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_outlet
                } - ${cell.getData().nama_outlet}</div>
              </div>`;
            },
          },
          {
            title: "EMAIL",
            minWidth: 200,
            headerHozAlign: "center",
            responsive: 0,
            field: "email_user",
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
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().email_user
                }</div>
              </div>`;
            },
          },
          {
            title: "PASSWORD",
            headerHozAlign: "center",
            minWidth: 100,
            field: "password",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "input",
            editable: false,
            cellDblClick: function (e, cell) {
              cell.edit(true);
            },
            download: false,
            formatter() {
              return `<div>
                <div class="font-medium whitespace-nowrap"> ***** </div>
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
                  id_users.value = cell.getData().id_users;
                  username.value = cell.getData().username;
                  email_user.value = cell.getData().email_user;
                  role.value = cell.getData().role;
                  outlet.value = cell.getData().id_outlet;
                  password.value = cell.getData().password;
                  isEdit.value = true;
                  modal_utama.value = true;
                } else {
                  id_users.value = cell.getData().id_users;
                  username.value = cell.getData().username;
                  deleteConfirmationModal.value = true;
                }
              });
              return a[0];
            },
          },
          // For print format
          {
            title: "ID USER",
            field: "id_users",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "USERNAME",
            field: "username",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "ROLE",
            field: "role",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "EMAIL",
            field: "email_user",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "PASSWORD",
            field: "password",
            visible: false,
            print: true,
            download: true,
            formatter() {
              return `<div>
                <div class="font-medium whitespace-nowrap">*****</div>
              </div>`;
            },
          },
          {
            title: "OUTLET",
            field: "id_outlet",
            visible: false,
            print: true,
            download: true,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_outlet
                } - ${cell.getData().nama_outlet}</div>
              </div>`;
            },
          },
        ],
      });
      this.tabulator.on("renderComplete", function () {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      });
      this.tabulator.on("cellEdited", function (cell) {
        id_users.value = cell.getData().id_users;
        username.value = cell.getData().username;
        role.value = cell.getData().role;
        outlet.value = cell.getData().id_outlet;
        email_user.value = cell.getData().email_user;
        password.value = cell.getData().password;
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
      this.filter.field = "id_users";
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
        sheetName: "Data User",
      });
    },
    // Print
    onPrint() {
      this.tabulator.print();
    },
  },
  beforeCreate() {
    isLoading.value = true;
    this.User.readItem()
      .then(() => {
        this.initTabulator();
        this.reInitOnResizeWindow();
        this.$refs.modalErrorRef.errorDatabaseModal = false;
        isLoading.value = false;
      })
      .catch((error) => {
        isLoading.value = false;
        console.error(error);
        this.$refs.modalErrorRef.errorDatabaseModal = true;
      });
  },
};
</script>
