import { IImage } from "@/app/types";
import { Room } from "@/entities/room";
import User from "@/entities/user/model/interface";

type Hotel = {
  id: number;
  name: string;
  description: string;

  administrator: User;

  address: Record<string, string>;

  rooms: Array<Room>;

  images: Array<IImage>;
  cover: IImage;
};

export type { Hotel };
