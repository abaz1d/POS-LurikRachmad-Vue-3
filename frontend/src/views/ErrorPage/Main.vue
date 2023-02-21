<template>
  <div>
    <DarkModeSwitcher />
    <div class="container">
      <!-- BEGIN: Error Page -->
      <div
        class="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left"
      >
        <div class="-intro-x lg:mr-20">
          <img
            width="100"
            height="100"
            alt="Lurik Rachmad HTML"
            class="h-48 lg:h-auto"
            src="@/assets/images/error-illustration.svg"
          />
        </div>
        <div class="text-white mt-10 lg:mt-0">
          <div
            class="intro-x text-8xl font-medium font-philosopher text-white dark:text-[#CDA562]"
          >
            404
          </div>
          <div
            class="intro-x text-xl lg:text-3xl font-medium mt-5 font-philosopher text-white dark:text-[#CDA562]"
          >
            Halaman Tidak Ada
          </div>
          <div
            class="intro-x text-lg mt-3 font-philosopher dark:text-[#CDA562] text-white"
          >
            Mohon maaf, halaman yang anda cari tidak di temukan.
          </div>
          <RouterLink to="/">
            <button
              class="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 mt-10 font-philosopher dark:text-[#CDA562] tracking-wide"
            >
              <b> Kembali ke Dashboard</b>
            </button>
          </RouterLink>
        </div>
      </div>
      <!-- END: Error Page -->
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";

onMounted(() => {
  dom("body").removeClass("main").removeClass("login").addClass("error-page");
});
</script>
