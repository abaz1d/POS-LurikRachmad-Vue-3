<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10 overflow-auto">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <div class="my-auto">
            <img
              alt="Lurik Rachmad HTML"
              width="100"
              height="100"
              class="-intro-x w-1/2 -mt-16 fill-[#CDA562] hidden dark:block"
              src="@/assets/images/logo-gold.svg"
            />
            <img
              alt="Lurik Rachmad HTML"
              width="100"
              height="100"
              class="-intro-x w-1/2 -mt-16 fill-white block dark:hidden"
              src="@/assets/images/logo.svg"
            />
            <div
              class="intro-x font-philosopher text-white dark:text-[#CDA562] font-medium ml-16 text-4xl leading-tight mt-10"
            >
              <b> Lurik Rachmad </b>
            </div>
            <div
              class="intro-x mt-5 font-philosopher text-2xl text-white ml-[120px] dark:text-[#CDA562]"
            >
              Sejak 1960
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <div class="xl:hidden">
              <img
                alt="Lurik Rachmad HTML"
                width="100"
                height="100"
                class="intro-x -mt-[120px] mb-3 text-slate-400 xl:hidden text-center w-1/5 mx-auto hidden dark:block"
                src="@/assets/images/logo-gold.svg"
              />
              <img
                alt="Lurik Rachmad HTML"
                width="100"
                height="100"
                class="intro-x -mt-[120px] mb-3 text-slate-400 xl:hidden text-center w-1/5 mx-auto block dark:hidden"
                src="@/assets/images/logo.svg"
              />
            </div>
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left mt-8"
            >
              Masuk
            </h2>
            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              Selamat Datang di
              <span class="font-philosopher text-[#CDA562] drop-shadow-2xl">
                <b> Lurik Rachmad </b> </span
              >, silahkan masuk untuk mengakses aplikasi
            </div>
            <div class="intro-x mt-8">
              <input
                v-model="input_email"
                type="email"
                class="intro-x login__input form-control py-3 px-4 block mb-4"
                placeholder="Email: super@gmail.com"
              />
              <div class="intro-x relative w-full">
                <div class="absolute inset-y-0 right-0 flex items-center px-2">
                  <input
                    class="hidden js-password-toggle"
                    @click="showPassword()"
                    id="toggle"
                    type="checkbox"
                  />
                  <label
                    class="bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                    for="toggle"
                  >
                    <EyeIcon />
                  </label>
                </div>
                <input
                  @keyup.enter="isLoading = true"
                  v-model="input_password"
                  class="form-control w-full py-3 px-3 pr-16 js-password"
                  id="password"
                  type="password"
                  autocomplete="off"
                  placeholder="Password: 123"
                />
              </div>
            </div>
            <div
              class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-5"
            >
              <div class="flex items-center mr-auto">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="form-check-input border mr-2"
                />
                <label class="cursor-pointer select-none" for="remember-me"
                  >Ingat Saya</label
                >
              </div>
              <a
                href="https://api.whatsapp.com/send/?phone=%2B6281548993484&text=Saya+lupa+password+akun+POS+Lurik+Rachmad+saya,+mohon+bantuanya&type=phone_number&app_absent=0"
                >Lupa Password?</a
              >
            </div>
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                v-if="isLoading"
                class="cursor-progress btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
              >
                <Loader-2Icon class="w-4 h-4 mr-2 animate-spin" />
                <p class="hidden xl:block ml-1">Loading ...</p>
              </button>
              <button
                v-else
                @click="isLoading = true"
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
              >
                Login
              </button>
            </div>
            <Alert
              v-if="gagalLogin"
              class="intro-x alert-danger flex items-center mt-3 sm:-mb-14 mb-2 text-base"
              v-slot="{ dismiss }"
            >
              <AlertOctagonIcon class="w-6 h-6 mr-2" /> {{ dataPopup }}
              <button
                type="button"
                class="btn-close text-white"
                aria-label="Close"
                @click="dismiss"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </Alert>
            <div
              class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
            >
              Dengan masuk aplikasi, Anda telah setuju dengan
              <RouterLink
                :to="{ path: '/syarat&ketentuan' }"
                class="text-primary dark:text-slate-200"
                >Peraturan</RouterLink
              >
              &
              <RouterLink
                :to="{ path: '/syarat&ketentuan' }"
                class="text-primary dark:text-slate-200"
                >Ketentuan</RouterLink
              >
              di
              <span class="font-philosopher text-[#CDA562] drop-shadow-2xl">
                <b> Lurik Rachmad </b>
              </span>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
  <!-- BEGIN: Basic Non Sticky Notification Content -->
  <Notification
    refKey="basicNonStickyNotification"
    :options="{
      duration: 5000,
    }"
    class="flex flex-col sm:flex-row md:animate-bounce animate-pulse"
  >
    <div class="font-medium">
      Hai {{ dataPopup.role }} - {{ dataPopup.username }}, Selamat Datang di
      Aplikasi Point of Sales
      <b class="font-philosopher text-xl text-[#CDA562]">Lurik Rachmad</b>
      Cabang {{ dataPopup.nama_outlet }}
    </div>
  </Notification>
  <!-- END: Basic Non Sticky Notification Content -->
</template>

<script setup>
import { createElement, Eye, EyeOff } from "lucide";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref, provide, watch } from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
const Auth = useAuthStore();
const isLoading = ref(false);
const gagalLogin = ref(false);
const dataPopup = ref("");
const input_email = ref("");
const input_password = ref("");
// Basic non sticky notification
const basicNonStickyNotification = ref();
provide("bind[basicNonStickyNotification]", (el) => {
  // Binding
  basicNonStickyNotification.value = el;
});
const basicNonStickyNotificationToggle = () => {
  // Show notification
  basicNonStickyNotification.value.showToast();
};

const showPassword = () => {
  const password = document.querySelector(".js-password"),
    passwordLabel = document.querySelector(".js-password-label");

  if (password.type === "password") {
    password.type = "text";
    passwordLabel.replaceChild(
      createElement(EyeOff),
      passwordLabel.childNodes[0]
    );
  } else {
    password.type = "password";
    passwordLabel.replaceChild(createElement(Eye), passwordLabel.childNodes[0]);
  }
  password.focus();
};

watch(isLoading, async (newValue) => {
  try {
    if (newValue === true) {
      setTimeout(() => onLogin(), 100);
    }
  } catch (error) {
    alert("Gagal wtch print" + error);
  }
});

const onLogin = () => {
  const email_user = input_email.value;
  const password = input_password.value;
  if (email_user.length > 0 && password.length > 0) {
    Auth.login(email_user, password)
      .then((data) => {
        if (data.success == false) {
          dataPopup.value = data.data.message;
          gagalLogin.value = true;
          if (data.data.message == "unregistered e-mail") {
            input_email.value = "";
            input_password.value = "";
          } else {
            input_password.value = "";
          }
        } else {
          dataPopup.value = data.data;
          basicNonStickyNotificationToggle();
        }
        isLoading.value = false;
      })
      .catch((error) => {
        alert("Gagal Login " + JSON.stringify(error));
        isLoading.value = false;
      });
  } else {
    dataPopup.value = "Email dan Password tidak boleh kosong !";
    gagalLogin.value = true;
    isLoading.value = false;
  }
};
onMounted(() => {
  dom("body").removeClass("main").removeClass("error-page").addClass("login");
});
</script>
