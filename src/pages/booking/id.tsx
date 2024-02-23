import { FC, useEffect, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { EBookingStatus, useBooking } from "@/entities/booking"
import { useParams } from "react-router-dom"
import { BookingUpdateDto } from "@/entities/booking/model/dto/update-dto"
import { Flex, Form, Select, Input, InputNumber, Button } from "antd"
import { useHotel } from "@/entities/hotel/api"
import RoomSelect from "@/widget/room/room-select"
import { YurtaDatePicker } from "@/shared/range-picker"
import { YurtaUserSelect } from "@/entities/booking/ui/form/user-select"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"

const BookingDetailPage: FC = () => {
  const { id } = useParams()
  const { currentBooking, findById, update } = useBooking()
  const [booking, setBooking] = useState<BookingUpdateDto>(new BookingUpdateDto(currentBooking))
  const { hotel, setHotel } = useHotel()

  useEffect(() => {
    if (id) {
      setHotel()
      findById(id)
    }
  }, [])

  useEffect(() => {
    setBooking(new BookingUpdateDto(currentBooking))
  }, [currentBooking])

  return (
    <MainLayout
      header={<DetailsHeader
        title={`#${id}`}
        onSave={() => { }}
      />
      }
      footer={<></>}
    >
      <Form layout="vertical" size="large">
        <Flex vertical gap={2}>
          <YurtaInput
            label="Идентификатор"
            disabled
            placeholder="id"
            value={booking.id}
            color={"white"} />

          <YurtaInput
            label="Сумма"
            placeholder="id"
            disabled
            value={booking.amount}
            color={"white"}
            onChange={(e) => {
              setBooking((prev) => {
                if (e)
                  return {
                    ...prev,
                    amount: Number(e.target.value)
                  }

                return prev
              })
            }}
          />

          <YurtaSelect
            disabled
            label="Статус"
            value={booking.status}
            options={Object.keys(EBookingStatus).map((status) => ({
              value: status,
              label: status
            }))}
            onChange={(e) => {
              setBooking((prev) => ({
                ...prev,
                status: e
              }))
            }}
          />

          <YurtaInput
            label="Количество гостей"
            type="number"
            value={booking.capacity}
            onChange={(e) => {
              setBooking((prev) => {
                if (e)
                  return {
                    ...prev,
                    capacity: Number(e.target.value)
                  }
                return prev
              })
            }}
          />

          {
            booking.user &&
            <YurtaUserSelect
              value={booking.user}
              onChange={(e) => {
                setBooking((prev) => {
                  return {
                    ...prev,
                    user: e
                  }
                })
              }} />

          }

          {booking.check_in && booking.check_out &&
            <YurtaDatePicker
              label="Даты"
              value={[booking.check_in, booking.check_out]}
              onChange={(e) => {
                setBooking((prev) => ({
                  ...prev,
                  check_in: e[0],
                  check_out: e[1]
                }))
              }}
            />
          }

          {
            hotel && <RoomSelect
              value={booking.rooms}
              rooms={hotel.rooms}
              onChange={(e) => setBooking((prev) => ({
                ...prev,
                rooms: e
              }))
              }
            />
          }

          <Button onClick={() => {
            update(booking)
          }}>
            Сохранить
          </Button>
        </Flex>
      </Form>
    </MainLayout >
  )
}

export { BookingDetailPage }