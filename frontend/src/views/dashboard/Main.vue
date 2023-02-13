<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8" v-if="data.role == 'Super Admin'">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
            <a href="" class="ml-auto flex items-center text-primary">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Refresh Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5 overflow-x-auto">
                  <div class="flex">
                    <BanknoteIcon class="report-box__icon text-primary" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-primary cursor-pointer"
                        content="Data per Hari ini"
                      >
                        <p
                          class="h-6 text-xs mr-1.5 flex items-center justify-center"
                        >
                          {{ moment(Date.now()).format("DD MMM YYYY") }}
                        </p>
                      </Tippy>
                    </div>
                  </div>
                  <div
                    class="text-3xl font-medium leading-8 mt-6 whitespace-nowrap"
                  >
                    {{ currencyFormatter.format(Dashboard.items.profit) }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">Pendapatan</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5 overflow-x-auto">
                  <div class="flex">
                    <ChevronsDownIcon class="report-box__icon text-success" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-secondary cursor-pointer"
                        content="Uang Masuk"
                      >
                        <SmileIcon
                          class="stroke-2 stroke-success w-6 h-6 mr-1.5"
                        />
                      </Tippy>
                    </div>
                  </div>
                  <div
                    class="text-3xl font-medium leading-8 mt-6 whitespace-nowrap"
                  >
                    {{ currencyFormatter.format(Dashboard.items.uangMasuk) }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">Uang Masuk</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5 overflow-x-auto">
                  <div class="flex">
                    <ChevronsUpIcon class="report-box__icon text-danger" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-secondary cursor-pointer"
                        content="Uang Keluar"
                      >
                        <FrownIcon
                          class="stroke-2 stroke-danger w-6 h-6 mr-1.5"
                        />
                      </Tippy>
                    </div>
                  </div>
                  <div
                    class="text-3xl font-medium leading-8 mt-6 whitespace-nowrap"
                  >
                    {{ currencyFormatter.format(Dashboard.items.uangKeluar) }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">Uang Keluar</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5 overflow-x-auto">
                  <div class="flex">
                    <ArrowLeftRightIcon class="report-box__icon text-primary" />
                    <div class="ml-auto">
                      <Tippy
                        tag="div"
                        class="report-box__indicator bg-primary cursor-pointer"
                        content="Total Transaksi"
                      >
                        {{ Dashboard.items.totaljual }}
                        <ChevronUpIcon
                          class="w-6 h-6 ml-0.5 stroke-2 stroke-success"
                        />
                        <p class="ml-1 mr-2">|</p>
                        {{ Dashboard.items.totalbeli }}
                        <ChevronDownIcon
                          class="w-6 h-6 ml-0.5 stroke-2 stroke-danger"
                        />
                      </Tippy>
                    </div>
                  </div>
                  <div
                    class="text-3xl font-medium leading-8 mt-6 whitespace-nowrap"
                  >
                    {{
                      parseInt(Dashboard.items.totaljual) +
                      parseInt(Dashboard.items.totalbeli)
                    }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">
                    Total Transaksi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->

        <TabGroup
          v-if="data.role == 'Super Admin'"
          class="sm:col-span-8 md:col-span-12 xl:col-span-8 col-span-12 mt-5"
        >
          <TabList class="nav-boxed-tabs">
            <Tab class="w-full py-2" tag="button">TERLARIS</Tab>
            <Tab class="w-full py-2" tag="button">TRANSAKSI HARI INI</Tab>
          </TabList>
          <ChevronDownIcon class="mt-3 mx-auto motion-safe:animate-bounce" />
          <TabPanels
            class="mt-2 box border-dashed border-2 border-primary dark:border-white/50"
          >
            <TabPanel class="leading-relaxed grid grid-cols-12 gap-2 p-2">
              <div
                class="sm:col-span-6 md:col-span-6 xl:col-span-6 col-span-12 mt-0"
              >
                <div class="mt-0">
                  <div class="intro-x">
                    <div class="box py-3 mb-3 flex items-center zoom-in">
                      <div class="overflow-x-auto scrollbar-hidden">
                        <div
                          id="tabulatorProduk"
                          ref="tableRefProduk"
                          class="mt-2 table-report table-report--tabulator"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="sm:col-span-6 md:col-span-6 xl:col-span-6 col-span-12 mt-0"
              >
                <div class="mt-0">
                  <div class="intro-x">
                    <div class="box py-3 mb-3 flex items-center zoom-in">
                      <div class="overflow-x-auto scrollbar-hidden">
                        <div
                          id="tabulatorOutlet"
                          ref="tableRefOutlet"
                          class="mt-2 table-report table-report--tabulator"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel class="leading-relaxed grid grid-cols-12 gap-2 p-2">
              <div
                class="sm:col-span-6 md:col-span-6 xl:col-span-6 col-span-12 mt-0"
              >
                <div class="mt-0">
                  <div class="intro-x">
                    <div class="box py-3 mb-3 flex items-center zoom-in">
                      <div class="overflow-x-auto scrollbar-hidden">
                        <div
                          id="tabulatorJual"
                          ref="tableRefJual"
                          class="mt-2 table-report table-report--tabulator"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="sm:col-span-6 md:col-span-6 xl:col-span-6 col-span-12 mt-0"
              >
                <div class="mt-0">
                  <div class="intro-x">
                    <div class="box py-3 mb-3 flex items-center zoom-in">
                      <div class="overflow-x-auto scrollbar-hidden">
                        <div
                          id="tabulatorBeli"
                          ref="tableRefBeli"
                          class="mt-2 table-report table-report--tabulator"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <TabGroup
          v-else
          class="sm:col-span-8 md:col-span-12 xl:col-span-8 col-span-12 mt-5"
        >
          <TabList class="nav-boxed-tabs">
            <Tab class="w-full py-2" tag="button">TRANSAKSI HARI INI</Tab>
          </TabList>
          <ChevronDownIcon class="mt-3 mx-auto motion-safe:animate-bounce" />
          <TabPanels
            class="mt-2 box border-dashed border-2 border-primary dark:border-white/50"
          >
            <TabPanel class="leading-relaxed grid grid-cols-12 gap-2 p-2">
              <div
                class="sm:col-span-6 md:col-span-6 xl:col-span-6 col-span-12 mt-0"
              >
                <div class="mt-0">
                  <div class="intro-x">
                    <div class="box py-3 mb-3 flex items-center zoom-in">
                      <div class="overflow-x-auto scrollbar-hidden">
                        <div
                          id="tabulatorJual"
                          ref="tableRefJual"
                          class="mt-2 table-report table-report--tabulator"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="sm:col-span-6 md:col-span-6 xl:col-span-6 col-span-12 mt-0"
              >
                <div class="mt-0">
                  <div class="intro-x">
                    <div class="box py-3 mb-3 flex items-center zoom-in">
                      <div class="overflow-x-auto scrollbar-hidden">
                        <div
                          id="tabulatorBeli"
                          ref="tableRefBeli"
                          class="mt-2 table-report table-report--tabulator"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- BEGIN: Important Notepad -->
        <div
          class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 sm:col-span-4 md:col-span-12 xl:col-span-4 col-span-12"
        >
          <h2
            @click="isSave = true"
            class="text-lg font-medium truncate mr-auto flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 cursor-pointer hover:text-primary"
          >
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Notepad
            <Loader2Icon
              v-if="isSave"
              class="motion-safe:animate-spin w-4 h-4 ml-2"
            />
          </h2>
          <span class="text-xs"
            >Klik
            <kbd
              class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
              >Notepad</kbd
            >
            di atas atau Klik
            <kbd
              class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
              >Ctrl</kbd
            >
            +
            <kbd
              class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
              >Enter</kbd
            >
            untuk menyimpan.
          </span>
          <div class="mt-2" @keyup.ctrl.enter="isSave = true">
            <ClassicEditor class="h-52" v-model="editorData" />
          </div>
        </div>
        <!-- END: Important Notepad -->

        <!-- BEGIN: Important Notes -->
        <div
          v-if="data.role != 'Super Admin'"
          class="col-span-12 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3"
        >
          <div class="intro-x flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-auto">
              Important Notes
            </h2>
            <button
              data-carousel="important-notes"
              data-target="prev"
              class="tiny-slider-navigator btn px-2 border-slate-9 text-slate-600 dark:text-slate-9 mr-2"
              @click="prevImportantNotes"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            <button
              data-carousel="important-notes"
              data-target="next"
              class="tiny-slider-navigator btn px-2 border-slate-9 text-slate-600 dark:text-slate-9 mr-2"
              @click="nextImportantNotes"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="mt-5 intro-x">
            <div class="box zoom-in">
              <TinySlider ref-key="importantNotesRef">
                <div class="p-5">
                  <div class="text-base font-medium truncate">
                    Lakukan Semuanya Sesuai Prosedur
                  </div>
                  <div class="text-slate-400 mt-1">
                    <b class="font-philosopher text-[#CDA562]"
                      >Lurik Rachmad - Sejak 1960</b
                    >
                  </div>
                  <div class="text-slate-500 text-justify mt-1">
                    Dalam menambah atau mengahpus data pastikan telah sesuai
                    dengan prosedur yang telah dibuat perusahaan.
                  </div>
                </div>

                <div class="p-5">
                  <div class="text-base font-medium truncate">
                    Jangan Lupa Keluar Akun
                  </div>
                  <div class="text-slate-400 mt-1">
                    <b class="font-philosopher text-[#CDA562]"
                      >Lurik Rachmad - Sejak 1960</b
                    >
                  </div>
                  <div class="text-slate-500 text-justify mt-1">
                    Setelah selsai menggunakan aplikasi jangan lupa dan pastikan
                    akun anda telah keluar dari aplikasi untuk menjaga keamanan
                    data perushaaan.
                  </div>
                </div>

                <div class="p-5">
                  <div class="text-base font-medium truncate">
                    Laporkan Bug atau Erorr
                  </div>
                  <div class="text-slate-400 mt-1">
                    <b class="font-philosopher text-[#CDA562]"
                      >Lurik Rachmad - Sejak 1960</b
                    >
                  </div>
                  <div class="text-slate-500 text-justify mt-1">
                    Ketika menemukan bug atau erorr dalam aplikasi jangan lupa
                    untuk melapor pada divisi yang terkait untuk terus
                    memperbaiki dan mengembangkan aplikasi agar lebih baik lagi.
                  </div>
                </div>
              </TinySlider>
            </div>
          </div>
        </div>
        <!-- END: Important Notes -->
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-3">
      <div class="2xl:border-l -mb-10 pb-10">
        <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
          <!-- BEGIN: Important Notes -->
          <div
            v-if="data.role == 'Super Admin'"
            class="col-span-12 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3 2xl:mt-8 -mb-5"
          >
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-auto">
                Important Notes
              </h2>
              <button
                data-carousel="important-notes"
                data-target="prev"
                class="tiny-slider-navigator btn px-2 border-slate-9 text-slate-600 dark:text-slate-9 mr-2"
                @click="prevImportantNotes"
              >
                <ChevronLeftIcon class="w-4 h-4" />
              </button>
              <button
                data-carousel="important-notes"
                data-target="next"
                class="tiny-slider-navigator btn px-2 border-slate-9 text-slate-600 dark:text-slate-9 mr-2"
                @click="nextImportantNotes"
              >
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </div>
            <div class="mt-5 intro-x">
              <div class="box zoom-in">
                <TinySlider ref-key="importantNotesRef">
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Lakukan Semuanya Sesuai Prosedur
                    </div>
                    <div class="text-slate-400 mt-1">
                      <b class="font-philosopher text-[#CDA562]"
                        >Lurik Rachmad - Sejak 1960</b
                      >
                    </div>
                    <div class="text-slate-500 text-justify mt-1">
                      Dalam menambah atau mengahpus data pastikan telah sesuai
                      dengan prosedur yang telah dibuat perusahaan.
                    </div>
                  </div>

                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Jangan Lupa Keluar Akun
                    </div>
                    <div class="text-slate-400 mt-1">
                      <b class="font-philosopher text-[#CDA562]"
                        >Lurik Rachmad - Sejak 1960</b
                      >
                    </div>
                    <div class="text-slate-500 text-justify mt-1">
                      Setelah selsai menggunakan aplikasi jangan lupa dan
                      pastikan akun anda telah keluar dari aplikasi untuk
                      menjaga keamanan data perushaaan.
                    </div>
                  </div>

                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Laporkan Bug atau Erorr
                    </div>
                    <div class="text-slate-400 mt-1">
                      <b class="font-philosopher text-[#CDA562]"
                        >Lurik Rachmad - Sejak 1960</b
                      >
                    </div>
                    <div class="text-slate-500 text-justify mt-1">
                      Ketika menemukan bug atau erorr dalam aplikasi jangan lupa
                      untuk melapor pada divisi yang terkait untuk terus
                      memperbaiki dan mengembangkan aplikasi agar lebih baik
                      lagi.
                    </div>
                  </div>
                </TinySlider>
              </div>
            </div>
          </div>
          <!-- END: Important Notes -->
          <!-- BEGIN: Schedules -->
          <div
            class="col-span-12 xl:col-span-12 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-4"
          >
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Kalender</h2>
            </div>
            <div class="mt-5">
              <div class="intro-x box">
                <div class="p-5">
                  <Calendar ref="fullCalender" />
                </div>
              </div>
            </div>
          </div>
          <!-- END: Schedules -->
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="isLoading"
    wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
  >
    <Loader2Icon
      class="motion-safe:animate-spin stroke-[10px] text-white h-12 w-12 mb-4"
    />
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">
      Ini mungkin memakan waktu beberapa detik, tolong jangan tutup halaman ini.
    </p>
  </div>

  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import Calendar from "@/components/calendar/Main.vue";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useDashboardStore } from "@/stores/dashboard";
import { currencyFormatter } from "@/utils/helper";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { ref, provide, onMounted, watch, onBeforeUnmount } from "vue";
import { createIcons, icons } from "lucide";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
const Auth = useAuthStore();
const isLoading = ref(false);

const publicPath = import.meta.env.VITE_APP_BASE_API;
const Dashboard = useDashboardStore();

const tableRefProduk = ref();
const tabulatorProduk = ref();

const tableRefOutlet = ref();
const tabulatorOutlet = ref();

const tableRefJual = ref();
const tabulatorJual = ref();

const tableRefBeli = ref();
const tabulatorBeli = ref();

const modalErrorRef = ref();
const fullCalender = ref();
const isSave = ref(false);
const data = ref([]);

const initTabulatorProduk = () => {
  tabulatorProduk.value = new Tabulator(tableRefProduk.value, {
    data: Dashboard.items.topproduct,
    pagination: "remote",
    paginationSize: 3,
    paginationSizeSelector: [3, 5],
    layout: "fitDataFill",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText =
          cell.getData().id_varian + " - " + cell.getData().nama_varian;
        return el;
      },
    },
    columns: [
      // For HTML table
      {
        title: "PRODUK TERLARIS",
        minWidth: 390,
        field: "qty",
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="intro-x min-w-fit sm:min-w-max">
              <div class="box px-5 py-3 flex items-center zoom-in">
                <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                  <img decoding="async" loading="lazy"
                  width="100" height="100"
          src="${getImgUrl(cell.getData().gambar_varian)}"
          alt="${cell.getData().gambar_varian}"
          data-action="zoom"
          class="w-full rounded-md"
        />
                </div>
                <div class="ml-4 sm:mr-auto mr-1.5 sm:mt-auto mt-5">
                  <div class="font-medium">
                    ${cell.getData().nama_barang} - ${
            cell.getData().nama_varian
          }
                  </div>
                  <div class="text-slate-500 text-xs mt-0.5">
                    ${cell.getData().id_varian}
                  </div>
                </div>
                <div class="text-primary">
                ${cell.getData().qty}
                ${cell.getData().nama_satuan}
                </div>
              </div>
            </div>`;
        },
      },
    ],
  });
  tabulatorProduk.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};
const initTabulatorOutlet = () => {
  tabulatorOutlet.value = new Tabulator(tableRefOutlet.value, {
    data: Dashboard.items.topoutlet,
    pagination: "remote",
    paginationSize: 3,
    paginationSizeSelector: [3, 5],
    layout: "fitColumns",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText =
          cell.getData().id_outlet + " - " + cell.getData().nama_outlet; //return cells "field - value";

        return el;
      },
    },
    columns: [
      {
        title: "OUTLET TERLARIS",
        minWidth: 390,
        field: "total_jual",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="intro-x">
              <div class="box py-1 flex items-center zoom-in">
                
                <div class="ml-5 mr-autoc">
                  <div class="font-medium">
                    ${cell.getData().id_outlet} - ${cell.getData().nama_outlet} 
                    <p class="text-success my-0.5">
                      ${cell.getData().kontak_outlet}
                    </p>
                  </div>
                  <div class="text-slate-500 text-xs mt-0.5 whitespace-normal">
                    ${cell.getData().alamat_outlet}
                  </div>
                </div>
              </div>
            </div>`);
          return a[0];
        },
      },
    ],
  });
  tabulatorProduk.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

