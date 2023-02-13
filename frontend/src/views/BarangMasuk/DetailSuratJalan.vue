<template>
  <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
    <td class="text-center p-3">
      <input
        id="default-checkbox"
        type="checkbox"
        v-model="checkbox"
        class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
      />
    </td>
    <td class="text-black p-3 text-center">
      {{ print.nama_barang }} <b>{{ print.nama_varian }}</b>
    </td>
    <td class="p-3 text-center text-black">{{ print.qty }}</td>
    <td class="py-1 sm:p-3 text-center cursor-pointer">
      <input
        type="number"
        :id="print.no_invoice + print.id_detail_barang_mutasi"
        :value="isEdit ? print.qty : print.qty_terima"
        @input="updateQty"
        class="w-24 form-control flex-1 bg-white text-black"
        :disabled="!isEdit"
      />
    </td>
    <td class="py-1 sm:p-3 text-center cursor-pointer">
      <textarea
        name="keterangan"
        v-model="keterangan_terima"
        @blur="updateKeterangan"
        class="w-32 form-control flex-1 bg-white text-black"
        id="print-keterangan"
        :disabled="!isEdit"
      ></textarea>
    </td>
  </tr>
</template>

<script>
import { useBarangMasukStore } from "@/stores/barang-masuk";

export default {
  setup() {
    const BarangMasuk = useBarangMasukStore();

    return {
      BarangMasuk,
    };
  },
  data() {
    return {
      qty_terima: 0,
      keterangan_terima:
        this.print.keterangan === null ? "" : this.print.keterangan,
      checkbox: false,
    };
  },
  props: {
    print: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
    },
  },
  watch: {
    qty_terima(newValue, oldValue) {
      try {
        if (newValue < 0 || newValue > this.print.qty) {
          alert(
            "Qty Terima tidak boleh kurang dari 0 / lebih dari qty yang dikirim"
          );
          this.qty_terima = oldValue;
          document.getElementById(
            `${this.print.no_invoice + this.print.id_detail_barang_mutasi}`
          ).value = oldValue === 0 ? this.print.qty : oldValue;
        } else {
          this.BarangMasuk.updateTerima(
            this.print.id_detail_barang_mutasi,
            document.getElementById(
              `${this.print.no_invoice + this.print.id_detail_barang_mutasi}`
            ).value,
            this.keterangan_terima
          );
        }
      } catch (error) {
        alert("Gagal wtch qty" + error);
      }
    },
  },
  methods: {
    updateKeterangan() {
      this.BarangMasuk.updateTerima(
        this.print.id_detail_barang_mutasi,
        document.getElementById(
          `${this.print.no_invoice + this.print.id_detail_barang_mutasi}`
        ).value,
        this.keterangan_terima
      );
    },
    updateQty(e) {
      this.qty_terima = e.target.value;
    },
    updateTerima(e) {
      this.checkbox = e;
      this.BarangMasuk.updateTerima(
        this.print.id_detail_barang_mutasi,
        document.getElementById(
          `${this.print.no_invoice + this.print.id_detail_barang_mutasi}`
        ).value,
        this.keterangan_terima
      );
    },
  },
};
</script>
<style scoped>
@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

/* @media (max-width: 640px) {
  thead tr:not(:first-child) {
    display: none;
  }
} */

td {
  border-bottom: 1px solid black;
}

th {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
