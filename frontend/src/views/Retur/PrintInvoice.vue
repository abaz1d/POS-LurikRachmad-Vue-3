<template>
  <div class="bg-white intro-y box overflow-hidden mt-2">
    <div
      class="bg-white flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left"
    >
      <div class="bg-white font-semibold text-primary text-3xl">
        {{ id_retur }} <br />
        <div class="bg-white text-xl text-black font-medium">
          {{ dateFormat(waktu).format("DD MMM YYYY HH:SS") }}
        </div>
      </div>
      <div class="bg-white mt-20 lg:mt-0 lg:ml-auto lg:text-right">
        <div class="font-philosopher bg-white text-xl text-primary font-medium">
          <b> Lurik Rachmad </b>
        </div>
        <div class="bg-white mt-1 text-black">
          {{ auth.nama_outlet }} - {{ auth.kontak_outlet }}
        </div>
        <div class="bg-white mt-1 text-black w-96 break-words">
          {{ auth.alamat_outlet }}
        </div>
      </div>
    </div>
    <div class="bg-white px-5 sm:px-16 py-10 sm:py-20">
      <div class="bg-white overflow-x-auto">
        <table class="bg-white table text-black mb-0">
          <thead>
            <tr>
              <th
                class="w-32 text-center p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              >
                ITEM
              </th>
              <th
                class="text-center p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              >
                QTY
              </th>
              <th
                class="text-center p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              >
                Keterangan
              </th>
              <th
                class="text-center p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              >
                Gambar Bukti
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(print, index) in prints"
              :no="index + 1"
              :key="index"
              :print="print"
              class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            >
              <td
                class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static"
              >
                <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                  >ITEM</span
                >
                <div class="w-full text-center sm:mt-auto mt-4">
                  {{ print.nama_barang }} <b>{{ print.nama_varian }}</b>
                </div>
              </td>
              <td
                class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static"
              >
                <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                  >QTY</span
                >
                <div class="text-center bg-white sm:mt-auto mt-4">
                  {{ print.qty }}
                </div>
              </td>
              <td
                class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static"
              >
                <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                  >Keterangan</span
                >
                <div class="text-center bg-white sm:mt-auto mt-4">
                  {{ print.keterangan }}
                </div>
              </td>
              <td
                class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static"
              >
                <span
                  class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                  >Keterangan</span
                >
                <div class="text-center bg-white sm:mt-auto mt-4">
                  Terlampir
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div class="bg-white px-5 text-black sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse mt-[-20px] sm:mt-[-50px]">
      <div class="bg-white sm:ml-auto grid grid-cols-2 sm:gap-4">
        <div class="bg-white text-lg text-black font-medium text-left sm:text-right">
          TOTAL :
        </div>
        <div class="bg-white text-lg text-primary font-bold text-right">
          {{ currencyFormat.format(parseInt(total_harga_global)) }}
        </div>

        <div class="bg-white text-lg text-black font-medium text-left sm:text-right">
          BAYAR :
        </div>
        <div class="bg-white text-base text-primary font-bold text-right">
          {{ currencyFormat.format(parseInt(total_bayar_global)) }}
        </div>

        <div class="bg-white text-lg text-black font-medium text-left sm:text-right">
          KEMBALIAN :
        </div>
        <div class="bg-white text-md text-primary font-bold text-right">
          {{ currencyFormat.format(parseInt(kembalian)) }}
        </div>
        <div class="bg-white col-span-2 text-right">* Termasuk pajak</div>
      </div>
    </div> -->
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
    id_retur: {
      type: String,
    },
    waktu: {
      type: String,
    },
    total_harga_global: {
      type: Number,
    },
  },
  beforeCreate() {
    auth.value = this.Auth.items;
  },
};
</script>
