import { create } from "zustand";
import { Booking, UseBooking } from "../model";
import { useCredentails } from "../../../features/auth";
import axios from "axios";
import { BookingCreateDto } from "../model/dto/BookingCreateDto";
import { BookingUpdateDto } from "../model/dto/BookingUpdateDto";
import { ApiResponse } from "@/app/types";

const useBooking = create<UseBooking>((set) => ({
  bookings: undefined,

  booking_details: undefined,

  getAllBookings: async () => {
    const access_token = useCredentails.getState().access_token;
    const data = await axios
      .get<ApiResponse<Booking[]>>(`${import.meta.env.VITE_API}/booking`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    set({
      bookings: data,
    });
  },

  getBookingDetailsByID: async (id) => {
    const access_token = useCredentails.getState().access_token;
    const data = await axios
      .get<ApiResponse<Booking>>(`${import.meta.env.VITE_API}/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    return set({
      booking_details: data,
    });
  },

  createBooking: async (booking: BookingCreateDto) => {
    const { access_token } = useCredentails.getState();
    await axios.post(`${import.meta.env.VITE_API}/booking`, booking, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },

  updateBooking: async (booking: BookingUpdateDto) => {
    const { access_token } = useCredentails.getState();
    await axios.put(
      `${import.meta.env.VITE_API}/booking/${booking.id}`,
      booking,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  },

  deleteBookingByID: () => {},
}));

export { useBooking };
