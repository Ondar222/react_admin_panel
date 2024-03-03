import { UploadFile } from "antd";
import { Hotel } from "../hotel";

class HotelUpdateDto {
  constructor(dto: Hotel) {
    this.id = dto?.id || 0;
    this.name = dto?.name;
    this.description = dto?.description;
    this.address = dto?.address;
  }

  id: number;
  name: string;
  description: string;
  address?: Record<string, string>;
}

export { HotelUpdateDto };
