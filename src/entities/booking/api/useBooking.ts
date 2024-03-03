import { create } from "zustand";

import { V2_Booking } from "../model/interface";
import { IUseBooking } from "./interface";

import { useCredentails } from "../../../features/auth";
import axios from "axios";
import { IDirectusResponse } from "@/shared/directus/model/interface";
import { BookingCreateDto } from "../model/dto/create-dto";
import { BookingUpdateDto } from "../model/dto/update-dto";

const useBooking = create<IUseBooking>((set) => ({
  booking: [],
  currentBooking: undefined,

  findAll: async () => {
    const access_token = useCredentails.getState().access_token;
    const data = await axios
      .get<IDirectusResponse<V2_Booking[]>>(
        `${import.meta.env.VITE_API}/booking`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    set({
      booking: data,
    });
  },

  findById: async (id) => {
    const access_token = useCredentails.getState().access_token;
    const data = await axios
      .get<IDirectusResponse<V2_Booking>>(
        `${import.meta.env.VITE_API}/booking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);

    return set({
      currentBooking: data,
    });
  },

  create: async (booking: BookingCreateDto) => {
    const { access_token } = useCredentails.getState();
    await axios.post(`${import.meta.env.VITE_API}/booking`, booking, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },

  update: async (booking: BookingUpdateDto) => {
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

  delete: () => {},
}));

export { useBooking };
