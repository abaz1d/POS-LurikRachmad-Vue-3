<template>
  <table class="table table-report -mt-2 min-w-max">
    <thead>
      <tr>
        <th class="min-w-max">ID</th>
        <th class="text-center min-w-max">NAMA PELANGGAN</th>
        <th class="text-center min-w-max">ALAMAT</th>
        <th class="text-center min-w-max">KONTAK</th>
        <th class="text-center min-w-max">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <PelangganItem
        v-for="pelanggan in pelanggans"
        :key="pelanggan.id_pelanggan"
        :pelanggan="pelanggan"
        @openModal="openModal"
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
        <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
        <div class="text-slate-500 mt-2">
          Anda yakin ingin menghapus data <b>{{ nama_pelanggan }}</b> ?
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
              deletePelanggan(id_pelanggan);
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
import { usePelangganStore } from "../../stores/pelanggan";
import PelangganItem from "./PelangganItem.vue";

export default {
  setup() {
    const Pelanggan = usePelangganStore();

    return { Pelanggan };
  },
  props: {
    pelanggans: {
      type: Object,
      required: true,
    },
  },
  components: {
    PelangganItem,
  },
  data() {
    return {
      deleteConfirmationModal: false,
      id_pelanggan: "",
      nama_pelanggan: "",
    };
  },
  methods: {
    openModal(id_pelanggan, nama_pelanggan) {
      // console.log(id_pelanggan, nama_pelanggan, 'emit')
      this.nama_pelanggan = nama_pelanggan;
      this.id_pelanggan = id_pelanggan;
      this.deleteConfirmationModal = true;
    },
    deletePelanggan(id_pelanggan) {
      try {
        this.Pelanggan.removeItem(id_pelanggan);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Pelanggan ${id_pelanggan}`, error);
      }
    },
  },
};
</script>
