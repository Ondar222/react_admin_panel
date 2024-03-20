import { Hotel, HotelUpdateDto } from "@/entities/hotel";
import { UploadFile, InputProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";

type UpdateHotelFormT = {
  name: string;
  description: string;
  
  arrival: string;
  departure: string;

  cover: UploadChangeParam<UploadFile<any>>;
  images: UploadChangeParam<UploadFile<any>>;
};

interface HotelUpdatePageProps {
  hotel: Hotel;
}

interface HotelUpdateFormUIProps {
  hotel: HotelUpdateDto;
  cover: Array<UploadFile>;
  images: Array<UploadFile>;

  handleChange: InputProps["onChange"];
  handleEditorChange: (html: string) => void;
  onFileChange: (
    name: string,
    info: UploadChangeParam<UploadFile<any>>
  ) => void;
  onFileRemove: (name: string, file: UploadFile) => void;
  onSubmit: (hotel: HotelUpdateDto) => void;
}

export type { UpdateHotelFormT, HotelUpdatePageProps, HotelUpdateFormUIProps };
