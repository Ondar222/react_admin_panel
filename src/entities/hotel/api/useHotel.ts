import { create } from "zustand";
import { HotelUpdateDto } from "../model/dto/update.dto";
import axios from "axios";
import Hotel from "../model/interface";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import { IUseHotel } from ".";

const useHotel = create<IUseHotel>((set, get) => ({
  hotel: undefined,

  setHotel: async () => {
    if (get().hotel === undefined) {
      const { access_token } = useCredentails.getState();
      const hotel = await axios
        .get<ApiResponse<Hotel>>(`${import.meta.env.VITE_API}/hotel/my`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data.data);

      set({
        hotel,
      });
    }
  },
  createHotel: () => {},

  updateHotel: async (dto: HotelUpdateDto) => {
    const { access_token } = useCredentails.getState();

    const formData = new FormData();
    // formData.append();

    if (dto.images)
      for (let i = 0; i < dto.images.length; i++) {
        formData.append(
          "images",
          dto.images[i].originFileObj as unknown as Blob,
          dto.images[i].name
        );
      }

    if (dto.cover) {
      formData.append(
        "images",
        dto.cover.originFileObj as unknown as Blob,
        dto.cover.name
      );
    }

    const hotel = await axios
      .patch<ApiResponse<Hotel>>(`${import.meta.env.VITE_API}/hotel/my`, dto, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    const hotel_files = await axios
      .patch<ApiResponse<Hotel>>(
        `${import.meta.env.VITE_API}/hotel/my/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((res) => res.data.data);
  },

  deleteHotel: () => {},
}));

export { useHotel };
