import { Hotel, HotelUpdateDto } from "@/entities/hotel";
import { UploadFile, InputProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";

export interface HotelUpdatePageProps {
  hotel: Hotel;
}

export interface HotelUpdateFormUIProps {
  hotel: HotelUpdateDto;
  cover: Array<UploadFile>;
  images: Array<UploadFile>;

  handleChage: InputProps["onChange"];

  onFileChange: (
    name: string,
    info: UploadChangeParam<UploadFile<any>>
  ) => void;
  onFileRemove: (name: string, file: UploadFile) => void;
  onSubmit: (hotel: HotelUpdateDto) => void;
}
