import { FC, useEffect } from "react"
import { useRoom, useRoomLock } from "@/entities"
import { MainLayout } from "@/shared/layouts/layout"
import {Card, Col, Flex, Row, Tag, Typography } from "antd"
import { useParams } from "react-router-dom"
import { RoomlockList } from "@/widget/roomlock/list"
import { RoomDtlsPgHdr } from "@/widget/room/RoomDetailsPageHeader/ui"
import { useLoading, withLoading } from "@/processes"
import { RoomUpdateForm } from "./RoomUpdateForm"
import { LogDetails } from "./LogDetails"

const RoomDetailsPage: FC = () => {
  const { id } = useParams()

  const { room_details, rooms, getRoomDetailsByID, getHotelRelatedRooms } = useRoom()
  const { roomlocks, room_logs, getRoomlocksByRoomID, deleteRoomlock, getRoomlockLogsByRoomId } = useRoomLock()

  const { setLoading } = useLoading()
  

  const fetchData = async () => {
    await getRoomDetailsByID(Number(id))
    await getRoomlocksByRoomID(Number(id))
    await getRoomlockLogsByRoomId(Number(id))
  }

  useEffect(() => {
    withLoading(fetchData, setLoading)
  }, [])

  return (
    <MainLayout
      header={<RoomDtlsPgHdr room={room_details} />}
    >
      <Row justify={"space-between"} gutter={[16, 16]}>
        <RoomUpdateForm roomDetails={room_details} />
        <Col span={12} >
          <Flex vertical gap={30}>
            <RoomlockList roomlocks={roomlocks} onItemClick={(id) => deleteRoomlock(id)} />

            <Row>
              <Typography.Title level={3}>
                Журнал изменений
              </Typography.Title>

              <Col span={24}>
                <Row gutter={[16, 16]} style={{ width: "100%" }}>
                  {
                    room_logs?.map((log) => {
                      return (

                        <Card
                          title={
                            <Row justify={"space-between"} gutter={[16, 16]}>
                              <Col span={18}>
                                <Typography.Text ellipsis>Запись в журнале №${log._id}</Typography.Text>
                              </Col>
                              <Col span={5} >
                                <Row align={"middle"}>
                                  {log.meta.error && <Tag color="red">Ошибка</Tag>}
                                  {log.meta.success && <Tag color="green">Успешно</Tag>}
                                </Row>
                              </Col>
                            </Row>}
                          style={{ width: "100%" }}
                        >
                          <Col>
                            <LogDetails log={log} rooms={rooms} />
                          </Col>

                        </Card>
                      )
                    })
                  }
                </Row>
              </Col>
            </Row>
          </Flex>
        </Col >
      </Row >
    </MainLayout >
  )
}

export { RoomDetailsPage }
