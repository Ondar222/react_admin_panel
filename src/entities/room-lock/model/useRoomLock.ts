import { RoomLock } from "./room_lock";

interface IUseRoomLock {
  locks: RoomLock[] | undefined;
  findByRoomId: (room_id: string, status: string) => void;
  create: (id: number, start: number, end: number, reason: string) => void;
  deleteRoomLock: (id: number) => void
}

export type { IUseRoomLock };
