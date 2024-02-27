import { IImage } from "@/app/types";
import { Room } from "@/entities/room";
import User from "@/entities/user/model/interface";

type Hotel = {
  id: number;
  name: string;
  description: string;
  rooms: Array<Room>;
  administrator: User;
  options: Array<number>;
  address: Record<string, string>
  images: Array<IImage>;
  cover: IImage;
}

export type { Hotel };
