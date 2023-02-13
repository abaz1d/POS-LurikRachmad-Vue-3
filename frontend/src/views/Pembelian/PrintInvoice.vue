<template>
  <div class="intro-y bg-white box overflow-hidden mt-2">
    <div
      class="flex bg-white flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
    >
      <div class="font-semibold bg-white text-primary text-3xl">
        {{ no_invoice }} <br />
        <div class="text-xl text-black font-medium">
          {{ dateFormat(waktu).format("DD MMM YYYY HH:SS") }}
        </div>
      </div>
      <div class="bg-white mt-20 lg:mt-0 lg:ml-auto lg:text-right">
        <div class="font-philosopher bg-white text-xl text-primary font-medium">
          <b> Lurik Rachmad </b>
        </div>
        <div class="bg-white mt-1 text-black">
          {{ String(auth.nama_outlet) }} - {{ String(auth.kontak_outlet) }}
        </div>
        <div class="bg-white mt-1 text-black w-96 break-words">
          {{ String(auth.alamat_outlet) }}
        </div>
      </div>
    </div>
    <div class="px-5 bg-white sm:px-16 py-10 sm:py-20">
      <div class="bg-white overflow-x-auto">
        <table class="table text-black bg-white mb-0">
          <thead>
            <tr>
              <th class="border-b-2 whitespace-nowrap">ITEM</th>
              <th class="border-b-2 text-right whitespace-nowrap">QTY</th>
              <th class="border-b-2 text-right whitespace-nowrap">
                HARGA SATUAN
              </th>
              <th class="border-b-2 text-right whitespace-nowrap">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(print, index) in prints"
              :no="index + 1"
              :key="index"
              :print="print"
            >
              <td class="border-b mx-auto">
                {{ print.nama_barang }} <b>{{ print.nama_varian }}</b>
              </td>
              <td class="text-right border-b w-32">
                {{ print.qty }}
              </td>
              <td class="text-right border-b w-32">
                {{ currencyFormat.format(print.harga_detail_beli) }}
              </td>
              <td class="text-right border-b w-32 font-medium">
                {{ currencyFormat.format(print.total_harga_detail_beli) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="px-5 bg-white text-black sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse mt-[-20px] sm:mt-[-50px]"
    >
      <div class="sm:ml-auto grid grid-cols-2 sm:gap-4">
        <div class="text-lg text-black font-medium text-left sm:text-right">
          TOTAL :
        </div>
        <div class="text-lg text-primary font-bold text-right">
          {{ currencyFormat.format(parseInt(total_harga_global)) }}
        </div>

        <div class="text-lg text-black font-medium text-left sm:text-right">
          BAYAR :
        </div>
        <div class="text-base text-primary font-bold text-right">
          {{ currencyFormat.format(parseInt(total_bayar_global)) }}
        </div>

        <div class="text-lg text-black font-medium text-left sm:text-right">
          KEMBALIAN :
        </div>
        <div class="text-md text-primary font-bold text-right">
          {{ currencyFormat.format(parseInt(kembalian)) }}
        </div>
        <div class="col-span-2 text-right">* Termasuk pajak</div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyFormatter } from "@/utils/helper";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import moment from "moment";
const auth = ref();

export default {
  setup() {
    const currencyFormat = currencyFormatter;
    const dateFormat = moment;
    const Auth = useAuthStore();

    return {
      currencyFormat,
      dateFormat,
      Auth,
    };
  },
  data() {
    return {
      auth,
    };
  },
  props: {
    prints: {
      type: Object,
    },
    no_invoice: {
      type: String,
    },
    waktu: {
      type: String,
    },
    total_harga_global: {
      type: Number,
    },
    total_bayar_global: {
      type: Number,
    },
    kembalian: {
      type: Number,
    },
  },
  beforeCreate() {
    auth.value = this.Auth.items;
  },
};
</script>
