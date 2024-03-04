import { useRoom } from "@/entities/room"
import { MainLayout } from "@/shared/layouts/layout"
import { Col, Row } from "antd"
import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomlockListUI } from "@/widget/room-lock/list"
import { useRoomLock } from "@/entities/roomlock/api/useRoomlock"
import { RoomUpdateForm } from "@/widget/room/forms"
import { RoomDtlsPgHdr } from "@/widget/room/details_page_header/ui"
import { LoadingPage } from "@/widget/loading_page"

const RoomDetailsPage: FC = () => {
  // room details
  const { id } = useParams()

  const { room_details, getRoomDetailsByID } = useRoom()
  const { roomlocks, getRoomlocksByRoomID, deleteRoomlock } = useRoomLock()

  useEffect(() => {
    getRoomDetailsByID(Number(id))
    getRoomlocksByRoomID(Number(id))
  }, [])

  if (!room_details || room_details.id != Number(id))
    return <LoadingPage />

  return (
    <MainLayout
      header={<RoomDtlsPgHdr room={room_details} />}
    >
      <Row justify={"space-between"} gutter={[16, 16]}>
        <Col span={10}>

          <RoomUpdateForm room={room_details} />

        </Col>
        <Col span={10}>

          <RoomlockListUI roomlocks={roomlocks} onItemClick={(id) => deleteRoomlock(id)} />
          
        </Col>
      </Row>

    </MainLayout >
  )
}

export { RoomDetailsPage }
