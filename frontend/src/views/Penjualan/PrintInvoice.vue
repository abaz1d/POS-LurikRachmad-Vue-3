<template>
  <div class="intro-y box overflow-hidden mt-2">
    <div class="flex flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-20 lg:pb-20 text-center sm:text-left">
      <div class="font-semibold text-primary text-3xl">
        {{ no_invoice_show }} <br />
        <div class="text-xl dark:text-secondary text-dark font-medium">
          {{ dateFormat(prints.map(
            item => {return item.tanggal_penjualan}
          ).filter(
            (item, index) => index === 0).toString()).format("DD MMM YYYY HH:SS") }}
        </div>
      </div>
      <div class="mt-20 lg:mt-0 lg:ml-auto lg:text-right">
        <div class="text-xl text-primary font-medium">Left4code</div>
        <div class="mt-1">left4code@gmail.com</div>
        <div class="mt-1">8023 Amerige Street Harriman, NY 10926.</div>
      </div>
    </div>
    <!-- <div class="flex flex-col lg:flex-row border-b px-5 sm:px-20 pt-10 pb-10 sm:pb-20 text-center sm:text-left">
          <div>
            <div class="text-base text-slate-500">Client Details</div>
            <div class="text-lg font-medium text-primary mt-2">
              Arnold Schwarzenegger
            </div>
            <div class="mt-1">arnodlschwarzenegger@gmail.com</div>
            <div class="mt-1">260 W. Storm Street New York, NY 10025.</div>
          </div>
          <div class="mt-10 lg:mt-0 lg:ml-auto lg:text-right">
            <div class="text-base text-slate-500">Receipt</div>
            <div class="text-lg text-primary font-medium mt-2">#1923195</div>
            <div class="mt-1">Jan 02, 2021</div>
          </div>
        </div> -->
    <div class="px-5 sm:px-16 py-10 sm:py-20">
      <div class="overflow-x-auto">
        <table class="table mb-0">
          <thead>
            <tr>
              <th class="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                ITEM
              </th>
              <th class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                QTY
              </th>
              <th class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                HARGA SATUAN
              </th>
              <th class="border-b-2 dark:border-darkmode-400 text-right whitespace-nowrap">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(print, index) in prints" :no="index + 1" :print="print">
              <td class="border-b dark:border-darkmode-400 mx-auto">
                {{ print.nama_barang }} <b>{{ print.nama_varian }}</b>
              </td>
              <td class="text-right border-b dark:border-darkmode-400 w-32">
                {{ print.qty }}
              </td>
              <td class="text-right border-b dark:border-darkmode-400 w-32">
                {{ currencyFormat.format(print.harga_detail_jual) }}
              </td>
              <td class="text-right border-b dark:border-darkmode-400 w-32 font-medium">
                {{ currencyFormat.format(print.total_harga_detail_jual) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse mt-[-20px] sm:mt-[-50px]">
      <!-- <div class="text-center sm:text-left mt-10 sm:mt-0">
            <div class="text-lg text-slate-500 mx-auto mt-2">TOTAL : </div>
            <div class="text-lg text-slate-500 mx-auto mt-2">BAYAR : </div>
            <div class="text-lg text-slate-500 mx-auto mt-2">KEMBALIAN : </div>
          </div> -->
      <div class="sm:ml-auto grid grid-cols-2 sm:gap-4">
        <div class="text-lg text-slate-500 font-medium text-left sm:text-right">TOTAL : </div>
        <div class="text-lg text-primary font-bold text-right">{{ currencyFormat.format(parseInt(total_harga_jual)) }}</div>

        <div class="text-lg text-slate-500 font-medium text-left sm:text-right">BAYAR : </div>
        <div class="text-base text-primary font-bold text-right">{{ currencyFormat.format(parseInt(total_bayar_jual)) }}</div>

        <div class="text-lg text-slate-500 font-medium text-left sm:text-right">KEMBALIAN : </div>
        <div class="text-md text-primary font-bold text-right">{{ currencyFormat.format(parseInt(kembalian_jual)) }}</div>
        <div class="col-span-2 text-right">* Termasuk pajak</div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyFormatter } from "../../utils/helper";
import moment from "moment";

export default {
  setup() {
    const currencyFormat = currencyFormatter;
    const dateFormat = moment;

    return {
      currencyFormat,
      dateFormat
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
    no_invoice_show: {
      type: String,
    },
    total_harga_jual: {
      type: String,
    },
    total_bayar_jual: {
      type: String,
    },
    kembalian_jual: {
      type: String,
    }
  },

}
</script>