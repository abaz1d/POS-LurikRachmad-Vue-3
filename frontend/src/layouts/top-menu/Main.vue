<template>
  <div class="py-2">
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <MobileMenu />
    <!-- BEGIN: Top Bar -->
    <div class="border-b border-white/[0.08] mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10">
      <div class="top-bar-boxed flex items-center">
        <!-- BEGIN: Logo -->
        <router-link :to="{ name: 'top-menu-dashboard' }" tag="a" class="-intro-x hidden md:flex">
          <img alt="Lurik Rachmad HTML" class="w-6 block dark:hidden" src="@/assets/images/logo.svg" />
          <img alt="Lurik Rachmad HTML" class="w-6 hidden dark:block" src="@/assets/images/logo-gold.svg" />
          <span class="font-philosopher text-white dark:text-[#CDA562] text-xl ml-3"> <b> Lurik Rachmad </b> </span>
        </router-link>
        <!-- END: Logo -->
        <!-- BEGIN: Breadcrumb -->
        <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
          <ol class="breadcrumb breadcrumb-light">
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
          <a class="notification notification--light sm:hidden">
            <SearchIcon class="notification__icon dark:text-slate-500" />
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
                  <div class="ml-3">Super Admin</div>
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
                  <div class="ml-3">Admin</div>
                  <div class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3">
                    Kecuali Menu/ Fitur SEMUA AKUN
                  </div>
                </a>
                <a href class="flex items-center mt-3 zoom-in">
                  <div
                    class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
                    <HardHatIcon
                      class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full" />
                  </div>
                  <div class="ml-3">Operator</div>
                  <div class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3">
                    Beberapa Menu/ Fitur TRANSAKSI dan LAPORAN
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Search -->
        <!-- BEGIN: Notifications -->
        <Dropdown class="intro-x mr-4 sm:mr-6">
          <DropdownToggle tag="div" role="button"
            class="notification notification--light notification--bullet cursor-pointer">
            <BellIcon class="notification__icon dark:text-slate-500" />
          </DropdownToggle>
          <DropdownMenu class="notification-content pt-2">
            <DropdownContent tag="div" class="notification-content__box">
              <div class="notification-content__title">Notifications</div>
              <div v-for="(faker, fakerKey) in $_.take($f(), 5)" :key="fakerKey"
                class="cursor-pointer relative flex items-center" :class="{ 'mt-5': fakerKey }">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img alt="Lurik Rachmad HTML" class="rounded-full" :src="faker.photos[0]" />
                  <div class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium truncate mr-5">{{
                      faker.users[0].name
                    }}</a>
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
            <DropdownContent
              class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
              <DropdownHeader tag="div" class="!font-normal">
                <div class="font-medium">
                  {{ data.username }}
                </div>
                <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
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
              <DropdownItem v-if="data.role == 'Super Admin'" class="hover:bg-white/5" @click="semuaAkunModal = true">
                <UsersIcon class="w-4 h-4 mr-2" /> Semua Akun
              </DropdownItem>
              <DropdownItem class="hover:bg-white/5">
                <HelpCircleIcon class="w-4 h-4 mr-2" /> Bantuan
              </DropdownItem>
              <DropdownDivider class="border-white/[0.08]" />
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
    </div>
    <!-- END: Top Bar -->
    <!-- BEGIN: Top Menu -->
    <nav class="top-nav">
      <ul>
        <li v-for="(menu, menuKey) in formattedMenu" :key="menuKey">
          <a :href="
            menu.subMenu
              ? 'javascript:;'
              : router.resolve({ name: menu.pageName }).path
                          " class="top-menu" :class="{
                  'top-menu--active': menu.active,
                }" @click="linkTo(menu, router, $event)">
            <div class="top-menu__icon">
              <component :is="menu.icon" />
            </div>
            <div class="top-menu__title">
              {{ menu.title }}
              <ChevronDownIcon v-if="menu.subMenu" class="top-menu__sub-icon" />
            </div>
          </a>
          <!-- BEGIN: Second Child -->
          <ul v-if="menu.subMenu">
            <li v-for="(subMenu, subMenuKey) in menu.subMenu.filter(
              item => {return item.title !== dataFilter}
            )" :key="subMenuKey">
              <a :href="
                subMenu.subMenu
                  ? 'javascript:;'
                  : router.resolve({ name: subMenu.pageName }).path
              " class="top-menu" @click="linkTo(subMenu, router, $event)">
                <div class="top-menu__icon">
                  <component :is="subMenu.icon" />
                </div>
                <div class="top-menu__title">
                  {{ subMenu.title }}
                  <ChevronDownIcon v-if="subMenu.subMenu" class="top-menu__sub-icon" />
                </div>
              </a>
              <!-- BEGIN: Third Child -->
              <ul v-if="subMenu.subMenu">
                <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                  <a :href="
                    lastSubMenu.subMenu
                      ? 'javascript:;'
                      : router.resolve({ name: lastSubMenu.pageName }).path
                  " class="top-menu" @click="linkTo(lastSubMenu, router, $event)">
                    <div class="top-menu__icon">
                      <component :is="'zap-icon'" />
                    </div>
                    <div class="top-menu__title">
                      {{ lastSubMenu.title }}
                    </div>
                  </a>
                </li>
              </ul>
              <!-- END: Third Child -->
            </li>
          </ul>
          <!-- END: Second Child -->
        </li>
      </ul>
    </nav>
    <!-- END: Top Menu -->
    <!-- BEGIN: Content -->
    <div class="content">
      <RouterView />
    </div>
    <!-- END: Content -->
    <!-- <ScrollTopComponent>
      <ChevronUpIcon />
    </ScrollTopComponent> -->
  </div>

  <!-- BEGIN: Logout Confirmation Modal -->
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
        <!-- <RouterLink to="/login" class="nav-link active"> -->
        <button @click="onLogout" type="button" class="btn btn-danger w-24">
          Keluar
        </button>
        <!-- </RouterLink> -->
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Logout Confirmation Modal -->

  <!-- BEGIN:Profile Content -->
  <Modal size="modal-xl" backdrop="static" :show="profilModal" @hidden="profilModal = false">
    <ModalHeader>
      <h2 class="font-medium text-base mx-auto">Profil User & Outlet</h2>
      <a @click="profilModal = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="p-8 pt-0">
      <div class="flex-auto">
          <div class="box zoom-in px-5">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Profil User
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    ID User
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.userid }} </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Email User
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.email }}</div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Username
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.username }}</div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Role/ Jabatan
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.role }}</div>
                </div>
              </div>
            </div>
          </div>

          <hr class="mt-6 border-b-1 border-blueGray-300">
          <div class="box zoom-in px-5">
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Profil Outlet
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    ID Outlet
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.id_outlet }}</div>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Nama Outlet
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.nama_outlet }}</div>
                </div>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                    Kontak Outlet
                  </label>
                  <div
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                    {{ data.kontak_outlet }}</div>
                </div>
              </div>
              <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
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

  <!-- BEGIN: Semua Akun Content -->
  <Modal size="modal-xl" backdrop="static" :show="semuaAkunModal" @hidden="semuaAkunModal = false">
    <ModalHeader>
      <h2 class="font-medium text-base mx-auto">Semua Akun</h2>
      <a @click="semuaAkunModal = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="p-8 pt-0">
      <Users />
    </ModalBody>
  </Modal>
  <!-- END: Semua Akun Content -->
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useTopMenuStore } from "@/stores/top-menu";
import { helper as $h } from "@/utils/helper";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import MainColorSwitcher from "@/components/main-color-switcher/Main.vue";
import Users from "@/views/Users/Main.vue";

import {
  searchDropdown,
  showSearchDropdown,
  hideSearchDropdown,
} from "./index";
import { nestedMenu, linkTo } from "@/layouts/side-menu";
import dom from "@left4code/tw-starter/dist/js/dom";

const Auth = useAuthStore();
const logoutConfirmationModal = ref(false);
const profilModal = ref(false);
const semuaAkunModal = ref(false);
const data = ref([])

const dataFilter = ref()

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const topMenuStore = useTopMenuStore();
const topMenu = computed(() => nestedMenu(topMenuStore.items, route));

provide("forceActiveMenu", (pageName) => {
  route.forceActiveMenu = pageName;
  formattedMenu.value = $h.toRaw(topMenu.value);
});

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu;
    formattedMenu.value = $h.toRaw(topMenu.value);
  }
);

const onLogout = () => {
  Auth.logout()
  logoutConfirmationModal.value = false;
};

onMounted(() => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  formattedMenu.value = $h.toRaw(topMenu.value);
  data.value = Auth.items
  dataFilter.value = data.value.role == "Operator" ? "Stok Lokal" : ""
  //console.log("stook", dataFilter.value, data.value.role)
});
</script>
