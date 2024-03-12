import { Booking } from "@/entities/booking";
import { Roomlock } from "@/entities/roomlock";
import { CalendarOptions, EventClickArg } from "@fullcalendar/core/index.js";

interface ICalendarUI extends CalendarOptions {
  brm: {
    type: string;
    item: Booking | Roomlock;
  }[];
  onClick?: (arg: EventClickArg) => void
}

export type {ICalendarUI}