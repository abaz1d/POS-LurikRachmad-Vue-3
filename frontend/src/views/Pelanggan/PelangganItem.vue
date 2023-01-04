<template>
  <tr>
    <td class="text-left min-w-max mr-0">{{ pelanggan.id_pelanggan }}</td>
    <td v-if="isEdit">
      <input class="form-control flex-1" type="text" v-model="namaPelanggan" />
    </td>
    <td v-else class="text-center min-w-max">{{ pelanggan.nama_pelanggan }}</td>
    <td v-if="isEdit">
      <textarea
        class="form-control flex-1"
        type="text"
        v-model="alamatPelanggan"
      />
    </td>
    <td v-else class="text-center min-w-max">{{ pelanggan.alamat_pelanggan }}</td>

    <td v-if="isEdit">
      <input
        class="form-control flex-1"
        type="text"
        v-model="kontakPelanggan"
      />
    </td>
    <td v-else class="text-center min-w-max">{{ pelanggan.kontak_pelanggan }}</td>

    <td class="table-report__action w-56" v-if="isEdit">
      <div class="flex justify-center items-center">
        <button
          class="flex items-center mr-3 text-primary"
          type="button"
          @click="updatePelanggan(pelanggan.id_pelanggan)"
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
            $emit('openModal', pelanggan.id_pelanggan, pelanggan.nama_pelanggan)
          "
        >
          <Trash2Icon class="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { usePelangganStore } from "../../stores/pelanggan";

export default {
  setup() {
    const Pelanggan = usePelangganStore();

    return { Pelanggan };
  },
  emits: ["openModal"],
  props: {
    pelanggan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      namaPelanggan: this.pelanggan.nama_pelanggan,
      alamatPelanggan: this.pelanggan.alamat_pelanggan,
      kontakPelanggan: this.pelanggan.kontak_pelanggan,
    };
  },
  methods: {
    deletePelanggan(id_pelanggan) {
      try {
        this.Pelanggan.removeItem(id_pelanggan);
        this.deleteConfirmationModal = false;
      } catch (error) {
        alert(`Gagal Delete Pelanggan ${id_pelanggan}`, error);
      }
    },
    updatePelanggan(id_pelanggan) {
      try {
        this.Pelanggan.updateItem({
          id_pelanggan,
          nama_pelanggan: this.namaPelanggan,
          alamat_pelanggan: this.alamatPelanggan,
          kontak_pelanggan: this.kontakPelanggan,
        });
        this.isEdit = false;
      } catch (error) {
        alert(`Gagal Update data ${id_pelanggan}`, error);
      }
    },
  },
};
</script>
