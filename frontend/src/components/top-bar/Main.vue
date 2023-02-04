<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <nav aria-label="breadcrumb" class="-intro-x mr-auto hidden sm:flex">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">{{ data.nama_outlet }}</a></li>
        <li class="breadcrumb-item active" aria-current="page">
          <p class="capitalize">{{ $route.name.replace(/-/gi, " ") }}</p>
        </li>
      </ol>
    </nav>
    <!-- END: Breadcrumb -->
    <!-- BEGIN: Search -->
    <div class="intro-x relative mr-3 sm:mr-6">
      <div class="search hidden sm:block">
        <input type="text" class="search__input form-control border-transparent" placeholder="Search..."
          @focus="showSearchDropdown" @blur="hideSearchDropdown" />
        <SearchIcon class="search__icon dark:text-slate-500" />
      </div>
      <a class="notification notification--light sm:hidden">
        <SearchIcon @focus="showSearchDropdown" @blur="hideSearchDropdown" class="text-black notification__icon dark:text-slate-500" />
      </a>
      <div class="search-result max-[640px]:left-0" :class="{ show: searchDropdown }">
        <div class="max-[640px]:w-[86vw] search-result__content">
          <div class="search-result__content__title">Pages</div>
          <div class="mb-5">
            <RouterLink to="/penjualan" class="flex items-center">
              <div
                class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                <CornerLeftUpIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Penjualan</div>
            </RouterLink>
            <RouterLink to="/pembelian" class="flex items-center mt-2">
              <div class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                <CornerLeftDownIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Pembelian</div>
            </RouterLink>
            <div v-if="data.role == 'Super Admin'" class="flex items-center mt-2">
              <div
                class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                <UsersIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Semua Akun</div>
            </div>
          </div>
          <div class="search-result__content__title">Jenis User & Hak Aksesnya</div>
          <div class="mb-5">
            <a href class="flex items-center mt-3 zoom-in">
              <div
                class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
                <CrownIcon
                  class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
              </div>
              <div class="ml-3"><kbd
                  class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Super
                  Admin</kbd></div>
              <div class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3">
                Semua Menu/ Fitur
              </div>
            </a>
            <a href class="flex items-center mt-3 zoom-in">
              <div
                class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
                <UserIcon
                  class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
              </div>
              <div class="ml-3"><kbd
                  class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Admin</kbd>
              </div>
              <div class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3">
                Kecuali SEMUA AKUN & PENGATURAN DATA
              </div>
            </a>
            <a href class="flex items-center mt-3 zoom-in">
              <div
                class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
                <HardHatIcon
                  class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
              </div>
              <div class="ml-3"><kbd
                  class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Operator</kbd>
              </div>
              <div class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3">
                Beberapa Menu/ Fitur TRANSAKSI & LAPORAN
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Search -->
    <!-- BEGIN: Notifications -->
    <Dropdown class="intro-x mr-auto sm:mr-6">
      <DropdownToggle tag="div" role="button" class="notification notification--bullet cursor-pointer">
        <BellIcon class="notification__icon dark:text-slate-500" />
      </DropdownToggle>
      <DropdownMenu class="notification-content pt-2">
        <DropdownContent tag="div" class="notification-content__box">
          <div class="notification-content__title">Notifications</div>
          <!-- <div v-for="(faker, fakerKey) in $_.take($f(), 5)" :key="fakerKey"
            class="cursor-pointer relative flex items-center" :class="{ 'mt-5': fakerKey }">
            <div class="w-12 h-12 flex-none image-fit mr-1">
              <img alt="Lurik Rachmad HTML" class="rounded-full" :src="faker.photos[0]" />
              <div
                class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600">
              </div>
            </div>
            <div class="ml-2 overflow-hidden">
              <div class="flex items-center">
                <a href="javascript:;" class="font-medium truncate mr-5">
                  {{ faker.users[0].name }}</a>
                <div class="text-xs text-slate-400 ml-auto whitespace-nowrap">
                  {{ faker.times[0] }}
                </div>
              </div>
              <div class="w-full truncate text-slate-500 mt-0.5">
                {{ faker.news[0].shortContent }}
              </div>
            </div>
          </div> -->
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
    <!-- END: Notifications -->
    <!-- BEGIN: Account Menu -->
    <Dropdown class="intro-x w-8 h-8">
      <DropdownToggle tag="div" role="button"
        class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
        <!-- <img alt="Lurik Rachmad HTML" :src="$f()[9].photos[0]" /> -->
        <!-- <div class="bg-white w-8 h-8 m-auto p-auto rounded-full"> -->
        <CrownIcon v-if="data.role == 'Super Admin'"
          class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
        <UserIcon v-else-if="data.role == 'Admin'"
          class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
        <HardHatIcon v-else
          class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
        <!-- </div> -->
      </DropdownToggle>
      <DropdownMenu class="w-56">
        <DropdownContent class="bg-primary text-white">
          <DropdownHeader tag="div" class="!font-normal">
            <div class="font-medium">{{ data.username }}</div>
            <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
              {{ data.role }} - {{ data.nama_outlet }}
            </div>
          </DropdownHeader>
          <DropdownDivider class="border-white/[0.08]" />
          <DropdownItem class="hover:bg-white/5" @click="profilModal = true">
            <CrownIcon v-if="data.role == 'Super Admin'" class="w-4 h-4 mr-2" />
            <UserIcon v-else-if="data.role == 'Admin'" class="w-4 h-4 mr-2" />
            <HardHatIcon v-else class="w-4 h-4 mr-2" />
            Profil
          </DropdownItem>
          <RouterLink to="/semua-akun">
            <DropdownItem v-if="data.role == 'Super Admin'" class="hover:bg-white/5">
              <UsersIcon class="w-4 h-4 mr-2" /> Semua Akun
            </DropdownItem>
          </RouterLink>
          <DropdownItem class="hover:bg-white/5">
            <HelpCircleIcon class="w-4 h-4 mr-2" /> Bantuan
          </DropdownItem>
          <DropdownDivider class="border-white/[0.08]" />
          <!-- <RouterLink to="/login" class="nav-link active">
            <DropdownItem class="hover:bg-white/5 btn-danger justify-center">
              <LogOutIcon class="w-4 h-4 mr-2" />
              Logout
            </DropdownItem>
          </RouterLink> -->
          <!-- <RouterLink to="/login" class="nav-link active"> -->
          <DropdownItem @click="logoutConfirmationModal = true"
            class="hover:bg-white/5 bg-danger justify-center text-white">
            <LogOutIcon class="w-4 h-4 mr-2" />
            Logout
          </DropdownItem>
          <!-- </RouterLink> -->
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
    <!-- END: Account Menu -->
  </div>
  <!-- END: Top Bar -->
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="logoutConfirmationModal" @hidden="logoutConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <LogOutIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-xl mt-5">Apakah Anda yakin ingin Keluar ?</div>

      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="logoutConfirmationModal = false" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button @click="onLogout" type="button" class="btn btn-danger w-24">
          Keluar
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->

  <!-- BEGIN:Profile Content -->
  <Modal size="modal-xl" backdrop="static" :show="profilModal" @hidden="profilModal = false">
    <ModalHeader>
      <h2 class="font-medium text-base mx-auto dark:text-white">Profil User & Outlet</h2>
      <a @click="profilModal = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="p-8 pt-0 text-black">
      <div class="flex-auto">
        <div class="box zoom-in px-5">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase dark:text-white">
            Profil User
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  ID User
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {{ data.userid }} </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  Email User
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {{ data.email }}</div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  Username
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {{ data.username }}</div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  Role/ Jabatan
                </label>
                <div
                  class="flex items-start my-auto border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  <CrownIcon v-if="data.role == 'Super Admin'"
                    class="w-6 h-6 stroke-2 stroke-black fill-yellow-200 bg-white -mt-1 mr-2 rounded-full whitespace-nowrap" />
                  <UserIcon v-else-if="data.role == 'Admin'"
                    class="w-6 h-6 stroke-2 stroke-black fill-yellow-200 bg-white -mt-1 mr-2 rounded-full whitespace-nowrap" />
                  <HardHatIcon v-else
                    class="w-6 h-6 stroke-2 stroke-black fill-yellow-200 bg-white -mt-1 mr-2 rounded-full whitespace-nowrap" />
                  {{ data.role }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300">
        <div class="box zoom-in px-5">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase dark:text-white">
            Profil Outlet
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  ID Outlet
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {{ data.id_outlet }}</div>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  Nama Outlet
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {{ data.nama_outlet }}</div>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  Kontak Outlet
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                  {{ data.kontak_outlet }}</div>
              </div>
            </div>
            <div class="w-full lg:w-12/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white">
                  Alamat Outlet
                </label>
                <textarea type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4" disabled>{{ data.alamat_outlet }}</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!-- END:Profile Content -->

</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";


const Auth = useAuthStore();
const logoutConfirmationModal = ref(false);
const profilModal = ref(false);
const data = ref([])

const onLogout = () => {
  Auth.logout()
  logoutConfirmationModal.value = false;
};

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};
onMounted(() => {
  data.value = Auth.items
});
</script>
