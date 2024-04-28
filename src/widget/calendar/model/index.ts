import { Booking, Roomlock } from "@/entities";
import { CalendarOptions, EventClickArg } from "@fullcalendar/core/index.js";

interface ICalendar extends CalendarOptions {
  brm: {
    type: string;
    item: Booking | Roomlock;
  }[];
  onClick?: (arg: EventClickArg) => void
}

export type { ICalendar }