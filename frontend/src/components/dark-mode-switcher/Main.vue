<template>
  <!-- BEGIN: Dark Mode Switcher-->

  <ScrollTopComponent>
    <ChevronUpIcon
      class="w-11 h-11 dark:stroke-white"
      style="border-radius: 50px"
    />
  </ScrollTopComponent>

  <div
    class="dark-mode-switcher cursor-pointer shadow-md fixed bottom-0 right-0 box border rounded-full w-10 h-10 flex items-center justify-center z-50 mb-8"
    style="margin-right: 100px"
    @click="switchMode"
    :style="
      darkMode
        ? 'background-color: white; box-shadow: 0 0 25px white, 0 0 15px white;'
        : 'background-color: yellow; box-shadow: 0 0 25px yellow, 0 0 15px yellow;'
    "
  >
    <div
      v-if="!darkMode"
      class="text-slate-600 dark:text-slate-200 rounded-full"
    >
      <SunIcon
        class="w-8 h-8"
        style="
          color: black; /*box-shadow: 0 0 25px yellow, 0 0 15px yellow;*/
          border-radius: 50px;
        "
      />
    </div>
    <div v-else class="text-slate-600 dark:text-slate-200 rounded-full">
      <MoonIcon
        class="w-8 h-8"
        style="
          color: black; /*box-shadow: 0 0 25px white, 0 0 15px white;*/
          border-radius: 50px;
        "
      />
    </div>
  </div>
  <!-- END: Dark Mode Switcher-->
</template>

<script setup>
import { computed } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import dom from "@left4code/tw-starter/dist/js/dom";
import ScrollTopComponent from "@/components/scroll-top-page/Main.vue";

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

const setDarkModeClass = () => {
  darkMode.value
    ? dom("html").addClass("dark")
    : dom("html").removeClass("dark");
};

const switchMode = () => {
  darkModeStore.setDarkMode(!darkMode.value);
  setDarkModeClass();
};

setDarkModeClass();
</script>
