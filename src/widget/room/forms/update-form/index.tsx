import { FC, useState } from "react"
import { Room, RoomUpdateDto, useRoom } from "@/entities/room"
import { InputProps, SelectProps } from "antd";
import { RoomUpdateFormUI } from "./ui";

const RoomUpdateForm: FC<{ room: Room }> = (props) => {
    const [room, setRoom] = useState<RoomUpdateDto>( {
        id: props.room.id,
        name: props.room.name,
        description: props.room.description,

        price: props.room.price,
        number: props.room.number,

        capacity: props.room.capacity,
        visibility: props.room.visibility,
        type: props.room.type,

        hotel_id: props.room.hotel.id,

        cover: props.room.cover != null ? [{
            uid: props.room.cover.id,
            name: props.room.cover.id,
            thumbUrl: props.room.cover.link,
            url: props.room.cover.link
        }] : undefined,
        images: props.room.images.map((image) => ({
            uid: image.id,
            name: image.id,
            thumbUrl: image.link,
            url: image.link
        })),
    });

    const { updateRoom, deleteRoomImage } = useRoom();

    // handlers
    const handleChange: InputProps["onChange"] = (e) => {
        const fieldName = e.target.name;
        setRoom((prev) => ({
            ...prev,
            [fieldName]: e.target.value,
        }));
    };

    const handleSelect: SelectProps["onChange"] = (value, option) => {
        setRoom((prev) => ({
            ...prev,
            type: value
        }))
    };

    const handleImageChange = async (fieldName: string, info) => {
        const status = info.file.status

        console.log(status)
        if (status === "done") {
            console.log('uploaded')
            // await uploadRoomImage(fieldName, info.file);
        }

        if (status === "removed") {
            await deleteRoomImage(fieldName, info.file.uid);
        }

    };

    const handleImageRemove = async (fieldName: string, file) => {

    }

    const onSubmit = () => updateRoom(room);

    if (room)
        return (
            <RoomUpdateFormUI
                room={room}

                handleChange={handleChange}
                handleSelect={handleSelect}
                onFileChange={handleImageChange}
                onFileRemove={handleImageRemove}
                onSubmit={onSubmit}
            />
        )
}

export { RoomUpdateForm }