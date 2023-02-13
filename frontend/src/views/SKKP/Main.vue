<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10 overflow-auto">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <div
            class="intro-y flex items-center mt-8 text-white cursor-pointer hover:text-[#CDA562]"
            @click="$router.go(-1)"
          >
            <ArrowLeftIcon class="w-10 inline-block" />
            <h2 class="text-lg font-medium mr-auto">Kembali</h2>
          </div>
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
            <h3 class="intro-x font-bold text-2xl text-center mt-8">
              Syarat dan Ketentuan & Kebijakan Privasi
            </h3>
            <div class="intro-x mt-8">
              <div class="box shadow-black shadow-2xl p-2 rounded-lg">
                <AccordionGroup class="accordion-boxed w-full">
                  <AccordionItem>
                    <Accordion> Persyaratan Aplikasi </Accordion>
                    <AccordionPanel
                      class="text-slate-600 dark:text-slate-500 leading-relaxed"
                    >
                      <hr />
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Accordion> Ketentuan Aplikasi </Accordion>
                    <AccordionPanel
                      class="text-slate-600 dark:text-slate-500 leading-relaxed"
                    >
                      <hr />
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Accordion> Kebijakan Aplikasi </Accordion>
                    <AccordionPanel
                      class="text-slate-600 dark:text-slate-500 leading-relaxed"
                    >
                      <hr />
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <Accordion> Privasi Aplikasi </Accordion>
                    <AccordionPanel
                      class="text-slate-600 dark:text-slate-500 leading-relaxed"
                    >
                      <hr />
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </AccordionPanel>
                  </AccordionItem>
                </AccordionGroup>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>
<script setup>
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
</script>
