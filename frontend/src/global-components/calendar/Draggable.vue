<template>
  <div ref="draggableRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Draggable } from "@fullcalendar/interaction";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

const draggableRef = ref();
const init = () => {
  new Draggable(draggableRef.value, props.options);
};

onMounted(() => {
  init();
});
</script>
