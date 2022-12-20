<template>

  <form action="" class="relative mx-auto w-max items-center justify-center">
    <input type="search"
      class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text  focus:pl-16 focus:pr-4 search__input form-control border-transparent" />
    <!-- <svg xmlns="http://www.w3.org/2000/svg"
      class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-slate-300 peer-focus:stroke-slate-500"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg> -->
    <SearchIcon class="absolute inset-y-0 my-auto h-8 w-12 px-3.5 mr-0 search__icon dark:text-slate-500" />
  </form>

  <div class="search hidden sm:block">
    <input type="text" class="search__input form-control border-transparent" placeholder="Search..."
      @focus="showSearchDropdown" @blur="hideSearchDropdown" />
    <SearchIcon class="search__icon dark:text-slate-500" />
  </div>

  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Page 2</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="intro-y box p-5 mt-5">Example page 2</div>
  <!-- END: Page Layout -->

  <AccordionGroup>
    <AccordionItem>
      <Accordion>
        OpenSSL Essentials: Working with SSL Certificates, Private
        Keys
      </Accordion>
      <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>


    <AccordionItem>
      <Accordion>
        Understanding IP Addresses, Subnets, and CIDR Notation
      </Accordion>
      <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <Accordion>
        How To Troubleshoot Common HTTP Error Codes
      </Accordion>
      <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <Accordion>
        An Introduction to Securing your Linux VPS
      </Accordion>
      <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>

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
    <li v-for="item in Satuan.items" :key="item.id_satuan"> {{ item.id_satuan }} - {{ item.nama_satuan }}</li>
    <AccordionItem>
      <Accordion>
        OpenSSL Essentials: Working with SSL Certificates, Private
        Keys
      </Accordion>
      <AccordionPanel class="text-slate-600 dark:text-slate-500 leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>
  </AccordionGroup>


</template>

<script>
import qrcode from '../../components/qrcode/QrCode.vue'
import { ref } from "vue";
import { useSatuanStore } from "../../stores/satuan"

const isModal = ref(false);
// const haha = ref(true)


export default {
  setup() {
    const Satuan = useSatuanStore();
    return { Satuan }
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
      // console.log("qrScanner", this.$refs)
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