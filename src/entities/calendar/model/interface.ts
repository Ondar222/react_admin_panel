import { V2_Booking } from "@/entities/booking";
import { Room, RoomLock } from "@/entities/room/model/interface";

interface ICalendar {
  id: number;
  date: string;
  brm: {
    id: number;
    booking: V2_Booking;
    lock: RoomLock;
    status: string;
  }[];
}

interface IBrm {
  id: number;
  status: string;
  booking: V2_Booking | null;
  lock: RoomLock | null;
  rooms: Room[];
}

export type { ICalendar, IBrm };
