import { ref } from "vue";

// Toggle search dropdown
const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = (e) => {
  searchDropdown.value = false;
  console.log("search dropdown", e, Router)
};

export { searchDropdown, showSearchDropdown, hideSearchDropdown };
