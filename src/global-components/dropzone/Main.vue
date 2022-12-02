<template>
  <div
    ref="fileUploadRef"
    v-file-upload-directive="{ props, emit }"
    class="dropzone"
  >
    <div class="dz-message">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { init } from "./index";

const vFileUploadDirective = {
  mounted(el, { value }) {
    init(el, value.props);
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

const fileUploadRef = ref();
const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`);
    if (bind) {
      bind(fileUploadRef.value);
    }
  }
};

onMounted(() => {
  bindInstance();
});
</script>
