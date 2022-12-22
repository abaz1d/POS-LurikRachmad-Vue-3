<template>

    <AccordionItemTable @click="varianShow(barang.id_barang)" class="mt-2 mb-2">

        <AccordionTable
            class="border border-b-0 border-gray-200 rounded-t-xl focus:border-4 focus:border-blue-200 dark:focus:border-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 group/item hover:stroke-sky-500 grid grid-cols-3 gap-4 pr-5 md:pr-1">
            <!-- <tr > -->

            <div style="cursor: pointer;" class="col text-left pl-2">{{
                    barang.id_barang
            }}</div>
            <div class="col" v-if="isEdit">
                <input class="form-control flex-1" type="text" v-model="namaBarang" />
            </div>
            <div v-else class="col text-left md:text-center ml-8 md:ml-0">{{ barang.nama_barang }}</div>
            <div class="col " v-if="isEdit">
                <div class="flex justify-center items-center">
                    <button class="flex items-center mr-3 text-primary" type="button"
                        @click="updateBarang(barang.id_barang)">
                        <SaveIcon class="w-4 h-4 mr-1" /> Save
                    </button>
                    <button class="flex items-center text-danger" type="button" @click="isEdit = false">
                        <XIcon class="w-4 h-4 mr-1" /> Batal
                    </button>
                </div>
            </div>
            <div class="col mb-0" v-else>
                <div class="flex justify-center items-center">
                    <button class="flex items-center mr-3" type="button" @click="isEdit = true; isVarian = false">
                        <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                    </button>
                    <button class="flex items-center text-danger" type="button"
                        @click="$emit('openModal', barang.id_barang, barang.nama_barang)">
                        <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                    </button>
                </div>
            </div>
            <!-- <p class="col-span-3 mt-0 mb-0 block mx-auto group/edit invisible hover:bg-slate-200 group-hover/item:visible">Klik Untuk Menampilkan Varian !</p> -->
            <ChevronDownIcon
                class="col-span-3 mb-0 block md:mx-auto mx-52 group/edit invisible hover:bg-slate-200 group-hover/item:visible"
                style="margin-top: -20px; margin-bottom: -20px;" />
            <!-- </tr> -->
        </AccordionTable>


        <AccordionPanelTable class="col-span-3 text-slate-600 dark:text-slate-500 leading-relaxed border-r-4 border-b-4 border-l-4  border-b-0 border-blue-200 dark:border-blue-800 rounded-b-lg pb-2 mb-2">

            <!-- <tr style="margin: -50px;"> -->
            <div class="mr-2 ml-2 overflow-auto">
                <!-- <ChevronDownIcon class="block mx-auto" /> -->
                <!-- <p>Tabel Varian {{ barang.nama_barang }}</p> -->
                <VarianList :varians="Barang.varians" :nama_barang="barang.nama_barang" @cekVarian="cekVarian"
                    ref="VarList" />
            </div>
            <!-- </tr> -->
        </AccordionPanelTable>

    </AccordionItemTable>

</template>
  
<script>
import { useRoute } from 'vue-router'
import { useBarangStore } from "../../stores/barang"
import VarianList from "./VarianList.vue"
import VarianItem from "./VarianItem.vue"
import { ref } from "vue"


export default {
    setup() {
        const Barang = useBarangStore()
        const varItem = ref(VarianItem)
        const route = useRoute()
        const Link = route.path.replace
        // console.log('varitem',)

        return { Barang, varItem, Link }
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
        id_awal: {
            type: String,
        }
    },
    data() {
        return {
            isEdit: false,
            isVarian: false,
            namaBarang: this.barang.nama_barang,
        }
    },
    //     watch: {
    //         Link() {
    //       // console.log("watch", this.nama_barang, this.varian.nama_barang )
    //     //   if (this.$route.query) {
    //     //     this.$emit("cekVarian", this.namaBarang)
    //     // //   }
    //     this.Barang.readVarian(this.id_awal)
    //     console.log("watch")

    //     },
    //   },
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
        varianShow(id_barang) {
            try {
                this.Barang.readVarian(id_barang)
                    .then(() =>
                        this.isVarian = !this.isVarian
                    )

            } catch (error) {
                alert(error)
            }

        },
    },
    // beforeMount() {
    //     console.log("bmounted", this.id_awal)
    //     this.Barang.readVarian(this.id_awal)
    // },
    // beforeRouteEnter() {
    //      console.log("brenter", this.id_awal)
    //      this.Barang.readVarian(this.id_awal)
    // },
    // created(){
    //     console.log("centermt", this.id_awal)
    //      this.Barang.readVarian(this.id_awal)   
    // },
    async beforeMount() {
        await this.Barang.readVarian(this.id_awal)
    }

}

</script>