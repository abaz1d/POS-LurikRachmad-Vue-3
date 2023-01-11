<template>
  <table class="table mt-5 table-bordered">
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
      <VarianItem
        v-for="varian in varians"
        :key="varian.id_varian"
        :varian="varian"
        :nama_barang="nama_barang"
        @openModalDel="openModalDel"
        @openModalEdit="openModalEdit"
        @cekVarian="cekVarian"
        ref="varItem"
        class="border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800"
      />
    </tbody>
  </table>
  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">
          Apakah Anda Yakin ? <br />{{ id_variandel }}
        </div>
        <div class="text-slate-500 mt-2">
          Anda yakin ingin menghapus data <b>{{ nama_variandel }}</b> ?
          <br />Data yang telah dihapus tidak bisa kembali.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Batal
        </button>
        <button
          type="button"
          class="btn btn-danger w-24"
          @click="
            (e) => {
              e.preventDefault();
              deleteVarian(id_variandel);
            }
          "
        >
          Hapus
        </button>
      </div>
    </ModalBody>
  </Modal>

  <Modal size="modal-xl" :show="isEdit" @hidden="isEdit = false">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">
        Edit Varian {{ nama_varian }}
      </h2>
      <button
        type="button"
        @click="isEdit = false"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </ModalHeader>
    <ModalBody class="">
      <form @submit.prevent="" id="editVarianForm" class="">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3 mb-0">
                <label
                  for="idVarian"
                  class="block text-sm font-medium text-gray-700"
                  >ID Varian</label
                >
                <input
                  id="idVarian"
                  type="text"
                  class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Masukan Nama Varian"
                  v-model="id_varian"
                  readonly
                />

                <small class="text-grey-800 text-xs ml-2 mt-0">
                  * ID tidak di perbolehkan di ganti.
                </small>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="namaVarian"
                  class="block text-sm font-medium text-gray-700"
                  >Nama Varian</label
                >
                <input
                  id="namaVarian"
                  type="text"
                  class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Masukan Nama Varian"
                  v-model="nama_varian"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="pos-form-1"
                  class="block text-sm font-medium text-gray-700"
                  >Kategori Barang</label
                >
                <TomSelect
                  v-model="kategori_barang"
                  id="pos-form-1"
                  class="mt-1 w-full"
                  aria-label="Default select example"
                >
                  <option
                    v-for="barang in data.barang"
                    :key="barang.id_barang"
                    :barang="barang"
                    :value="barang.id_barang"
                    :selected="kategori_barang == barang.id_barang"
                  >
                    {{ barang.id_barang }} - {{ barang.nama_barang }}
                  </option>
                </TomSelect>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="pos-form-1"
                  class="block text-sm font-medium text-gray-700"
                  >Kategori Gudang</label
                >
                <TomSelect
                  v-model="gudang"
                  id="pos-form-1"
                  class="mt-1 w-full"
                  aria-label="Default select example"
                >
                  <option
                    v-for="gudang in data.gudang"
                    :key="gudang.id_gudang"
                    :gudang="gudang"
                    :value="gudang.id_gudang"
                    :selected="gudang == gudang.id_gudang"
                  >
                    {{ gudang.id_gudang }} - {{ gudang.nama_gudang }}
                  </option>
                </TomSelect>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="stokVarian"
                  class="block text-sm font-medium text-gray-700"
                  >Stok Varian</label
                >
                <input
                  id="stokVarian"
                  type="number"
                  class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Masukan Stok Varian"
                  v-model="stok_varian"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="satuanVarian"
                  class="block text-sm font-medium text-gray-700"
                  >Satuan Varian</label
                >
                <TomSelect
                  v-model="satuan_varian"
                  id="satuanVarian"
                  class="mt-1 w-full"
                  aria-label="Default select example"
                >
                  <option
                    v-for="satuan in data.satuan"
                    :key="satuan.id_satuan"
                    :satuan="satuan"
                    :value="satuan.id_satuan"
                    :selected="satuan_varian == satuan.id_satuan"
                  >
                    {{ satuan.id_satuan }} - {{ satuan.nama_satuan }}
                  </option>
                </TomSelect>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="hargaBeliVarian"
                  class="block text-sm font-medium text-gray-700"
                  >Harga Beli Varian</label
                >
                <input
                  id="hargaBeliVarian"
                  type="number"
                  class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Masukan Harga Beli Varian"
                  v-model="harga_beli"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="hargaJualVarian"
                  class="block text-sm font-medium text-gray-700"
                  >Harga Jual Varian</label
                >
                <input
                  id="hargaJualVarian"
                  type="number"
                  class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Masukan Harga Jual Varian"
                  v-model="harga_jual"
                />
              </div>

              <div class="col-span-6 sm:col-span-6">
                <label class="block text-sm font-medium text-gray-700"
                  >Gambar Varian</label
                >
                <div
                  class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      v-if="gambar_varian == null || ''"
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <div
                      v-else
                      class="col-span-5 md:col-span-2 relative image-fit cursor-pointer zoom-in"
                      style="height: 9rem"
                    >
                      <img
                        v-if="urlPreview === null"
                        class="rounded-md"
                        alt="Lurik Rachmad"
                        :src="gambar_lama_preview"
                      />
                      <img
                        v-else
                        class="rounded-md"
                        alt="Lurik Rachmad"
                        :src="urlPreview"
                      />
                      <Tippy
                        content="Remove this image?"
                        @click="urlPreview = null"
                        class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                      >
                        <XIcon class="w-4 h-4" />
                      </Tippy>
                    </div>
                    <div @click="this.$refs.gambarBaru.click()">
                      <div class="flex text-sm text-gray-600">
                        <label
                          for="gambarBaru"
                          class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="gambarBaru"
                            ref="gambarBaru"
                            @change="previewImage"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </ModalBody>
    <ModalFooter class="text-right">
      <button
        type="button"
        @click="isEdit = false"
        class="btn btn-outline-secondary w-32 mr-1"
      >
        Cancel
      </button>
      <button
        @click="(isEdit = false), updateVarian($event)"
        class="btn btn-primary w-32"
      >
        Simpan
      </button>
    </ModalFooter>
  </Modal>
