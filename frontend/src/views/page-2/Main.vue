<template>
  <form action="" class="relative mx-auto w-max items-center justify-center">
    <input
      type="search"
      class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 search__input form-control border-transparent"
    />
    <!-- <svg xmlns="http://www.w3.org/2000/svg"
      class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-slate-300 peer-focus:stroke-slate-500"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg> -->
    <SearchIcon
      class="absolute inset-y-0 my-auto h-8 w-12 px-3.5 mr-0 search__icon dark:text-slate-500"
    />
  </form>

  <div class="search hidden sm:block">
    <input
      type="text"
      class="search__input form-control border-transparent"
      placeholder="Search..."
      @focus="showSearchDropdown"
      @blur="hideSearchDropdown"
    />
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
        OpenSSL Essentials: Working with SSL Certificates, Private Keys
      </Accordion>
      <AccordionPanel
        class="text-slate-600 dark:text-slate-500 leading-relaxed"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <Accordion>
        Understanding IP Addresses, Subnets, and CIDR Notation
      </Accordion>
      <AccordionPanel
        class="text-slate-600 dark:text-slate-500 leading-relaxed"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <Accordion> How To Troubleshoot Common HTTP Error Codes </Accordion>
      <AccordionPanel
        class="text-slate-600 dark:text-slate-500 leading-relaxed"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <Accordion> An Introduction to Securing your Linux VPS </Accordion>
      <AccordionPanel
        class="text-slate-600 dark:text-slate-500 leading-relaxed"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>

    <!-- BEGIN: Modal Toggle -->
    <div class="text-center">
      <a
        href="javascript:;"
        @click="
          isModal = true;
          renderQrScanner();
        "
        class="btn btn-primary"
        >QR Scanner</a
      >
    </div>
    <!-- END: Modal Toggle -->
    <!-- BEGIN: Modal Content -->

    <Modal
      size="modal-xl"
      backdrop="static"
      :show="isModal"
      @hidden="isModal = false"
    >
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
          <button
            type="button"
            @click="
              isModal = false;
              closeQrScanner();
            "
            class="btn btn-danger w-24"
          >
            Close
          </button>
        </div>
      </ModalBody>
    </Modal>
    <!-- END: Modal Content -->
    <button type="button" @click="Satuan.readItem" class="btn btn-primary w-24">
      Close
    </button>
    <li v-for="item in Satuan.items" :key="item.id_satuan">
      {{ item.id_satuan }} - {{ item.nama_satuan }}
    </li>
    <AccordionItem>
      <Accordion>
        OpenSSL Essentials: Working with SSL Certificates, Private Keys
        <svg
          data-accordion-icon
          class="w-6 h-6 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Accordion>
      <AccordionPanel
        class="text-slate-600 dark:text-slate-500 leading-relaxed"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </AccordionPanel>
    </AccordionItem>
  </AccordionGroup>

  <Alert class="animate-bounce alert-primary mb-2">
    Awesome simple alert<XCircleIcon
      class="absolute stroke-2 stroke-red-500 bg-white rounded-full h-6 w-6 -right-3 -top-3 cursor-pointer"
  /></Alert>

  <!-- Button trigger modal -->
  <button
    type="button"
    class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Launch static backdrop modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalLabel"
          >
            Modal title
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative p-4">...</div>
        <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
        >
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qrcode from "../../components/qrcode/QrCode.vue";
import { ref } from "vue";
import { useSatuanStore } from "../../stores/satuan";

const isModal = ref(false);
// const haha = ref(true)

export default {
  setup() {
    const Satuan = useSatuanStore();
    return { Satuan };
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
      this.$refs.qrScanner.renderQrScanner();
      // console.log("qrScanner", this.$refs)
    },
    closeQrScanner() {
      this.$refs.qrScanner.closeQrScanner();
    },
  },
  mounted() {
    this.Satuan.readItem();
  },
};
</script>

<style scoped></style>
