<template>
  <tr>
    <td class="text-left w-40 mr-0">{{ satuan.id_satuan }}</td>
    <td v-if="isEdit">
      <input class="form-control flex-1" type="text" v-model="namaSatuan" />
    </td>
    <td v-else class="text-center">{{ satuan.nama_satuan }}</td>
    <td v-if="isEdit">
      <textarea class="form-control flex-1" type="text" v-model="keteranganSatuan" />
    </td>
    <td v-else class="text-center">{{ satuan.keterangan_satuan }}</td>
    <td class="table-report__action w-56" v-if="isEdit">
      <div class="flex justify-center items-center">
        <button class="flex items-center mr-3 text-primary" type="button" @click="updateSatuan(satuan.id_satuan)">
          <SaveIcon class="w-4 h-4 mr-1" /> Save
        </button>
        <button class="flex items-center text-danger" type="button" @click="isEdit = false">
          <XIcon class="w-4 h-4 mr-1" /> Batal
        </button>
      </div>
    </td>
    <td class="table-report__action w-56" v-else>
      <div class="flex justify-center items-center">
        <button class="flex items-center mr-3" type="button" @click="isEdit = true">
          <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
        </button>
        <button class="flex items-center text-danger" type="button"
          @click="$emit('openModal', satuan.id_satuan, satuan.nama_satuan)">
          <Trash2Icon class="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { useSatuanStore } from "../../stores/satuan"
import { ref } from "vue"

export default {
  setup() {
    const Satuan = useSatuanStore()

    return { Satuan }
  },
  props: {
    satuan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      namaSatuan: this.satuan.nama_satuan,
      keteranganSatuan: this.satuan.keterangan_satuan,
    }
  },
  methods: {
    deleteSatuan(id_satuan) {
      try {
        this.Satuan.removeItem(id_satuan)
        this.deleteConfirmationModal = false
      } catch (error) {
        alert(`Gagal Delete Satuan ${id_satuan}`, error)
      }

    },
    updateSatuan(id_satuan) {
      try {
        this.Satuan.updateItem({ id_satuan, nama_satuan: this.namaSatuan, keterangan_satuan: this.keteranganSatuan })
        this.isEdit = false
      } catch (error) {
        alert(`Gagal Update data ${id_satuan}`, error)
      }
    },
  }
}

</script>