import { RoomUpdateDto, useRoom } from "@/entities/room"
import { RoomUpdateForm } from "@/widget/room/creation-form.tsx/ui"
import { MainLayout } from "@/shared/layouts/layout"
import { Button, Checkbox, Col, Flex, Image, Row, Switch, Typography } from "antd"
import { ColorFactory } from "antd/es/color-picker/color"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RoomLockListUI } from "@/widget/room-lock/list"
import { useRoomLock } from "@/entities/room-lock/api/useRoomLock"

const RoomDetailsPage: FC = () => {
  // room details
  const { id } = useParams()
  const { currentRoom, findById, changeVisibility, deleteRoom } = useRoom()
  const { locks, findByRoomId } = useRoomLock()
  // room update
  const { update } = useRoom()
  const [room, setRoom] = useState<RoomUpdateDto>(new RoomUpdateDto())


  const [visibility, setVisibility] = useState<boolean>(currentRoom?.visibility)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      findById(id)
      findByRoomId(id, 'active')
    }
  }, [])

  useEffect(() => {
    if (currentRoom)
      setRoom(new RoomUpdateDto(currentRoom))
  }, [currentRoom])

  useEffect(() => {
    if (locks) {

    }
  }, [locks])

  return (
    <MainLayout
      header={
        <Flex justify="space-between" align="center">
          <Typography.Title level={3}>
            Номер #${id} ${currentRoom?.name}
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col>
              <Button danger onClick={() => {
                navigate('/room')
                deleteRoom(Number(id))

              }} >Удалить</Button>
            </Col>

            <Col>
              <Switch title="Показывать в поиске" value={visibility} onChange={() => {
                changeVisibility(room.id, !visibility)
                setVisibility(!visibility)
              }} />
            </Col>
            <Col>
              <Typography.Text>Показывать в поиске</Typography.Text>
            </Col>
          </Row>
        </Flex>
      }
      footer="Пагинация"

    >
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <RoomUpdateForm
            room={room}
            setRoom={setRoom}
            onSaveButtonClick={() => {
              update(room)
            }} />
        </Col>
        <Col span={8}>
          <RoomLockListUI room_locks={locks} />
        </Col>
      </Row>

    </MainLayout >
  )
}

export { RoomDetailsPage }
