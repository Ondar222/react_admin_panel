import { Booking, Room, Roomlock } from "@/entities";
import { CalendarOptions, EventClickArg } from "@fullcalendar/core/index.js";

interface ICalendar extends CalendarOptions {
  brm: {
    type: string;
    item: Booking | Roomlock;
    room: Array<Room>
  }[];
  onClick?: (arg: EventClickArg) => void
}

export type { ICalendar }