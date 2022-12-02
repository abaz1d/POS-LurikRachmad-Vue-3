<template>
  <button @click="copyCode" class="btn py-1 px-2 btn-outline-secondary">
    <FileIcon class="w-4 h-4 mr-2" /> {{ copyText }}
  </button>
  <div class="overflow-y-auto mt-3 rounded-md">
    <pre class="source-preview" v-highlight-directive>
      <code class="!-mb-[60px]" :class="type">
        <slot></slot>
      </code>
      <textarea ref="copySourceEl" v-model="copySource" class="absolute w-0 h-0 p-0"></textarea>
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import jsBeautify from "js-beautify";
import hljs from "highlight.js";
import _ from "lodash";

const copyText = ref("Copy example code");
const copySourceEl = ref("");
const copySource = ref("");
const props = defineProps({
  type: {
    type: String,
    default: "html",
  },
});

const vHighlightDirective = {
  mounted(el) {
    let source = dom(el).find("code").html();

    // Format for beautify
    source = _.replace(source, /&lt;/g, "<");
    source = _.replace(source, /&gt;/g, ">");

    // Beautify code
    source = jsBeautify.html(source);

    // Save for copy code function
    copySource.value = source;

    // Format for highlight.js
    source = _.replace(source, /</g, "&lt;");
    source = _.replace(source, />/g, "&gt;");

    dom(el).find("code").html(source);

    hljs.highlightElement(dom(el).find("code")[0]);
  },
};

const copyCode = () => {
  copyText.value = "Copied!";
  setTimeout(() => {
    copyText.value = "Copy example code";
  }, 1500);

  copySourceEl.value.select();
  copySourceEl.value.setSelectionRange(0, 99999);
  document.execCommand("copy");
};
</script>
