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
                    Anda yakin ingin menghapus data <b>{{ nama_satuan }}</b> ? <br />Data yang telah dihapus tidak bisa
                    kembali.
                </div>
            </div>
            <div class="px-5 pb-8 text-center">
                <button type="button" @click="deleteConfirmationModal = false"
                    class="btn btn-outline-secondary w-24 mr-1">
                    Batal
                </button>
                <button type="button" class="btn btn-danger w-24"
                    @click="(e) => { e.preventDefault(); deleteSatuan(id_satuan); }">Hapus</button>
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
        const Satuan = useBarangStore()
        //console.log('props:', props)

        return { Satuan }
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
            id_satuan: '',
            nama_satuan: '',
        };
    },
    emits: ["cekVarian"],
    methods: {
        cekVarian() {
            this.$emit('cekVarian')
        },
        openModal(id_satuan, nama_satuan) {
            // console.log(id_satuan, nama_satuan, 'emit')
            this.nama_satuan = nama_satuan
            this.id_satuan = id_satuan
            this.deleteConfirmationModal = true
        },
        deleteSatuan(id_satuan) {
            try {
                this.Satuan.removeItem(id_satuan)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Satuan ${id_satuan}`, error)
            }
        }
    }
}
</script>