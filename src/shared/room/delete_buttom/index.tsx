import { useRoom } from "@/entities/room"
import { Button } from "antd"
import { FC } from "react"

export const RoomDeleteButton: FC<{ id: number }> = ({ id }) => {
    const { deleteRoom } = useRoom()

    return <Button danger onClick={() => deleteRoom(id)} >Удалить</Button>
}

