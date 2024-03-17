import { FC, useEffect, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { EBookingStatus, useBooking } from "@/entities/booking"
import { useParams } from "react-router-dom"
import { BookingUpdateDto } from "@/entities/booking/model/dto/BookingUpdateDto"
import { Flex, Form, Button } from "antd"
import { useHotel } from "@/entities/hotel"
import { RoomSelect } from "@/widget/room/RoomSelect"
import { YurtaDatePicker } from "@/shared/range-picker"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"

const BookingDetailPage: FC = () => {
  const { id } = useParams()
  const { booking_details, getBookingDetailsByID } = useBooking()
  const [booking, setBooking] = useState<BookingUpdateDto>(new BookingUpdateDto(booking_details))
  const { hotel, getHotelDetails } = useHotel()

  useEffect(() => {
    if (id) {
      getHotelDetails()
      getBookingDetailsByID(Number(id))
    }
  }, [])

  useEffect(() => {
    setBooking(new BookingUpdateDto(booking_details))
  }, [booking_details])

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
            type="number"
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

          {/* {
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

          } */}

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
              mode="multiple"
              value={booking.rooms}
              isMultiple={true}
              rooms={hotel.rooms}

            />
          }

          <Button>
            Сохранить
          </Button>
        </Flex>
      </Form>
    </MainLayout >
  )
}

export { BookingDetailPage }