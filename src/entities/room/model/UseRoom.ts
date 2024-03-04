import { UploadFile } from "antd";
import type { Room, RoomCreationDto, RoomUpdateDto } from "..";

interface UseRoom {
  rooms: Room[] | undefined;
  room_details: Room | undefined;

  createRoom: (room: RoomCreationDto) => Promise<void>;
  updateRoom: (room: RoomUpdateDto) => Promise<void>;
  deleteRoom: (room_id: number) => Promise<void>;

  changeVisibility: (room_id: number, visibility: boolean) => Promise<void>;
  
  getRoomDetailsByID: (id: number) => Promise<void>;
  getHotelRelatedRooms: () => Promise<void>;

  uploadRoomImage: (
    fieldName: string,
    file: UploadFile
  ) => Promise<void>;

  deleteRoomImage: (
    fieldName: string,
    image_id: string
  ) => Promise<void>;
}

export type { UseRoom };