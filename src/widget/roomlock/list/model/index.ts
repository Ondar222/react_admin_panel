import { Roomlock } from "@/entities";

interface IRoomLockListUI {
  roomlocks: Roomlock[];
  onItemClick: (id: number) => void
}

export type { IRoomLockListUI };
