<template>
    <tr>
        <td class="text-left w-40 mr-0">{{ supplier.id_supplier }}</td>
        <td v-if="isEdit">
            <input class="form-control flex-1" type="text" v-model="namaSupplier" />
        </td>
        <td v-else class="text-center">{{ supplier.nama_supplier }}</td>
        <td v-if="isEdit">
            <textarea class="form-control flex-1" type="text" v-model="alamatSupplier" />
        </td>
        <td v-else class="text-center">{{ supplier.alamat_supplier }}</td>

        <td v-if="isEdit">
            <input class="form-control flex-1" type="text" v-model="teleponSupplier" />
        </td>
        <td v-else class="text-center">{{ supplier.telepon_supplier }}</td>

        <td v-if="isEdit">
            <input class="form-control flex-1" type="text" v-model="emailSupplier" />
        </td>
        <td v-else class="text-center">{{ supplier.email_supplier }}</td>

        <td class="table-report__action w-56" v-if="isEdit">
            <div class="flex justify-center items-center">
                <button class="flex items-center mr-3 text-primary" type="button"
                    @click="updateSupplier(supplier.id_supplier)">
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
                    @click="$emit('openModal', supplier.id_supplier, supplier.nama_supplier)">
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                </button>
            </div>
        </td>
    </tr>
</template>
  
<script>
import { useSupplierStore } from "../../stores/supplier"

export default {
    setup() {
        const Supplier = useSupplierStore()

        return { Supplier }
    },
    emits: ["openModal"],
    props: {
        supplier: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isEdit: false,
            namaSupplier: this.supplier.nama_supplier,
            alamatSupplier: this.supplier.alamat_supplier,
            teleponSupplier: this.supplier.telepon_supplier,
            emailSupplier: this.supplier.email_supplier
        }
    },
    methods: {
        deleteSupplier(id_supplier) {
            try {
                this.Supplier.removeItem(id_supplier)
                this.deleteConfirmationModal = false
            } catch (error) {
                alert(`Gagal Delete Supplier ${id_supplier}`, error)
            }

        },
        updateSupplier(id_supplier) {
            try {
                this.Supplier.updateItem({ id_supplier, nama_supplier: this.namaSupplier, alamat_supplier: this.alamatSupplier, telepon_supplier: this.teleponSupplier, email_supplier: this.emailSupplier })
                this.isEdit = false
            } catch (error) {
                alert(`Gagal Update data ${id_supplier}`, error)
            }
        },
    }
}

</script>