<template>
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
  <div class="overflow-x-auto">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th class="whitespace-nowrap">#</th>
                <th class="whitespace-nowrap">First Name</th>
                <th class="whitespace-nowrap">Last Name</th>
                <th class="whitespace-nowrap">Username</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <tr>
                <td>1</td>
                <td>Angelina</td>
                <td>Jolie</td>
                <td>@angelinajolie</td>
            </tr>
            </tr>
            <tr>
                <td>2</td>
                <td>Brad</td>
                <td>Pitt</td>
                <td>@bradpitt</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Charlie</td>
                <td>Hunnam</td>
                <td>@charliehunnam</td>
            </tr>
        </tbody>
    </table>
</div>

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