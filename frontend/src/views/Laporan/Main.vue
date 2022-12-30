<template>
   <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Halaman Laporan</h2>
  </div>
  <TabGroup class="post intro-y overflow-hidden box mt-5">
        <TabList
          class="post__tabs nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800"
        >
          <Tab :fullWidth="false" class="w-full sm:w-52 py-0 px-0" tag="button">
            <Tippy
              content="Laporan Penjualan general atau /outlet"
              class="tooltip w-full flex items-center justify-center py-4"
              aria-controls="content"
              aria-selected="true"
            >
              <ChevronsUpIcon class="w-4 h-4 mr-2" /> Laporan Penjualan
            </Tippy>
          </Tab>
          <Tab :fullWidth="false" class="w-full sm:w-52 py-0 px-0" tag="button">
            <Tippy
              content="Laporan Pembelian /pemasok"
              class="tooltip w-full flex items-center justify-center py-4"
              aria-selected="false"
            >
              <ChevronsDownIcon class="w-4 h-4 mr-2" /> Laporan Pembelian
            </Tippy>
          </Tab>
          <Tab :fullWidth="false" class="w-full sm:w-52 py-0 px-0" tag="button">
            <Tippy
              content="Laporan Stok general atau /outlet"
              class="tooltip w-full flex items-center justify-center py-4"
              aria-selected="false"
            >
              <PackageOpenIcon class="w-4 h-4 mr-2" /> Laporan Stok
            </Tippy>
          </Tab>
        </TabList>
        <TabPanels class="post__content">
          <TabPanel class="p-5">
            <h1>Laporan1</h1>
          </TabPanel>
          <TabPanel class="p-5">
            <h1>Laporan2</h1>
          </TabPanel>
          <TabPanel class="p-5">
            <h1>Laporan3</h1>
          </TabPanel>
        </TabPanels>
      </TabGroup>
</template>

<script setup>
import { ref } from "vue";

const categories = ref(["1", "2"]);
const tags = ref(["1", "2"]);
const salesReportFilter = ref("");
const editorData = ref("<p>Content of the editor.</p>");
</script>