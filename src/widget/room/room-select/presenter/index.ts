import { useEffect, useState } from "react";
import { IYurtaRoomSelectProps, IYurtaRoomSelectUI } from "../model/interface";

const RoomSelectPresenter = ({
  rooms,
  value: initialValue,
  onChange,
}: IYurtaRoomSelectProps) => {
  const [value, setValue] = useState<IYurtaRoomSelectUI["value"]>(
    initialValue.map((room) => room.id)
  );
  
  const options: IYurtaRoomSelectUI["options"] = rooms?.map((room) => ({
      value: room.id,
      label: room.name
  }))

  const handleChange = (e: number[]) => {
    setValue(e);
    const castedValue = e?.map((room_id) => ({ id: room_id }));
    onChange(castedValue);
  };

  return {
    value,
    options,
    onChange: handleChange,
  };
};

export { RoomSelectPresenter };
