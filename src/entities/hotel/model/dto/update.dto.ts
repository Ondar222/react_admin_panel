import { UploadFile } from "antd";

class HotelUpdateDto {
  constructor(dto: {
    id: number;
    name: string;
    description: string;
    rooms: Array<number>;
    address: number;
  }) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.address = dto.address;
  }

  id: number;
  name: string;
  description: string;
  address: number;

  images: Array<UploadFile>;
  cover: UploadFile;
}

export { HotelUpdateDto };
