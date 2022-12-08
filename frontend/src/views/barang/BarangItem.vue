<template>
    <tr style="margin: -50px;">

        <td @click="varianShow(e, barang.id_barang)" style="cursor: pointer;" class="text-left w-40 mr-0">{{
                barang.id_barang
        }}</td>
        <td v-if="isEdit">
            <input class="form-control flex-1" type="text" v-model="namaBarang" />
        </td>
        <td v-else class="text-center">{{ barang.nama_barang }}</td>
        <td class="table-report__action w-56" v-if="isEdit">
            <div class="flex justify-center items-center">
                <button class="flex items-center mr-3 text-primary" type="button"
                    @click="updateBarang(barang.id_barang)">
                    <SaveIcon class="w-4 h-4 mr-1" /> Save
                </button>
                <button class="flex items-center text-danger" type="button" @click="isEdit = false">
                    <XIcon class="w-4 h-4 mr-1" /> Batal
                </button>
            </div>
        </td>
        <td class="table-report__action w-56" v-else>
            <div class="flex justify-center items-center">
                <button class="flex items-center mr-3" type="button" @click="isEdit = true; isVarian = false">
                    <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                </button>
                <button class="flex items-center text-danger" type="button"
                    @click="$emit('openModal', barang.id_barang, barang.nama_barang)">
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                </button>
            </div>
        </td>
    </tr>

    <tr v-if="isVarian" style="margin: -50px;">
        <td colspan="3">
            <VarianList :varians="Barang.varians" :nama_barang="barang.nama_barang" @cekVarian="cekVarian"
                ref="VarList" />
        </td>
    </tr>

</template>
  
<script>
import { useBarangStore } from "../../stores/barang"
import VarianList from "./VarianList.vue"
import VarianItem from "./VarianItem.vue"
import { ref } from "vue"

export default {
    setup() {
        const Barang = useBarangStore()
        const varItem = ref(VarianItem)
        // console.log('varitem',)

        return { Barang, varItem }
    },
    emits: ["openModal"],
    components: {
        VarianList,
    },
    props: {
        barang: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isEdit: false,
            isVarian: false,
            namaBarang: this.barang.nama_barang,
        }
    },
    methods: {
        updateBarang(id_barang) {
            try {
                this.Barang.updateItem({ id_barang, nama_barang: this.namaBarang })
                this.isEdit = false
            } catch (error) {
                alert(`Gagal Update data ${id_barang}`, error)
            }
        },
        cekVarian() {
            this.isVarian = false;
        },
        deleteSatuan(id_barang) {
            try {
                this.Barang.removeItem(id_barang)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Barang ${id_barang}`, error)
            }

        },
        varianShow(e, id_barang) {
            // e.preventDefault()
            // this.$router.replace({
            //     path: `/barang?id_barang=${id_barang}`,
            //     query: {
            //       id_barang: id_barang,
            //     }
            // })
            this.Barang.readVarian(id_barang)
            this.isVarian = !this.isVarian
            console.log('iavar', this.isVarian)
            // this.varItem.methods.varianOpen()
            //console.log('varI',this.varItem.methods.varianOpen())
            // this.$refs.qrScanner.closeQrScanner()

        }
    },
    // mounted() {
    //     this.Barang.readItem()
    // }
}

</script>