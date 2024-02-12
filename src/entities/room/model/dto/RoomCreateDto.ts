import { RcFile } from "antd/es/upload";
import { Room, RoomTypes } from "../interface";
import { UploadFile } from "antd/lib";

export interface RoomCreationBody {
  price: number;
  description: string;
  type: string;
  cover?: UploadFile;
  name: string;
  number: string;
  capacity: number;
  hotel_id: number;
  images?: Array<UploadFile>;
}

class RoomCreationDto {
  constructor(
    room: RoomCreationBody = {
      price: 0,
      description: "",
      type: RoomTypes.standard,
      cover: undefined,
      name: "",
      number: "",
      capacity: 0,
      hotel_id: 0,
      images: undefined,
    }
  ) {
    this.number = room.number;
    this.price = room.price;
    this.type = room.type;
    this.hotel_id = room.hotel_id;
    this.description = room.description;
    this.capacity = room.capacity;
    this.name = room.name;
    this.cover = room.cover || undefined;
    this.images = room.images || undefined;
  }
  price: number;
  description: string;
  type: string;
  cover?: UploadFile;
  name: string;
  number: string;
  capacity: number;
  hotel_id: number;
  images?: Array<UploadFile>;
}

export { RoomCreationDto };
