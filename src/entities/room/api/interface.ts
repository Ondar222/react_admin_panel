import type { Room, RoomCreationDto, RoomUpdateDto } from "..";
import { RoomLock } from "../model/interface";

interface IUseRoom {
  rooms: Room[] | undefined;
  currentRoom: Room | undefined;
  lockedRooms: Room[] | undefined;

  create: (room: RoomCreationDto) => void
  findById: (id: string) => void;
  update: (room: RoomUpdateDto) => void;
  findAll: () => void
  findByHotel: (id: string | number) => void;

  getRoomLocks: (
    start: number,
    end: number,
    id: number,
    reason: string,
    status: string
  ) => void;
}

interface IUseRoomLock {
  locks: RoomLock[] | undefined;
  findByRoomId: (room_id: number, status: string) => void;
  create: (id: number, start: number, end: number, reason: string) => void;
}

export type { IUseRoom, IUseRoomLock };
