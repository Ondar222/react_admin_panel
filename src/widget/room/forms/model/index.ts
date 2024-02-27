import { RoomUpdateDto, RoomCreationDto } from "@/entities/room"
import { InputProps, SelectProps, UploadFile } from "antd"
import { UploadChangeParam } from "antd/es/upload"

interface IRoomFormUI {
    room: RoomUpdateDto | RoomCreationDto

    onSubmit: () => void

    handleChange: InputProps["onChange"]
    handleSelect: SelectProps["onChange"]
    onFileChange: (fieldName: string, info: UploadChangeParam<UploadFile<any>>) => void
    onFileRemove: (fieldName: string, file: UploadFile) => void
}

export type { IRoomFormUI }