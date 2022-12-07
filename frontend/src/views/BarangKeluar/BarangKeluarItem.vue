<template>

    <tr class="intro-x">
        <td class="w-10">
            <input class="form-check-input" type="checkbox" />
        </td>
        <td class="w-40 !py-4">
            <a href="" class="underline decoration-dotted whitespace-nowrap">{{
                    barangKeluar.no_invoice
            }}</a>
        </td>
        <td class="w-40">
            <a href="" class="font-medium whitespace-nowrap">{{
                    barangKeluar.tanggal_penjualan
            }}</a>
        </td>
        <td class="text-center">
            <a href="" class="font-medium whitespace-nowrap">{{
                    barangKeluar.total_harga_jual
            }}</a>
        </td>
        <td>
            <a href="" class="font-medium whitespace-nowrap">{{
                    barangKeluar.total_bayar_jual
            }}</a>
        </td>
        <td class="w-40 text-right">
            <div class="pr-16">{{ barangKeluar.kembalian_jual }}</div>
        </td>
        <td class="table-report__action w-56" v-if="isEdit">
            <div class="flex justify-center items-center">
                <button class="flex items-center mr-3 text-primary" type="button"
                    @click="">
                    <SaveIcon class="w-4 h-4 mr-1" /> Save
                </button>
                <button class="flex items-center text-danger" type="button" @click="isEdit = false">
                    <XIcon class="w-4 h-4 mr-1" /> Batal
                </button>
            </div>
        </td>
        <td class="table-report__action w-56" v-else>
            <div class="flex justify-center items-center">
                <button class="flex items-center mr-3" type="button" @click="isEdit = true">
                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                </button>
                <button class="flex items-center text-danger" type="button"
                    @click="$emit('openModal',)">
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                </button>
            </div>
        </td>
    </tr>

</template>

<script>
import { useBarangKeluarStore } from '../../stores/barang-keluar';

export default {
    setup() {
        const barangKeluar = useBarangKeluarStore();

        return {
            barangKeluar,
        };
    },
    props: {
        barangKeluar: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            isEdit: false,
        };
    },
    methods: {
        deleteBarangKeluar() {

        },
        updateBarangKeluar() {

        }
    }
}
</script>