<template>
  <FullCalendar :options="options" />
</template>

<script setup>
import { ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dom from "@left4code/tw-starter/dist/js/dom";
import { INITIAL_EVENTS, createEventId } from "@/utils/event-utils";
const currentEvents = ref([]);
const handleDateSelect = (selectInfo) => {
  console.log("info", selectInfo);
  let title = prompt("Tulis jadwal baru anda");
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }
};
const handleEventClick = (clickInfo) => {
  if (
    confirm(`Apakah Anda yakin kan menghapus jadwal '${clickInfo.event.title}'`)
  ) {
    clickInfo.event.remove();
  }
};
const handleEvents = (events) => {
  currentEvents.value = events;
};

const options = {
  plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
  droppable: true,
  headerToolbar: {
    right: "prev,next",
    left: "title",
  },
  longPressDelay: 0,
  initialView: "dayGridMonth",
  initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  drop: function (info) {
    if (dom("#checkbox-events").length && dom("#checkbox-events")[0].checked) {
      dom(info.draggedEl).parent().remove();

      if (dom("#calendar-events").children().length == 1) {
        dom("#calendar-no-events").removeClass("hidden");
      }
    }
  },
};

defineExpose({ handleDateSelect });
</script>
