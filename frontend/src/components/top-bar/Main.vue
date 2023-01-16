<template>
  <!-- BEGIN: Top Bar -->
  <div class="top-bar">
    <!-- BEGIN: Breadcrumb -->
    <nav aria-label="breadcrumb" class="-intro-x mr-auto hidden sm:flex">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">{{ data.nama_outlet }}</a></li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ $route.name }}
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
      <a class="notification sm:hidden">
        <!-- <SearchIcon class="notification__icon dark:text-slate-500" /> -->
        <form action="" class="items-center justify-center">
          <input type="search"
            class="peer shadow-none cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent dark:bg-transparent dark:text-white pl-9 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 search__input form-control border-transparent" />
          <SearchIcon class="absolute inset-y-0 my-auto h-8 w-12 px-3.5 mr-0 search__icon dark:stroke-white" />
        </form>
      </a>
      <div class="search-result" :class="{ show: searchDropdown }">
        <div class="search-result__content">
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
            <RouterLink to="/" class="flex items-center mt-2">
              <div
                class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                <UsersIcon class="w-4 h-4" />
              </div>
              <div class="ml-3">Semua Akun</div>
            </RouterLink>
          </div>
          <div class="search-result__content__title">Users</div>
          <div class="mb-5">
            <a v-for="(faker, fakerKey) in $_.take($f(), 4)" :key="fakerKey" href class="flex items-center mt-2">
              <div class="w-8 h-8 image-fit">
                <img alt="Lurik Rachmad HTML" class="rounded-full" :src="faker.photos[0]" />
              </div>
              <div class="ml-3">{{ faker.users[0].name }}</div>
              <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                {{ faker.users[0].email }}
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
          <div v-for="(faker, fakerKey) in $_.take($f(), 5)" :key="fakerKey"
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
          </div>
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
    <!-- END: Notifications -->
    <!-- BEGIN: Account Menu -->
    <Dropdown class="intro-x w-8 h-8">
      <DropdownToggle tag="div" role="button" class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
        <img alt="Lurik Rachmad HTML" :src="$f()[9].photos[0]" />
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
          <DropdownItem class="hover:bg-white/5">
            <UserIcon class="w-4 h-4 mr-2" /> Profil
          </DropdownItem>
          <DropdownItem class="hover:bg-white/5">
            <UsersIcon class="w-4 h-4 mr-2" /> Semua Akun
          </DropdownItem>
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
        <button type="button" class="btn btn-danger w-24">
          Keluar
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";


const Auth = useAuthStore();
const logoutConfirmationModal = ref(false);
const data = ref([])

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