const initTabulatorJual = () => {
  tabulatorJual.value = new Tabulator(tableRefJual.value, {
    data: Dashboard.items.jualHariIni,
    pagination: "remote",
    paginationSize: 3,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";

        return el;
      },
    },
    columns: [
      // For HTML table
      {
        title: "PENJUALAN HARI INI",
        minWidth: 390,
        field: "no_invoice",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="intro-x">
              <div class="box py-1 flex items-center zoom-in">
                
                <div class="ml-5 mr-auto">
                  <div class="font-medium">
                    ${cell.getData().no_invoice}
                    <p class="text-success my-0.5">
                      ${moment(cell.getData().tanggal_penjualan).format(
                        "DD MMM YYYY"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>`);
          return a[0];
        },
      },
    ],
  });
  tabulatorJual.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

const initTabulatorBeli = () => {
  tabulatorBeli.value = new Tabulator(tableRefBeli.value, {
    data: Dashboard.items.beliHariIni,
    pagination: "remote",
    paginationSize: 3,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue();
        return el;
      },
    },
    columns: [
      // For HTML table
      {
        title: "PEMBELIAN HARI INI",
        minWidth: 390,
        field: "no_invoice",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="intro-x">
              <div class="box py-1 flex items-center zoom-in">
                <div class="ml-5 mr-auto">
                  <div class="font-medium">
                    ${cell.getData().no_invoice}
                    <p class="text-success my-0.5">
                      ${moment(cell.getData().tanggal_pembelian).format(
                        "DD MMM YYYY"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>`);
          return a[0];
        },
      },
    ],
  });
  tabulatorJual.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    if (Auth.items.role == "Super Admin") {
      tabulatorProduk.value.redraw();
      tabulatorOutlet.value.redraw();
    }
    tabulatorJual.value.redraw();
    tabulatorBeli.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

