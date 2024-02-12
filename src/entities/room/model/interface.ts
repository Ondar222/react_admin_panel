enum RoomTypes {
  economy = "Эконом",
  standard = "Стандарт",
  luxury = "Люкс",
}

interface BaseRoom {
  id: number;
  description: string;

  type: RoomTypes;
  price: number;

  name: string;
  number: string;
  capacity: number;
}

interface ApiRoom extends BaseRoom {
  hotel_id: number;
  cover: string;
  images: Array<string>;
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
