<template>
    <h2 class="intro-y text-lg font-medium mt-10">Data List Layout</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <button class="btn btn-primary shadow-md mr-2" @click="addModal = true">Add New Product</button>

            <!-- BEGIN: Modal Content -->
            <Modal :show="addModal" @hidden="addModal = false">
                <ModalHeader>
                    <h2 class="font-medium text-base mr-auto">Tambah Supplier</h2>
                </ModalHeader>
                <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                    <form @submit.prevent="addSupplier" id="addSupplierForm" class="col-span-12">
                        <div class="col-span-12 mb-5">
                            <label for="pos-form-1" class="form-label">Nama Supplier</label>
                            <input id="pos-form-1" type="text" class="form-control flex-1"
                                placeholder="Masukan Nama Supplier" v-model="inputNamaSupplier" required />
                        </div>
                        <div class="col-span-12">
                            <label for="pos-form-5" class="form-label">Keterangan Supplier</label>
                            <textarea id="pos-form-5" class="form-control" placeholder="Masukan Keterangan Supplier"
                                v-model="inputKeteranganSupplier" required />
                            <small class="text-grey-800 text-xs">Contoh : Digunakan untuk mewakili supplier stok
                                ketersediaan
                                barang dalam bentuk benda padat</small>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter class="text-right">
                    <button type="button" @click="addModal = false" class="btn btn-outline-secondary w-32 mr-1">
                        Cancel
                    </button>
                    <button type="submit" form="addSupplierForm" class="btn btn-primary w-32">Simpan</button>
                </ModalFooter>
            </Modal>
            <Dropdown>
                <DropdownToggle class="btn px-2 box">
                    <span class="w-5 h-5 flex items-center justify-center">
                        <PlusIcon class="w-4 h-4" />
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
            <div class="hidden md:block mx-auto text-slate-500">
                Showing 1 to 10 of 150 entries
            </div>
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                <div class="w-56 relative text-slate-500">
                    <input type="text" class="form-control w-56 box pr-10" placeholder="Search..." />
                    <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                </div>
            </div>
        </div>
        <!-- BEGIN: Data List -->
        <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <SupplierList :suppliers="Supplier.items" />
        </div>
        <!-- END: Data List -->
        <!-- BEGIN: Pagination -->
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav class="w-full sm:w-auto sm:mr-auto">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#">
                            <ChevronsLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            <ChevronLeftIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">...</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">...</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            <ChevronRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">
                            <ChevronsRightIcon class="w-4 h-4" />
                        </a>
                    </li>
                </ul>
            </nav>
            <select class="w-20 form-select box mt-3 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
            </select>
        </div>
        <!-- END: Pagination -->
    </div>
</template>
  
<script>
import { useSupplierStore } from "../../stores/supplier"
import SupplierList from "./SupplierList.vue"
import { ref } from "vue";

// const Supplier = useSupplierStore();
const addModal = ref(false);
const inputNamaSupplier = ref('')
const inputKeteranganSupplier = ref('')
// const suppliers = ref('')

// onMounted(() => {
//     this.Supplier.readItem()
// })

export default {
    setup() {
        const Supplier = useSupplierStore();
        return { Supplier }
    },
    components: {
        SupplierList
    },
    data() {
        return {
            addModal,
            inputNamaSupplier,
            inputKeteranganSupplier,
        };
    },
    methods: {
        addSupplier() {
            try {
                // console.log("addSupplier", inputNamaSupplier.value, inputKeteranganSupplier.value)
                this.Supplier.addItem(inputNamaSupplier.value, inputKeteranganSupplier.value)
                inputNamaSupplier.value = ''
                inputKeteranganSupplier.value = ''
                this.addModal = false
                
            } catch (error) {
                alert('Gagal Tambah Data', error)
            }

        }
    },
    mounted() {
        this.Supplier.readItem()
        // this.suppliers = this.Supplier.items
    }
}
</script>
  