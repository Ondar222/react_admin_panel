import { useHotel, useRoomLock } from "@/entities";
import { useLoading, withLoading } from "@/processes";
import { MainLayout } from "@/shared/layouts/layout";
import { LoadingPage } from "@/widget/loading_page";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { FormProviderProps } from "antd/es/form/context";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoomlockDetailsPage: FC = () => {
    const { id } = useParams()
    const { roomlock_details, getRoomLockDetailsByID, deleteRoomlock } = useRoomLock()
    const { hotel, getHotelDetails } = useHotel()
    const navigate = useNavigate()
    const { setLoading } = useLoading()

    const fetchData = async () => {
        await getHotelDetails()
        await getRoomLockDetailsByID(Number(id))
    }

    useEffect(() => {
        withLoading(fetchData, setLoading)
    }, [])

    const selectableRooms = hotel?.rooms.map((room) => ({
        value: room.id,
        label: room.name
    }))

    const [form] = Form.useForm()

    const roomlock_id = Form.useWatch("id", form)
    const status = Form.useWatch("status", form)
    const dates = Form.useWatch("dates", form)
    const room = Form.useWatch("room", form)

    const handleRoomlockDelete = async () => {
        await deleteRoomlock(roomlock_details.id)
        navigate('/booking')
    }

    const handleSubmit: FormProviderProps["onFormFinish"] = async (name, info) => {
        if (name === "roomlock_update") {
        }
    }

    if (roomlock_details?.id != Number(id) || !roomlock_details)
        return <LoadingPage layout="empty" />

    return (
        <MainLayout header={""}>
            <Form.Provider
                onFormFinish={handleSubmit}
            >
                <Form form={form} layout="vertical" name="roomlock_update">
                    <Form.Item label="id" name="id" initialValue={roomlock_details.id}>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="status" name="status" initialValue={roomlock_details.status}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="dates" name="dates" initialValue={[dayjs(roomlock_details.start * 1000), dayjs(roomlock_details.end * 1000)]}>
                        <DatePicker.RangePicker />
                    </Form.Item>

                    <Form.Item label="room" name="room" initialValue={roomlock_details.room.id}>
                        <Select options={selectableRooms} />
                    </Form.Item>

                    <Row>
                        <Col>
                            <Button danger onClick={() => handleRoomlockDelete()}>
                                Удалить
                            </Button>
                        </Col>
                        <Col>
                            <Button htmlType="submit">
                                Сохранить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Form.Provider>
        </MainLayout>)
}

export { RoomlockDetailsPage }




