<script>
import { usePembelianStore } from "@/stores/pembelian";
import { currencyFormatter } from "@/utils/helper";

export default {
  setup() {
    const Pembelian = usePembelianStore();
    return { Pembelian, currencyFormatter };
  },
  props: {
    detail: { type: Object, required: true },
  },
  emits: ["openModalRemove", "updateTotalHargaBeli"],
  data() {
    return {
      id: this.detail.id_detail_beli,
      id_varian: this.detail.id_varian,
      nama_varian: this.detail.nama_varian,
      qty: this.detail.qty,
      no_invoice: this.detail.no_invoice,
    };
  },
  watch: {
    qty(e) {
      if (e !== 0) {
        this.update(e);
      } else {
        this.qty = 1;
      }
    },
  },
  methods: {
    async update(e) {
      try {
        const data = await this.Pembelian.updateDetail(
          this.id,
          this.no_invoice,
          e
        );
        this.$emit("updateTotalHargaBeli", data.total_harga_beli);
      } catch (error) {
        console.error(error);
      }
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
      <TrashIcon class="text-danger w-4 h-4 p-0" />
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
    <td>{{ currencyFormatter.format(detail.harga_detail_beli) }}</td>
    <td>{{ currencyFormatter.format(detail.total_harga_detail_beli) }}</td>
  </tr>
</template>
