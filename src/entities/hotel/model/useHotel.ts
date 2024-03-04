import { UploadFile } from "antd";
import { HotelUpdateDto } from "./dto/HotelUpdateDto";
import type { Hotel } from "./Hotel";
import { HotelCreateDto } from "./dto/HotelCreateDto";

interface UseHotel {
  hotel: Hotel | undefined;

  getHotelDetails: () => void;

  createHotel: (dto: HotelCreateDto) => void;
  updateHotel: (dto: HotelUpdateDto) => Promise<void>;

  deleteHotel: () => void;

  uploadImage: (
    fieldName: string,
    file: UploadFile | Array<UploadFile>
  ) => Promise<void>;

  deleteImage: (
    fieldName: string,
    images: Array<string> | string
  ) => Promise<void>;
}

export type { UseHotel };
