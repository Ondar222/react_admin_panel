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

  arrival: string;
  departure: string;

  images: Array<IImage> | null;
  cover: IImage | null;
};

export type { Hotel };
