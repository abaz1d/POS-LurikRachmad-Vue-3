<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
            <a href="" class="ml-auto flex items-center text-primary">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Refresh Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <BanknoteIcon class="report-box__icon text-primary" />
                    <div class="ml-auto">
                      <Tippy tag="div" class="report-box__indicator bg-primary cursor-pointer"
                        content="Data per Hari ini">
                        <p class="h-6 text-xs mr-1.5 flex items-center justify-center">{{
                          moment(Date.now()).format("DD MMM YYYY")
                        }}</p>
                        <!-- <CalendarDaysIcon class="w-4 h-4 ml-1 mr-1" /> -->
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">{{
                    currencyFormatter.format(Dashboard.items.profit)
                  }}</div>
                  <div class="text-base text-slate-500 mt-1">Pendapatan</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <ChevronsDownIcon class="report-box__icon text-success" />
                    <div class="ml-auto">
                      <Tippy tag="div" class="report-box__indicator bg-secondary cursor-pointer" content="Uang Masuk">
                        <SmileIcon class="stroke-2 stroke-success w-6 h-6 mr-1.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">{{
                    currencyFormatter.format(Dashboard.items.uangMasuk)
                  }}</div>
                  <div class="text-base text-slate-500 mt-1">Uang Masuk</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <ChevronsUpIcon class="report-box__icon text-danger" />
                    <div class="ml-auto">
                      <Tippy tag="div" class="report-box__indicator bg-secondary cursor-pointer" content="Uang Keluar">
                        <FrownIcon class="stroke-2 stroke-danger w-6 h-6 mr-1.5" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">{{
                    currencyFormatter.format(Dashboard.items.uangKeluar)
                  }}</div>
                  <div class="text-base text-slate-500 mt-1">
                    Uang Keluar
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <ArrowLeftRightIcon class="report-box__icon text-primary" />
                    <div class="ml-auto">
                      <Tippy tag="div" class="report-box__indicator bg-primary cursor-pointer"
                        content="Total Transaksi">
                        {{ Dashboard.items.totaljual }}
                        <ChevronUpIcon class="w-6 h-6 ml-0.5 stroke-2 stroke-success" />
                        <p class="ml-1 mr-2">|</p>
                        {{ Dashboard.items.totalbeli }}
                        <ChevronDownIcon class="w-6 h-6 ml-0.5 stroke-2 stroke-danger" />
                      </Tippy>
                    </div>
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">{{ parseInt(Dashboard.items.totaljual) +
                  parseInt(Dashboard.items.totalbeli) }}</div>
                  <div class="text-base text-slate-500 mt-1">
                    Total Transaksi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->

        <!-- BEGIN: Transactions -->
        <div class="sm:col-span-4 md:col-span-6 xl:col-span-4 col-span-12 mt-0">
          <!-- <div class="intro-x flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Produk Terlaris</h2>
          </div> -->
          <div class="mt-5">
            <div class="intro-x">
              <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                <div class="overflow-x-auto scrollbar-hidden">
                  <div id="tabulatorProduk" ref="tableRefProduk" class="mt-2 table-report table-report--tabulator"></div>
                </div>
              </div>
            </div>
            <!-- <a href=""
              class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-9 text-slate-500">View
              More</a> -->
          </div>
        </div>
        <!-- END: Transactions -->
        <!-- BEGIN: Transactions -->
        <div class="sm:col-span-4 md:col-span-6 xl:col-span-4 col-span-12 mt-0">
          <!-- <div class="intro-x flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Produk Terlaris</h2>
          </div> -->
          <div class="mt-5">
            <div class="intro-x">
              <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                <div class="overflow-x-auto scrollbar-hidden">
                  <div id="tabulatorOutlet" ref="tableRefOutlet" class="mt-2 table-report table-report--tabulator"></div>
                </div>
              </div>
            </div>
            <!-- <a href=""
              class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-9 text-slate-500">View
              More</a> -->
          </div>
        </div>
        <!-- END: Transactions -->
        <div
          class="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 sm:col-span-4 md:col-span-12 xl:col-span-4 col-span-12">

          <h2
            class="text-lg font-medium truncate mr-auto flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
            <ChevronDownIcon class="w-4 h-4 mr-2" /> Notepad
          </h2>
          <div class="mt-2">
            <ClassicEditor class="h-52" v-model="editorData" />
          </div>
          {{ editorData }}
        </div>
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-3">
      <div class="2xl:border-l -mb-10 pb-10">
        <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
          <!-- BEGIN: Important Notes -->
          <div
            class="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3 2xl:mt-8">
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-auto">
                Important Notes
              </h2>
              <button data-carousel="important-notes" data-target="prev"
                class="tiny-slider-navigator btn px-2 border-slate-9 text-slate-600 dark:text-slate-9 mr-2"
                @click="prevImportantNotes">
                <ChevronLeftIcon class="w-4 h-4" />
              </button>
              <button data-carousel="important-notes" data-target="next"
                class="tiny-slider-navigator btn px-2 border-slate-9 text-slate-600 dark:text-slate-9 mr-2"
                @click="nextImportantNotes">
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
                    <div class="text-slate-400 mt-1"><b class="font-philosopher text-[#CDA562]">Lurik Rachmad - Sejak 1960</b></div>
                    <div class="text-slate-500 text-justify mt-1">
                      Dalam menambah atau mengahpus data pastikan telah sesuai dengan prosedur yang telah dibuat
                      perusahaan.
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Jangan Lupa Keluar Akun
                    </div>
                    <div class="text-slate-400 mt-1"><b class="font-philosopher text-[#CDA562]">Lurik Rachmad - Sejak 1960</b></div>
                    <div class="text-slate-500 text-justify mt-1">
                      Setelah selsai menggunakan aplikasi jangan lupa dan pastikan akun anda telah keluar dari aplikasi
                      untuk menjaga keamanan data perushaaan.
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="text-base font-medium truncate">
                      Laporkan Bug atau Erorr
                    </div>
                    <div class="text-slate-400 mt-1"><b class="font-philosopher text-[#CDA562]">Lurik Rachmad - Sejak 1960</b></div>
                    <div class="text-slate-500 text-justify mt-1">
                      Ketika menemukan bug atau erorr dalam aplikasi jangan lupa untuk melapor pada divisi yang terkait
                      untuk terus memperbaiki dan mengembangkan aplikasi agar lebih baik lagi.
                    </div>
                  </div>
                </TinySlider>
              </div>
            </div>
          </div>
          <!-- END: Important Notes -->
          <!-- BEGIN: Schedules -->
          <div
            class="col-span-12 md:col-span-6 xl:col-span-12 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-0">
            <div class="intro-x flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Kalender</h2>
              <a href="" class="ml-auto text-primary truncate flex items-center">
                <PlusIcon class="w-4 h-4 mr-1" /> Add New Schedules
              </a>
            </div>
            <div class="mt-5">
              <div class="intro-x box">
                <div class="p-5">
                  <div class="flex">
                    <ChevronLeftIcon class="w-5 h-5 text-slate-500" />
                    <div class="font-medium text-base mx-auto">April</div>
                    <ChevronRightIcon class="w-5 h-5 text-slate-500" />
                  </div>
                  <div class="grid grid-cols-7 gap-4 mt-5 text-center">
                    <div class="font-medium">Su</div>
                    <div class="font-medium">Mo</div>
                    <div class="font-medium">Tu</div>
                    <div class="font-medium">We</div>
                    <div class="font-medium">Th</div>
                    <div class="font-medium">Fr</div>
                    <div class="font-medium">Sa</div>
                    <div class="py-0.5 rounded relative text-slate-500">29</div>
                    <div class="py-0.5 rounded relative text-slate-500">30</div>
                    <div class="py-0.5 rounded relative text-slate-500">31</div>
                    <div class="py-0.5 rounded relative">1</div>
                    <div class="py-0.5 rounded relative">2</div>
                    <div class="py-0.5 rounded relative">3</div>
                    <div class="py-0.5 rounded relative">4</div>
                    <div class="py-0.5 rounded relative">5</div>
                    <div class="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">
                      6
                    </div>
                    <div class="py-0.5 rounded relative">7</div>
                    <div class="py-0.5 bg-primary text-white rounded relative">
                      8
                    </div>
                    <div class="py-0.5 rounded relative">9</div>
                    <div class="py-0.5 rounded relative">10</div>
                    <div class="py-0.5 rounded relative">11</div>
                    <div class="py-0.5 rounded relative">12</div>
                    <div class="py-0.5 rounded relative">13</div>
                    <div class="py-0.5 rounded relative">14</div>
                    <div class="py-0.5 rounded relative">15</div>
                    <div class="py-0.5 rounded relative">16</div>
                    <div class="py-0.5 rounded relative">17</div>
                    <div class="py-0.5 rounded relative">18</div>
                    <div class="py-0.5 rounded relative">19</div>
                    <div class="py-0.5 rounded relative">20</div>
                    <div class="py-0.5 rounded relative">21</div>
                    <div class="py-0.5 rounded relative">22</div>
                    <div class="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">
                      23
                    </div>
                    <div class="py-0.5 rounded relative">24</div>
                    <div class="py-0.5 rounded relative">25</div>
                    <div class="py-0.5 rounded relative">26</div>
                    <div class="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">
                      27
                    </div>
                    <div class="py-0.5 rounded relative">28</div>
                    <div class="py-0.5 rounded relative">29</div>
                    <div class="py-0.5 rounded relative">30</div>
                    <div class="py-0.5 rounded relative text-slate-500">1</div>
                    <div class="py-0.5 rounded relative text-slate-500">2</div>
                    <div class="py-0.5 rounded relative text-slate-500">3</div>
                    <div class="py-0.5 rounded relative text-slate-500">4</div>
                    <div class="py-0.5 rounded relative text-slate-500">5</div>
                    <div class="py-0.5 rounded relative text-slate-500">6</div>
                    <div class="py-0.5 rounded relative text-slate-500">7</div>
                    <div class="py-0.5 rounded relative text-slate-500">8</div>
                    <div class="py-0.5 rounded relative text-slate-500">9</div>
                  </div>
                </div>
                <!-- <div class="border-t border-slate-200/60 p-5">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                    <span class="truncate">UI/UX Workshop</span>
                    <span class="font-medium xl:ml-auto">23th</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="truncate">VueJs Frontend Development</span>
                    <span class="font-medium xl:ml-auto">10th</span>
                  </div>
                  <div class="flex items-center mt-4">
                    <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
                    <span class="truncate">Laravel Rest API</span>
                    <span class="font-medium xl:ml-auto">31th</span>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
          <!-- END: Schedules -->



        </div>
      </div>
    </div>
  </div>
  <!-- BEGIN: Basic Non Sticky Notification Content -->
  <Notification refKey="basicNonStickyNotification" :options="{
    duration: 10000,
  }" class="flex flex-col sm:flex-row hover:animate-none md:animate-bounce animate-pulse ">
    <div class="font-medium">Selamat Datang di Aplikasi Point of Sales <b class="font-philosopher text-2xl text-[#CDA562]">Lurik Rachmad</b></div>
  </Notification>
  <!-- END: Basic Non Sticky Notification Content -->
