import { Room, User } from "@/entities";

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
  user: Omit<User, "role">;
  rooms: Array<Pick<Room, "id" | "type" | "cover" | "number">>;
}

export type { Booking };
export { EBookingStatus };
