import { useRoom } from "@/entities/room"
import { MainLayout } from "@/shared/layouts/layout"
import { Col, Row } from "antd"
import { FC, useEffect } from "react"
import { useParams } from "react-router-dom"
import { RoomlockList } from "@/widget/roomlock/list"
import { useRoomLock } from "@/entities/roomlock/api/useRoomlock"
import { RoomDtlsPgHdr } from "@/widget/room/details_page_header/ui"
import { UpdateCurrentRoomForm } from "@/widget"
import { useLoading, withLoading } from "@/processes"
import { LoadingPage } from "@/widget/loading_page"

const RoomDetailsPage: FC = () => {
  const { id } = useParams()

  const { room_details, getRoomDetailsByID } = useRoom()
  const { roomlocks, getRoomlocksByRoomID, deleteRoomlock } = useRoomLock()
  const { setLoading } = useLoading()
  const fetchData = async () => {
    await getRoomDetailsByID(Number(id))
    await getRoomlocksByRoomID(Number(id))
  }

  useEffect(() => {
    withLoading(fetchData, setLoading)
  }, [])

  // if (!room_details) {
  //   return <LoadingPage layout={"main"} />
  // }

  return (
    <MainLayout
      header={<RoomDtlsPgHdr room={room_details} />}
    >
      <Row justify={"space-between"} gutter={[16, 16]}>
        <Col span={10}>
          <UpdateCurrentRoomForm room={{
            ...room_details,

            hotel_id: room_details?.hotel?.id,

            cover: room_details?.cover != null ? [{
              uid: room_details.cover.id,
              name: room_details.cover.id,
              thumbUrl: room_details.cover.link,
              url: room_details.cover.link
            }] : undefined,
            images: room_details?.images?.map((image) => ({
              uid: image.id,
              name: image.id,
              thumbUrl: image.link,
              url: image.link
            })),
          }} />

        </Col>
        <Col span={10}>
          <RoomlockList roomlocks={roomlocks} onItemClick={(id) => deleteRoomlock(id)} />
        </Col>
      </Row>

    </MainLayout >
  )
}

export { RoomDetailsPage }
