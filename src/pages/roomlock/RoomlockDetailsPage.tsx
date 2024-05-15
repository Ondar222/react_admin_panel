import { FC, useEffect } from "react";
import { Roomlock, useRoom, useRoomLock } from "@/entities";
import { useLoading, withLoading } from "@/processes";
import { MainLayout } from "@/shared/layouts/layout";
import { LoadingPage } from "@/widget/loading_page";
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import { FormProviderProps } from "antd/es/form/context";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { RangePicker } from "@/shared/base/RangePicker";

const RoomlockDetailsPageHeader: FC<{ roomlock: Roomlock }> = ({ roomlock }) => {
    const { deleteRoomlock } = useRoomLock()
    const navigate = useNavigate()

    const handleRoomlockDelete = async () => {
        await deleteRoomlock(roomlock.id)
        navigate('/booking')
    }

    return (
        <Row
            justify={"space-between"}
            align={"middle"}
        >
            <Col>
                <Typography.Title level={2}>Блокировка номера №{roomlock.id}</Typography.Title>
            </Col>
            <Col>
                <Button danger onClick={() => handleRoomlockDelete()}>
                    Удалить
                </Button>
            </Col>
        </Row>
    )
}

const RoomlockDetailsPage: FC = () => {
    const { id } = useParams()
    const { roomlock_details, getRoomlockDetailsByID } = useRoomLock()
    const { rooms, getHotelRelatedRooms } = useRoom()

    const { setLoading } = useLoading()

    const fetchData = async () => {
        await getRoomlockDetailsByID(Number(id))
        await getHotelRelatedRooms()
    }

    useEffect(() => {
        withLoading(fetchData, setLoading)
    }, [])

    const selectableRooms = rooms.map((room) => ({
        value: room.id,
        label: room.name
    }))

    const [form] = Form.useForm()

    const roomlock_id = Form.useWatch("id", form)
    const status = Form.useWatch("status", form)
    const dates = Form.useWatch("dates", form)
    const room = Form.useWatch("room", form)

    const handleSubmit: FormProviderProps["onFormFinish"] = async (name, info) => {
        if (name === "roomlock_update") {
            // TODO: ...roomlock update implementaion
        }
    }

    if (roomlock_details?.id != Number(id) || !roomlock_details)
        return <LoadingPage layout="empty" />

    return (
        <MainLayout header={<RoomlockDetailsPageHeader roomlock={roomlock_details} />}>
            <Col span={12}>
                <Form.Provider
                    onFormFinish={handleSubmit}
                >
                    <Form form={form} layout="vertical" name="roomlock_update">
                        <Form.Item
                            label="Идентификатор блокировки"
                            name="id"
                            initialValue={roomlock_details.id}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Статус"
                            name="status"
                            initialValue={roomlock_details.status}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Даты"
                            name="dates"

                            initialValue={[
                                dayjs(roomlock_details.start),
                                dayjs(roomlock_details.end)
                            ]}
                        >
                            <RangePicker />
                        </Form.Item>

                        <Form.Item
                            label="Номер"
                            name="room"
                            initialValue={roomlock_details.room.id}
                        >
                            <Select options={selectableRooms} />
                        </Form.Item>

                        <Button htmlType="submit">
                            Сохранить
                        </Button>
                    </Form>
                </Form.Provider>
            </Col>
        </MainLayout>)
}

export { RoomlockDetailsPage }




