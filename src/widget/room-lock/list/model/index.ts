import { RoomLock } from "@/entities/room-lock/model/room_lock";

interface IRoomLockListUI {
  room_locks: RoomLock[];
  onItemClick: (id: number) => void
}

export type { IRoomLockListUI };
