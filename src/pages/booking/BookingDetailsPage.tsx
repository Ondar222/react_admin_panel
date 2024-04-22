import { FC, useEffect, useState } from "react"
import { MainLayout } from "@/shared/layouts/layout"
import { Booking, EBookingStatus, useBooking } from "@/entities/booking"
import { useParams } from "react-router-dom"
import { BookingUpdateDto } from "@/entities/booking/model/dto/BookingUpdateDto"
import { Form, Button, Typography, Col, Input, DatePicker, Select, Avatar, Row, Image } from "antd"
import { useHotel } from "@/entities/hotel"
import { useLoading, withLoading } from "@/processes"
import dayjs from "dayjs"
import { Room, useRoom } from "@/entities/room"
import { UserCard } from "@/shared/user/UserCard/UserCard"

const BookingUpdateForm: FC<{ booking: Booking, room_options: Room[] }> = ({ booking, room_options }) => {
  const [form] = Form.useForm()
  const { id, surname, name, phone, email, avatar } = booking.user

  return (
    <Form.Provider>
      <Form form={form} layout="vertical">

        <Form.Item label="Идентификатор брони" name={"id"}>
          <Input disabled defaultValue={booking?.id} />
        </Form.Item>

        <Form.Item label="Сумма" name={"amount"}>
          <Input disabled defaultValue={booking?.amount / 100} />
        </Form.Item>

        <Form.Item label="Статус" name={"status"}>
          <Input disabled defaultValue={booking?.status} />
        </Form.Item>

        <Form.Item
          label="Количество гостей"
          name={"capacity"}
        >
          <Input disabled defaultValue={booking?.capacity} />
        </Form.Item>

        <Form.Item label="Даты" name={"dates"}>
          <DatePicker.RangePicker
            disabled
            defaultValue={[
              dayjs(booking?.check_in * 1000),
              dayjs(booking?.check_out * 1000)
            ]} />
        </Form.Item>

        {
          booking?.status && (
            <UserCard
              id={id}
              surname={surname}
              name={name}
              email={email}
              phone={phone}
              avatar={undefined}
            />
          )
        }


        <Form.Item label="Идентификатор гостя">
          <Input disabled defaultValue={booking?.user?.id} />
        </Form.Item>


        <Form.Item label="Номера" name={"rooms"}>
          <Select
            disabled
            mode="multiple"
            defaultValue={booking?.rooms.map((room) => room.id)}
            options={room_options?.map((room) => ({
              value: room?.id,
              label: room?.name
            }))}
          />
        </Form.Item>

        {/* <Form.Item>
          <Button htmlType="submit">
            Сохранить
          </Button>
        </Form.Item> */}
      </Form>
    </Form.Provider>
  )
}

const BookingDetailPage: FC = () => {
  const { id } = useParams()
  const { booking_details, getBookingDetailsByID } = useBooking()
  const [booking, setBooking] = useState<BookingUpdateDto>(new BookingUpdateDto(booking_details))
  const { hotel, getHotelDetails } = useHotel()
  const { rooms, getHotelRelatedRooms } = useRoom()
  const { setLoading } = useLoading()

  const fetchData = async () => {
    if (id) {
      await getHotelDetails()
      await getHotelRelatedRooms()
      await getBookingDetailsByID(Number(id))
    }
  }

  useEffect(() => {
    withLoading(fetchData, setLoading)
  }, [])

  useEffect(() => {
    setBooking(new BookingUpdateDto(booking_details))
  }, [booking_details])

  return (
    <MainLayout
      header={<Typography.Title level={3}>Бронь №{id}</Typography.Title>}
    >
      <Col span={12}>
        <BookingUpdateForm
          booking={booking_details}
          room_options={rooms} />
      </Col>
    </MainLayout >
  )
}

export { BookingDetailPage }