import { UploadFile } from "antd";

class HotelCreateDto {
  name: string;
  description: string;

  cover: UploadFile;
  images: Array<UploadFile>;
}

export { HotelCreateDto };
