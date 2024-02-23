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
    const { access_token } = useCredentails.getState();
    const hotel = await axios
      .get<ApiResponse<Hotel>>(`${import.meta.env.VITE_API}/hotel/my`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      });

    set({
      hotel,
    });
  },
  createHotel: () => {},

  updateHotel: async (dto: HotelUpdateDto) => {
    const { access_token } = useCredentails.getState();
    const { images, cover, ...update_dto } = dto;
    const formData = new FormData();

    if (images) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].originFileObj) {
          formData.append(
            "images",
            images[i].originFileObj as unknown as Blob,
            images[i].name
          );
        }
      }
    }

    if (cover) {
      if (cover.originFileObj)
        formData.append(
          "cover",
          cover.originFileObj as unknown as Blob,
          cover.name
        );
    }

    console.log(formData);

    const hotel = await axios
      .patch<ApiResponse<Hotel>>(
        `${import.meta.env.VITE_API}/hotel/my`,
        update_dto,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
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
