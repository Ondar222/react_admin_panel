import { Booking } from "@/entities/booking";
import { Room } from "@/entities/room/model/Room";
import { Roomlock } from "@/entities/roomlock";

interface ICalendar {
  id: number;
  date: string;
  brm: {
    id: number;
    booking: Booking;
    lock: Roomlock;
    status: string;
  }[];
}

interface IBrm {
  id: number;
  status: string;
  booking: Booking | null;
  lock: Roomlock | null;
  rooms: Room[];
}

export type { ICalendar, IBrm };
