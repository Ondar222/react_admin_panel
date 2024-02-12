import { RoomCreationDto, RoomUpdateDto, useRoom } from "@/entities/room"
import { useRoomLock } from "@/entities/room/api/useRoomLock"
import { RoomUpdateForm } from "@/entities/room/ui/creation-form.tsx/ui"
import { RoomLockCreationForm } from "@/entities/room/ui/lock/creation-form"
import { MainLayout } from "@/shared/layouts/layout"
import { Col, Row } from "antd"
import { FC, MouseEvent, SetStateAction, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RoomDetailsPage: FC = () => {
  // room details
  const { id } = useParams()
  const { currentRoom, findById } = useRoom()

  // room update
  const { update } = useRoom()
  const [room, setRoom] = useState<RoomUpdateDto>(new RoomUpdateDto())

  // room-lock data
  const { locks, findByRoomId } = useRoomLock()

  useEffect(() => {
    if (id) {
      findById(id)
      findByRoomId(Number(id), "active")
    }
  }, [])

  useEffect(() => {
    if (currentRoom)
      setRoom(new RoomUpdateDto(currentRoom))
  }, [currentRoom])

  return (
    <MainLayout header={`Номер #${id} ${currentRoom?.name}`} footer="Пагинация">
      <Row gutter={[16, 16]} justify={"space-between"}>
        <Col span={12}>
          <RoomUpdateForm
            room={room}
            setRoom={setRoom}
            onSaveButtonClick={() => update(room)} />
        </Col>

        <Col span={12}>
          <RoomLockCreationForm
          />
        </Col>
      </Row>
    </MainLayout >
  )
}

export { RoomDetailsPage }
