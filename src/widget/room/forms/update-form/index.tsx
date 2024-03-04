import { FC, useState } from "react"
import { Room, RoomUpdateDto, useRoom } from "@/entities/room"
import { InputProps, SelectProps } from "antd";
import { RoomUpdateFormUI } from "./ui";

const RoomUpdateForm: FC<{ room: Room }> = (props) => {
    const [room, setRoom] = useState<RoomUpdateDto | undefined>(new RoomUpdateDto(props.room));
    const { updateRoom, uploadRoomImage, deleteRoomImage } = useRoom();

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

        if (status === "uploading") {
            // await uploadRoomImage(fieldName, info.file);
        }

        if (status === "removed") {
            console.log(fieldName)
            await deleteRoomImage(fieldName, info.file.uid);
        }
    };

    const onSubmit = () => updateRoom(room);

    if (room)
        return (
            <RoomUpdateFormUI
                room={room}

                handleChange={handleChange}
                handleSelect={handleSelect}
                onFileChange={handleImageChange}
                onSubmit={onSubmit}
            />
        )
}

export { RoomUpdateForm }