import { FC, useState } from "react"
import { Button, Col, Row, Card, DatePicker, Image } from 'antd';

import { Booking } from "@/entities";
import dayjs, { Dayjs } from "dayjs";
import { IImage } from "@/app/types";

interface IBookingBrick {
  data: Booking[]
}

interface IUseBookingBrick {
  data: Booking[]
}

interface IBookingBrickItem {
  id: number,
  status: string,
  dates: [Dayjs, Dayjs],
  rooms: Array<{ id: number, cover: IImage }>
}

interface IBookingBrickUI {
  booking: IBookingBrickItem[]
}

const BookingBrick: FC<IBookingBrick> = ({ data }) => {

  const booking = useBookingBrick({ data })

  return <BookingBrickUI booking={booking} />
}


const useBookingBrick = ({ data }: IUseBookingBrick): IBookingBrickItem[] => {
  const [formattedBooking, setFormattedBooking] = useState<IBookingBrickItem[]>(
    data?.map((item) => ({
      id: item.id,
      status: item.status,
      rooms: item.rooms.map((room) => ({ id: room.id, cover: room.cover })),
      dates: [dayjs(item.check_in * 1000), dayjs(item.check_out * 1000)]
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

const BookingBrickUI: FC<IBookingBrickUI> = ({ booking }) =>
  <Row className="container_brick" justify={"space-between"} gutter={[16, 16]}>
    {
      booking?.map((item) => {
        return (
          <Col xs={24} sm={24} md={12} lg={10} xl={6}>
            <Card
              title={`Бронь №${item.id}`}
              bordered={false}
            >



              <DatePicker.RangePicker disabled value={item.dates} />


              <Row>
                {
                  item.rooms.map((room) => {
                    return <Col span={13} className="lover_block_of_brick">
                      <Row className="lover_block_of_brick_container">
                        <Card title={`Номер ${room.id}`}>
                          <Image src={room.cover.link} />
                        </Card>
                        <Card title={`Статус:`} >
                          {item.status}
                        </Card>
                        <Button className="Button_more_detalis_tiles">Подробнее</Button>
                      </Row>

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





