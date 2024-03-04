import { IImage } from "@/app/types";

enum RoomTypes {
  economy = "economy",
  standard = "standard",
  luxury = "luxury",
}

interface Room {
  id: number;
  description: string;

  type: RoomTypes;
  price: number;

  name: string;
  number: string;
  capacity: number;
  visibility: boolean;

  hotel_id: number;

  cover: IImage;
  images: Array<IImage>;
}

export { RoomTypes };
export type { Room };
