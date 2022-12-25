<template>
  <table class="table table-bordered table-hover">
    <thead>
      <tr>
        <th class="whitespace-nowrap">No</th>
        <th class="whitespace-nowrap">ID Varian</th>
        <th class="whitespace-nowrap">Nama Varian</th>
        <th class="whitespace-nowrap">QTY</th>
        <th class="whitespace-nowrap">Harga Satuan</th>
        <th class="whitespace-nowrap">Total Harga</th>
      </tr>
    </thead>
    <tbody>
      <TabelDetailItem />
    </tbody>
  </table>
</template>

<script>
import TabelDetailItem from "./TabelDetailItem.vue";

export default {
  setup() {},
  components: {
    TabelDetailItem,
  },
};
</script>
