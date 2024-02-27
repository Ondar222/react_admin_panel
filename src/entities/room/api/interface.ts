import { UploadFile } from "antd";
import type { Room, RoomCreationDto, RoomUpdateDto } from "..";
import { RoomLock } from "../model/interface";

interface IUseRoom {
  rooms: Room[] | undefined;
  currentRoom: Room | undefined;

  create: (room: RoomCreationDto) => Promise<void>;

  update: (room: RoomUpdateDto) => Promise<void>;
  changeVisibility: (room_id: number, visibility: boolean) => Promise<void>;
  deleteRoom: (room_id: number) => Promise<void>;

  findById: (id: string) => Promise<void>;
  findMyRooms: () => Promise<void>;

  // images
  uploadImage: (
    room_id: number,
    fieldName: string,
    file: UploadFile
  ) => Promise<void>;
  deleteImage: (room_id: number, fieldName: string, image_id: string) => Promise<void>;
}

interface IUseRoomLock {
  locks: RoomLock[] | undefined;
  findByRoomId: (room_id: number, status: string) => void;
  create: (id: number, start: number, end: number, reason: string) => void;
}

export type { IUseRoom, IUseRoomLock };