</template>

<script>
import { useBarangStore } from "../../stores/barang";
import VarianItem from "./VarianItem.vue";

export default {
  name: "varianList",
  setup() {
    const Barang = useBarangStore();
    //console.log('props:', props)

    return { Barang };
  },
  props: {
    varians: {
      type: Object,
      required: true,
    },
    nama_barang: {
      type: String,
      required: true,
    },
  },
  watch: {},
  components: {
    VarianItem,
  },
  data() {
    return {
      deleteConfirmationModal: false,
      isEdit: false,
      id_variandel: "",
      nama_variandel: "",
      gambardel: "",

      id_varian: "",
      nama_varian: "",
      kategori_barang: "",
      stok_varian: "",
      harga_beli: "",
      satuan_varian: "",
      gudang: "",
      gambar_varian: "",
      file: "",
      harga_jual: "",
      data: "",

      gambar_lama: "",
      urlPreview: null,
      gambar_lama_preview: "",

      publicPath: import.meta.env.VITE_APP_BASE_API,
    };
  },
  emits: ["cekVarian"],
  methods: {
    cekVarian() {
      this.$emit("cekVarian");
    },
    // openModalEdit(id_varian, nama_varian, kategori_barang, stok_varian, harga_beli, satuan_varian, gudang, gambar_varian, file, harga_jual) {
    openModalEdit(varian) {
      // alert("Edit Belum jalan")
      try {
        this.Barang.updateVarianGet(varian.id_varian).then((data) => {
          this.data = data;
          // console.log('data',data.item.gambar_varian)

          this.gambar_lama_preview = varian.gambar_lama_preview;
          this.gambar_lama = data.item.gambar_varian;

          this.id_varian = data.item.id_varian;
          this.nama_varian = data.item.nama_varian;
          this.kategori_barang = data.item.id_barang;
          this.stok_varian = data.item.stok_varian;
          this.harga_beli = data.item.harga_beli_varian;
          this.satuan_varian = data.item.id_satuan;
          this.gudang = data.item.id_gudang;
          this.harga_jual = data.item.harga_jual_varian;

          this.isEdit = true;
        }) .catch((e) => console.error(e));
      } catch (error) {
        console.log(error);
      }
    },
    updateVarian() {
      try {
        this.Barang.updateVarian({
          // console.log("update", {
          id_varian: this.id_varian,
          nama_varian: this.nama_varian,
          kategori_barang: this.kategori_barang,
          stok_varian: this.stok_varian,
          harga_beli: this.harga_beli,
          satuan_varian: this.satuan_varian,
          gudang: this.gudang,
          gambarLlama: this.gambar_lama,
          file_baru: this.file,
          harga_jual: this.harga_jual,
        }).then(
          () => (this.id_varian = ""),
          (this.nama_varian = ""),
          (this.kategori_barang = ""),
          (this.stok_varian = ""),
          (this.harga_beli = ""),
          (this.satuan_varian = ""),
          (this.gudang = ""),
          (this.gambar_varian = ""),
          (this.file = ""),
          (this.harga_jual = ""),
          (this.gambar_lama = ""),
          (this.urlPreview = null),
          (this.gambar_lama_preview = ""),
          (this.isEdit = false)
        ) .catch((e) => console.error(e));

        // console.log('file',this.file)
      } catch (error) {
        alert(`Gagal Update data ${this.nama_varian}`, error);
      }
    },
    openModalDel(id_varian, nama_varian, gambar_lama) {
      this.gambardel = gambar_lama;
      this.nama_variandel = nama_varian;
      this.id_variandel = id_varian;
      this.deleteConfirmationModal = true;
    },
    deleteVarian(id_varian) {
      try {
        this.Barang.removeVarian({ id_varian, gambar_delete: this.gambardel });
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Varian ${id_varian}`, error);
      }
    },
    previewImage(event) {
      this.file = event.target.files[0];
      this.urlPreview = URL.createObjectURL(this.file);
    },
  },
};
</script>