const getImgUrl = (gambar_varian) => {
  var images = gambar_varian.data.map((b) => String.fromCharCode(b)).join("");
  var image = new URL(`${publicPath}gambar/${images}`).href;

  return image;
};
const editorData = ref("");
const simpanNotepad = async () => {
  const id = data.value.userid;
  const notepad = editorData.value;
  await Dashboard.updateNotepad(id, notepad);
  isSave.value = false;
};

const importantNotesRef = ref();

provide("bind[importantNotesRef]", (el) => {
  importantNotesRef.value = el;
});

const prevImportantNotes = () => {
  const el = importantNotesRef.value;
  el.tns.goTo("prev");
};

const nextImportantNotes = () => {
  const el = importantNotesRef.value;
  el.tns.goTo("next");
};

watch(
  isSave,
  async (newValue) => {
    try {
      if (newValue == true) {
        simpanNotepad();
      }
    } catch (error) {
      alert("Gagal watch save notepad" + error);
    }
  },
  { immediate: false }
);

onMounted(async function () {
  const id = Auth.items.userid;
  try {
    isLoading.value = true;
    data.value = await Dashboard.readItem();
    const notepad = await Dashboard.getNotepad(id);
    editorData.value = notepad === null ? "" : notepad;
    if (Auth.items.role == "Super Admin") {
      initTabulatorProduk();
      initTabulatorOutlet();
    }
    initTabulatorJual();
    initTabulatorBeli();
    reInitOnResizeWindow();
    modalErrorRef.value.errorDatabaseModal = false;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = true;
  }
});

onBeforeUnmount(async () => {
  if (editorData.value !== "" || null) {
    simpanNotepad();
    isLoading.value = false;
  }
});
</script>
