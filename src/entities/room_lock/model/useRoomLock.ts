import { RoomLock } from "./room_lock";

interface IUseRoomLock {
  locks: RoomLock[] | undefined;
  findByRoomId: (room_id: number, status: string) => void;
  create: (id: number, start: number, end: number, reason: string) => void;
}

export type { IUseRoomLock };
