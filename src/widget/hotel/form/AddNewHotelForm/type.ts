import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";

type AddNewHotelFormT = {
  name: string;
  description: string;
  cover: UploadChangeParam<UploadFile<any>>;
  images: UploadChangeParam<UploadFile<any>>;
};
export type { AddNewHotelFormT };
