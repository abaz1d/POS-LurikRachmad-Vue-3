<template>
  <div ref="mapRef"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { initializeMap } from "./index";

const props = defineProps({
  init: {
    type: Function,
    required: true,
  },
});

const mapRef = ref();
onMounted(() => {
  props.init((mapConfig) => {
    return initializeMap(mapRef.value, mapConfig);
  });
});
</script>
