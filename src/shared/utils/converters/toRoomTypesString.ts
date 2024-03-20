import { RoomTypes } from "@/entities/room";

const convertToRoomTypesString = (type: RoomTypes) => {
  switch (type) {
    case RoomTypes.economy:
      return "Эконом";
    case RoomTypes.luxury:
      return "Люкс";
    case RoomTypes.standard:
      return "Стандартный";
    default:
      return type;
  }
};

export { convertToRoomTypesString };
