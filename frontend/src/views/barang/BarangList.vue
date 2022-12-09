<template>
    <table class="table table-report mt-2">
        <thead>
            <tr>
                <th class="whitespace-nowrap">ID</th>
                <th class="text-center whitespace-nowrap">NAMA BARANG</th>
                <th class="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <BarangItem v-for="barang in barangs" :key="barang.id_barang" :barang="barang" @openModal="openModal">
            </BarangItem>
        </tbody>
    </table>
    <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
                <div class="text-slate-500 mt-2">
                    Anda yakin ingin menghapus data <b>{{ nama_barang }}</b> ? <br />Data yang telah dihapus tidak bisa
                    kembali.
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button type="button" @click="deleteConfirmationModal = false"
                    class="btn btn-outline-secondary w-24 mr-1">
                    Batal
                </button>
                <button type="button" class="btn btn-danger w-24"
                    @click="(e) => { e.preventDefault(); deleteBarang(id_barang); }">Hapus</button>
            </div>
        </ModalBody>
    </Modal>

</template>

<script>
import { useBarangStore } from "../../stores/barang"
import BarangItem from "./BarangItem.vue"

export default {
    setup() {
        const Barang = useBarangStore()

        return { Barang }
    },
    props: {
        barangs: {
            type: Object,
            required: true
        },
        // varians: {
        //     type: Object,
        //     required: true
        // }
    },
    components: {
        BarangItem
    },
    data() {
        return {
            deleteConfirmationModal: false,
            id_barang: '',
            nama_barang: '',
        };
    },
    methods: {
        openModal(id_barang, nama_barang) {
            // console.log(id_barang, nama_barang, 'emit')
            this.id_barang = id_barang
            this.nama_barang = nama_barang
            this.deleteConfirmationModal = true
        },
        deleteBarang(id_barang) {
            try {
                this.Barang.removeItem(id_barang)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Barang ${id_barang}`, error)
            }
        }
    }
}
</script>