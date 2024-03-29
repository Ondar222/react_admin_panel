import { useRoom } from "@/entities/room"
import { MainLayout } from "@/shared/layouts/layout"
import { Col, Row } from "antd"
import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomlockListUI } from "@/widget/room-lock/list"
import { useRoomLock } from "@/entities/roomlock/api/useRoomlock"
import { RoomDtlsPgHdr } from "@/widget/room/details_page_header/ui"
import { LoadingPage } from "@/widget/loading_page"
import { UpdateCurrentRoomForm } from "@/widget/room/UpdateCurrentRoomForm/UpdateCurrentRoomForm"

const RoomDetailsPage: FC = () => {
  const { id } = useParams()

  const { room_details, getRoomDetailsByID } = useRoom()
  const { roomlocks, getRoomlocksByRoomID, deleteRoomlock } = useRoomLock()

  useEffect(() => {
    getRoomDetailsByID(Number(id))
    getRoomlocksByRoomID(Number(id))
  }, [])

  if (!room_details || room_details.id != Number(id))
    return <LoadingPage layout="empty" />

  return (
    <MainLayout
      header={<RoomDtlsPgHdr room={room_details} />}
    >
      <Row justify={"space-between"} gutter={[16, 16]}>
        <Col span={10}>
          <UpdateCurrentRoomForm room={{
            id: room_details.id,
            name: room_details.name,
            description: room_details.description,

            price: room_details.price,
            number: room_details.number,

            capacity: room_details.capacity,
            visibility: room_details.visibility,
            type: room_details.type,

            hotel_id: room_details.hotel.id,

            cover: room_details.cover != null ? [{
              uid: room_details.cover.id,
              name: room_details.cover.id,
              thumbUrl: room_details.cover.link,
              url: room_details.cover.link
            }] : undefined,
            images: room_details.images.map((image) => ({
              uid: image.id,
              name: image.id,
              thumbUrl: image.link,
              url: image.link
            })),
          }} />

        </Col>
        <Col span={10}>

          <RoomlockListUI roomlocks={roomlocks} onItemClick={(id) => deleteRoomlock(id)} />

        </Col>
      </Row>

    </MainLayout >
  )
}

export { RoomDetailsPage }
