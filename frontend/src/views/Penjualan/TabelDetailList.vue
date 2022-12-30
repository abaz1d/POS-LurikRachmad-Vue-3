<template>
  <table class="table table-bordered table-hover">
    <thead class="table-light">
      <tr class="text-center">
        <th class="whitespace-nowrap">No</th>
        <th class="whitespace-nowrap">ID Varian</th>
        <th class="whitespace-nowrap">Nama Varian</th>
        <th class="whitespace-nowrap">QTY</th>
        <th class="whitespace-nowrap">Harga Satuan</th>
        <th class="whitespace-nowrap">Total Harga</th>
      </tr>
    </thead>
    <tbody>
      <TabelDetailItem v-for="(detail, index) in details" :no="index +1" :detail="detail"
        class="border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800" />
    </tbody>
  </table>
</template>

<script>
import TabelDetailItem from "./TabelDetailItem.vue";

export default {
  setup() { },
  components: {
    TabelDetailItem,
  },
  props: {
    details: {
      type: Object,
      required: true,
    }
  }
};
</script>
