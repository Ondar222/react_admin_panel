import { UploadFile } from "antd";
import { create } from "zustand";
import { useHotel } from "./useHotel";
import axios from "axios";
import { useCredentails } from "@/features/auth";

interface IUseHotelFiles {
  cover: UploadFile | undefined;
  images: UploadFile[] | undefined;

  setCover: (file: UploadFile) => void;
  setImages: (files: Array<UploadFile>) => void;

  uploadImages: (files: { cover: UploadFile; images: UploadFile[] }) => void;
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

  uploadImages: async (files) => {
    const { access_token } = useCredentails.getState();

    const formData = new FormData();
    if (files.cover) {
      formData.append("cover", files.cover as unknown as Blob);
    }

    if (files.images) {
      for (let i = 0; i < files.images.length; i++) {
        formData.append("images", files.images[i] as unknown as Blob);
      }
    }

    const uploaded_files = await axios
      .patch(`${import.meta.env.VITE_API}/hotel/my/files`, formData, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => res.data.data);
  },
  deleteImage: () => {},
}));

export { useHotelFiles };
