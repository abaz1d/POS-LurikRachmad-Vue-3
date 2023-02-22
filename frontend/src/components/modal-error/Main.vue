<template>
  <!-- BEGIN: Modal Databse Error -->
  <Modal :show="errorDatabaseModal" @hidden="errorDatabaseModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <DatabaseIcon
          class="w-16 h-16 text-danger mx-auto mt-3 animate-pulse"
        />
        <div class="text-3xl mt-5">Oops...</div>
        <div class="text-slate-500 mt-2">Tidak Terhubung Dengan Database</div>
      </div>
      <div class="px-5 pb-8 text-center">
        <a
          href=""
          type="button"
          @click="errorDatabaseModal = false"
          class="btn w-24 btn-primary"
        >
          <RefreshCcwIcon class="mr-2 animate-pulse" /> Reload
        </a>
      </div>
      <div
        class="p-5 text-center border-t border-slate-200/60 dark:border-darkmode-400"
      >
        <a
          href="https://api.whatsapp.com/send/?phone=%2B6281548993484&text=Database+aplikasi+POS+mengalami+masalah+&type=phone_number&app_absent=0"
          class="text-primary"
          >&gt; Hubungi
          <b class="font-philosopher text-base text-[#CDA562]">Lurik Rachmad</b>
          &lt;</a
        >
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Modal Databse Error -->
</template>

<script setup>
import { ref } from "vue";

const errorDatabaseModal = ref(false);

defineExpose({ errorDatabaseModal });
</script>
