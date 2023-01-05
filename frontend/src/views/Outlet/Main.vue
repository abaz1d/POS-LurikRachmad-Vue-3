<template>
  <h2 class="intro-y text-lg font-medium mt-10">Data Outlet</h2>
  <div class="grid grid-cols-12 gap-6 mt-5">
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
    >
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="addModal = true"
      >
      <PlusIcon class="w-4 h-4 mr-2" /> <p class="hidden xl:block mr-1">Outlet</p> Baru
      </button>

      <!-- BEGIN: Modal Content -->
      <Modal backdrop="static" :show="addModal" @hidden="addModal = false">
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Tambah Outlet</h2>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
          <form
            @submit.prevent="addOutlet"
            id="addOutletForm"
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
                v-model="inputNamaOutlet"
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
                v-model="inputAlamatOutlet"
                required
              />
            </div>
            <div class="col-span-12 mb-5">
              <label for="pos-form-1" class="form-label mb-1"
                >Kontak Outlet</label
              >
              <input
                id="pos-form-1"
                type="number"
                class="form-control flex-1"
                placeholder="Masukan Kontak Outlet"
                v-model="inputKontakOutlet"
                required
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter class="text-right">
          <button
            type="button"
            @click="addModal = false"
            class="btn btn-outline-secondary w-32 mr-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="addOutletForm"
            class="btn btn-primary w-32"
          >
            Simpan
          </button>
        </ModalFooter>
      </Modal>
      <Dropdown>
        <DropdownToggle class="btn px-2 box mt-0 mb-3 mr-2">
          <span class="w-5 h-5 flex items-center justify-center">
            <UploadIcon class="w-4 h-4" />
          </span>
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem>
              <PrinterIcon class="w-4 h-4 mr-2" /> Print
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
            </DropdownItem>
            <DropdownItem>
              <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <select class="w-20 form-select box mt-0 mb-3 mr-2 sm:mt-0">
        <option>10</option>
        <option>25</option>
        <option>25</option>
        <option>100</option>
      </select>
      <div class="search hidden xl:block mt-0 mb-3">
        <input
          type="text"
          class="form-control w-56 box pr-10"
          placeholder="Search..."
        />
        <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
      </div>
      <a class="notification xl:hidden mt-0 mb-3">
        <!-- <SearchIcon class="notification__icon dark:text-slate-500" /> -->
        <form action="" class="justify-center shadow-none bg-white box h-10">
          <input
            type="search"
            class="peer shadow-none cursor-pointer relative z-10 h-10 w-10 box border bg-transparent dark:bg-transparent dark:text-white pl-9 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 search__input form-control border-transparent"
          />
          <SearchIcon
            class="absolute inset-y-0 my-auto h-8 w-12 px-3.5 dark:stroke-white"
          />
        </form>
      </a>
      <div class="hidden 2xl:block mx-auto text-slate-500">
        Showing 1 to 10 of 150 entries
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <nav class="w-full sm:w-auto sm:mr-auto mr-0 tems-center justify-center">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <SkipBackIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <RewindIcon class="w-4 h-4" />
              </a>
            </li>
            <!-- <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li> -->
            <li class="page-item active">
              <!-- <a class="page-link" href="#">2</a> -->
              <input
                type="number"
                class="form-control"
                id="page_number"
                value="1"
              />
            </li>
            <li class="page-item">
              <!-- <a class="page-link" href="#">3</a> -->
              <input
                type="number"
                class="form-control"
                id="total_pages"
                disabled
              />
            </li>
            <!-- <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li> -->
            <li class="page-item">
              <a class="page-link" href="#">
                <FastForwardIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <SkipForwardIcon class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <OutletList :outlets="Outlet.items" />
    </div>
    <!-- END: Data List -->
    <!-- BEGIN: Pagination -->

    <!-- END: Pagination -->
  </div>
</template>

<script>
import { useOutletStore } from "../../stores/outlet";
import OutletList from "./OutletList.vue";
import { ref } from "vue";

// const Outlet = useOutletStore();
const addModal = ref(false);
const inputNamaOutlet = ref("");
const inputAlamatOutlet = ref("");
const inputKontakOutlet = ref("");
// const outlets = ref('')

// onMounted(() => {
//     this.Outlet.readItem()
// })

export default {
  setup() {
    const Outlet = useOutletStore();
    return { Outlet };
  },
  components: {
    OutletList,
  },
  data() {
    return {
      addModal,
      inputNamaOutlet,
      inputAlamatOutlet,
      inputKontakOutlet,
    };
  },
  methods: {
    addOutlet() {
      try {
        // console.log("addOutlet", inputNamaOutlet.value, inputAlamatOutlet.value)
        this.Outlet.addItem(
          inputNamaOutlet.value,
          inputAlamatOutlet.value,
          inputKontakOutlet.value,
        );
        inputNamaOutlet.value = "";
        inputAlamatOutlet.value = "";
        inputKontakOutlet.value = "";
        this.addModal = false;
      } catch (error) {
        alert("Gagal Tambah Data", error);
      }
    },
  },
  beforeCreate() {
    this.Outlet.readItem();
    // this.outlets = this.Outlet.items
  },
};
</script>
