import type { V2_Booking } from "../";
import { BookingCreateDto } from "../model/dto/create-dto";
import { BookingUpdateDto } from "../model/dto/update-dto";

interface IUseBooking {
  booking: V2_Booking[];
  currentBooking: V2_Booking | undefined;

  create: (booking: BookingCreateDto) => void;
  update: (booking: BookingUpdateDto) => void;
  delete: (id: string) => void;

  findAll: () => void;
  findById: (id: string) => void;
}

export type { IUseBooking };
