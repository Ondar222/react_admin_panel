import { V2_Booking } from "@/entities/booking";
import { IBrm, ICalendar } from "../model/interface";
import { RoomLock } from "@/entities/room/model/interface";

interface IUseCalendar {
  calendar: ICalendar[];
  currentDay: ICalendar | undefined;
  getAll: () => void;
  findByDate: (date: string) => void;
}

interface IUseBrm {
  // booking: {
  //   type: string;
  //   items: V2_Booking;
  // }[];
  // room_lock: {
  //   type: string;
  //   items: RoomLock;
  // }[];
  brm: {
    type: string;
    item: V2_Booking | RoomLock;
  }[];
  getAll: () => void;
}

export type { IUseCalendar, IUseBrm };
