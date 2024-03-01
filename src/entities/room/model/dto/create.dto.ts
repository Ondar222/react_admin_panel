import { UploadFile } from "antd/lib";
import { Room, RoomTypes } from "..";

class RoomCreationDto {
  constructor() {
    this.name = undefined;
    this.price = undefined;
    this.description = undefined;
    this.type = undefined;
    this.number = undefined;
    this.capacity = undefined;
    this.hotel_id = undefined;
    this.visibility = undefined;
    this.cover = undefined;
    this.images = undefined;
  }
  
  price: number = undefined;
  description?: string = undefined;
  type: RoomTypes = RoomTypes.standard;

  name: string = undefined;
  number: string = undefined;
  capacity: number = undefined;
  hotel_id: number = undefined;

  cover: UploadFile = undefined;
  images: Array<UploadFile> = undefined;

  visibility: boolean = false;
}

export { RoomCreationDto };