</template>

<script setup>
import { useDashboardStore } from "../../stores/dashboard";
import { currencyFormatter } from "../../utils/helper";
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { ref, provide, reactive, onMounted, watch } from "vue";
import { createIcons, icons } from "lucide";
import moment from "moment";

const publicPath = import.meta.env.VITE_APP_BASE_API;
const Dashboard = useDashboardStore();
const tableRefProduk = ref();
const tabulatorProduk = ref();
const tableRefOutlet = ref();
const tabulatorOutlet = ref();


const template = document.createElement('template');
template.innerHTML = '<div style="display:inline-block;" class="d-flex flex-row">' +
  '<div>Loading... </div>' +
  '<div class="ml-2 activity-sm" data-role="activity" data-type="atom" data-style="dark"></div>' +
  '</div>';
const dataLoaderLoading = template.content.firstChild;

const initTabulatorProduk = () => {
  tabulatorProduk.value = new Tabulator(tableRefProduk.value, {
    data: Dashboard.items.topproduct,
    dataLoaderLoading: dataLoaderLoading,
    pagination: "remote",
    paginationSize: 3,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitDataFill",
    // responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      tooltip: function (e, cell, onRendered) {
        //e - mouseover event
        //cell - cell component
        //onRendered - onRendered callback registration function

        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";

        return el;
      },
    },
    columns: [
      // {
      //   formatter: "responsiveCollapse",
      //   width: 40,
      //   minWidth: 30,
      //   hozAlign: "center",
      //   resizable: false,
      //   headerSort: false,
      // },

      // For HTML table
      {
        title: "PRODUK TERLARIS",
        minWidth: 390,
        field: "nama_varian",
        // hozAlign: "center",
        // vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          return `<div class="intro-x min-w-fit sm:min-w-max">
              <div class="box px-5 py-3 flex items-center zoom-in">
                <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                  <img
          src="${getImgUrl(cell.getData().gambar_varian)}"
          alt="${cell.getData().gambar_varian}"
          data-action="zoom"
          class="w-full rounded-md"
        />
                </div>
                <div class="ml-4 sm:mr-auto mr-1.5 sm:mt-auto mt-5">
                  <div class="font-medium">
                    ${cell.getData().nama_barang} - ${cell.getData().nama_varian}
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
    //subTable.redraw();
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
    dataLoaderLoading: dataLoaderLoading,
    pagination: "remote",
    paginationSize: 3,
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    // responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      tooltip: function (e, cell, onRendered) {
        //e - mouseover event
        //cell - cell component
        //onRendered - onRendered callback registration function

        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";

        return el;
      },
    },
    columns: [
      // {
      //   formatter: "responsiveCollapse",
      //   width: 40,
      //   minWidth: 30,
      //   hozAlign: "center",
      //   resizable: false,
      //   headerSort: false,
      // },

      // For HTML table
      {
        title: "OUTLET TERLARIS",
        minWidth: 390,
        field: "nama_outlet",
        // hozAlign: "center",
        // vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="intro-x">
              <div class="box py-1 flex items-center zoom-in">
                
                <div class="mr-auto">
                  <div class="font-medium">
                    ${cell.getData().id_outlet} - ${cell.getData().nama_outlet} 
                    <p class="text-success my-0.5">
                      ${cell.getData().kontak_outlet}
                    </p>
                  </div>
                  <div class="text-slate-500 text-xs mt-0.5">
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
    //subTable.redraw();
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
    tabulatorProduk.value.redraw();
    tabulatorOutlet.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

const getImgUrl = (gambar_varian) => {
  //console.log('gambar_varian',gambar_varian)
  var images = gambar_varian.data
    .map((b) => String.fromCharCode(b))
    .join("");
  var image = new URL(`${publicPath}gambar/${images}`).href;

  return image;
}

//----------------------------------------------------------------

// Basic non sticky notification
const basicNonStickyNotification = ref();
provide("bind[basicNonStickyNotification]", (el) => {
  // Binding
  basicNonStickyNotification.value = el;
});
const basicNonStickyNotificationToggle = () => {
  // Show notification
  basicNonStickyNotification.value.showToast();
};

//----------------------------------------------------------------
const importantNotesRef = ref();

const editorData = ref("<p>Rencananya akan menjadi notepad serba bisa.</p>");

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

onMounted(async function () {
  try {
    const data = await Dashboard.readItem()
    initTabulatorProduk();
    initTabulatorOutlet()
    reInitOnResizeWindow();
    basicNonStickyNotificationToggle();
  } catch (error) {
    alert("onMounted" + error)
  }
});

</script>