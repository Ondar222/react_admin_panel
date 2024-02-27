import { RoomUpdateDto } from "@/entities/room"

interface IUseRoomUpdate {
    room: RoomUpdateDto
    onFileChange,
    onFileDelete,
    onInputChange,
    onSelect,
    onSubmit
}

export type { IUseRoomUpdate }