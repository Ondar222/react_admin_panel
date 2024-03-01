import { Room, RoomTypes, RoomUpdateDto } from "../model";

export const convertToRoomUpdateDTO = (room: Room): RoomUpdateDto => {
  return {
    id: room.id,
    price: room.price,
    description: room.description,
    type: RoomTypes.standard,
    cover: {
      uid: room.cover.id,
      thumbUrl: room.cover.link,
      name: room.cover.id,
    },
    visibility: room.visibility,
    name: room.name,
    number: room.number,
    capacity: room.capacity,
    hotel_id: room.hotel_id,
    images: room.images.map((image) => ({
      uid: image.id,
      name: image.id,
      url: image.link,
      thumbUrl: image.link,
    })),
  };
};
