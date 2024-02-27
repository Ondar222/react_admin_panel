import { IImage } from "@/app/types";

enum RoomTypes {
  economy = "economy",
  standard = "standart",
  luxury = "luxury",
}

interface BaseRoom {
  id: number;
  description: string;

  type: RoomTypes;
  price: number;

  name: string;
  number: string;
  capacity: number;
  visibility: boolean;
}

interface ApiRoom extends BaseRoom {
  hotel_id: number;
  cover: IImage;
  images: Array<IImage>;
}

interface RoomLock {
  id: number;

  start: number;
  end: number;
  status: string;
  room: ApiRoom;
}

export { RoomTypes };
export type { ApiRoom as Room, RoomLock };
