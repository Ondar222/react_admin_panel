import type { Booking } from "..";
import { BookingCreateDto } from "./dto/BookingCreateDto";
import { BookingUpdateDto } from "./dto/BookingUpdateDto";

interface UseBooking {
  bookings: Booking[] | undefined;
  booking_details: Booking | undefined;

  getAllBookings: () => void;
  getBookingDetailsByID: (id: number) => Promise<void>;
}

interface UseBookingHotel extends UseBooking {}

interface UseBookingTourist extends UseBooking {
  // only for tourist roles
  createBooking: (booking: BookingCreateDto) => void;
  updateBooking: (booking: BookingUpdateDto) => void;
  deleteBookingByID: (id: string) => void;
  // only for tourins roles
}

export type { UseBooking, UseBookingTourist, UseBookingHotel };
