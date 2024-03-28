import { FC, useMemo, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { useEffect } from "react"
import { useBooking } from "@/entities/booking"
import { Col, Row, Select } from "antd"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { CalendarUI } from "@/widget/calendar/ui"
import { useBrm } from "@/entities/calendar/api/useBrm"
import { RoomlockCreationForm } from "@/widget/room-lock/creation_form"
import { BookingList } from "@/widget/booking/list-view"
import { BookingBrick } from "@/widget/booking/brick-view"
import Button from "antd"

enum BookingPageVM {
  calendar = 'calendar',
  list = 'list',
  brick = 'brick'
}

const BookingPageVMDecoder = [
  {
    type: BookingPageVM.calendar,
    name: 'calendar',
    label_ru: 'Календарь'
  },
  {
    type: BookingPageVM.list,
    name: 'list',
    label_ru: 'Список'
  },
  {
    type: BookingPageVM.brick,
    name: 'brick',
    label_ru: 'Плитки'
  }
]

const BookingPage: FC = () => {
  const [mode, setMode] = useState<BookingPageVM>(BookingPageVM.calendar)

  const { bookings, getAllBookings } = useBooking()
  const { brm, getAll } = useBrm()

  useEffect(() => {
    getAll()
    getAllBookings()
  }, [])

  return (
    <MainLayout
      header={
        <DetailsHeader
          title="Активные брони" />
      }
      footer={<></>}
    >
      <Select
        style={{ width: '150px' }}
        defaultValue={BookingPageVMDecoder[0].name}
        onChange={(e) => setMode(e as BookingPageVM)}
        options={BookingPageVMDecoder.map((mode) => ({
          label: mode.label_ru,
          value: mode.name
        }))}
      />

      {
        mode === BookingPageVM.calendar &&
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <RoomlockCreationForm />
          </Col>
          <Col span={18}>
            <CalendarUI
              brm={brm}
            />
          </Col>
          <Col>
          </Col>
        </Row>
      }

      {
        mode === BookingPageVM.list &&
        <BookingList data={brm} />
      }
      {
        mode === BookingPageVM.brick &&
        <BookingBrick data={bookings} />
      }


    </MainLayout >

  )
}


export { BookingPage }