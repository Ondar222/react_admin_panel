import { create } from "zustand";
import { HotelUpdateDto } from "../model/dto/update.dto";
import axios from "axios";
import { Hotel } from "../model/hotel";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import { IUseHotel } from "../model/useHotel";
import { UploadFile } from "antd";

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

    console.log(data)

    await axios.delete(`${import.meta.env.VITE_API}/hotel/my/images`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        ...data,
      },
    });
  },
}));

export { useHotel };
