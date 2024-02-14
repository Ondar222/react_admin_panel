import { Room } from "@/entities/room";
import User from "@/entities/user/model/interface";

interface Hotel {
  id: number;
  name: string;
  description: string;
  rooms: Array<Room>;
  administrator: User;
  options: Array<number>;
  address: {
    [fieldName: string]: string;
  };
  images: Array<string>;
  cover: string;
}

export default Hotel;
