import { Room } from "@/entities/room"

interface IYurtaRoomSelectProps {
    rooms: Array<Room>
    value: Array<Pick<Room, "id">>
    onChange: (e: Array<Pick<Room, "id">>) => void
}

interface IYurtaRoomSelectUI {
    options: Array<{ value: number, label: string }>
    value: Array<number>
    onChange: (e: Array<number>) => void
}


export type { IYurtaRoomSelectProps, IYurtaRoomSelectUI }