<script>
import { useReturJualStore } from "@/stores/retur-jual";
const publicPath = import.meta.env.VITE_APP_BASE_API;

export default {
  setup() {
    const ReturJual = useReturJualStore();
    return { ReturJual };
  },
  props: {
    detail: { type: Object, required: true },
  },
  emits: ["openModalRemove"],
  data() {
    return {
      id: this.detail.id_detail_retur_jual,
      id_varian: this.detail.id_varian,
      nama_varian: this.detail.nama_varian,
      qty: this.detail.qty,
      keterangan: this.detail.keterangan,
    };
  },
  watch: {
    qty(e) {
      console.log("e", e);
      if (e !== 0) {
        this.update();
      } else {
        this.qty = 1;
      }
    },
  },
  methods: {
    async update() {
      try {
        await this.ReturJual.updateDetail(
          this.id,
          this.id_varian,
          this.qty,
          this.keterangan
        );
      } catch (error) {
        console.error(error);
      }
    },
    openModal_Remove(detail) {
      this.$emit("openModalRemove", detail);
    },
    getImgUrl(gambar_varian) {
      if (gambar_varian) {
        var images = gambar_varian.data
          .map((b) => String.fromCharCode(b))
          .join("");

        return new URL(`${publicPath}gambar_bukti/retur_jual/${images}`).href;
      } else {
        return `${new URL(window.location.origin)}` + " 404.png";
      }
    },
  },
};
</script>
<template>
  <tr
    class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
    <td @click="openModal_Remove(detail)"
      class="w-full lg:w-auto p-3 cursor-pointer text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase my-a">#</span>
      <div class="items-center sm:mt-auto mt-4">
        <TrashIcon class="text-danger mx-auto w-4 h-4 p-0" />
      </div>
    </td>
    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
        ID & Nama Varian</span>
      <div class="text-center sm:mt-auto mt-4">
        {{ detail.id_varian }} - {{ detail.nama_varian }}
      </div>
    </td>
    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">QTY</span>
      <div class="text-center bg-white">
        <MinusIcon @click="qty = qty - 1" class="text-danger fill-daanger w-6 h-6 cursor-pointer inline-block" />
        <input v-model="qty" id="pos-form-1" type="number" class="w-24 dark:bg-white form-control flex-1"
          placeholder="Masukan Qty" required />
        <PlusIcon @click="qty = qty + 1" class="text-success fill-success w-6 h-6 cursor-pointer inline-block" />
      </div>
    </td>
    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Keterangan</span>
      <div class="text-center bg-white sm:mt-auto mt-4">
        <textarea @blur="update" name="keterangan" id="keterangan" v-model="keterangan"
          class="w-full dark:bg-white form-control flex-1" placeholder="Masukan Keterangan"></textarea>
      </div>
    </td>
    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Gambar
        Bukti</span>
      <div class="text-center p-auto sm:mt-auto mt-4">
        <div class="mb-2">
          <img decoding="async" loading="lazy" :src="getImgUrl(detail.gambar_bukti)" :alt="detail.gambar_bukti"
            class="w-10 m-auto rounded-md" width="100" height="100" />
        </div>
      </div>
    </td>
  </tr>
</template>
