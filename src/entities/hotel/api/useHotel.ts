import axios from "axios";
import { create } from "zustand";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import type { Hotel } from "@/entities/hotel";
import type { UseHotel } from "@/entities/hotel";
import { UploadFile } from "antd";
import { createJSONStorage, persist } from "zustand/middleware";

const useHotel = create(persist<UseHotel>((set, get) => ({
  hotel: undefined,

  getHotelDetails: async () => {
    if (!get().hotel.id) {
      console.log('updated hotel object')
      const { access_token } = useCredentails.getState();
      const hotel = await axios
        .get<ApiResponse<Hotel>>(`${import.meta.env.VITE_API}/hotel/my`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          return res.data.data;
        });

      set({
        hotel,
      });
    }
  },

  createHotel: async (dto) => {
    const { access_token } = useCredentails.getState();
    const hotel = await axios.post(`${import.meta.env.VITE_API}`, dto, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },

  updateHotel: async (dto) => {
    const { access_token } = useCredentails.getState();
    const { ...update_dto } = dto;
    const formData = new FormData();

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
  },

  deleteHotel: () => { },

  // completed
  uploadImage: async (fieldName, file) => {
    const { access_token } = useCredentails.getState();
    const formData = new FormData();

    if (Array.isArray(file) === true) {
      for (let i = 0; i < (file as UploadFile[]).length; i++) {
        formData.append(fieldName, file[i].originFileObj);
      }
    }

    if (Array.isArray(file) === false) {
      formData.append(fieldName, (file as UploadFile).originFileObj);
    }

    await axios.post(`${import.meta.env.VITE_API}/hotel/my/images`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },

  // completed
  deleteImage: async (fieldName, file) => {
    const { access_token } = useCredentails.getState();

    const data = {
      [fieldName]: undefined,
    };

    if (Array.isArray(file) === true) {
      data[fieldName] = file;
    }

    if (Array.isArray(file) === false) {
      data[fieldName] = file;
    }

    console.log(data);

    await axios.delete(`${import.meta.env.VITE_API}/hotel/my/images`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        ...data,
      },
    });
  },
}), {
  name: "hotel_store",
  storage: createJSONStorage(() => localStorage)
}));

export { useHotel };
