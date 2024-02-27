import { Upload, UploadFile } from "antd";
import { Room, RoomTypes } from "../interface";
import { url } from "inspector";
import { IImage } from "@/app/types";

class RoomUpdateDto {
  constructor(
    dto: Room = {
      id: 0,
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
    this.id = dto.id;
    this.name = dto.name;
    this.price = dto.price;
    this.description = dto.description;
    this.type = dto.type;
    this.number = dto.number;
    this.capacity = dto.capacity;
    this.hotel_id = dto.hotel_id;
    this.visibility = dto.visibility;
    this.cover = {
      uid: dto.cover.id,
      name: dto.cover.id,
      url: dto.cover.link,
      thumbUrl: dto.cover.link,
    } || {
      uid: `${
        import.meta.env.VITE_API
      }/files/8e1aacb6-2ee5-4ffe-a335-9c98e0c38280`,
      name: `${
        import.meta.env.VITE_API
      }/files/8e1aacb6-2ee5-4ffe-a335-9c98e0c38280`,
      url: `${
        import.meta.env.VITE_API
      }/files/8e1aacb6-2ee5-4ffe-a335-9c98e0c38280`,
      thumbUrl: `${
        import.meta.env.VITE_API
      }/files/8e1aacb6-2ee5-4ffe-a335-9c98e0c38280`,
    };
    this.images = dto.images.map<UploadFile>((item: IImage) => {
      return {
        uid: item.id,
        name: item.id,
        url: item.link,
        thumbUrl: item.link,
      };
    });
  }
  readonly id: number;
  name: string;
  price: number;
  description: string;
  type: RoomTypes;
  number: string;
  capacity: number;
  visibility: boolean;
  hotel_id: number;
  cover: UploadFile;
  images?: Array<UploadFile>;
}

export { RoomUpdateDto };
