import { IRangePicker } from "@/shared/range-picker/model";
import type { Hotel } from "@/entities/hotel";
import { Room } from "@/entities/room/model";

type Roomlock = {
  id: number;

  start: number;
  end: number;
  status: string;
  room: Pick<
    Room,
    "id" | "name" | "type" | "number" | "price" | "description" | "capacity"
  >;
};

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
  room_id: Pick<Room, "id">;
  dates: [number, number];
  onDatePickerChange: IRangePicker["onChange"];
  onRoomSelect: (e: Pick<Room, "id">) => void;
  onSaveButtonClick: () => void;
  onReasonSelectChange: (e: string) => void;
}

export type {
  Roomlock,
  IRoomLockCreationForm,
  IRoomLockCreateFormPresenter,
  IRoomLockCreationFormUI,
};
