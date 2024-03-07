import { UploadFile } from "antd/lib";
import { Room, RoomTypes } from "..";

class RoomCreationDto {
  price: number = undefined;
  description?: string = undefined;
  type: RoomTypes = RoomTypes.standard;

  name: string = undefined;
  number: string = undefined;
  capacity: number = undefined;
  hotel_id: number = undefined;

  cover: Array<UploadFile> = undefined;
  images: Array<UploadFile> = undefined;

  visibility: boolean = false;
}

export { RoomCreationDto };
