<template>

  <tr class="group/item intro-x">
    <td class="w-10">
      <input class="form-check-input" type="checkbox" />
    </td>
    <td class="w-40 !py-4">
      <!-- <a href="javascript:void(0)" @click="/*$emit('openInvoice', barangKeluar.no_invoice)*/"
                class="underline decoration-dotted whitespace-nowrap">{{barangKeluar.no_invoice}}</a> -->
      <Dropdown class="inline-block" placement="right">
        <DropdownToggle
          class="underline decoration-dotted whitespace-nowrap active:bg-blue-300 focus:outline-none focus:ring dark:ring-blue-800 focus:ring-blue-300 group-hover/item:text-danger">
          {{ barangKeluar.no_invoice }}
          <ChevronDownIcon class="w-5 h-5 group-hover/item:rotate-[270deg] inline-block mx-auto" style="" />
        </DropdownToggle>
        <DropdownMenu
          class="shadow-2xl shadow-neutral-900/50 dark:shadow-neutral-100/50 md:min-w-fit w-72 overflow-auto leading-relaxed border-4 border-blue-400 dark:border-blue-800 rounded">
          <DropdownContent style="margin-top: -1px;">
            <DropdownHeader class="md:text-left text-center" @click="$emit('openInvoice', barangKeluar.no_invoice)">
              Tabel Detail <a href="javascript:void(0)" class="text-danger">{{ barangKeluar.no_invoice }}</a>
              <PrinterIcon class="w-4 h-4 ml-2 inline-block cursor-pointer" />
            </DropdownHeader>
            <DropdownDivider />
            <div class="overflow-x-auto">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="whitespace-nowrap">#</th>
                    <th class="whitespace-nowrap">First Name</th>
                    <th class="whitespace-nowrap">Last Name</th>
                    <th class="whitespace-nowrap">Username</th>
                    <th class="whitespace-nowrap">Last Name</th>
                    <th class="whitespace-nowrap">Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Angelina</td>
                    <td>Jolie</td>
                    <td>Jolie</td>
                    <td>@angelinajolie</td>
                    <td>@angelinajolie</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Brad</td>
                    <td>Pitt</td>
                    <td>Jolie</td>
                    <td>@angelinajolie</td>
                    <td>@bradpitt</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Charlie</td>
                    <td>Hunnam</td>
                    <td>Jolie</td>
                    <td>@angelinajolie</td>
                    <td>@charliehunnam</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </td>
    <td class="w-40">
      <a href="" class="font-medium whitespace-nowrap">{{
          dateFormat(barangKeluar.tanggal_penjualan).format('DD MMM YYYY HH:SS')
      }}</a>
    </td>
    <td class="text-center">
      <a href="" class="font-medium whitespace-nowrap">{{
          currencyFormat.format(barangKeluar.total_harga_jual)
      }}</a>
    </td>
    <td>
      <a href="" class="font-medium whitespace-nowrap">{{
          currencyFormat.format(barangKeluar.total_bayar_jual)
      }}</a>
    </td>
    <td class="w-40 text-right">
      <div class="pr-16">{{ currencyFormat.format(barangKeluar.kembalian_jual) }}</div>
    </td>
    <td class="table-report__action w-56" v-if="isEdit">
      <div class="flex justify-center items-center">
        <button class="flex items-center mr-3 text-primary" type="button" @click="">
          <SaveIcon class="w-4 h-4 mr-1" /> Save
        </button>
        <button class="flex items-center text-danger" type="button" @click="isEdit = false">
          <XIcon class="w-4 h-4 mr-1" /> Batal
        </button>
      </div>
    </td>
    <td class="table-report__action w-56" v-else>
      <div class="flex justify-center items-center">
        <button class="flex items-center mr-3" type="button" @click="isEdit = true">
          <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
        </button>
        <button class="flex items-center text-danger" type="button"
          @click="$emit('openDeleteModal', barangKeluar.no_invoice)">
          <Trash2Icon class="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </td>
  </tr>

</template>

<script>
import { useBarangKeluarStore } from '../../stores/barang-keluar';
import { currencyFormatter } from "../../utils/helper"
import moment from 'moment'

export default {
  setup() {
    const barangKeluar = useBarangKeluarStore();
    const currencyFormat = currencyFormatter
    const dateFormat = moment

    return {
      barangKeluar,
      currencyFormat,
      dateFormat
    };
  },
  emits: ["openDeleteModal", "openInvoice",],
  props: {
    barangKeluar: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    deleteBarangKeluar() {

    },
    updateBarangKeluar() {

    }
  }
}
</script>
<style scoped>

</style>