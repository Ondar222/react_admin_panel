import { UploadFile } from "antd";
import { RoomTypes } from "../Room";

class RoomUpdateDto {
  readonly id: number;
  name: string;
  price: number;
  description: string;
  type: RoomTypes;
  number: string;
  capacity: number;
  visibility: boolean;
  hotel_id: number;
  cover: Array<UploadFile> | undefined;
  images: Array<UploadFile>;
}

export { RoomUpdateDto };
