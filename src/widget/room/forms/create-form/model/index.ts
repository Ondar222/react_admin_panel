import { RoomCreationDto } from "@/entities/room"

interface IUseRoomCreate {
    room: RoomCreationDto,
    onFileChange,
    onFileDelete,
    onInputChange,
    onSelect,
    onSubmit
}

export type { IUseRoomCreate }