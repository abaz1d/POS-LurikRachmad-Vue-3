import { ref } from "vue";

// Toggle search dropdown
const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

export { searchDropdown, showSearchDropdown, hideSearchDropdown };
