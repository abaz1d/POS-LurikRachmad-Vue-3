import "zoom-vanilla.js/dist/zoom-vanilla.min.js";
import Chart from "./chart/Main.vue";
import GoogleMapLoader from "./google-map-loader/Main.vue";
import Litepicker from "./litepicker/Main.vue";
import Tippy from "./tippy/Main.vue";
import TippyContent from "./tippy-content/Main.vue";
import TomSelect from "./tom-select/Main.vue";
import LoadingIcon from "./loading-icon/Main.vue";
import TinySlider from "./tiny-slider/Main.vue";
import ClassicEditor from "./ckeditor/ClassicEditor.vue";
// import BalloonBlockEditor from './ckeditor/BalloonBlockEditor.vue'
// import BalloonEditor from './ckeditor/BalloonEditor.vue'
// import DocumentEditor from './ckeditor/DocumentEditor.vue'
// import InlineEditor from './ckeditor/InlineEditor.vue'
import Dropzone from "./dropzone/Main.vue";
// import FullCalendar from "./calendar/Main.vue";
// import FullCalendarDraggable from "./calendar/Draggable.vue";
import Notification from "./notification/Main.vue";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./modal";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownFooter,
  DropdownDivider,
} from "./dropdown";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "./tab";
import {
  AccordionGroup,
  AccordionItem,
  Accordion,
  AccordionPanel,
} from "./accordion";
import { Alert } from "./alert";
import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "./preview-component";
import LucideIcons from "./lucide";

export default (app) => {
  app.component("Chart", Chart);
  app.component("GoogleMapLoader", GoogleMapLoader);
  app.component("Litepicker", Litepicker);
  app.component("Tippy", Tippy);
  app.component("TippyContent", TippyContent);
  app.component("TomSelect", TomSelect);
  app.component("LoadingIcon", LoadingIcon);
  app.component("TinySlider", TinySlider);
  app.component("Dropzone", Dropzone);
  app.component("ClassicEditor", ClassicEditor);
  // app.component('BalloonBlockEditor', BalloonBlockEditor)
  // app.component('BalloonEditor', BalloonEditor)
  // app.component('DocumentEditor', DocumentEditor)
  // app.component('InlineEditor', InlineEditor)
  // app.component("FullCalendar", FullCalendar);
  // app.component("FullCalendarDraggable", FullCalendarDraggable);
  app.component("Notification", Notification);
  app.component("Modal", Modal);
  app.component("ModalHeader", ModalHeader);
  app.component("ModalBody", ModalBody);
  app.component("ModalFooter", ModalFooter);
  app.component("Dropdown", Dropdown);
  app.component("DropdownToggle", DropdownToggle);
  app.component("DropdownMenu", DropdownMenu);
  app.component("DropdownContent", DropdownContent);
  app.component("DropdownItem", DropdownItem);
  app.component("DropdownHeader", DropdownHeader);
  app.component("DropdownFooter", DropdownFooter);
  app.component("DropdownDivider", DropdownDivider);
  app.component("TabGroup", TabGroup);
  app.component("TabList", TabList);
  app.component("Tab", Tab);
  app.component("TabPanels", TabPanels);
  app.component("TabPanel", TabPanel);
  app.component("AccordionGroup", AccordionGroup);
  app.component("AccordionItem", AccordionItem);
  app.component("Accordion", Accordion);
  app.component("AccordionPanel", AccordionPanel);
  app.component("Alert", Alert);
  app.component("PreviewComponent", PreviewComponent);
  app.component("Preview", Preview);
  app.component("Source", Source);
  app.component("Highlight", Highlight);

  for (const [key, icon] of Object.entries(LucideIcons)) {
    app.component(key, icon);
  }
};
