import { FC } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment"
import listPlugin from '@fullcalendar/list'
import dayjs from "dayjs";
import { CalendarOptions, CustomContentGenerator, EventContentArg } from "@fullcalendar/core/index.js";
import { Booking } from "@/entities/booking";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Button } from "antd";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { ICalendarUI } from "../model";
import { Roomlock } from "@/entities/roomlock";
import { Link, useNavigate } from "react-router-dom";

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const CalendarUI: FC<ICalendarUI> = (props) => {
  const navigate = useNavigate()
  const calendar_options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin, momentTimezonePlugin, listPlugin],
    initialView: 'dayGridMonth',
    dayCellClassNames: 'brm-cell',
    weekends: true,
    headerToolbar: {
      left: 'prev,next,list',
      center: "title",
      right: 'dayGridMonth',
    },

    nextDayThreshold: '00:00',

    locales: [ruLocale],
    dayMaxEvents: 2,
    events: props.brm.map((brm) => {


      if (brm.type === 'booking') {
        const booking = brm.item as Booking
        return {
          item_id: booking.id,
          title: `${booking.status}`,
          start: dayjs(booking.check_in * 1000).tz(tz).format(),
          end: dayjs(booking.check_out * 1000).tz(tz).format(),
          url: `/booking/${booking.id}`
        }
      }

      if (brm.type === 'room_lock') {
        const roomlock = brm.item as Roomlock

        return {
          item_id: roomlock.id,
          title: `${roomlock.status}`,

          start: dayjs(roomlock.start * 1000).tz(tz).toDate().toISOString(),
          end: dayjs(roomlock.end * 1000).tz(tz).toDate().toISOString(),
          url: `/roomlock/${roomlock.id}`

          // onclick: () => navigate(`/roomlock/${roomlock.id}`)

        }
      }
    }),
    eventContent: (e) => renderEventContent,
    // eventClick: (arg) => arg.el.click()
  }
  return (
    <FullCalendar
      {...calendar_options}
    />
  )
}

// a custom render function
const renderEventContent = (eventInfo: EventContentArg): CustomContentGenerator<EventContentArg> => {
  // const navigate = useNavigate()
  return (
    <Link to={eventInfo.event.url} style={{ width: '100%' }}>
      <Button style={{ width: '100%' }}>
        {`${eventInfo.event.title}`}
      </Button>
    </Link>
  )
}

export { CalendarUI }

