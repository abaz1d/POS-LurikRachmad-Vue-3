<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Page 2</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="intro-y box p-5 mt-5">Example page 2</div>
  <!-- END: Page Layout -->



  <!-- BEGIN: Modal Toggle -->
  <div class="text-center">
    <a href="javascript:;" @click="isModal = true; renderQrScanner();" class="btn btn-primary">QR
      Scanner</a>
  </div>
  <!-- END: Modal Toggle -->
  <!-- BEGIN: Modal Content -->

  <Modal size="modal-xl" backdrop="static" :show="isModal" @hidden="isModal = false">
    <ModalHeader>
      <div class="text-center mt-2">
        <h2 class="text-lg font-bold">QR Code Scanner</h2>
      </div>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="mb-5">
          <div class="intro-y justify-center flex mt-5">
            <qrcode v-bind:qrbox="250" v-bind:fps="10" ref="qrScanner" />
          </div>
        </div>
        <button type="button" @click="isModal = false; closeQrScanner();" class="btn btn-danger w-24">
          Close
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->
  <button type="button" @click="Satuan.readItem" class="btn btn-primary w-24">Close</button>
  <li v-for="item in Satuan.items" :key="item.id_satuan"> {{item.id_satuan}} - {{item.nama_satuan}}</li>

</template>

<script>
import qrcode from './QrCode.vue'
import { ref } from "vue";
import { useSatuanStore } from "../../stores/satuan"

const isModal = ref(false);
// const haha = ref(true)


export default {
  setup() {
    const Satuan = useSatuanStore();
    return {Satuan}
  },
  components: {
    qrcode,
  },
  data() {
    return {
      isModal,
    };
  },
  methods: {
    renderQrScanner() {
      this.$refs.qrScanner.renderQrScanner()
    },
   closeQrScanner() {
      this.$refs.qrScanner.closeQrScanner()
    }

  },
  mounted() {
    this.Satuan.readItem()
  }
}
</script>

<style scoped>

</style>