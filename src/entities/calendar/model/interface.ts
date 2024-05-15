import { Booking, Room, Roomlock } from "@/entities";



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

type IBrm = {
  id: number;
  status: string;
  booking: Booking | null;
  lock: Roomlock | null;
  rooms: Room[];
}

interface IUseCalendar {
  calendar: ICalendar[];
  currentDay: ICalendar | undefined;
  getAll: () => void;
  findByDate: (date: string) => void;
}

interface IUseBrm {
  brm: {
    type: string;
    item: Booking | Roomlock;
    room: Array<Room>
  }[];
  getAll: () => void;
  addRoomLock: (lock: Roomlock) => void;
  addBooking: (booking: Booking) => void
}

export type { ICalendar, IBrm };
export type { IUseCalendar, IUseBrm };

