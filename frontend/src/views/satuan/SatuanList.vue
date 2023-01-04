<template>
  <table class="table table-report -mt-2 min-w-max">
    <thead>
      <tr>
        <th class="whitespace-nowrap">ID</th>
        <th class="whitespace-nowrap">NAMA SATUAN</th>
        <th class="text-center whitespace-nowrap">KETERANGAN</th>
        <th class="text-center whitespace-nowrap">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <SatuanItem
        v-for="satuan in satuans"
        :key="satuan.id_satuan"
        :satuan="satuan"
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
          Anda yakin ingin menghapus data <b>{{ nama_satuan }}</b> ? <br />Data
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
              deleteSatuan(id_satuan);
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
import { useSatuanStore } from "../../stores/satuan";
import SatuanItem from "./SatuanItem.vue";

export default {
  setup() {
    const Satuan = useSatuanStore();

    return { Satuan };
  },
  props: {
    satuans: {
      type: Object,
      required: true,
    },
  },
  components: {
    SatuanItem,
  },
  data() {
    return {
      deleteConfirmationModal: false,
      id_satuan: "",
      nama_satuan: "",
    };
  },
  methods: {
    openModal(id_satuan, nama_satuan) {
      // console.log(id_satuan, nama_satuan, 'emit')
      this.nama_satuan = nama_satuan;
      this.id_satuan = id_satuan;
      this.deleteConfirmationModal = true;
    },
    deleteSatuan(id_satuan) {
      try {
        this.Satuan.removeItem(id_satuan);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Satuan ${id_satuan}`, error);
      }
    },
  },
};
</script>
