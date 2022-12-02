import { watch } from "vue";

const init = async (el, editorBuild, { props, emit, cacheData }) => {
  // Initial data
  cacheData = props.modelValue;
  props.config.initialData = props.modelValue;

  // Init CKEditor
  const editor = await editorBuild.create(el, props.config);

  // Attach CKEditor instance
  el.CKEditor = editor;

  // Set initial disabled state
  editor.isReadOnly = props.disabled;

  // Set on change event
  editor.model.document.on("change:data", () => {
    const data = editor.getData();
    cacheData = data;
    emit("update:modelValue", data);
  });

  // Set on focus event
  editor.editing.view.document.on("focus", (evt) => {
    emit("focus", evt, editor);
  });

  // Set on blur event
  editor.editing.view.document.on("blur", (evt) => {
    emit("blur", evt, editor);
  });

  // Set on ready event
  emit("ready", editor);

  // Watch model change
  watch(props, () => {
    if (cacheData !== props.modelValue) {
      el.CKEditor.setData(props.modelValue);
    }
  });
};

export { init };
