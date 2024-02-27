import { UploadFile } from "antd/lib";
import { Room, RoomTypes } from "..";

class RoomCreationDto {
  constructor(
    dto: Omit<Room, "id"> = {
      price: 0,
      description: "",
      type: RoomTypes.standard,
      cover: {
        id: "",
        link: "",
      },
      visibility: false,
      name: "",
      number: "",
      capacity: 0,
      hotel_id: 0,
      images: [],
    }
  ) {
    this.name = dto.name;
    this.price = dto.price;
    this.description = dto.description;
    this.type = dto.type;
    this.number = dto.number;
    this.capacity = dto.capacity;
    this.hotel_id = dto.hotel_id;
    this.visibility = dto.visibility;
    this.cover = undefined;
    this.images = undefined
  }
  price: number = undefined;
  description?: string = undefined;
  type: RoomTypes = RoomTypes.standard;

  name: string = undefined;
  number: string = undefined;
  capacity: number = undefined;
  hotel_id: number = undefined;

  cover: UploadFile;
  images: Array<UploadFile>;

  visibility: boolean = false;
}

export { RoomCreationDto };
