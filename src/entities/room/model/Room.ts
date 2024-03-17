import { IImage } from "@/app/types";
import { Hotel } from "@/entities/hotel";

enum RoomTypes {
  economy = "Эконом",
  standard = "Стандарт",
  luxury = "Люкс",
}

type Room = {
  id: number;
  description: string;

  type: RoomTypes;
  price: number;

  name: string;
  number: string;
  capacity: number;
  visibility: boolean;

  hotel: Pick<Hotel, "id" | "name" | "description" | "departure" | "arrival">;

  cover: IImage | null;
  images: Array<IImage>;
};

export { RoomTypes };
export type { Room };
