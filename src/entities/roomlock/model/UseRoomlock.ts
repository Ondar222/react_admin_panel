import { Roomlock } from "./Roomlock";
import { RoomlockCreationDto } from "./dto/RoomlockCreateDto";

interface UseRoomLock {
  roomlocks: Roomlock[] | undefined;
  roomlock_details: Roomlock | undefined;

  getRoomlocksByRoomID: (room_id: number) => Promise<void>;
  getRoomLockDetailsByID: (roomlock_id: number) => Promise<void>;

  createRoomlock: (dto: RoomlockCreationDto) => Promise<void>;
  deleteRoomlock: (roomlock_id: number) => Promise<void>;
}

export type { UseRoomLock };
