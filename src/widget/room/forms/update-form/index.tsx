import { FC, useEffect, useState } from "react"
import { RoomFormUI } from ".."
import { Room, RoomUpdateDto, useRoom } from "@/entities/room"
import { InputProps, SelectProps } from "antd";

const RoomUpdateForm: FC<{ room: Room }> = (props) => {
    const [room, setRoom] = useState<RoomUpdateDto | undefined>(new RoomUpdateDto(props.room));
    const { update, uploadImage, deleteImage } = useRoom();

    // handlers
    const handleChange: InputProps["onChange"] = (e) => {
        const fieldName = e.target.name;
        setRoom((prev) => ({
            ...prev,
            [fieldName]: e.target.value,
        }));
    };

    const handleSelect: SelectProps["onChange"] = (value, option) => { };

    const handleImageChange = async (fieldName: string, info) => {
        const status = info.file.status

        if (status === "uploading") {
            await uploadImage(room.id, fieldName, info.file);
        }

        if (status === "removed") {
            await deleteImage(room.id, fieldName, info.file.uid);
        }
    };

    const onSubmit = () => update(room);

    if (room)
        return (
            <RoomFormUI
                room={room}

                handleChange={handleChange}
                handleSelect={handleSelect}
                onFileChange={handleImageChange}
                onSubmit={onSubmit}
            />
        )
}

export { RoomUpdateForm }