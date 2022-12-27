<template>
  <Alert
    v-if="alert"
    class="hover:animate-none md:animate-bounce animate-pulse alert-primary md:mb-2 m-5"
    ><b> Klik pada baris barang untuk menampilkan data tabel varian</b>
    <XCircleIcon
      @click="alert = false"
      class="absolute stroke-2 stroke-red-500 bg-white rounded-full h-6 w-6 -right-3 -top-3 cursor-pointer"
  /></Alert>
  <div class="block overflow-hidden mt-2">
    <div
      class="bg-white dark:bg-slate-200 pt-3 rounded-t-lg dark:text-slate-800"
    >
      <div class="block grid grid-cols-3 gap-2 mb-3 h-15 items-center justify-center">
        <div class="col text-center"><b>ID</b></div>
        <div class="col text-center"><b>NAMA BARANG</b></div>
        <div class="col text-center ml-2 mr-5 md:mr-0"><b>ACTIONS</b></div>
      </div>
      <hr />
    </div>
    <br />
    <div class="mt-2">
      <AccordionGroupTable>
        <BarangItem
          v-for="barang in barangs"
          :key="barang.id_barang"
          :id_awal="barangs[0].id_barang"
          :barang="barang"
          @openModal="openModal"
        />
      </AccordionGroupTable>
    </div>
  </div>

  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
        <div class="text-slate-500 mt-2">
          Anda yakin ingin menghapus data <b>{{ nama_barang }}</b> ? <br />Data
          yang telah dihapus tidak bisa kembali.
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
              deleteBarang(id_barang);
            }
          "
        >
          Hapus
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script>
import { useBarangStore } from "../../stores/barang";
import BarangItem from "./BarangItem.vue";

export default {
  setup() {
    const Barang = useBarangStore();

    return { Barang };
  },
  props: {
    barangs: {
      type: Object,
      required: true,
    },
    // varians: {
    //     type: Object,
    //     required: true
    // }
  },
  components: {
    BarangItem,
  },
  data() {
    return {
      alert: true,
      deleteConfirmationModal: false,
      id_barang: "",
      nama_barang: "",
    };
  },
  methods: {
    openModal(id_barang, nama_barang) {
      // console.log(id_barang, nama_barang, 'emit')
      this.id_barang = id_barang;
      this.nama_barang = nama_barang;
      this.deleteConfirmationModal = true;
    },
    deleteBarang(id_barang) {
      try {
        this.Barang.removeItem(id_barang);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Barang ${id_barang}`, error);
      }
    },
  },
  created() {
    setTimeout(() => (this.alert = false), 10000);
  },
  unmounted() {
    setTimeout(() => (this.alert = false), 10000);
  },
};
</script>
