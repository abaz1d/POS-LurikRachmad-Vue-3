<template>
  <div class="py-2">
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <MobileMenu />
    <!-- BEGIN: Top Bar -->
    <div
      class="border-b border-white/[0.08] mt-[2.2rem] md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10"
    >
      <div class="top-bar-boxed flex items-center">
        <!-- BEGIN: Logo -->
        <RouterLink
          :to="{ name: 'top-menu-dashboard' }"
          class="-intro-x hidden md:flex"
        >
          <img
            width="100"
            height="100"
            alt="Lurik Rachmad HTML"
            class="w-6 block dark:hidden"
            src="@/assets/images/logo.svg"
          />
          <img
            width="100"
            height="100"
            alt="Lurik Rachmad HTML"
            class="w-6 hidden dark:block"
            src="@/assets/images/logo-gold.svg"
          />
          <span
            class="font-philosopher text-white dark:text-[#CDA562] text-xl ml-3"
          >
            <b> Lurik Rachmad </b>
          </span>
        </RouterLink>
        <!-- END: Logo -->
        <!-- BEGIN: Breadcrumb -->
        <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
          <ol class="breadcrumb breadcrumb-light">
            <li class="breadcrumb-item">
              <a href="#">{{ data.nama_outlet }}</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <p class="capitalize">{{ $route.name.replace(/-/gi, " ") }}</p>
            </li>
          </ol>
        </nav>
        <!-- END: Breadcrumb -->
        <!-- BEGIN: Search -->
        <div class="intro-x relative mr-3 sm:mr-6">
          <div class="search hidden sm:block">
            <input
              type="text"
              class="search__input form-control border-transparent"
              placeholder="Search..."
              @focus="showSearchDropdown"
              @blur="
                hideSearchDropdown($event.target.value);
                $event.target.value = '';
              "
            />
            <SearchIcon class="search__icon dark:text-slate-500" />
          </div>
          <a class="notification notification--light sm:hidden">
            <SearchIcon
              class="notification__icon dark:text-slate-500 hover:border-gray-300"
              @click="searchModal = true"
            />
          </a>
          <div class="search-result" :class="{ show: searchDropdown }">
            <div class="search-result__content">
              <div class="search-result__content__title">Pages</div>
              <div class="mb-5">
                <RouterLink to="/penjualan" class="flex items-center">
                  <div
                    class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"
                  >
                    <CornerLeftUpIcon class="w-4 h-4" />
                  </div>
                  <div class="ml-3">Penjualan</div>
                </RouterLink>
                <RouterLink to="/pembelian" class="flex items-center mt-2">
                  <div
                    class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"
                  >
                    <CornerLeftDownIcon class="w-4 h-4" />
                  </div>
                  <div class="ml-3">Pembelian</div>
                </RouterLink>
                <div
                  v-if="data.role == 'Super Admin'"
                  class="flex items-center mt-2"
                >
                  <div
                    class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"
                  >
                    <UsersIcon class="w-4 h-4" />
                  </div>
                  <div class="ml-3">Semua Akun</div>
                </div>
              </div>
              <div class="search-result__content__title">
                Jenis User & Hak Aksesnya
              </div>
              <div class="mb-5">
                <a href="javascript:;" class="flex items-center mt-3 zoom-in">
                  <div
                    class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                  >
                    <CrownIcon
                      class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
                    />
                  </div>
                  <div class="ml-3">
                    <kbd
                      class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                      >Super Admin</kbd
                    >
                  </div>
                  <div
                    class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3"
                  >
                    Semua Menu/ Fitur
                  </div>
                </a>
                <a href="javascript:;" class="flex items-center mt-3 zoom-in">
                  <div
                    class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                  >
                    <UserIcon
                      class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
                    />
                  </div>
                  <div class="ml-3">
                    <kbd
                      class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                      >Admin</kbd
                    >
                  </div>
                  <div
                    class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3"
                  >
                    Kecuali SEMUA AKUN & PENGATURAN DATA
                  </div>
                </a>
                <a href="javascript:;" class="flex items-center mt-3 zoom-in">
                  <div
                    class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
                  >
                    <HardHatIcon
                      class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
                    />
                  </div>
                  <div class="ml-3">
                    <kbd
                      class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                      >Operator</kbd
                    >
                  </div>
                  <div
                    class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3"
                  >
                    Beberapa Menu/ Fitur TRANSAKSI & LAPORAN
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Search -->
        <!-- BEGIN: Notifications -->
        <Dropdown class="intro-x mr-4 sm:mr-6">
          <DropdownToggle
            tag="div"
            role="button"
            aria-label="notif"
            class="inline-block relative notification notification--light cursor-pointer mt-1"
          >
            <BellIcon
              class="notification__icon text-white stroke-2 fill-white"
            />
            <span
              class="motion-safe:animate-ping absolute top-0 right-0.5 block h-1.5 w-1.5 rounded-full ring-2 ring-green-300 bg-green-400"
            ></span>
            <span
              class="absolute top-0 right-0.5 block h-1.5 w-1.5 rounded-full ring-2 ring-green-300 bg-green-400"
            ></span>
          </DropdownToggle>
          <DropdownMenu class="notification-content pt-2">
            <DropdownContent tag="div" class="notification-content__box">
              <div class="notification-content__title">Status Database</div>
              <p>Terhubung</p>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        <!-- END: Notifications -->
        <!-- BEGIN: Account Menu -->
        <Dropdown class="intro-x w-8 h-8">
          <DropdownToggle
            tag="div"
            role="button"
            aria-label="user"
            class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
          >
            <CrownIcon
              v-if="data.role == 'Super Admin'"
              class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
            />
            <UserIcon
              v-else-if="data.role == 'Admin'"
              class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
            />
            <HardHatIcon
              v-else
              class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
            />
            <!-- </div> -->
          </DropdownToggle>
          <DropdownMenu class="w-56">
            <DropdownContent
              class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
            >
              <DropdownHeader tag="div" class="!font-normal">
                <div class="font-medium">
                  {{ data.username }}
                </div>
                <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                  {{ data.role }} - {{ data.nama_outlet }}
                </div>
              </DropdownHeader>
              <DropdownDivider class="border-white/[0.08]" />
              <DropdownItem
                class="hover:bg-white/5"
                @click="profilModal = true"
              >
                <CrownIcon
                  v-if="data.role == 'Super Admin'"
                  class="w-4 h-4 mr-2"
                />
                <UserIcon
                  v-else-if="data.role == 'Admin'"
                  class="w-4 h-4 mr-2"
                />
                <HardHatIcon v-else class="w-4 h-4 mr-2" />
                Profil
              </DropdownItem>
              <RouterLink to="/semua-akun">
                <DropdownItem
                  v-if="data.role == 'Super Admin'"
                  class="hover:bg-white/5"
                >
                  <UsersIcon class="w-4 h-4 mr-2" /> Semua Akun
                </DropdownItem>
              </RouterLink>
              <RouterLink :to="{ path: '/bantuan' }">
                <DropdownItem class="hover:bg-white/5">
                  <HelpCircleIcon class="w-4 h-4 mr-2 inline-block" /> Bantuan
                </DropdownItem>
              </RouterLink>
              <DropdownDivider class="border-white/[0.08]" />
              <DropdownItem
                @click="logoutConfirmationModal = true"
                class="hover:bg-white/5 bg-danger justify-center text-white"
              >
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
          <a
            :href="
              menu.subMenu
                ? 'javascript:;'
                : router.resolve({ name: menu.pageName }).path
            "
            class="top-menu"
            :class="{
              'top-menu--active': menu.active,
            }"
            @click="linkTo(menu, router, $event)"
          >
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
            <li
              v-for="(subMenu, subMenuKey) in menu.subMenu.filter((item) => {
                return (
                  item.title !== dataFilter1 &&
                  item.title !== dataFilter2 &&
                  item.title !== dataFilter3
                );
              })"
              :key="subMenuKey"
            >
              <a
                :href="
                  subMenu.subMenu
                    ? 'javascript:;'
                    : router.resolve({ name: subMenu.pageName }).path
                "
                class="top-menu"
                @click="linkTo(subMenu, router, $event)"
              >
                <div class="top-menu__icon">
                  <component :is="subMenu.icon" />
                </div>
                <div class="top-menu__title">
                  {{ subMenu.title }}
                  <ChevronDownIcon
                    v-if="subMenu.subMenu"
                    class="top-menu__sub-icon"
                  />
                </div>
              </a>
              <!-- BEGIN: Third Child -->
              <ul v-if="subMenu.subMenu">
                <li
                  v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                  :key="lastSubMenuKey"
                >
                  <a
                    :href="
                      lastSubMenu.subMenu
                        ? 'javascript:;'
                        : router.resolve({ name: lastSubMenu.pageName }).path
                    "
                    class="top-menu"
                    @click="linkTo(lastSubMenu, router, $event)"
                  >
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
  <Modal
    :show="logoutConfirmationModal"
    @hidden="logoutConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <LogOutIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-xl mt-5">Apakah Anda yakin ingin Keluar ?</div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="logoutConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
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
  <Modal
    size="modal-xl"
    backdrop="static"
    :show="profilModal"
    @hidden="profilModal = false"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mx-auto dark:text-white">
        Profil User & Outlet
      </h2>
      <a
        @click="profilModal = false"
        class="absolute right-0 top-0 mt-3 mr-3"
        href="javascript:;"
      >
        <XIcon class="w-8 h-8 text-slate-400" />
      </a>
    </ModalHeader>
    <ModalBody class="p-8 pt-0 text-black">
      <div class="flex-auto">
        <div class="box zoom-in px-5">
          <h6
            class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase dark:text-white"
          >
            Profil User
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  ID User
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  {{ data.userid }}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  Email User
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  {{ data.email }}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  Username
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  {{ data.username }}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  Role/ Jabatan
                </label>
                <div
                  class="flex items-start my-auto border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  <CrownIcon
                    v-if="data.role == 'Super Admin'"
                    class="w-6 h-6 stroke-2 stroke-black fill-yellow-200 bg-white -mt-1 mr-2 rounded-full whitespace-nowrap"
                  />
                  <UserIcon
                    v-else-if="data.role == 'Admin'"
                    class="w-6 h-6 stroke-2 stroke-black fill-yellow-200 bg-white -mt-1 mr-2 rounded-full whitespace-nowrap"
                  />
                  <HardHatIcon
                    v-else
                    class="w-6 h-6 stroke-2 stroke-black fill-yellow-200 bg-white -mt-1 mr-2 rounded-full whitespace-nowrap"
                  />
                  {{ data.role }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300" />
        <div class="box zoom-in px-5">
          <h6
            class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase dark:text-white"
          >
            Profil Outlet
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  ID Outlet
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  {{ data.id_outlet }}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  Nama Outlet
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  {{ data.nama_outlet }}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  Kontak Outlet
                </label>
                <div
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                >
                  {{ data.kontak_outlet }}
                </div>
              </div>
            </div>
            <div class="w-full lg:w-12/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 dark:text-white"
                >
                  Alamat Outlet
                </label>
                <textarea
                  v-model="nama_outlet"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!-- END:Profile Content -->
  <!-- BEGIN:Search Content -->
  <Modal :show="searchModal" @hidden="searchModal = false">
    <ModalHeader class="flex items-center justify-center rounded-lg">
      <div class="relative mt-1 w-full">
        <input
          type="text"
          id="password"
          class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
          ref="searchBar"
        />
        <button
          class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
        >
          <SearchIcon />
        </button>
      </div>
      <div class="absolute top-0 left-0 w-full h-2 flex rounded-lg">
        <div class="h-2 bg-blue-500 flex-1 rounded-l-md"></div>
        <div class="h-2 bg-red-500 flex-1"></div>
        <div class="h-2 bg-yellow-500 flex-1"></div>
        <div class="h-2 bg-blue-500 flex-1"></div>
        <div class="h-2 bg-green-500 flex-1"></div>
        <div class="h-2 bg-red-500 flex-1 rounded-r-md"></div>
      </div>
    </ModalHeader>
    <ModalBody>
      <div class="search-result__content">
        <div class="search-result__content__title mb-1">Pages</div>
        <div class="mb-5">
          <RouterLink to="/penjualan" class="flex items-center">
            <div
              class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"
            >
              <CornerLeftUpIcon class="w-4 h-4" />
            </div>
            <div class="ml-3">Penjualan</div>
          </RouterLink>
          <RouterLink to="/pembelian" class="flex items-center mt-2">
            <div
              class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"
            >
              <CornerLeftDownIcon class="w-4 h-4" />
            </div>
            <div class="ml-3">Pembelian</div>
          </RouterLink>
          <div v-if="data.role == 'Super Admin'" class="flex items-center mt-2">
            <div
              class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"
            >
              <UsersIcon class="w-4 h-4" />
            </div>
            <div class="ml-3">Semua Akun</div>
          </div>
        </div>
        <div class="search-result__content__title">
          Jenis User & Hak Aksesnya
        </div>
        <div class="mb-5">
          <a href="#" class="flex items-center mt-3 zoom-in">
            <div
              class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <CrownIcon
                class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
              />
            </div>
            <div class="ml-3">
              <kbd
                class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                >Super Admin</kbd
              >
            </div>
            <div
              class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3"
            >
              Semua Menu/ Fitur
            </div>
          </a>
          <a href="#" class="flex items-center mt-3 zoom-in">
            <div
              class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <UserIcon
                class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
              />
            </div>
            <div class="ml-3">
              <kbd
                class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                >Admin</kbd
              >
            </div>
            <div
              class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3"
            >
              Kecuali SEMUA AKUN & PENGATURAN DATA
            </div>
          </a>
          <a href="#" class="flex items-center mt-3 zoom-in">
            <div
              class="w-8 h-8 bg-white stroke-2 stroke-black p-auto rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <HardHatIcon
                class="w-6 h-6 object-fill stroke-2 stroke-black fill-yellow-200 bg-white mt-1 mx-auto rounded-full"
              />
            </div>
            <div class="ml-3">
              <kbd
                class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                >Operator</kbd
              >
            </div>
            <div
              class="ml-auto w-auto truncate text-slate-500 text-xs text-right pr-3"
            >
              Beberapa Menu/ Fitur TRANSAKSI & LAPORAN
            </div>
          </a>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!-- END:Search Content -->
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
const data = ref([]);
const dataFilter1 = ref();
const dataFilter2 = ref();
const dataFilter3 = ref();
const searchModal = ref(false);
const nama_outlet = ref();
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
  Auth.logout();
  logoutConfirmationModal.value = false;
};

onMounted(() => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  formattedMenu.value = $h.toRaw(topMenu.value);
  data.value = Auth.items;
  dataFilter1.value = data.value.role == "Operator" ? "Stok Lokal" : "";
  dataFilter2.value = data.value.role == "Super Admin" ? "" : "Pembelian";
  dataFilter3.value =
    data.value.role == "Super Admin" ? "" : "Laporan Pembelian";
  nama_outlet.value = Auth.items.alamat_outlet;
});
</script>
