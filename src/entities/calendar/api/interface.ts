import { Booking } from "@/entities/booking";
import { IBrm, ICalendar } from "../model/interface";
import { Roomlock } from "@/entities/roomlock/model/Roomlock";

interface IUseCalendar {
  calendar: ICalendar[];
  currentDay: ICalendar | undefined;
  getAll: () => void;
  findByDate: (date: string) => void;
}

interface IUseBrm {
  // booking: {
  //   type: string;
  //   items: Booking;
  // }[];
  // room_lock: {
  //   type: string;
  //   items: RoomLock;
  // }[];
  brm: {
    type: string;
    item: Booking | Roomlock;
  }[];
  getAll: () => void;
  addRoomLock: (lock: Roomlock) => void;
}

export type { IUseCalendar, IUseBrm };
