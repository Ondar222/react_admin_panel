import { FC } from "react";
import { Room } from "@/entities/room/model/Room";
import { UpdateCurrentRoomForm } from "@/widget";

interface RoomDetailsProps {
  room_details: Room;
}

const UpdateRoomDetails: FC<RoomDetailsProps> = ({ room_details }) => {
  const room = {
    ...room_details,
    hotel_id: room_details?.hotel?.id,
    cover:
      room_details?.cover != null
        ? [
            {
              uid: room_details.cover.id,
              name: room_details.cover.id,
              thumbUrl: room_details.cover.link,
              url: room_details.cover.link,
            },
          ]
        : undefined,
    images: room_details?.images?.map((image) => ({
      uid: image.id,
      name: image.id,
      thumbUrl: image.link,
      url: image.link,
    })),
  };

  return <UpdateCurrentRoomForm room={room} />;
};

export {UpdateRoomDetails};
