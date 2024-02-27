import { Room } from "@/entities/room"
import { SelectProps } from "antd"

interface IYurtaRoomSelectProps extends Omit<SelectProps, "onChange"> {
    rooms: Array<Room>
    isMultiple: boolean
    value: Array<Pick<Room, "id">> | Pick<Room, "id"> | null
    onChange?: (e: Array<Pick<Room, "id">> | Pick<Room, "id">) => void
}

interface IUseRoomSelectProps {
    rooms: Room[]
    isMultiple: boolean
    value: Pick<Room, "id">[] | Pick<Room, "id"> | null
    onChange: (e: Pick<Room, "id">[] | Pick<Room, "id">) => void
}

interface IYurtaRoomSelectUI extends Omit<SelectProps, "onChange"> {
    isMultiple: boolean
    options: Array<{ value: number, label: string }>
    value: Array<number> | number
    onChange: (e: Array<number> | number) => void
}


export type { IYurtaRoomSelectProps, IUseRoomSelectProps, IYurtaRoomSelectUI }