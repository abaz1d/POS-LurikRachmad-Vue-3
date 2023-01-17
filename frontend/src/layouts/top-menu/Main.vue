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
            class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
            <img alt="Lurik Rachmad HTML" :src="$f()[9].photos[0]" />
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
                <UserIcon class="w-4 h-4 mr-2" /> Profil
              </DropdownItem>
              <DropdownItem class="hover:bg-white/5">
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
            <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
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
      <h2 class="font-medium text-base mx-auto">Profil Akun & Outlet</h2>
      <a @click="profilModal = false" class="absolute right-0 top-0 mt-3 mr-3" href="javascript:;">
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="">
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">


          <div class="col-span-4">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="full_name">Full Name</label>
                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
              </div>

              <div class="md:col-span-5">
                <label for="email">Email Address</label>
                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
              </div>

              <div class="md:col-span-3">
                <label for="address">Address / Street</label>
                <input type="text" name="address" id="address" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

              <div class="md:col-span-2">
                <label for="city">City</label>
                <input type="text" name="city" id="city" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
              </div>

              <div class="md:col-span-2">
                <label for="country">Country / region</label>
                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input name="country" id="country" placeholder="Country" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                  <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                    <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                    <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                </div>
              </div>

              <div class="md:col-span-2">
                <label for="state">State / province</label>
                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input name="state" id="state" placeholder="State" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                  <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                    <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                    <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                </div>
              </div>

              <div class="md:col-span-1">
                <label for="zipcode">Zipcode</label>
                <input type="text" name="zipcode" id="zipcode" class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
              </div>

              <div class="md:col-span-5">
                <div class="inline-flex items-center">
                  <input type="checkbox" name="billing_same" id="billing_same" class="form-checkbox" />
                  <label for="billing_same" class="ml-2">My billing address is different than above.</label>
                </div>
              </div>

              <div class="md:col-span-2">
                <label for="soda">How many soda pops?</label>
                <div class="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <input name="soda" id="soda" placeholder="0" class="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" value="0" />
                  <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
      
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
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
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useTopMenuStore } from "@/stores/top-menu";
import { helper as $h } from "@/utils/helper";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import MainColorSwitcher from "@/components/main-color-switcher/Main.vue";

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

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const topMenuStore = useTopMenuStore();
const topMenu = computed(() => nestedMenu(topMenuStore.menu, route));

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
});
</script>
