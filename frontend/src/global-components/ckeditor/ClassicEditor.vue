<template>
  <component
    :is="tagName"
    ref="editorRef"
    v-editor-directive="{ props, emit, cacheData }"
    class="select"
  ></component>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { init } from "./index";

const vEditorDirective = {
  mounted(el, { value }) {
    init(el, ClassicEditor, value);
  },
};

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  config: {
    type: Object,
    default: () => ({}),
  },
  tagName: {
    type: String,
    default: "div",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  refKey: {
    type: String,
    default: null,
  },
});

const emit = defineEmits();

const editorRef = ref();
const cacheData = ref("");

const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`);
    if (bind) {
      bind(editorRef.value);
    }
  }
};

onMounted(() => {
  bindInstance();
});
</script>
