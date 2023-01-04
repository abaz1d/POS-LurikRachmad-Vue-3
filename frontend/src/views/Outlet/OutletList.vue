<template>
  <table class="table table-report -mt-2">
    <thead>
      <tr>
        <th class="whitespace-nowrap">ID</th>
        <th class="text-center whitespace-nowrap">NAMA OUTLET</th>
        <th class="text-center whitespace-nowrap">ALAMAT</th>
        <th class="text-center whitespace-nowrap">KONTAK</th>
        <th class="text-center whitespace-nowrap">ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      <OutletItem
        v-for="outlet in outlets"
        :key="outlet.id_outlet"
        :outlet="outlet"
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
          Anda yakin ingin menghapus data <b>{{ nama_outlet }}</b> ?
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
              deleteOutlet(id_outlet);
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
import { useOutletStore } from "../../stores/outlet";
import OutletItem from "./OutletItem.vue";

export default {
  setup() {
    const Outlet = useOutletStore();

    return { Outlet };
  },
  props: {
    outlets: {
      type: Object,
      required: true,
    },
  },
  components: {
    OutletItem,
  },
  data() {
    return {
      deleteConfirmationModal: false,
      id_outlet: "",
      nama_outlet: "",
    };
  },
  methods: {
    openModal(id_outlet, nama_outlet) {
      // console.log(id_outlet, nama_outlet, 'emit')
      this.nama_outlet = nama_outlet;
      this.id_outlet = id_outlet;
      this.deleteConfirmationModal = true;
    },
    deleteOutlet(id_outlet) {
      try {
        this.Outlet.removeItem(id_outlet);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Outlet ${id_outlet}`, error);
      }
    },
  },
};
</script>
