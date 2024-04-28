import { useEffect, useState } from "react";
import {
  IYurtaRoomSelectProps,
  IYurtaRoomSelectUI,
} from "../model/interface";
import { Room } from "@/entities";

const useRoomSelect = ({
  rooms,
  isMultiple,
  value: initialValue,
  onChange,
}: IYurtaRoomSelectProps): IYurtaRoomSelectUI => {
  const [value, setValue] = useState<IYurtaRoomSelectUI["value"]>([]);

  useEffect(() => {
    if (initialValue != null)
      if (isMultiple) {
        const val = initialValue as Room[];
        setValue(val?.map((room) => room?.id));
      } else {
        const val = initialValue as Room;
        setValue(val?.id);
      }
  }, []);

  const options: IYurtaRoomSelectUI["options"] = rooms?.map((room) => ({
    value: room.id,
    label: room.name,
  }));

  const handleChange = (e: number[] | number) => {
    setValue(e);
    if (typeof e == "number") {
      onChange({ id: e });
    }

    if (typeof e === "object") {
      const castedValue = e?.map((room_id) => ({ id: room_id }));
      onChange(castedValue);
    }
  };

  return {
    value,
    options,
    onChange: handleChange,
  };
};

export { useRoomSelect };
