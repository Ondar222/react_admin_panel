import { create } from "zustand";
import { HotelUpdateDto } from "../model/dto/hotelUpdateDto";
import axios from "axios";
import Hotel from "../model/interface";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import { IUseHotel } from ".";

const useHotel = create<IUseHotel>((set) => ({
  hotel: undefined,
  currentHotel: undefined,
  relatedHotels: undefined,

  setHotels: async () => { },
  setCurrentHotel: async () => {
    const { access_token } = useCredentails.getState();
    const data = await axios
      .get<ApiResponse<Hotel>>(`${import.meta.env.VITE_API}/hotel/my`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    set({
      currentHotel: data
    })
  },

  updateHotel: async (dto: HotelUpdateDto) => {
    return dto
  },

  createHotel: async () => { },
  
  updateCurrentHotel() { },
}));

export { useHotel };
