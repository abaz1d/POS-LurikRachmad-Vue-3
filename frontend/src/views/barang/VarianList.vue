<template>
    <table class="table mt-5 table-bordered table-hover">
        <thead class="table-light">
            <tr class="text-center">
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
            <VarianItem v-for="varian in varians" :key="varian.id_varian" :varian="varian" :nama_barang="nama_barang"
                @openModal="openModal" @openModalEdit="openModalEdit" @cekVarian="cekVarian" ref="varItem" />
        </tbody>
    </table>
    <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
        <ModalBody class="p-0">
            <div class="p-5 text-center">
                <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
                <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
                <div class="text-slate-500 mt-2">
                    Anda yakin ingin menghapus data <b>{{ nama_variandel }}</b> ? <br />Data yang telah dihapus tidak
                    bisa
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

    <Modal size="modal-xl" :show="isEdit" @hidden="isEdit = false">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Edit Varian {{ nama_varian }}</h2>
            <button type="button" @click="isEdit = false"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
        </ModalHeader>
        <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
                <form @submit.prevent="" id="editVarianForm" class="grid grid-cols-12 gap-6">

                    <div class="col-span-6">

                        <label for="pos-form-1" class="form-label">ID Varian</label>
                        <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Varian"
                            v-model="id_varian" readonly />

                        <small class="text-grey-800 text-xs ml-2">
                            * ID tidak di perbolehkan di ganti.
                        </small>

                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Nama Varian</label>
                        <input id="pos-form-1" type="text" class="form-control flex-1" placeholder="Masukan Nama Varian"
                            v-model="nama_varian" />
                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Kategori Barang</label>
                        <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Kategori Barang" v-model="kategori_barang" />
                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Kategori Gudang</label>
                        <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Kategori Gudang" v-model="gudang" />
                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Stok Varian</label>
                        <input id="pos-form-1" type="number" class="form-control flex-1"
                            placeholder="Masukan Stok Varian" v-model="stok_varian" />
                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Satuan Varian</label>
                        <input id="pos-form-1" type="text" class="form-control flex-1"
                            placeholder="Masukan Satuan Varian" v-model="satuan_varian" />
                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Harga Beli Varian</label>
                        <input id="pos-form-1" type="number" class="form-control flex-1"
                            placeholder="Masukan Harga Beli Varian" v-model="harga_beli" />
                    </div>
                    <div class="col-span-6">
                        <label for="pos-form-1" class="form-label">Harga Jual Varian</label>
                        <input id="pos-form-1" type="number" class="form-control flex-1"
                            placeholder="Masukan Harga Jual Varian" v-model="harga_jual" />
                    </div>
                    <div class="col-span-12">
                        <label for="pos-form-1" class="form-label">Gambar Varian</label>
                        <div class="intro-y box p-5">
                            <div class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                <div
                                    class="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                    <ChevronDownIcon class="w-4 h-4 mr-2" /> Upload Product
                                </div>
                                <div class="mt-5">
                                    <div class="flex items-center text-slate-500">
                                        <span>
                                            <LightbulbIcon class="w-5 h-5 text-warning" />
                                        </span>
                                        <div class="ml-2">
                                            <span class="mr-1">Avoid selling counterfeit products / violating
                                                Intellectual
                                                Property Rights, so that your products are not deleted.</span>
                                            <a href="#" class="text-primary font-medium" target="blank">Learn More</a>
                                        </div>
                                    </div>
                                    <div class="form-inline items-start flex-col xl:flex-row mt-10">
                                        <div
                                            class="w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                                            <div class="grid grid-cols-10 gap-5 pl-4 pr-5">
                                                <div class="imgUp justify-content-center mb-2 col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in"
                                                    v-if="gambar_varian == null || ''">

                                                </div>
                                                <div v-else
                                                    class="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in">
                                                    <img v-if="url === null" class="rounded-md"
                                                        alt="Midone - HTML Admin Template" :src="gambar_varian" />
                                                    <img v-else class="rounded-md" alt="Midone - HTML Admin Template"
                                                        :src="url" />
                                                    <Tippy content="Remove this image?" @click="url = null"
                                                        class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2">
                                                        <XIcon class="w-4 h-4" />
                                                    </Tippy>
                                                </div>
                                            </div>
                                            <div
                                                class="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative">
                                                <ImageIcon class="w-4 h-4 mr-2" />
                                                <span class="text-primary mr-1"> Klik to Upload a file</span> or drag
                                                and drop
                                                <input id="gambarBaru" @change="previewImage($event)" type="file"
                                                    ref="inputGambarVarian"
                                                    class="w-full h-full top-0 left-0 absolute opacity-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </ModalBody>
        <ModalFooter class="text-right">
            <button type="button" @click="isEdit = false" class="btn btn-outline-secondary w-32 mr-1">
                Cancel
            </button>
            <button @click="isEdit = false, updateVarian($event)" class="btn btn-primary w-32">Simpan</button>
        </ModalFooter>
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
            isEdit: false,
            id_variandel: '',
            nama_variandel: '',

            id_varian: '',
            nama_varian: '',
            kategori_barang: '',
            stok_varian: '',
            harga_beli: '',
            satuan_varian: '',
            gudang: '',
            gambar_varian: '',
            file: '',
            harga_jual: '',
            data: '',

            url: null,
            publicPath: import.meta.env.VITE_APP_BASE_API
        };
    },
    emits: ["cekVarian"],
    methods: {
        cekVarian() {
            this.$emit('cekVarian')
        },
        // openModalEdit(id_varian, nama_varian, kategori_barang, stok_varian, harga_beli, satuan_varian, gudang, gambar_varian, file, harga_jual) {
        openModalEdit(varian) {
            // alert("Edit Belum jalan")
            try {
                this.Barang.addVarianGet()
                .then((data) => {
                    this.data = data
                    console.log('res', this.data);
                    this.id_varian = varian.id_varian
                    this.nama_varian = varian.nama_varian
                    this.kategori_barang = varian.kategori_barang
                    this.stok_varian = varian.stok_varian
                    this.harga_beli = varian.harga_beli
                    this.satuan_varian = varian.satuan_varian
                    this.gudang = varian.gudang
                    this.gambar_varian = varian.gambar_varian
                    // this.file = varian.file
                    this.harga_jual = varian.harga_jual
                    this.isEdit = true
                })
            } catch (error) {
                console.log(error)
            }

        },
        updateVarian(e) {
            try {
                console.log('file', this.id_varian.valueOf())
                this.Barang.updateVarian({
                    // console.log("update", {
                    id_varian: this.id_varian,
                    nama_varian: this.nama_varian,
                    kategori_barang: this.kategori_barang,
                    stok_varian: this.stok_varian,
                    harga_beli: this.harga_beli,
                    satuan_varian: this.satuan_varian,
                    gudang: this.gudang,
                    gambar_lama: this.gambar_varian,
                    file: this.file,
                    harga_jual: this.harga_jual,

                }).then(() =>
                    this.id_varian = '',
                    this.nama_varian = '',
                    this.kategori_barang = '',
                    this.stok_varian = '',
                    this.harga_beli = '',
                    this.satuan_varian = '',
                    this.gudang = '',
                    this.gambar_varian = '',
                    this.file = '',
                    this.harga_jual = '',
                    this.isEdit = false
                )

                // console.log('file',this.file)

            } catch (error) {
                alert(`Gagal Update data ${this.nama_varian}`, error)
            }

        },
        openModal(id_varian, nama_varian) {
            // console.log(id_varian, nama_varian, 'emit')
            this.nama_variandel = nama_varian
            this.id_variandel = id_varian
            this.deleteConfirmationModal = true
        },
        deleteVarian(id_varian) {
            try {
                this.Barang.removeVarian(id_varian)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Varian ${id_varian}`, error)
            }
        },
        previewImage(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);

        },
    }
}
</script>