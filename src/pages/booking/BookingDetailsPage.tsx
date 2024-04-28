import { FC, useEffect, useState } from "react"
import { MainLayout } from "@/shared/layouts/layout"
import { Booking, BookingUpdateDto, useBooking, useHotel, Room, useRoom } from "@/entities"
import { useParams } from "react-router-dom"
import { Form, Typography, Col, Input, DatePicker, Select } from "antd"
import { useLoading, withLoading } from "@/processes"
import dayjs from "dayjs"
import { UserCard } from "@/shared/user/UserCard/UserCard"
import { MoneyInput } from "@/shared/base/MoneyInput"

const BookingUpdateForm: FC<{ booking: Booking, room_options: Room[] }> = ({ booking, room_options }) => {
  const [form] = Form.useForm()

  return (
    <Form.Provider>
      <Form form={form} layout="vertical">

        <Form.Item label="Идентификатор брони" name={"id"}>
          <Input disabled defaultValue={booking?.id} />
        </Form.Item>

        <Form.Item label="Сумма" name={"amount"} initialValue={booking?.amount}>
          <MoneyInput disabled />
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

        <Form.Item label="Гость">
          {
            booking?.status && (
              <UserCard
                id={booking?.user?.id}
                surname={booking?.user?.surname}
                name={booking?.user?.name}
                email={booking?.user?.email}
                phone={booking?.user?.phone}
                avatar={undefined}
              />
            )
          }
        </Form.Item>



        {/* <Form.Item label="Идентификатор гостя">
          <Input disabled defaultValue={booking?.user?.id} />
        </Form.Item> */}


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