<template>
    <table class="table table-report -mt-2">
        <thead>
            <tr>
                <th class="whitespace-nowrap">
                    <input class="form-check-input" type="checkbox" />
                </th>
                <th class="whitespace-nowrap">INVOICE</th>
                <th class="whitespace-nowrap">TANGGAL KELUAR</th>
                <th class="text-center whitespace-nowrap">TOTAL HARGA</th>
                <th class="whitespace-nowrap">TOTAL BAYAR</th>
                <th class="text-right whitespace-nowrap">
                    <div class="pr-16">TOTAL KEMBALIAN</div>
                </th>
                <th class="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <BarangKeluarItem v-for="(barangKeluar, index) in barangKeluars" :key="barangKeluar.no_invoice" :barangKeluar="barangKeluar" @openModal="openModal" />
            <!-- <SatuanItem v-for="satuan in satuans" :key="satuan.id_satuan" :satuan="satuan" @openModal="openModal" /> -->
        </tbody>
        <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
            <ModalBody class="p-0">
                <div class="p-5 text-center">
                    <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                    <div class="text-3xl mt-5">Are you sure?</div>
                    <div class="text-slate-500 mt-2">
                        Do you really want to delete these records? <br />This process cannot
                        be undone.
                    </div>
                </div>
                <div class="px-5 pb-8 text-center">
                    <button type="button" @click="deleteConfirmationModal = false"
                        class="btn btn-outline-secondary w-24 mr-1">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-danger w-24" @click="deleteBarangKeluar()">Delete</button>
                </div>
            </ModalBody>
        </Modal>
    </table>
</template>

<script>
import { useBarangKeluarStore } from "../../stores/barang-keluar";
import BarangKeluarItem from "./BarangKeluarItem.vue";

export default {
    setup() {
        const BarangKeluar = useBarangKeluarStore();
        return {
            BarangKeluar,
        }
    },
    props: {
        barangKeluars: {
            type: Object,
            required: true
        }
    },
    components: {
        BarangKeluarItem
    },
    data() {
        return {
            deleteConfirmationModal: false,
        }
    },
    methods: {
        openModal(){

        },
        deleteBarangKeluar() {

        }
    }
}

</script>