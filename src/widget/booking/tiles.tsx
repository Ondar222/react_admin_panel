import React, { FC, useEffect, useState } from "react"
import { Button, Flex, Space, Table, Tag, Typography, Col, Row, Divider, Card, DatePicker, Image } from 'antd';
import { useBooking } from "@/entities/booking";
import { useBrm } from "@/entities/calendar/api/useBrm"
import { V2_Booking } from "@/entities/booking";
import { RoomLock } from "@/entities/room/model/interface";
import dayjs, { Dayjs } from "dayjs";

interface IBookingBrick {
  data: V2_Booking[]
}

interface IUseBookingBrick {
  data: V2_Booking[]
}

interface IBookingBrickItem {
  id: number,
  status: string,
  dates: [Dayjs, Dayjs],
  rooms: Array<{id: number, cover: string}>
}

interface IBookingBrickUI {
  booking: IBookingBrickItem[]
}

const BookingBrick: FC<IBookingBrick> = ({data}) => {

  const booking = useBookingBrick({data})

  return <BookingBrickUI booking={booking} />
}


const useBookingBrick = ({data}: IUseBookingBrick): IBookingBrickItem[] => {
  const [formattedBooking, setFormattedBooking] = useState<IBookingBrickItem[]>(data?.map((item) => ({
    id: item.id,
    status: item.status,
    rooms: item.rooms.map((room) => ({id: room.id, cover: room.cover})),
    dates: [dayjs(item.check_in*1000), dayjs(item.check_out*1000)]
  })))

  // useEffect(() => {
  //   setData(props?.data?.map((item) => {
  //     if (item.type === "booking") {
  //       return {...item, id: item.item.id, dates: [dayjs(item.item.check_in*1000), dayjs(item.item.check_out*1000)]}
  //     }
  //   }))
  // }, [])

  // useEffect(() => {
  //   setData(props?.data?.map((item) => {
  //     if (item.type === "booking") {
  //       return {...item, id: item.item.id, dates: [dayjs(item.item.check_in*1000), dayjs(item.item.check_out*1000)]}
  //     }
  //   }))
  // }, [props.data])

  return formattedBooking
}

const BookingBrickUI: FC<IBookingBrickUI> = ({booking}) =>
  <Row className="container_brick" justify={"space-between"} gutter={[16,16]}>
    {
      booking?.map((item) => {
        return (
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Card
              title={`Бронь №${item.id}`}
              bordered={false}
            >
              {item.status}
              <DatePicker.RangePicker disabled value={item.dates}  />
             <Button className="Button_more_detalis_tiles">Подробнее</Button>
          <Row>
            {
              item.rooms.map((room) => {
                return <Col span={12}>
                 <Card title={`Номер ${room.id}`}>
                <Image src={room.cover}  />
                </Card> 
                </Col>
              })
             }
          </Row>
             

             
            </Card>
          </Col>
        )
      })
    }
  </Row>

export { BookingBrick };





