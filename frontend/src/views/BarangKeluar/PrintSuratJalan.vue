<template>
  <div
    class="intro-y bg-white box overflow-hidden mt-2 z-50 absolute top-0"
    style="background-color: white"
    id="modalPrintInvoice"
  >
    <div class="min-w-max bg-white">
      <div class="grid sm:grid-cols-3 bg-white">
        <div class="col mx-auto sm:ml-40">
          <img
            width="100"
            height="100"
            alt="Lurik Rachmad HTML"
            class="w-24"
            src="@/assets/images/logo-gold.svg"
          />
        </div>
        <div class="col-span-2 hidden sm:block mr-40">
          <div class="grid justify-items-center items-center bg-white">
            <div
              class="font-philosopher bg-white text-4xl text-[#CDA562] font-black"
            >
              <b> Lurik Rachmad </b>
            </div>
            <div class="bg-white mt-1 text-black">
              Jalan Pedan – Cawas Rt 002 Rw 001 Desa/Kelurahan Beji, <br />
              Kecamatan Pedan,Kabupaten Klaten, Jawa Tengah 57468
            </div>
            <div class="bg-white mt-1 text-black">
              <MailIcon class="inline-block w-4 m-auto bg-white" />
              <p class="inline-block underline">: lurikrachmad@gmail.com,</p>
              <PhoneIcon class="inline-block ml-1 w-4 m-auto bg-white" />
              <p class="inline-block underline">: +62 815-4899-3484</p>
            </div>
          </div>
        </div>
      </div>
      <hr
        class="mx-8 border-2 my-2 text-black fill-black stroke-black border-black"
      />
      <p class="text-center text-lg font-bold underline text-black">
        SURAT JALAN
      </p>
    </div>
    <div
      class="flex bg-white flex-col lg:flex-row pt-10 px-5 sm:px-20 sm:pt-10 lg:pb-10 text-center sm:text-left"
    >
      <div class="font-semibold bg-white text-primary text-left text-base">
        Nomor : {{ mutasi.no_invoice }} <br />
        <div class="text-black text-left font-medium text-base">
          Tanggal :
          {{ dateFormat(mutasi.tanggal_mutasi).format("DD MMM YYYY HH:SS") }}
        </div>
      </div>
      <div class="bg-white mt-10 lg:mt-0 lg:ml-auto lg:text-right">
        <div class="bg-white mt-1 text-black text-left text-base font-medium">
          Penerima : {{ mutasi.id_outlet_penerima }} - {{ mutasi.penerima }}
        </div>
        <div class="bg-white mt-1 text-black text-left text-base font-medium">
          Ekpedisi : {{ mutasi.ekspedisi }} - {{ mutasi.no_resi }}
        </div>
      </div>
    </div>
    <div class="px-5 bg-white sm:px-10 py-10 sm:py-10">
      <div class="container">
        <table
          class="w-full flex flex-row flex-no-wrap bg-white rounded-lg overflow-hidden p-2"
          id="suratJalan"
        >
          <thead class="text-white">
            <tr
              v-for="(print, index) in prints"
              :no="index + 1"
              :key="index"
              :print="print"
              class="bg-blue-500 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
            >
              <th class="p-3 text-left sm:text-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-white dark:border-gray-600"
                />
              </th>
              <th class="p-3 text-left sm:text-center">ITEM</th>
              <th class="p-3 text-left sm:text-center">QTY KIRIM</th>
              <th class="py-4 sm:p-3 text-left sm:text-center">QTY TERIMA</th>
              <th class="py-4 sm:p-3 text-left sm:text-center">KETERANGAN</th>
            </tr>
          </thead>
          <tbody class="flex-1 sm:flex-none mb-2">
            <tr
              v-for="(print, index) in prints"
              :no="index + 1"
              :key="index"
              :print="print"
              class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
            >
              <td class="text-center p-3">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
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
                  class="w-24 form-control flex-1 bg-white text-black"
                />
              </td>
              <td class="py-1 sm:p-3 text-center cursor-pointer">
                <textarea
                  name="keterangan"
                  class="w-32 form-control flex-1 bg-white text-black"
                  id="print-keterangan"
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row bg-white"
    >
      <div class="text-center sm:text-left mt-10 sm:mt-0 bg-white">
        <div class="text-center">
          <div class="text-base text-slate-500">Tanda Terima,</div>
          <div class="">
            {{ mutasi.id_outlet_penerima }} - {{ mutasi.penerima }}
          </div>

          <div class="mt-20">(..............................)</div>
        </div>
      </div>
      <div class="text-center sm:text-right sm:ml-auto bg-white">
        <div class="text-center">
          <div class="text-base text-slate-500">Hormat Pengirim,</div>
          <div class="">
            {{ mutasi.id_outlet_pengirim }} - {{ mutasi.pengirim }}
          </div>

          <div class="mt-20">(..............................)</div>
        </div>
      </div>
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
      Auth,
    };
  },
  data() {
    return {};
  },
  props: {
    prints: {
      type: Object,
    },
    mutasi: {
      type: Object,
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

td {
  border-bottom: 1px solid black;
}

th {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
