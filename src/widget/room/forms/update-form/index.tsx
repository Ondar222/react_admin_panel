import { FC } from "react"
import { RoomFormUI, useRoomUpdate } from ".."
import { Room } from "@/entities/room"

const RoomUpdateForm: FC<{ room: Room }> = (props) => {
    const { room, onInputChange, onSelect, onFileChange, onFileDelete, onSubmit } = useRoomUpdate(props)

    return <RoomFormUI
        room={room}

        handleChange={onInputChange}
        handleSelect={onSelect}
        onFileChange={onFileChange}

        onFileRemove={onFileDelete}
        onSubmit={onSubmit}
    />
}

export { RoomUpdateForm }