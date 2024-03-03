import { IImage } from "@/app/types";
import { Room } from "@/entities/room";
import User from "@/entities/user/model/interface";

enum EBookingStatus {
  draft = "draft",
  paid = "paid",
  rejected = "rejected",
}

interface V2_Booking extends Object {
  id: number;
  status: EBookingStatus;
  amount: number;
  check_in: number;
  check_out: number;
  capacity: number;
  user: Pick<User, "id" | "surname" | "name" | "phone" | "email" | "avatar">;
  rooms: Array<Pick<Room, "id" | "type" | "cover" | "number" >>;
}

export type { V2_Booking };
export { EBookingStatus };
