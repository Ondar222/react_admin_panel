import { V2_Booking } from "@/entities/booking";
import { RoomLock } from "@/entities/room/model/interface";
import { CalendarProps } from "antd";
import { Dayjs } from "dayjs";

interface ICalendar {
  id: number;
  date: string;
  brm: {
    id: number;
    booking: V2_Booking;
    lock: RoomLock;
    status: string;
  }[];
}

interface ICalendarPresenter {
  dateCellRender: (current: Dayjs) => void;
  monthCellRender: (current: Dayjs) => void;
  cellRender: CalendarProps<Dayjs>["cellRender"];

  onSelect: () => void;
  onChange: () => void;
}

interface ICalendarWidgetUI {
  cellRender: CalendarProps<Dayjs>["cellRender"];
}

interface ICell {}

interface ICellPresenter {}

interface ICellUI {
  items: any;
  label: string;
  onClick: () => void;
}

interface IMonthCell extends ICell {}

interface IMontCellPresenter {}

interface IMonthCellUI {}

interface IDateCell extends ICell {}

interface IDateCellPresenter extends ICellPresenter {}

interface IDateCellUI extends ICellUI {}

export type { ICalendar, ICalendarPresenter };
export type {
  ICell,
  ICellUI,
  IMonthCell,
  IMonthCellUI,
  IDateCell,
  IDateCellUI,
};
