import {
  h,
  defineComponent,
  resolveDirective,
  withDirectives,
  provide,
  inject,
  ref,
} from "vue";
import { File } from "lucide-vue-next";
import jsBeautify from "js-beautify";
import hljs from "highlight.js";
import _ from "lodash";

// Preview coomponent wrapper
const PreviewComponent = defineComponent({
  name: "PreviewComponent",
  setup(props, { slots, attrs, emit }) {
    const previewCode = ref(true);
    provide("previewCode", previewCode);

    return () =>
      h(
        "div",
        slots.default({
          toggle: () => {
            previewCode.value = !previewCode.value;
          },
        })
      );
  },
});

// Preview
const Preview = defineComponent({
  name: "Preview",
  setup(props, { slots, attrs, emit }) {
    const previewCode = inject("previewCode");
    return () => (previewCode.value ? h("div", slots.default()) : "");
  },
});

// Source
const Source = defineComponent({
  name: "Source",
  setup(props, { slots, attrs, emit }) {
    const previewCode = inject("previewCode");
    return () => (!previewCode.value ? h("div", slots.default()) : "");
  },
});

// Highlight
const Highlight = defineComponent({
  name: "Highlight",
  directives: {
    highlight: {
      mounted(el, { value }) {
        let source = dom(el).find("code").html();

        // Format for beautify
        source = _.replace(source, /&lt;/g, "<");
        source = _.replace(source, /&gt;/g, ">");

        // Beautify code
        source = jsBeautify.html(source);

        // Save for copy code function
        value.copySource.value = source;

        // Format for highlight.js
        source = _.replace(source, /</g, "&lt;");
        source = _.replace(source, />/g, "&gt;");

        dom(el).find("code").html(source);

        hljs.highlightElement(dom(el).find("code")[0]);
      },
    },
  },
  props: {
    copyButton: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "html",
    },
    class: {
      type: String,
      default: "",
    },
  },
  setup(props, { slots, attrs, emit }) {
    const highlightDirective = resolveDirective("highlight");
    const copyText = ref("Copy example code");
    const copySourceEl = ref("");
    const copySource = ref("");

    return () =>
      h("div", [
        props.copyButton
          ? h(
              "button",
              {
                class: ["btn py-1 px-2 btn-outline-secondary", props.class],
                onClick(event) {
                  copyText.value = "Copied!";
                  setTimeout(() => {
                    copyText.value = "Copy example code";
                  }, 1500);

                  copySourceEl.value.select();
                  copySourceEl.value.setSelectionRange(0, 99999);
                  document.execCommand("copy");
                },
              },
              [
                h(File, {
                  class: "w-4 h-4 mr-2",
                }),
                copyText.value,
              ]
            )
          : "",
        withDirectives(
          h(
            "div",
            {
              class: [
                "rounded-md overflow-hidden relative",
                props.copyButton ? "mt-3" : "",
                !props.copyButton ? props.class : "",
              ],
            },
            h(
              "pre",
              {
                class:
                  "source-preview !static overflow-y-auto !px-[16px] !py-[15px]",
              },
              [
                h(
                  "code",
                  {
                    class: ["!-mb-[60px] !inline", props.type],
                  },
                  slots.default()
                ),
                h("textarea", {
                  ref: copySourceEl,
                  value: copySource.value,
                  class: "absolute w-0 h-0 p-0",
                }),
              ]
            )
          ),
          [[highlightDirective, { props, emit, copySource }]]
        ),
      ]);
  },
});

export { PreviewComponent, Preview, Source, Highlight };
