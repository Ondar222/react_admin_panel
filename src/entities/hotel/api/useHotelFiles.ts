import { UploadFile } from "antd";
import { create } from "zustand";
import { useHotel } from "./useHotel";
import axios from "axios";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import { Room } from "@/entities/room";
import { Hotel } from "../model/Hotel";

interface IUseHotelFiles {
  cover: UploadFile | undefined;
  images: UploadFile[] | undefined;
  getHotelFiles: () => void;
  setCover: (file: UploadFile) => void;
  setImages: (files: Array<UploadFile>) => void;

  uploadImage: (
    fieldName: string,
    file: UploadFile | Array<UploadFile>
  ) => Promise<void>;

  deleteImage: (
    fieldName: string,
    images: Array<string> | string
  ) => Promise<void>;
}

const useHotelFiles = create<IUseHotelFiles>((set, get) => ({
  cover: undefined,
  images: undefined,

  setCover: (file) => {
    set({
      cover: file,
    });
  },

  setImages: (files) => {
    set({
      images: [...files],
    });
  },

  getHotelFiles: async () => {
    const { access_token } = useCredentails.getState();

    const { images, cover } = await axios
      .get<ApiResponse<Hotel>>(`${import.meta.env.VITE_API}/hotel/my`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data.data);

    set({
      cover: {
        uid: cover.id,
        name: cover.id,
        url: cover.link,
        thumbUrl: cover.link,
      },
      images: images.map((image) => ({
        uid: image.id,
        name: image.id,
        url: image.link,
        thumbUrl: image.link,
      })),
    });
  },

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
}));

export { useHotelFiles };
