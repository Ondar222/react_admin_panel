import { Roomlock } from "@/entities/roomlock/model/Roomlock";

interface IRoomLockListUI {
  roomlocks: Roomlock[];
  onItemClick: (id: number) => void
}

export type { IRoomLockListUI };
