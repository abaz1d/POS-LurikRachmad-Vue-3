<template>
    <table class="table table-report -mt-2">
        <thead>
            <tr>
                <th class="whitespace-nowrap">ID</th>
                <th class="text-center whitespace-nowrap">NAMA SATUAN</th>
                <th class="text-center whitespace-nowrap">ALAMAT</th>
                <th class="text-center whitespace-nowrap">TELEPON</th>
                <th class="text-center whitespace-nowrap">EMAIL</th>
                <th class="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <SupplierItem v-for="supplier in suppliers" :key="supplier.id_supplier" :supplier="supplier" @openModal="openModal" />
        </tbody>
    </table>
    <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
                <div class="text-slate-500 mt-2">
                    Anda yakin ingin menghapus data <b>{{ nama_supplier }}</b> ? <br />Data yang telah dihapus tidak bisa
                    kembali.
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button type="button" @click="deleteConfirmationModal = false"
                    class="btn btn-outline-secondary w-24 mr-1">
                    Batal
                </button>
                <button type="button" class="btn btn-danger w-24"
                    @click="(e) => { e.preventDefault(); deleteSupplier(id_supplier); }">Hapus</button>
            </div>
        </ModalBody>
    </Modal>
</template>

<script>
import { useSupplierStore } from "../../stores/supplier"
import SupplierItem from "./SupplierItem.vue"

export default {
    setup() {
        const Supplier = useSupplierStore()

        return { Supplier }
    },
    props: {
        suppliers: {
            type: Object,
            required: true
        }
    },
    components: {
        SupplierItem
    },
    data() {
        return {
            deleteConfirmationModal: false,
            id_supplier: '',
            nama_supplier: '',
        };
    },
    methods: {
        openModal(id_supplier, nama_supplier) {
            // console.log(id_supplier, nama_supplier, 'emit')
            this.nama_supplier = nama_supplier
            this.id_supplier = id_supplier
            this.deleteConfirmationModal = true
        },
        deleteSupplier(id_supplier) {
            try {
                this.Supplier.removeItem(id_supplier)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Supplier ${id_supplier}`, error)
            }
        }
    }
}
</script>