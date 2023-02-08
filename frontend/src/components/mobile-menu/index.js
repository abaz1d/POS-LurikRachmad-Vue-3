import { ref } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";

// Toggle mobile menu
const activeMobileMenu = ref(false);
const toggleMobileMenu = () => {
  activeMobileMenu.value = !activeMobileMenu.value;
};

// Setup mobile menu
const linkTo = (menu, router) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    activeMobileMenu.value = false;
    router.push({
      name: menu.pageName,
    });
  }
};

const enter = (el) => {
  dom(el).slideDown(300);
};

const leave = (el) => {
  dom(el).slideUp(300);
};

export { activeMobileMenu, toggleMobileMenu, linkTo, enter, leave };
