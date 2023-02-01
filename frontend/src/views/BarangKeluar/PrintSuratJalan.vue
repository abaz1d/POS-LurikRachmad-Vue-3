<template>
  <div class="intro-y bg-white box overflow-hidden mt-2">
    <div class="min-w-max bg-white">
      <div class="grid grid-cols-3 bg-white">
        <div class="col ml-40">
          <img alt="Lurik Rachmad HTML" class="w-24 " src="@/assets/images/logo-gold.svg" />
        </div>
        <div class="col-span-2 mr-40">
          <div class="grid justify-items-center items-center bg-white">
            <div class="font-philosopher bg-white text-4xl text-primary font-black bg-white"> <b> Lurik Rachmad </b>
            </div>
            <div class="bg-white mt-1 text-black">Jalan Pedan – Cawas Rt 002 Rw 001 Desa/Kelurahan Beji, <br> Kecamatan
              Pedan,Kabupaten Klaten, Jawa Tengah 57468</div>
            <div class="bg-white mt-1 text-black bg-white">
              <MailIcon class="inline-block w-4 m-auto bg-white" />
              <p class="inline-block underline">: lurikrachmad@gmail.com,</p>
              <PhoneIcon class="inline-block ml-1 w-4 m-auto bg-white" />
              <p class="inline-block underline">: +62 815-4899-3484</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="mx-8 border-2 my-2 border-black">
      <p class="text-center text-lg font-bold underline">SURAT JALAN</p>
    </div>
    <div class="flex bg-white flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-10 lg:pb-10 text-center sm:text-left">
      <!-- <div class="bg-white mt-1 text-black text-left text-base font-medium">Nomor : {{ mutasi.no_invoice }}</div>
      <div class="bg-white mt-1 text-left text-black text-base font-medium">Waktu : {{ dateFormat(mutasi.tanggal_mutasi).format("DD MMM YYYY HH:SS") }}</div> -->
      <div class="font-semibold bg-white text-primary text-base">
        Nomor : {{ mutasi.no_invoice }} <br />
        <div class="text-black font-medium text-base">
          Tanggal : {{
            dateFormat(mutasi.tanggal_mutasi).format("DD MMM YYYY HH:SS")
          }}
        </div>
      </div>
      <div class="bg-white mt-20 lg:mt-0 lg:ml-auto lg:text-right">
        <div class="bg-white mt-1 text-black text-left text-base font-medium">Penerima : {{ mutasi.penerima }}</div>
        <div class="bg-white mt-1 text-black text-left text-base font-medium">Ekpedisi : {{ mutasi.ekspedisi }} - {{
          mutasi.no_resi
        }}</div>
      </div>
    </div>
    <div class="px-5 bg-white sm:px-16 py-10 sm:py-10">
      <div class="bg-white overflow-x-auto">
        <table class="table border border-collapse text-black bg-white mb-0">
          <thead>
            <tr>
              <th>
                <input id="default-checkbox" type="checkbox" value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </th>
              <th class="border-b-2 whitespace-nowrap">
                ITEM
              </th>
              <th class="border-b-2 text-right whitespace-nowrap">
                QTY
              </th>
              <th class="border-b-2 text-right whitespace-nowrap">
                HARGA SATUAN
              </th>
              <th class="border-b-2 text-right whitespace-nowrap">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(print, index) in prints" :no="index + 1" :print="print">
              <td>
                <input id="default-checkbox" type="checkbox" value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              </td>
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
    <div class="px-5 bg-white text-black sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse mt-[-20px] sm:mt-[-50px]">
      <!-- <div class="text-center sm:text-left mt-10 sm:mt-0">
            <div class="text-lg text-slate-500 mx-auto mt-2">TOTAL : </div>
            <div class="text-lg text-slate-500 mx-auto mt-2">BAYAR : </div>
            <div class="text-lg text-slate-500 mx-auto mt-2">KEMBALIAN : </div>
          </div> -->
      <!-- <div class="sm:ml-auto grid grid-cols-2 sm:gap-4">
        <div class="text-lg text-black font-medium text-left sm:text-right">TOTAL : </div>
        <div class="text-lg text-primary font-bold text-right">{{ currencyFormat.format(parseInt(total_harga_global)) }}
        </div>

        <div class="text-lg text-black font-medium text-left sm:text-right">BAYAR : </div>
        <div class="text-base text-primary font-bold text-right">{{
          currencyFormat.format(parseInt(total_bayar_global))
        }}</div>

        <div class="text-lg text-black font-medium text-left sm:text-right">KEMBALIAN : </div>
        <div class="text-md text-primary font-bold text-right">{{ currencyFormat.format(parseInt(kembalian)) }}</div>
        <div class="col-span-2 text-right">* Termasuk pajak</div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { currencyFormatter } from "@/utils/helper";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";

export default {
  setup() {
    const currencyFormat = currencyFormatter;
    const dateFormat = moment;
    const Auth = useAuthStore();

    return {
      currencyFormat,
      dateFormat,
      Auth
    }
  },
  data() {
    return {
      // no_invoice: this.prints[0].no_invoice,

    }
  },
  props: {
    prints: {
      type: Object,
    },
    mutasi: {
      type: Object,
    }
  },

}
</script>