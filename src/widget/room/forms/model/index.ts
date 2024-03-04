import { RoomUpdateDto, RoomCreationDto } from "@/entities/room"
import { InputProps, SelectProps, UploadFile } from "antd"
import { UploadChangeParam } from "antd/es/upload"

interface IRoomFormUI<T> {
    room: T

    onSubmit: () => void

    handleChange: InputProps["onChange"]
    handleSelect: SelectProps["onChange"]
    onFileChange: (name: string, info: UploadChangeParam<UploadFile<any>>) => void
    onFileRemove?: (name: string, file: UploadFile) => void
}

export type { IRoomFormUI }