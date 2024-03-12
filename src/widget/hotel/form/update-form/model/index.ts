import { Hotel, HotelUpdateDto } from "@/entities/hotel";
import { Editor } from "@tinymce/tinymce-react";
import { UploadFile, InputProps } from "antd";
import { UploadChangeParam } from "antd/es/upload";

export interface HotelUpdatePageProps {
  hotel: Hotel;
}

export interface HotelUpdateFormUIProps {
  hotel: HotelUpdateDto;
  cover: Array<UploadFile>;
  images: Array<UploadFile>;

  handleChange: InputProps["onChange"];
  handleEditorChange: Even;
  onFileChange: (
    name: string,
    info: UploadChangeParam<UploadFile<any>>
  ) => void;
  onFileRemove: (name: string, file: UploadFile) => void;
  onSubmit: (hotel: HotelUpdateDto) => void;
}
