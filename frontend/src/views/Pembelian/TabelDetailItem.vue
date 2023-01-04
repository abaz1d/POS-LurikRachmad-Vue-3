<template>
  <tr class="text-center min-w-max">
    <td>
      {{ no }}
    </td>
    <td>
      {{ detail.id_varian }}
    </td>
    <td>
      {{ detail.nama_varian }}
    </td>
    <td>
      {{ detail.qty }}
    </td>
    <td>
      {{ currencyFormat.format(detail.harga_detail_beli) }}
    </td>
    <td>
      {{ currencyFormat.format(detail.total_harga_detail_beli) }}
    </td>

  </tr>
</template>

<script>
import { currencyFormatter } from "../../utils/helper";

export default {
  name: 'TabelDetailItem',
  setup() {
    const currencyFormat = currencyFormatter;
    return {currencyFormat}
  },
  props: {
    no: {
      type: Number,
      required: true,
    },
    detail: {
      type: Object,
      required: true,
    }
  }
}
</script>
