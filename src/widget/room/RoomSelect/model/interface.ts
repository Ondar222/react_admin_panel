import { Room } from "@/entities";
import { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

interface IYurtaRoomSelectProps extends Omit<SelectProps, "onChange"> {
  rooms: Array<Room>;
  isMultiple: boolean;
  value: Array<Pick<Room, "id">> | Pick<Room, "id"> | null;
  onChange?: (e: Array<Pick<Room, "id">> | Pick<Room, "id">) => void;
}

interface IUseRoomSelectProps {
  rooms: Array<Room>;
  isMultiple: boolean;
  value: Array<Pick<Room, "id">> | Pick<Room, "id"> | null;
  onChange: (e: Array<Pick<Room, "id"> | Pick<Room, "id">>) => void;
}

interface IYurtaRoomSelectUI extends Omit<SelectProps, "onChange"> {
  options: Array<DefaultOptionType>;
  value: Array<number> | number;
  onChange: (e: Array<number> | number) => void;
}

export type { IYurtaRoomSelectProps, IUseRoomSelectProps, IYurtaRoomSelectUI };
