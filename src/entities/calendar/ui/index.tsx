import { FC, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment"
import dayjs from "dayjs";
import { ICalendar } from "..";
import { CalendarOptions, EventClickArg, EventInput, EventSourceInput } from "@fullcalendar/core/index.js";
import { Identity, preventDefault } from "@fullcalendar/core/internal.js";
import { V2_Booking } from "@/entities/booking";
import { useBrm } from "../api/useBrm";
import { IBrm } from "../model/interface";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import moment from "moment-timezone";
import { Button } from "antd";
import { RoomLock } from "@/entities/room/model/interface";

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"


interface ICalendarPresenter extends EventInput {
  calendar: ICalendar[] | V2_Booking[]
  brm: {
    type: string;
    item: V2_Booking | RoomLock;
  }[]
}


interface ICalendarUI {
  brm: {
    type: string;
    item: V2_Booking | RoomLock;
  }[];
  onClick: (arg: EventClickArg) => void
}

const CalendarUI: FC<ICalendarUI> = (props) => {
  const rtp: CalendarOptions = {
    plugins: [dayGridPlugin, momentPlugin],
    initialView: 'dayGridMonth',
    dayCellClassNames: 'brm-cell',
    weekends: true,

    events: props.brm.map((brm) => {
      const booking = brm.item as V2_Booking
      if (brm.type === 'booking') {
        return {
          item_id: booking.id,
          type: brm.type,
          title: `${booking.status}`,
          start: moment(booking.check_in * 1000).tz(tz).toDate(),
          end: moment(booking.check_out * 1000).tz(tz).toDate(),
          // url: `/partners/booking/${booking.id}`

        }
      }
      if (brm.type === 'room_lock') {
        const room_lock = brm.item as RoomLock
        return {
          item_id: room_lock.id,
          type: brm.type,
          title: `${room_lock.status}`,
          start: moment(room_lock.start * 1000).tz(tz).toDate(),
          end: moment(room_lock.end * 1000).tz(tz).toDate(),
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
      {...rtp}
    />
  )
}

export { CalendarUI }

// a custom render function
function renderEventContent(eventInfo) {
  console.log(eventInfo)
  return (
    <Button onClick={(e) => {
      preventDefault
    }} style={{ width: '100%' }}>{`${eventInfo.event.title}`}</Button>
  )
}