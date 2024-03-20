import { useRoom } from "@/entities/room"
import { Button } from "antd"
import { FC } from "react"
import { message } from "antd"
import { useNavigate } from "react-router-dom"

export const RoomDeleteButton: FC<{ id: number }> = ({ id }) => {
    const navigate = useNavigate()
    const { deleteRoom } = useRoom()

    const handleDeleteRoom = async () => {
        await deleteRoom(id)
            .then((res) => {
                message.success("Номер успешно был удален")
                navigate("/room")
            })
            .catch((error) => {
                message.error("При удалении номера возникла ошибка")
            })
    }

    return <Button danger onClick={handleDeleteRoom} >Удалить</Button>
}

