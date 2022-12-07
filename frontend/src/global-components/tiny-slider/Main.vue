<template>
  <div ref="sliderRef" v-slider-directive="{ props, emit }" class="tiny-slider">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { init, reInit } from "./index";

const vSliderDirective = {
  mounted(el, { value }) {
    init(el, value.props);
  },
  updated(el) {
    reInit(el);
  },
};

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  refKey: {
    type: String,
    default: null,
  },
});

const emit = defineEmits();

const sliderRef = ref();
const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`);
    if (bind) {
      bind(sliderRef.value);
    }
  }
};

onMounted(() => {
  bindInstance();
});
</script>
