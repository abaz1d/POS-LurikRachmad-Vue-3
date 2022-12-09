<template>
    <table class="table mt-5">
        <thead class="table-light">
            <tr>
                <th class="whitespace-nowrap">Gambar & ID</th>
                <th class="whitespace-nowrap">Nama Barang</th>
                <th class="whitespace-nowrap">Nama Varian</th>
                <th class="whitespace-nowrap">Stok Varian</th>
                <th class="whitespace-nowrap">Satuan</th>
                <th class="whitespace-nowrap">Gudang</th>
                <th class="whitespace-nowrap">Harga Beli</th>
                <th class="whitespace-nowrap">Harga Jual</th>
                <th class="whitespace-nowrap">Actions</th>
            </tr>
        </thead>
        <tbody>
            <VarianItem v-for="varian in varians" :key="varian.id_varian" :varian="varian" :nama_barang="nama_barang" @openModal="openModal" @cekVarian="cekVarian" ref="varItem" />
        </tbody>
    </table>
    <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
                <div class="text-slate-500 mt-2">
                    Anda yakin ingin menghapus data <b>{{ nama_varian }}</b> ? <br />Data yang telah dihapus tidak bisa
                    kembali.
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button type="button" @click="deleteConfirmationModal = false"
                    class="btn btn-outline-secondary w-24 mr-1">
                    Batal
                </button>
                <button type="button" class="btn btn-danger w-24"
                    @click="(e) => { e.preventDefault(); deleteVarian(id_varian); }">Hapus</button>
            </div>
        </ModalBody>
    </Modal>

</template>

<script>
import { useBarangStore } from "../../stores/barang"
import VarianItem from "./VarianItem.vue"

export default {
    name: "varianList",
    setup(props) {
        const Barang = useBarangStore()
        //console.log('props:', props)

        return { Barang }
    },
    props: {
        varians: {
            type: Object,
            required: true
        },
        nama_barang: {
            type: String,
            required: true
        }
    },
    watch: {

    },
    components: {
        VarianItem
    },
    data() {
        return {
            deleteConfirmationModal: false,
            id_varian: '',
            nama_varian: '',
        };
    },
    emits: ["cekVarian"],
    methods: {
        cekVarian() {
            this.$emit('cekVarian')
        },
        openModal(id_varian, nama_varian) {
            // console.log(id_varian, nama_varian, 'emit')
            this.nama_varian = nama_varian
            this.id_varian = id_varian
            this.deleteConfirmationModal = true
        },
        deleteVarian(id_varian) {
            try {
                this.Barang.removeVarian(id_varian)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Varian ${id_varian}`, error)
            }
        }
    }
}
</script>