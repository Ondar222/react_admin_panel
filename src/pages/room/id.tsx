import { useRoom } from "@/entities/room"
import { MainLayout } from "@/shared/layouts/layout"
import { Col, Row } from "antd"
import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomLockListUI } from "@/widget/room-lock/list"
import { useRoomLock } from "@/entities/room-lock/api/useRoomLock"
import { RoomUpdateForm } from "@/widget/room/forms"
import { RoomDtlsPgHdr } from "@/widget/room/details_page_header/ui"

const RoomDetailsPage: FC = () => {
  // room details
  const { id } = useParams()

  const { currentRoom, findById } = useRoom()
  const { locks, findByRoomId, deleteRoomLock } = useRoomLock()

  useEffect(() => {
    findById(id)
    findByRoomId(id, "active")
  }, [])

  if (!currentRoom || currentRoom.id != Number(id))
    return <div>loading</div>

  return (
    <MainLayout
      header={<RoomDtlsPgHdr room={currentRoom} />}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <RoomUpdateForm room={currentRoom} />
        </Col>
        <Col span={12}>
          <RoomLockListUI room_locks={locks} onItemClick={(id) => deleteRoomLock(id)} />
        </Col>
      </Row>

    </MainLayout >
  )
}

export { RoomDetailsPage }
