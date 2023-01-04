<template>
  <tr>
    <td class="text-left w-40 mr-0">{{ outlet.id_outlet }}</td>
    <td v-if="isEdit">
      <input class="form-control flex-1" type="text" v-model="namaOutlet" />
    </td>
    <td v-else class="text-center">{{ outlet.nama_outlet }}</td>
    <td v-if="isEdit">
      <textarea
        class="form-control flex-1"
        type="text"
        v-model="alamatOutlet"
      />
    </td>
    <td v-else class="text-center">{{ outlet.alamat_outlet }}</td>

    <td v-if="isEdit">
      <input
        class="form-control flex-1"
        type="text"
        v-model="kontakOutlet"
      />
    </td>
    <td v-else class="text-center">{{ outlet.kontak_outlet }}</td>

    <td class="table-report__action w-56" v-if="isEdit">
      <div class="flex justify-center items-center">
        <button
          class="flex items-center mr-3 text-primary"
          type="button"
          @click="updateOutlet(outlet.id_outlet)"
        >
          <SaveIcon class="w-4 h-4 mr-1" /> Save
        </button>
        <button
          class="flex items-center text-danger"
          type="button"
          @click="isEdit = false"
        >
          <XIcon class="w-4 h-4 mr-1" /> Batal
        </button>
      </div>
    </td>
    <td class="table-report__action w-56" v-else>
      <div class="flex justify-center items-center">
        <button
          class="flex items-center mr-3"
          type="button"
          @click="isEdit = true"
        >
          <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
        </button>
        <button
          class="flex items-center text-danger"
          type="button"
          @click="
            $emit('openModal', outlet.id_outlet, outlet.nama_outlet)
          "
        >
          <Trash2Icon class="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { useOutletStore } from "../../stores/outlet";

export default {
  setup() {
    const Outlet = useOutletStore();

    return { Outlet };
  },
  emits: ["openModal"],
  props: {
    outlet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      namaOutlet: this.outlet.nama_outlet,
      alamatOutlet: this.outlet.alamat_outlet,
      kontakOutlet: this.outlet.kontak_outlet,
    };
  },
  methods: {
    deleteOutlet(id_outlet) {
      try {
        this.Outlet.removeItem(id_outlet);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Outlet ${id_outlet}`, error);
      }
    },
    updateOutlet(id_outlet) {
      try {
        this.Outlet.updateItem({
          id_outlet,
          nama_outlet: this.namaOutlet,
          alamat_outlet: this.alamatOutlet,
          kontak_outlet: this.kontakOutlet,
        });
        this.isEdit = false;
      } catch (error) {
        alert(`Gagal Update data ${id_outlet}`, error);
      }
    },
  },
};
</script>
