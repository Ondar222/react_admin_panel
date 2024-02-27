import { IRangePicker } from "@/shared/range-picker/model";
import { Hotel } from "@/entities/hotel/model/hotel";
import { Room } from "@/entities/room/model";

type RoomLock = {
  id: number;

  start: number;
  end: number;
  status: string;
  room: Room;
}

interface IRoomLockCreationForm {
  hotel: Hotel;
  onDatePickerChange: IRangePicker["onChange"];
  onRoomSelect: (e: Pick<Room, "id">[]) => void;
  onSaveButtonClick: () => void;
  onReasonSelectChange: (e: string) => void;
}

interface IRoomLockCreateFormPresenter {
  hotel: Hotel;
  onDatePickerChange: IRangePicker["onChange"];
  onRoomSelect: (e: Pick<Room, "id">) => void;
  onSaveButtonClick: () => void;
  onReasonSelectChange: (e: string) => void;
}

interface IRoomLockCreationFormUI {
  hotel: Hotel;
  room_id: Pick<Room, "id">
  dates: [number, number]
  onDatePickerChange: IRangePicker["onChange"];
  onRoomSelect: (e: Pick<Room, "id">) => void;
  onSaveButtonClick: () => void;
  onReasonSelectChange: (e: string) => void;
}

export type {
  RoomLock,
  IRoomLockCreationForm,
  IRoomLockCreateFormPresenter,
  IRoomLockCreationFormUI,
};
