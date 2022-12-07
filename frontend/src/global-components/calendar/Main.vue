<template>
  <div ref="calendarRef" class="full-calendar"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Calendar } from "@fullcalendar/core";

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
});

const calendarRef = ref();
const init = () => {
  const calendar = new Calendar(calendarRef.value, props.options);
  calendar.render();
};

onMounted(() => {
  init();
});
</script>
