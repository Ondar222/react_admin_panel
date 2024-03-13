// import { FC } from "react"
// import { Space, Table, Divider } from 'antd';
// import type { TableProps } from 'antd';
// import { Booking } from "@/entities/booking";
// import { Roomlock, useRoomLock } from "@/entities/roomlock";
// import moment from "moment-timezone";
// import { Link } from "react-router-dom";

// const columns: TableProps<{
//   type: string;
//   item: Booking | Roomlock;
// }>['columns'] = [

//     {
//       title: 'Идентификатор',
//       dataIndex: 'item',
//       key: 'item',
//       render: (item) => <a>{item.id}</a>,
//     },
//     {
//       title: 'Типы',
//       dataIndex: 'type',
//       key: 'type',
//       render: (item) => <a>{item}</a>,
//     },
//     {
//       title: 'Начало',
//       dataIndex: 'item',
//       key: 'date',
//       render: (item) => {
//         if (new Object(item).hasOwnProperty('check_in')) {
//           return <a>{moment(item.check_in * 1000).toString()}</a>
//         }
//         return <a>{moment(item.start * 1000).toString()}</a>
//       },
//     },
//     {
//       title: 'Конец',
//       dataIndex: 'item',
//       key: 'date',
//       render: (item) => {
//         if (new Object(item).hasOwnProperty('check_out')) {
//           return <a>{moment(item.check_out * 1000).toString()}</a>
//         }
//         return <a>{moment(item.end * 1000).toString()}</a>
//       },
//     },
//     {
//       title: 'Статус',
//       dataIndex: 'item',
//       key: 'date',
//       render: (item) => <a>{item.status}</a>,
//     },
//     {

//       render: (_, record) => (
//         <Space size="middle" style={{ background: "#7B68EE", width: "75px", display: "flex", justifyContent: "center", borderRadius: "0.1rem" }}>
//           <Link style={{ color: "#fff" }} to={`/booking/${record.item.id}`}>Изменить</Link>
//         </Space>
//       ),
//     },
//   ];

// const RoomlockDetailsPage: FC<any> = (props) => {
//   const data = useRoomLock(props.data)

//   return <RoomlockListUI data={props.data} />
// }


// const RoomlockListUI: FC<any> = (props) =>

//   <>
//     <Divider />
//     <Table columns={columns} dataSource={props.data} />
//   </>





// export {RoomlockDetailsPage} ;























import { useHotel } from "@/entities/hotel";
import { useRoom } from "@/entities/room";
import { useRoomLock } from "@/entities/roomlock";
import { MainLayout } from "@/shared/layouts/layout";
import { LoadingPage } from "@/widget/loading_page";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { stat } from "fs";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoomlockDetailsPage: FC = () => {
    const { id } = useParams()
    const { roomlock_details, getRoomLockDetailsByID, deleteRoomlock } = useRoomLock()
    const { hotel, getHotelDetails } = useHotel()
    const navigate = useNavigate()

    useEffect(() => {
        getHotelDetails()
        getRoomLockDetailsByID(Number(id))
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
        .then((res) => navigate('/booking'))
        .catch((e) => {
            console.log(e)
            navigate('/booking')
        })
    }

    if (roomlock_details?.id != Number(id) || !roomlock_details) return <LoadingPage />

    return (
        <MainLayout header={
            <div>

            </div>}

            footer={<div></div>}  >
            <Form.Provider
                onFormFinish={(name, info) => {
                    if (name === "roomlock_update") {
                        console.log(name)
                        console.log(info)
                    }
                }}>
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




