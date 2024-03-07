import { Room } from "@/entities/room";
import User from "@/entities/user/model/interface";

enum EBookingStatus {
  draft = "draft",
  paid = "paid",
  rejected = "rejected",
}

interface Booking {
  id: number;
  status: EBookingStatus;
  amount: number;
  check_in: number;
  check_out: number;
  capacity: number;
  user: Pick<User, "id" | "surname" | "name" | "phone" | "email" | "avatar">;
  rooms: Array<Pick<Room, "id" | "type" | "cover" | "number" >>;
}

export type { Booking };
export { EBookingStatus };
