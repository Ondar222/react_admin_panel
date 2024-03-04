import { FC } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment"
import listPlugin from '@fullcalendar/list'
import dayjs from "dayjs";
import { ICalendar } from "../../../entities/calendar";
import { CalendarOptions, EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import { preventDefault } from "@fullcalendar/core/internal.js";
import { Booking } from "@/entities/booking";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import moment from "moment-timezone";
import { Button } from "antd";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { ICalendarUI } from "../model";
import { Roomlock } from "@/entities/roomlock";

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const CalendarUI: FC<ICalendarUI> = (props) => {
  const calendar_options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin, momentTimezonePlugin, listPlugin],
    initialView: 'dayGridMonth',
    dayCellClassNames: 'brm-cell',
    weekends: true,
    headerToolbar: {
      left: 'prev,next,listWeek,list',
      center: "title",
      right: 'dayGridMonth',
    },

    nextDayThreshold: '00:00',
    locales: [ruLocale],
    dayMaxEvents: false,
    events: props.brm.map((brm) => {
      const booking = brm.item as Booking

      if (brm.type === 'booking') {
        return {
          item_id: booking.id,
          type: brm.type,
          title: `${booking.status}`,
          start: dayjs(booking.check_in * 1000).tz(tz).format(),
          end: dayjs(booking.check_out * 1000).tz(tz).format(),
          // url: `/partners/booking/${booking.id}`

        }
      }

      if (brm.type === 'room_lock') {
        const room_lock = brm.item as Roomlock
        return {
          item_id: room_lock.id,
          type: brm.type,
          title: `${room_lock.status}`,
          start: moment(room_lock.start * 1000).tz(tz).format(),
          end: moment(room_lock.end * 1000).add(1, "s").format(),

          // url: `/partners/room_lock/${room_lock.id}`
        }
      }
    }),
    locale: "ru",
    eventContent: renderEventContent,
    timeZone: "Asia/Krasnoyarsk",
    eventClick: (props.onClick)
  }
  return (
    <FullCalendar
      {...calendar_options}
    />
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <Button onClick={(e) => {
      preventDefault
    }} style={{ width: '100%' }}>{`${eventInfo.event.title}`}</Button>
  )
}

export { CalendarUI }

