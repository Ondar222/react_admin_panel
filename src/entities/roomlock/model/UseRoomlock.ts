import { Roomlock } from "./Roomlock";
import { RoomlockCreationDto } from "./dto/RoomlockCreateDto";

interface UseRoomLock {
  roomlocks: Roomlock[] | undefined;
  roomlock_details: Roomlock | undefined;
  room_logs: any | undefined;

  getRoomlocksByRoomID: (room_id: number) => Promise<void>;
  getRoomlockDetailsByID: (roomlock_id: number) => Promise<void>;

  createRoomlock: (dto: RoomlockCreationDto) => Promise<void>;
  deleteRoomlock: (roomlock_id: number) => Promise<void>;

  getRoomlockLogsByRoomId: (room_id: number) => Promise<void>
}

export type { UseRoomLock };
