import { IRangePicker } from "@/entities/booking/ui/form/range-picker/model";
import Hotel from "@/entities/hotel/model/interface";
import { Room } from "@/entities/room/model";

interface RoomLock {
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
  onRoomSelect: (e: Pick<Room, "id">[]) => void;
  onSaveButtonClick: () => void;
  onReasonSelectChange: (e: string) => void;
}

interface IRoomLockCreationFormUI {
  hotel: Hotel;
  onDatePickerChange: IRangePicker["onChange"];
  onRoomSelect: (e: Pick<Room, "id">[]) => void;
  onSaveButtonClick: () => void;
  onReasonSelectChange: (e: string) => void;
}

export type {
  RoomLock,
  IRoomLockCreationForm,
  IRoomLockCreateFormPresenter,
  IRoomLockCreationFormUI,
};
