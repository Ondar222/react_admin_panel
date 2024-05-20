import { FC, useEffect } from "react"
import { useRoom, useRoomLock } from "@/entities"
import { MainLayout } from "@/shared/layouts/layout"
import { Button, Card, Col, Collapse, DatePicker, Flex, Form, Input, Row, Tag, Typography } from "antd"
import { useParams } from "react-router-dom"
import { RoomlockList } from "@/widget/roomlock/list"
import { RoomDtlsPgHdr } from "@/widget/room/RoomDetailsPageHeader/ui"
import { RoomSelect, UpdateCurrentRoomForm } from "@/widget"
import { useLoading, withLoading } from "@/processes"
import { RangePicker } from "@/shared/base/RangePicker"
import { RoomlockReasonDecode } from "@/entities/roomlock/utils"
import {UpdateRoomDetails} from "./UpdateRoomDetails"

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
        <Col span={10}>
        <UpdateRoomDetails room_details={room_details} />

        </Col>
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
                            <Flex vertical gap={10}>
                              <Typography>
                                Сообщение: Администратор {log.message}
                              </Typography>

                              <Collapse
                                size="small"
                                bordered={false}
                                items={
                                  [{
                                    key: '1',
                                    label: "Тело запроса",
                                    children: <pre>{JSON.stringify(log?.meta?.body, null, 2)}</pre>
                                  },
                                  {
                                    key: '2',
                                    label: "Информация о запросе",
                                    children:
                                      <Form layout="vertical" disabled>
                                        <Form.Item>
                                          <Input value={log.meta.success ? log.meta.success.id : "Не присвоен"} />
                                        </Form.Item>
                                        <Form.Item label="Даты">
                                          <RangePicker value={[log.meta.body.start, log.meta.body.end]} />
                                        </Form.Item>

                                        <Form.Item label="Номера">
                                          <RoomSelect rooms={rooms} value={{ id: log.meta.body.id }} />
                                        </Form.Item>

                                        <Form.Item label="Причина">
                                          <Input value={RoomlockReasonDecode(log.meta.body.reason)} />
                                        </Form.Item>
                                      </Form>
                                  }
                                  ]} />
                            </Flex>
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
