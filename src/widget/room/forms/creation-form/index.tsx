import { FC } from "react";
import { RoomFormUI } from "..";
import { useRoomCreate } from "./api/hook/useRoomCreate";

const RoomCreationForm: FC = () => {
    const { room, onFileChange, onFileDelete, onInputChange, onSelect, onSubmit } = useRoomCreate()

    return <RoomFormUI
        room={room}
        onSubmit={onSubmit}
        handleChange={onInputChange}
        handleSelect={onSelect}
        onFileChange={onFileChange}
        onFileRemove={onFileDelete} />
}

export { RoomCreationForm }