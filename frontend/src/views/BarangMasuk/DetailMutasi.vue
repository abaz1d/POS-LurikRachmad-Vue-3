<script>
import { useBarangKeluarStore } from "@/stores/barang-keluar";

export default {
  setup() {
    const BarangKeluar = useBarangKeluarStore();
    return { BarangKeluar };
  },
  props: {
    detail: { type: Object, required: true },
  },
  emits: ["openModalRemove"],
  data() {
    return {
      id: this.detail.id_detail_barang_mutasi,
      id_varian: this.detail.id_varian,
      nama_varian: this.detail.nama_varian,
      qty: this.detail.qty,
    };
  },
  watch: {
    qty(e) {
      this.update(e);
    },
  },
  methods: {
    update(e) {
      this.BarangKeluar.updateDetail(this.id, e);
    },
    openModal_Remove(detail) {
      this.$emit("openModalRemove", detail);
    },
  },
};
</script>

<template>
  <tr>
    <td
      @click="openModal_Remove(detail)"
      class="sticky left-0 bg-slate-200 p-0 w-5 cursor-pointer hover:bg-slate-500"
    >
      <TrashIcon class="text-danger fill-white w-6 h-6 p-0" />
    </td>
    <td>{{ detail.id_varian }} - {{ detail.nama_varian }}</td>
    <td>
      <MinusIcon
        @click="qty = qty - 1"
        class="text-danger fill-daanger w-6 h-6 cursor-pointer inline-block"
      />
      <input
        v-model="qty"
        id="pos-form-1"
        type="number"
        class="w-24 form-control flex-1"
        placeholder="Masukan Qty"
        required
      />
      <PlusIcon
        @click="qty = qty + 1"
        class="text-success fill-success w-6 h-6 cursor-pointer inline-block"
      />
    </td>
  </tr>
</template>
