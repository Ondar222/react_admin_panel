import React, { FC } from "react";
import { Col } from "antd";
import { UpdateCurrentRoomForm } from "@/widget";

interface RoomUpdateFormProps {
  roomDetails: any; // тип данных комнаты
}

const RoomUpdateForm: FC<RoomUpdateFormProps> = ({ roomDetails }) => {
  return (
    <Col span={10}>
      <UpdateCurrentRoomForm
        room={{
          ...roomDetails,
          hotel_id: roomDetails?.hotel?.id,
          cover: roomDetails?.cover != null
            ? [{
              uid: roomDetails.cover.id,
              name: roomDetails.cover.id,
              thumbUrl: roomDetails.cover.link,
              url: roomDetails.cover.link
            }]
            : undefined,
          images: roomDetails?.images?.map((image) => ({
            uid: image.id,
            name: image.id,
            thumbUrl: image.link,
            url: image.link
          })),
        }}
      />
    </Col>
  );
};

export { RoomUpdateForm };
